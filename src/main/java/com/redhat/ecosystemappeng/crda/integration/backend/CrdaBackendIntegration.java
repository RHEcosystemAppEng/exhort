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

import static com.redhat.ecosystemappeng.crda.integration.Constants.PKG_MANAGER_HEADER;
import static com.redhat.ecosystemappeng.crda.integration.Constants.PROVIDER_HEADER;
import static com.redhat.ecosystemappeng.crda.integration.Constants.REQUEST_CONTENT_PROPERTY;
import static org.apache.camel.support.builder.PredicateBuilder.not;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.jackson.ListJacksonDataFormat;
import org.apache.camel.model.rest.RestBindingMode;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.integration.GraphUtils;
import com.redhat.ecosystemappeng.crda.integration.ProviderAggregationStrategy;
import com.redhat.ecosystemappeng.crda.integration.VulnerabilityProvider;
import com.redhat.ecosystemappeng.crda.integration.report.ReportTemplate;
import com.redhat.ecosystemappeng.crda.integration.report.ReportTransformer;
import com.redhat.ecosystemappeng.crda.integration.snyk.SnykVulnerabilityAggregationStrategy;
import com.redhat.ecosystemappeng.crda.model.ComponentRequest;
import com.redhat.ecosystemappeng.crda.model.DependencyReport;

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
            .post("/component-analysis")
                .consumes(MediaType.APPLICATION_JSON).bindingMode(RestBindingMode.json)
                .type(ComponentRequest.class)
                .to("direct:componentAnalysis")
            .post("/dependency-analysis/{pkgManager}/{provider}")
                .consumes(Constants.TEXT_VND_GRAPHVIZ)
                .to("direct:depAnalysis")
            .post("/dependency-analysis")
                .consumes(Constants.TEXT_VND_GRAPHVIZ)
                .to("direct:fullDepAnalysis");

        from(direct("componentAnalysis"))
                .bean(GraphUtils.class, "fromPackages")
                .to(direct("doAnalysis"))
                .removeHeaders("*")
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
                .unmarshal().json();

        from(direct("depAnalysis"))
                .choice().when(header(PROVIDER_HEADER).isNull())
                    .setProperty(PROVIDER_HEADER, method(vulnerabilityProvider, "get"))
                .end()
                .bean(GraphUtils.class, "fromDotFile")
                .to(direct("doAnalysis"))
                .to(direct("report"));

        from(direct("fullDepAnalysis"))
            .setProperty(REQUEST_CONTENT_PROPERTY, header("Accept"))
            .setHeader(PKG_MANAGER_HEADER, constant(Constants.MAVEN_PKG_MANAGER))    
            .choice().when(not(exchangeProperty(REQUEST_CONTENT_PROPERTY)
                    .in(MediaType.APPLICATION_JSON, MediaType.TEXT_HTML)))
                .throwException(new ClientErrorException( "Supported response media types are: " 
                    + MediaType.APPLICATION_JSON + ", " 
                    + MediaType.TEXT_HTML, 415))
            .end()
            .multicast(AggregationStrategies.bean(ProviderAggregationStrategy.class, "aggregate"))
            .parallelProcessing()
                .to(vulnerabilityProvider.getEndpoints())
            .end();

        from(direct("report"))
            .bean(ReportTransformer.class, "transform")
            .choice()
                .when(exchangeProperty(REQUEST_CONTENT_PROPERTY).isEqualTo(MediaType.TEXT_HTML))
                    .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_HTML))
                    .setBody(method(ReportTemplate.class))
                    .to(freemarker("report.ftl"))
                .otherwise()
                    .marshal(new ListJacksonDataFormat(DependencyReport.class))
            .end();

        from(direct("doAnalysis"))
                .to(direct("findVulnerabilities"))
                .to(direct("recommendTrustedContent"));

        from(direct("findVulnerabilities"))
            .choice()
                .when(simple("${body.provider()} =~ ${type:com.redhat.ecosystemappeng.crda.integration.Constants.SNYK_PROVIDER}"))
                    .enrich(direct("snykDepGraph"), AggregationStrategies.bean(SnykVulnerabilityAggregationStrategy.class, "aggregate"))
                .when(simple("${body.provider()} =~ ${type:com.redhat.ecosystemappeng.crda.integration.Constants.TIDELIFT_PROVIDER}"))
                    .to(direct("tideliftReleases"))
            .end();

    }

}