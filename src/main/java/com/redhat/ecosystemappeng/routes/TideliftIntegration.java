package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.http.base.HttpOperationFailedException;
import org.apache.camel.processor.aggregate.GroupedBodyAggregationStrategy;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.ecosystemappeng.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.model.GraphRequest;
import com.redhat.ecosystemappeng.routes.integration.Constants;
import com.redhat.ecosystemappeng.tidelift.TideliftRequestBuilder;

public class TideliftIntegration extends EndpointRouteBuilder {
    
    @Override
    public void configure() throws Exception {

        ObjectNode emptyNode = ObjectMapperProducer.newInstance().createObjectNode();

        from(direct("tideliftReleases"))
            .to(direct("preTidelift"))
            .setHeader(Constants.PKG_MANAGER_HEADER, simple("${body.pkgManager()}"))
            .split().body(GraphRequest.class, g -> g.graph().vertexSet())
            .aggregationStrategy(new GroupedBodyAggregationStrategy())
            .parallelProcessing().timeout(5000L)
                .setHeader(Exchange.HTTP_PATH, method(TideliftRequestBuilder.class))
                .setBody().constant(null)
                .to(direct("tideliftRequest"))
                .unmarshal().json()
            .end()
            .marshal().json();
            
        from(direct("preTidelift"))
            .removeHeader(Exchange.HTTP_PATH)
            .removeHeader(Exchange.HTTP_QUERY)
            .removeHeader(Exchange.HTTP_URI)
            .setHeader(Exchange.HTTP_METHOD, constant("GET"))
            .removeHeader("Accept-Encoding")
            .choice().when(header(Constants.TIDELIFT_TOKEN_HEADER).isNotNull())
                .setHeader("Authorization", simple("Bearer ${header.crda-tidelift-token}"))
            .otherwise()
                .setHeader("Authorization", simple("Bearer {{api.tidelift.token}}"))
            .end()
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON));

        from(direct("tideliftRequest"))
        .doTry()
            .to(vertxHttp("{{api.tidelift.host}}"))
        .doCatch(HttpOperationFailedException.class)
            // Ignore not found packages and just add an empty object
            .onWhen(simple("${exception.getStatusCode()} == 404"))
                .setBody(constant(emptyNode)).marshal().json();
           

    }
}
