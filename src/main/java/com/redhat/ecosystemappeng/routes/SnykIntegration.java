package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;

import com.redhat.ecosystemappeng.routes.integration.Constants;
import com.redhat.ecosystemappeng.snyk.SnykRequestBuilder;

public class SnykIntegration  extends EndpointRouteBuilder {

    @Override
    public void configure() {

        from(direct("snykDepGraph"))
            .transform().method(SnykRequestBuilder.class, "fromDiGraph")
            .to(direct("snykRequest"))
            .setHeader(Exchange.HTTP_PATH, constant(Constants.SNYK_DEP_GRAPH_API_PATH))
            .setHeader(Exchange.HTTP_METHOD, constant("POST"))
            .to(vertxHttp("{{api.snyk.host}}"));
            
        from(direct("snykRequest"))
            .removeHeader(Exchange.HTTP_PATH)
            .removeHeader(Exchange.HTTP_QUERY)
            .removeHeader(Exchange.HTTP_URI)
            .removeHeader("Accept-Encoding")
            .choice().when(header(Constants.SNYK_TOKEN_HEADER).isNotNull())
                .setHeader("Authorization", simple("token ${header.crda-snyk-token}"))
            .otherwise()
                .setHeader("Authorization", simple("token {{api.snyk.token}}"))
            .end()
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON));

    }
    
}
