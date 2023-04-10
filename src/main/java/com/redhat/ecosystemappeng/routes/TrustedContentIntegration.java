package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;

import com.redhat.ecosystemappeng.routes.integration.Constants;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentBodyMapper;

public class TrustedContentIntegration extends EndpointRouteBuilder {

    @Override
    public void configure() throws Exception {
        from(direct("trustedContent"))
                .transform().method(TrustedContentBodyMapper.class)
                .removeHeader(Exchange.HTTP_PATH)
                .removeHeader(Exchange.HTTP_QUERY)
                .removeHeader(Exchange.HTTP_URI)
                .setHeader(Exchange.HTTP_PATH, constant(Constants.TRUSTED_CONTENT_PATH))
                .setHeader(Exchange.HTTP_QUERY, constant("minimal=true"))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
                .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
                .to(vertxHttp("{{api.trustedContent.host}}"));
    }
}
