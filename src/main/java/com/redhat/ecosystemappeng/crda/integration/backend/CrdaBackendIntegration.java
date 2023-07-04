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

package com.redhat.ecosystemappeng.crda.integration.backend;

import static com.redhat.ecosystemappeng.crda.integration.Constants.REQUEST_CONTENT_PROPERTY;

import org.apache.camel.Exchange;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.jackson.ListJacksonDataFormat;
import org.apache.camel.component.micrometer.MicrometerConstants;
import org.apache.camel.component.micrometer.routepolicy.MicrometerRoutePolicyFactory;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.integration.GraphUtils;
import com.redhat.ecosystemappeng.crda.integration.ProviderAggregationStrategy;
import com.redhat.ecosystemappeng.crda.integration.VulnerabilityProvider;
import com.redhat.ecosystemappeng.crda.model.ComponentRequest;

import io.micrometer.core.instrument.MeterRegistry;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class CrdaBackendIntegration extends EndpointRouteBuilder {

  private final MeterRegistry registry;

  @Inject VulnerabilityProvider vulnerabilityProvider;

  CrdaBackendIntegration(MeterRegistry registry) {
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
        .routeId("onCrdaIllegalArgumentException")
        .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(422))
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
        .handled(true)
        .setBody().simple("${exception.message}");

    onException(ClientErrorException.class)
        .routeId("onCrdaClientErrorException")
        .setHeader(Exchange.HTTP_RESPONSE_CODE, simple("${exception.getResponse().getStatus()}"))
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
        .handled(true)
        .setBody().simple("${exception.message}");

    rest()
        .post("/component-analysis/{pkgManager}")
            .routeId("restComponentAnalysis")
            .consumes(MediaType.APPLICATION_JSON)
            .to("direct:componentAnalysis")
        .post("/dependency-analysis/{pkgManager}")
            .routeId("restDependencyAnalysis")
            .to("direct:fullDepAnalysis")
        .get("/token")
            .routeId("restTokenValidation")
            .to("direct:validateToken");

    from(direct("componentAnalysis"))
        .routeId("componentAnalysis")
        .unmarshal(new ListJacksonDataFormat(ComponentRequest.class))
        .setProperty(Constants.PROVIDERS_PARAM, method(vulnerabilityProvider, "getProvidersFromQueryParam"))
        .setBody().method(GraphUtils.class, "fromPackages")
        .to(direct("findVulnerabilities"))
        .to(direct("recommendAllTrustedContent"))
        .to(direct("jsonReport"))
        .to(direct("cleanUpResponse"));


    from(direct("fullDepAnalysis"))
        .routeId("fullDependencyAnalysis")
        .setProperty(Constants.PROVIDERS_PARAM, method(vulnerabilityProvider, "getProvidersFromQueryParam"))
        .setProperty(REQUEST_CONTENT_PROPERTY, method(BackendUtils.class, "getResponseMediaType"))
        .removeHeader(Constants.ACCEPT_HEADER)
        .removeHeader(Constants.ACCEPT_ENCODING_HEADER)
        .bean(GraphUtils.class, "fromDepGraph")
        .to(direct("findVulnerabilities"))
        .to(direct("recommendVexContent"))
        .to(direct("report"))
        .to(direct("cleanUpResponse"));

    from(direct("findVulnerabilities"))
        .routeId("findVulnerabilities")
        .recipientList(method(vulnerabilityProvider, "getProviderEndpoints"))
        .aggregationStrategy(AggregationStrategies.bean(ProviderAggregationStrategy.class, "aggregate"))
            .parallelProcessing();

    from(direct("cleanUpResponse"))
        .routeId("cleanUpResponseHeaders")
        .removeHeader(Constants.PKG_MANAGER_HEADER)
        .removeHeader(Constants.VERBOSE_MODE_HEADER);

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
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN));
    //fmt:on
  }
}
