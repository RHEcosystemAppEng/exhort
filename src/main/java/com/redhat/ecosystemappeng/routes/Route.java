package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;

import com.redhat.ecosystemappeng.trustedcontent.TrustedContentAggregationStrategy;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentBodyMapper;

public class Route extends RouteBuilder{

    @Override
    public void configure() {

        rest("/api/v2")
            .consumes(MediaType.APPLICATION_JSON)
            .post("/component-analyses")
        .to("direct:componentAnalysis");

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
    }
    
}