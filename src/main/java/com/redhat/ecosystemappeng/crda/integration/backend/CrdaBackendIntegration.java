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

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.integration.GraphUtils;
import com.redhat.ecosystemappeng.crda.integration.ProviderAggregationStrategy;
import com.redhat.ecosystemappeng.crda.integration.VulnerabilityProvider;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class CrdaBackendIntegration extends EndpointRouteBuilder {

    @Inject
    VulnerabilityProvider vulnerabilityProvider;

    @Override
    public void configure() {

        restConfiguration().contextPath("/api/v3/")
            .clientRequestValidation(true);

        onException(IllegalArgumentException.class)
            .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(422))
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
            .handled(true)
            .setBody().simple("${exception.message}");

        onException(ClientErrorException.class)
            .setHeader(Exchange.HTTP_RESPONSE_CODE, simple("${exception.getResponse().getStatus()}"))
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
            .handled(true)
            .setBody().simple("${exception.message}");

        rest()
            .post("/component-analysis/{pkgManager}")
                .consumes(MediaType.APPLICATION_JSON)
                .to("direct:componentAnalysis")
            .post("/dependency-analysis/{pkgManager}")
                .consumes(Constants.TEXT_VND_GRAPHVIZ)
                .to("direct:fullDepAnalysis");

        from(direct("componentAnalysis"))
                .unmarshal(new ListJacksonDataFormat(PackageRef.class))
                .setProperty(Constants.PROVIDERS_PARAM, method(vulnerabilityProvider, "getProvidersFromQueryParam"))
                .setBody().method(GraphUtils.class, "fromPackages")
                .to(direct("findVulnerabilities"))
                .to(direct("recommendAllTrustedContent"))
                .to(direct("report"));


        from(direct("fullDepAnalysis"))
            .setProperty(Constants.PROVIDERS_PARAM, method(vulnerabilityProvider, "getProvidersFromQueryParam"))
            .setProperty(REQUEST_CONTENT_PROPERTY, method(BackendUtils.class, "getResponseMediaType"))
            .removeHeader(Constants.ACCEPT_HEADER)
            .removeHeader(Constants.ACCEPT_ENCODING_HEADER)
            .bean(GraphUtils.class, "fromDotFile")
            .to(direct("findVulnerabilities"))
            .to(direct("recommendVexContent"))
            .to(direct("report"));

        from(direct("findVulnerabilities"))
            .multicast(AggregationStrategies.bean(ProviderAggregationStrategy.class, "aggregate"))
                .parallelProcessing()
                    .recipientList(method(vulnerabilityProvider, "getProviderEndpoints"))
                .end()
            .end();   
    }

}