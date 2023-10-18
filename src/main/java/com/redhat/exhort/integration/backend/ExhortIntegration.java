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

import static com.redhat.exhort.integration.Constants.PROVIDERS_PARAM;
import static com.redhat.exhort.integration.Constants.REQUEST_CONTENT_PROPERTY;
import static com.redhat.exhort.integration.Constants.VERBOSE_MODE_HEADER;

import java.io.InputStream;
import java.util.Arrays;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.micrometer.MicrometerConstants;
import org.apache.camel.component.micrometer.routepolicy.MicrometerRoutePolicyFactory;

import com.redhat.exhort.analytics.AnalyticsService;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.VulnerabilityProvider;
import com.redhat.exhort.integration.backend.sbom.SbomParser;
import com.redhat.exhort.integration.backend.sbom.SbomParserFactory;
import com.redhat.exhort.integration.providers.ProviderAggregationStrategy;
import com.redhat.exhort.model.DependencyTree;

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

  @Inject AnalyticsService analytics;

  ExhortIntegration(MeterRegistry registry) {
    this.registry = registry;
  }

  @Override
  public void configure() {
    // fmt:off
    getContext().getRegistry().bind(MicrometerConstants.METRICS_REGISTRY_NAME, registry);
    getContext().addRoutePolicyFactory(new MicrometerRoutePolicyFactory());
    
    restConfiguration().contextPath("/api/")
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
        .post("/v3/analysis")
            .routeId("v3restAnalysis")
            .to("direct:v3analysis")
        .post("/v4/analysis")
            .routeId("restAnalysis")
            .to("direct:v4analysis")
        .get("/v3/token")
            .routeId("v3restTokenValidation")
            .to("direct:validateToken")
        .get("/v4/token")
            .routeId("restTokenValidation")
            .to("direct:validateToken");

    from(direct("v3analysis"))
      .routeId("v3Analysis")
      .setProperty(Constants.API_VERSION_PROPERTY, constant(Constants.API_VERSION_V3))
      .to(direct("analysis"));
    
    from(direct("v4analysis"))
      .routeId("v4Analysis")
      .setProperty(Constants.API_VERSION_PROPERTY, constant(Constants.API_VERSION_V4))
      .to(direct("analysis"));     

    from(direct("analysis"))
        .routeId("dependencyAnalysis")
        .to(seda("analyticsIdentify"))
        .setProperty(PROVIDERS_PARAM, method(vulnerabilityProvider, "getProvidersFromQueryParam"))
        .setProperty(REQUEST_CONTENT_PROPERTY, method(BackendUtils.class, "getResponseMediaType"))
        .setProperty(VERBOSE_MODE_HEADER, header(VERBOSE_MODE_HEADER))
        .process(this::processAnalysisRequest)
        .to(direct("findVulnerabilities"))
        .transform().method(ProviderAggregationStrategy.class, "toReport")
        .to(direct("report"))
        .to(seda("analyticsTrackAnalysis"))
        .process(this::cleanUpHeaders);

    from(direct("findVulnerabilities"))
        .routeId("findVulnerabilities")
        .recipientList(method(vulnerabilityProvider, "getProviderEndpoints"))
        .aggregationStrategy(AggregationStrategies.beanAllowNull(ProviderAggregationStrategy.class, "aggregate"))
            .parallelProcessing();

    from(direct("validateToken"))
        .routeId("validateToken")
        .to(seda("analyticsIdentify"))
        .choice()
            .when(header(Constants.SNYK_TOKEN_HEADER).isNotNull())
                .setProperty(PROVIDERS_PARAM, constant(Arrays.asList(Constants.SNYK_PROVIDER)))
                .to(direct("snykValidateToken"))
            .when(header(Constants.OSS_INDEX_TOKEN_HEADER).isNotNull())
            .setProperty(PROVIDERS_PARAM, constant(Arrays.asList(Constants.OSS_INDEX_PROVIDER)))
                .to(direct("ossValidateCredentials"))
            .otherwise()
                .setProperty(PROVIDERS_PARAM, constant(Arrays.asList(Constants.UNKNOWN_PROVIDER)))
                .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(Response.Status.BAD_REQUEST.getStatusCode()))
                .setBody(constant("Missing provider authentication headers"))
        .end()
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
        .to(seda("analyticsTrackToken"))
        .process(this::cleanUpHeaders);
    
    from(seda("analyticsIdentify"))
      .routeId("analyticsIdentify")
      .process(analytics::identify);

    from(seda("analyticsTrackToken"))
      .routeId("analyticsTrackToken")
      .process(analytics::trackToken);
    
    from(seda("analyticsTrackAnalysis"))
      .routeId("analyticsTrackAnalysis")
      .process(analytics::trackAnalysis);
    //fmt:on
  }

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
    exchange.setProperty(Constants.SBOM_TYPE_PARAM, ct.getBaseType());
    DependencyTree tree = parser.parse(exchange.getIn().getBody(InputStream.class));
    exchange.setProperty(Constants.DEPENDENCY_TREE_PROPERTY, tree);
    exchange.getIn().setBody(tree);
  }

  private void cleanUpHeaders(Exchange exchange) {
    Message msg = exchange.getIn();
    msg.removeHeader(VERBOSE_MODE_HEADER);
    msg.removeHeaders("ex-.*-user");
    msg.removeHeaders("ex-.*-token");
    msg.removeHeader("Authorization");
    msg.removeHeaders("rhda-.*");
  }
}
