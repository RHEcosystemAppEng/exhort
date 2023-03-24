package com.redhat.ecosystemappeng.routes;

import org.apache.camel.builder.RouteBuilder;

public class RouteV2 extends RouteBuilder {

    @Override
    public void configure() {
        
        from("platform-http:/api/v2/*")
                .to("direct:crdaLegacy");
      
        from("direct:crdaLegacy")
                .to("http:{{api.crda.host}}?bridgeEndpoint=true");

    }

}