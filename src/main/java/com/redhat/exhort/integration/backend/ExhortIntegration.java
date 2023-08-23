/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.redhat.exhort.integration.backend;

import static com.redhat.exhort.integration.Constants.DEPENDENCY_TREE_PROPERTY;
import static com.redhat.exhort.integration.Constants.PROVIDERS_PARAM;
import static com.redhat.exhort.integration.Constants.REQUEST_CONTENT_PROPERTY;

import java.io.InputStream;
import java.util.List;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.micrometer.MicrometerConstants;
import org.apache.camel.component.micrometer.routepolicy.MicrometerRoutePolicyFactory;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.backend.sbom.SbomParser;
import com.redhat.exhort.integration.backend.sbom.SbomParserFactory;
import com.redhat.exhort.integration.providers.ProviderAggregationStrategy;
import com.redhat.exhort.integration.providers.VulnerabilityProvider;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.GraphRequest;

import io.micrometer.core.instrument.MeterRegistry;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.mail.internet.ContentType;
import jakarta.mail.internet.ParseException;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class ExhortIntegration extends EndpointRouteBuilder {

  private final MeterRegistry registry;

  @Inject VulnerabilityProvider vulnerabilityProvider;

  ExhortIntegration(MeterRegistry registry) {
    this.registry = registry;
  }

  @Override
  public void configure() {
    // fmt:off
    getContext().getRegistry().bind(MicrometerConstants.METRICS_REGISTRY_NAME, registry);
    getContext().addRoutePolicyFactory(new MicrometerRoutePolicyFactory());
    
    restConfiguration().contextPath("/api/v3/")
        .clientRequestValidation(true);

    onException(IllegalArgumentException.class)
        .routeId("onExhortIllegalArgumentException")
        .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(422))
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
        .handled(true)
        .setBody().simple("${exception.message}");

    onException(ClientErrorException.class)
        .routeId("onExhortClientErrorException")
        .setHeader(Exchange.HTTP_RESPONSE_CODE, simple("${exception.getResponse().getStatus()}"))
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
        .handled(true)
        .setBody().simple("${exception.message}");

    rest()
        .post("/analysis")
            .routeId("restAnalysis")
            .to("direct:analysis")
        .get("/token")
            .routeId("restTokenValidation")
            .to("direct:validateToken")
        .get("/test").to("direct:testFreemarker");

    from(direct("analysis"))
      .routeId("analysis")
        .setProperty(PROVIDERS_PARAM, method(vulnerabilityProvider, "getProvidersFromQueryParam"))
        .setProperty(REQUEST_CONTENT_PROPERTY, method(BackendUtils.class, "getResponseMediaType"))
        .setProperty(Constants.VERBOSE_MODE_HEADER, header(Constants.VERBOSE_MODE_HEADER))
        .process(this::processAnalysisRequest)
        .setProperty(DEPENDENCY_TREE_PROPERTY, simple("${body.tree}"))
        .to(direct("findVulnerabilities"))
        .to(direct("findRemediations"))
        .to(direct("recommendTrustedContent"))
        .transform().method(BackendUtils.class, "removeEmptyDependencies")
        .to(direct("report"))
        .process(this::cleanUpHeaders);

    from(direct("findVulnerabilities"))
        .routeId("findVulnerabilities")
        .recipientList(method(vulnerabilityProvider, "getProviderEndpoints"))
        .aggregationStrategy(AggregationStrategies.beanAllowNull(ProviderAggregationStrategy.class, "aggregate"))
            .parallelProcessing();

    from(direct("validateToken"))
        .routeId("validateToken")
        .choice()
            .when(header(Constants.SNYK_TOKEN_HEADER).isNotNull())
                .to(direct("snykValidateToken"))
            .when(header(Constants.OSS_INDEX_TOKEN_HEADER).isNotNull())
                .to(direct("ossValidateCredentials"))
            .otherwise()
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(Response.Status.BAD_REQUEST.getStatusCode()))
                .setBody(constant("Missing authentication header"))
        .end()
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
        .process(this::cleanUpHeaders);
    //fmt:on
  }

  @SuppressWarnings("unchecked")
  private void processAnalysisRequest(Exchange exchange) {
    exchange.getIn().removeHeader(Constants.ACCEPT_HEADER);
    exchange.getIn().removeHeader(Constants.ACCEPT_ENCODING_HEADER);

    ContentType ct;
    try {
      ct = new ContentType(exchange.getIn().getHeader(Exchange.CONTENT_TYPE, String.class));
    } catch (ParseException e) {
      throw new ClientErrorException(Response.Status.UNSUPPORTED_MEDIA_TYPE, e);
    }
    SbomParser parser = SbomParserFactory.newInstance(ct.getBaseType());
    DependencyTree tree = parser.parse(exchange.getIn().getBody(InputStream.class));
    List<String> providers = exchange.getProperty(PROVIDERS_PARAM, List.class);
    exchange.getIn().setBody(new GraphRequest.Builder(providers).tree(tree).build());
  }

  private void cleanUpHeaders(Exchange exchange) {
    Message msg = exchange.getIn();
    msg.removeHeader(Constants.VERBOSE_MODE_HEADER);
    msg.removeHeaders("ex-.*-user");
    msg.removeHeaders("ex-.*-token");
    msg.removeHeader("Authorization");
  }
}
