package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;

import com.redhat.ecosystemappeng.snyk.GraphBuilder;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentAggregationStrategy;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentBodyMapper;
import com.redhat.ecosystemappeng.utils.MavenDependenciesLoader;

public class Route extends RouteBuilder{

    @Override
    public void configure() {
        restConfiguration().contextPath("/api/v2");
        
        rest("/component-analyses")
            .consumes(MediaType.APPLICATION_JSON)
            .post()
            .to("direct:componentAnalysis");

        rest("/graph-analysis")
            .consumes(MediaType.TEXT_PLAIN)
            .post()
            .to("direct:graphAnalysis");

        from("direct:componentAnalysis")
            .multicast(new TrustedContentAggregationStrategy()).stopOnException()
            .to("http:{{api.crda.host}}?bridgeEndpoint=true", "direct:trustedContent")
            .end();

        from("direct:trustedContent")
            .choice()
            .when().jq(".ecosystem == \"maven\"")
                .removeHeaders("*")
                .setHeader(Exchange.HTTP_PATH, constant("/api/policy/v1alpha1/trusted::gav"))
                .setHeader(Exchange.HTTP_QUERY, constant("minimal=true"))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
                .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
                .setBody(method(TrustedContentBodyMapper.class))
                .to("http:{{api.trustedContent.host}}")
            .otherwise()
                .setBody(constant(""))
            .endChoice();

        from("direct:graphAnalysis")
            .setBody(method(MavenDependenciesLoader.class))
            .setBody(method(GraphBuilder.class, "fromMavenDependencies"))
            .removeHeaders("*")
            .setHeader(Exchange.HTTP_PATH, constant("/api/v1/test/dep-graph"))
            .setHeader(Exchange.HTTP_QUERY, constant("org={{api.snyk.org}}"))
            .setHeader(Exchange.HTTP_METHOD, constant("POST"))
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
            .setHeader("Authorization", simple("token {{api.snyk.token}}"))
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
            .to("https:{{api.snyk.host}}");
    }
    
}