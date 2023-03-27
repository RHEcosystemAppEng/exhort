package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;

public class RouteV2 extends EndpointRouteBuilder {

    @Override
    public void configure() {

        rest("/api/v2/component-analyses")
            .post().consumes(MediaType.APPLICATION_JSON)
            .to("direct:crdaLegacy");

        rest("/api/v2/component-analyses/{ecosystem}/{package}/{version}")
            .get().to("direct:crdaLegacy");

        rest("/api/v2/stack-analyses")
            .post().consumes(MediaType.MULTIPART_FORM_DATA)
            .to("direct:stackReport");
        
        rest("/api/v2/stack-analyses")
            .get("/{reportId}").to("direct:crdaLegacy"); 

        from(direct("crdaLegacy"))
            .setHeader(Exchange.HTTP_URI, simple("{{api.crda.host}}"))
            .to(vertxHttp("crda?throwExceptionOnFailure=false&user_key={{api.crda.key}}"))
            .removeHeader("ecosystem")
            .removeHeader("package")
            .removeHeader("version")
            .removeHeader("user_key");

        from(direct("stackReport"))
            .to(direct("crdaLegacy"));
    }

}