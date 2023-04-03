package com.redhat.ecosystemappeng.routes;

import static com.redhat.ecosystemappeng.routes.integration.Constants.PKG_MANAGER_HEADER;
import static com.redhat.ecosystemappeng.routes.integration.Constants.PROVIDER_HEADER;
import static com.redhat.ecosystemappeng.routes.integration.Constants.REQUEST_CONTENT_PROPERTY;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.apache.camel.model.rest.RestParamType;
import com.redhat.ecosystemappeng.model.ComponentRequest;
import com.redhat.ecosystemappeng.routes.integration.Constants;
import com.redhat.ecosystemappeng.routes.integration.ExchangeUtils;
import com.redhat.ecosystemappeng.routes.integration.GraphUtils;
import com.redhat.ecosystemappeng.routes.integration.ProviderAggregationStrategy;
import com.redhat.ecosystemappeng.routes.integration.ReportTemplate;
import com.redhat.ecosystemappeng.snyk.SnykRequestBuilder;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentBodyMapper;

public class RouteV3 extends EndpointRouteBuilder {

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
                    .name(PKG_MANAGER_HEADER)
                    .type(RestParamType.body)
                    .required(true)
                    .endParam()
                .param()
                    .name(PROVIDER_HEADER)
                    .type(RestParamType.body)
                    .required(true)
                    .endParam()
                .to("direct:componentAnalysis")
            .post("/dependency-analysis/{pkgManager}/{provider}")
                .param()
                    .name(PKG_MANAGER_HEADER)
                    .type(RestParamType.path)
                    .required(true)
                    .endParam()
                .param()
                    .name(PROVIDER_HEADER)
                    .type(RestParamType.path)
                    .required(true)
                    .endParam()
                .consumes(Constants.TEXT_VND_GRAPHVIZ)
                .to("direct:depAnalysis")
            .post("/dependency-analysis")
                .consumes(Constants.TEXT_VND_GRAPHVIZ)
                .produces(MediaType.APPLICATION_JSON)
                .produces(MediaType.TEXT_HTML)
                .to("direct:fullDepAnalysis");

        from(direct("componentAnalysis"))
                .transform().method(GraphUtils.class, "fromPackages")
                .to(direct("doAnalysis"))
                .unmarshal().json();

        from(direct("depAnalysis"))
                .choice().when(header(PROVIDER_HEADER).isNull())
                    .setHeader(PROVIDER_HEADER, method(ExchangeUtils.class, "extractProvider"))
                .end()
                .transform().method(GraphUtils.class, "fromDotFile")
                .to(direct("doAnalysis"));

        from(direct("fullDepAnalysis"))
            .setProperty(REQUEST_CONTENT_PROPERTY, header("Accept"))
            .setHeader(PKG_MANAGER_HEADER, constant(Constants.MAVEN_PKG_MANAGER))
            .multicast(new ProviderAggregationStrategy()).parallelProcessing()
                .to(ExchangeUtils.getRecipientsForProvider())
            .end()
            .choice()
                .when(exchangeProperty(REQUEST_CONTENT_PROPERTY).isEqualTo(MediaType.TEXT_HTML))
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_HTML))
                .setBody(method(ReportTemplate.class))
                .to(freemarker("report.ftl?contentCache=false"))
            .end();

        from(direct("doAnalysis"))
                .choice()
                    .when(simple("${body.provider()} =~ ${type:com.redhat.ecosystemappeng.routes.integration.Constants.SNYK_PROVIDER}"))
                        .to(direct("snykDepGraph"))
                    .when(simple("${body.provider()} =~ ${type:com.redhat.ecosystemappeng.routes.integration.Constants.REDHAT_PROVIDER}"))
                        .to(direct("trustedContent"))
                .end();

        from(direct("trustedContent"))
                .transform().method(TrustedContentBodyMapper.class)
                .removeHeader(Exchange.HTTP_PATH)
                .removeHeader(Exchange.HTTP_QUERY)
                .removeHeader(Exchange.HTTP_URI)
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
                .transform().method(SnykRequestBuilder.class, "fromDiGraph")
                .to(direct("snykRequest"))
                .setHeader(Exchange.HTTP_PATH, constant("/test/dep-graph"))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .to(vertxHttp("{{api.snyk.host}}/api/v1"));
        
    }

}