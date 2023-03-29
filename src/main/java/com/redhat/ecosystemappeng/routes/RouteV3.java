package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.apache.camel.model.rest.RestParamType;

import com.fasterxml.jackson.databind.JsonNode;
import com.redhat.ecosystemappeng.model.ComponentRequest;
import com.redhat.ecosystemappeng.snyk.GraphBuilder;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentBodyMapper;
import com.redhat.ecosystemappeng.utils.GraphUtils;

public class RouteV3 extends EndpointRouteBuilder {

    private static final String TEXT_VND_GRAPHVIZ = "text/vnd.graphviz";

    @Override
    public void configure() {

        restConfiguration().clientRequestValidation(true);

        onException(IllegalArgumentException.class)
            .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(422))
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_PLAIN))
            .handled(true)
            .setBody().simple("${exception.message}");

        rest("/api/v3/")
            .post("/component-analysis")
                .consumes(MediaType.APPLICATION_JSON).bindingMode(RestBindingMode.json)
                .type(ComponentRequest.class)
                .param()
                    .name("pkgManager")
                    .type(RestParamType.body)
                    .required(true)
                    .endParam()
                .param()
                    .name("provider")
                    .type(RestParamType.body)
                    .required(true)
                    .endParam()
                .to("direct:componentAnalysis")
            .post("/dependency-analysis/{pkgManager}/{provider}")
                .param()
                    .name("pkgManager")
                    .type(RestParamType.path)
                    .required(true)
                    .endParam()
                .param()
                    .name("provider")
                    .type(RestParamType.path)
                    .required(true)
                    .endParam()
                .consumes(TEXT_VND_GRAPHVIZ)
                .to("direct:depAnalysis");

        from(direct("componentAnalysis"))
                .transform().method(GraphUtils.class, "fromPackages")
                .to(direct("doAnalysis"))
                .unmarshal().json();

        from(direct("depAnalysis"))
                .transform().method(GraphUtils.class, "fromDotFile(${body}, ${header.pkgManager}, ${header.provider})")
                .to("log:foo?showHeaders=true")
                .to(direct("doAnalysis"));

        from(direct("doAnalysis"))
                .choice()
                    .when(simple("${body.provider()} =~ ${type:com.redhat.ecosystemappeng.utils.Constants.SNYK_PROVIDER}"))
                        .to(direct("snykDepGraph"))
                    .when(simple("${body.provider()} =~ ${type:com.redhat.ecosystemappeng.utils.Constants.REDHAT_PROVIDER}"))
                        .to(direct("trustedContent"))
                .end();

        from(direct("trustedContent"))
                .transform().method(TrustedContentBodyMapper.class)
                .removeHeaders("*")
                .setHeader(Exchange.HTTP_PATH, constant("/api/policy/v1alpha1/trusted::gav"))
                .setHeader(Exchange.HTTP_QUERY, constant("minimal=true"))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
                .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
                .to(vertxHttp("{{api.trustedContent.host}}"));

        from(direct("snykRequest"))
                .removeHeader(Exchange.HTTP_PATH)
                .removeHeader(Exchange.HTTP_QUERY)
                .removeHeader(Exchange.HTTP_URI)
                .removeHeader("Accept-Encoding")
                .setHeader("Authorization", simple("token {{api.snyk.token}}"))
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
                .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
                .setHeader(Exchange.HTTP_QUERY, constant("org={{api.snyk.org}}"));

        from(direct("snykDepGraph"))
                .transform().method(GraphBuilder.class, "fromDiGraph")
                .to(direct("snykRequest"))
                .setHeader(Exchange.HTTP_PATH, constant("/test/dep-graph"))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .to(vertxHttp("{{api.snyk.host}}/api/v1"));
        
    }

}