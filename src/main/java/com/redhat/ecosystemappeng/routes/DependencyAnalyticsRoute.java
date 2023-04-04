package com.redhat.ecosystemappeng.routes;

import static com.redhat.ecosystemappeng.routes.integration.Constants.PKG_MANAGER_HEADER;
import static com.redhat.ecosystemappeng.routes.integration.Constants.PROVIDER_HEADER;
import static com.redhat.ecosystemappeng.routes.integration.Constants.REQUEST_CONTENT_PROPERTY;
import static org.apache.camel.support.builder.PredicateBuilder.not;

import javax.ws.rs.ClientErrorException;
import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import com.redhat.ecosystemappeng.model.ComponentRequest;
import com.redhat.ecosystemappeng.routes.integration.Constants;
import com.redhat.ecosystemappeng.routes.integration.ExchangeUtils;
import com.redhat.ecosystemappeng.routes.integration.GraphUtils;
import com.redhat.ecosystemappeng.routes.integration.ProviderAggregationStrategy;
import com.redhat.ecosystemappeng.routes.integration.ReportTemplate;
import com.redhat.ecosystemappeng.snyk.SnykRequestBuilder;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentBodyMapper;

public class DependencyAnalyticsRoute extends EndpointRouteBuilder {

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
                .id("componentAnalysis")
                .consumes(MediaType.APPLICATION_JSON).bindingMode(RestBindingMode.json)
                .type(ComponentRequest.class)
                .to("direct:componentAnalysis")
            .post("/dependency-analysis/{pkgManager}/{provider}")
                .consumes(Constants.TEXT_VND_GRAPHVIZ)
                .to("direct:depAnalysis")
            .post("/dependency-analysis")
                .id("fullDependencyAnalysis")
                .consumes(Constants.TEXT_VND_GRAPHVIZ)
                .to("direct:fullDepAnalysis");

        from(direct("componentAnalysis"))
                .transform().method(GraphUtils.class, "fromPackages")
                .to(direct("doAnalysis"))
                .removeHeader("*")
                .unmarshal().json();

        from(direct("depAnalysis"))
                .choice().when(header(PROVIDER_HEADER).isNull())
                    .setHeader(PROVIDER_HEADER, method(ExchangeUtils.class, "extractProvider"))
                .end()
                .transform().method(GraphUtils.class, "fromDotFile")
                .to(direct("doAnalysis"));

        from(direct("fullDepAnalysis"))
            .to("log:foo?showHeaders=true")
            .setProperty(REQUEST_CONTENT_PROPERTY, header("Accept"))
            .setHeader(PKG_MANAGER_HEADER, constant(Constants.MAVEN_PKG_MANAGER))    
            .choice().when(not(exchangeProperty(REQUEST_CONTENT_PROPERTY)
                    .in(MediaType.APPLICATION_JSON, MediaType.TEXT_HTML)))
                .throwException(new ClientErrorException( "Supported response media types are: " 
                    + MediaType.APPLICATION_JSON + ", " 
                    + MediaType.TEXT_HTML, 415))
            .end()
            .multicast(new ProviderAggregationStrategy()).parallelProcessing()
                .to(ExchangeUtils.getRecipientsForProvider())
            .end()
            .choice()
                .when(exchangeProperty(REQUEST_CONTENT_PROPERTY).isEqualTo(MediaType.TEXT_HTML))
                    .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_HTML))
                    .setBody(method(ReportTemplate.class))
                    .to(freemarker("report.ftl"))
                .when(exchangeProperty(REQUEST_CONTENT_PROPERTY).isEqualTo(MediaType.APPLICATION_JSON))
                    .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
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
                .setHeader("Accept", constant(MediaType.APPLICATION_JSON));

        from(direct("snykDepGraph"))
                .transform().method(SnykRequestBuilder.class, "fromDiGraph")
                .to(direct("snykRequest"))
                .setHeader(Exchange.HTTP_PATH, constant("/test/dep-graph"))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .to(vertxHttp("{{api.snyk.host}}/api/v1"));

    }

}