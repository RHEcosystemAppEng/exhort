package com.redhat.ecosystemappeng.routes;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestParamType;

import com.redhat.ecosystemappeng.snyk.GraphBuilder;
import com.redhat.ecosystemappeng.snyk.PackagePathConverter;
import com.redhat.ecosystemappeng.trustedcontent.TrustedContentBodyMapper;
import com.redhat.ecosystemappeng.utils.MavenDependenciesLoader;

public class RouteV3 extends RouteBuilder{

    @Override
    public void configure() {

        rest("/api/v3/")
            .get("/component-analyses/{ecosystem}/{package}/{version}")
                .param().name("ecosystem").type(RestParamType.path).endParam()
                .param().name("package").type(RestParamType.path).endParam()
                .param().name("version").type(RestParamType.path).endParam()
                .to("direct:componentAnalysis")
            .post("/component-analyses").to("direct:componentsAnalyses")
            .post("/graph-analysis").to("direct:graphAnalysis");

        from("direct:componentAnalysis")
            .to("direct:snykTest")
            // .multicast(new TrustedContentAggregationStrategy()).stopOnException()
            // .to("direct:snykTest", "direct:trustedContent")
;

        from("direct:componentsAnalyses")
            .setBody().method(GraphBuilder.class, "depsToFlatGraph")
            .to("direct:snykDepGraph")
            // .multicast(new TrustedContentAggregationStrategy()).stopOnException()
            // .to("direct:snykTest", "direct:trustedContent")
;

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
                .to("vertx-http:{{api.trustedContent.host}}")
            .otherwise()
                .setBody(constant(""))
            .endChoice();

        from("direct:graphAnalysis")
        .transform().method(MavenDependenciesLoader.class)
            .transform().method(GraphBuilder.class, "fromMavenDependencies")
            .to("direct:snykDepGraph");

        from("direct:snykDepGraph")
            .removeHeaders("*")
            .setHeader(Exchange.HTTP_PATH, constant("/api/v1/test/dep-graph"))
            .setHeader(Exchange.HTTP_QUERY, constant("org={{api.snyk.org}}"))
            .setHeader(Exchange.HTTP_METHOD, constant("POST"))
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
            .setHeader("Authorization", simple("token {{api.snyk.token}}"))
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
            .to("vertx-http:{{api.snyk.host}}");

        from("direct:snykTest")
            .setHeader("pkgPath", method(PackagePathConverter.class))
            .setHeader(Exchange.HTTP_PATH, simple("/test/${header.ecosystem}/${header.pkgPath}/${header.version}"))
            .setHeader(Exchange.HTTP_QUERY, constant("org={{api.snyk.org}}"))
            .setHeader(Exchange.HTTP_METHOD, constant("GET"))
            .setHeader("Authorization", simple("token {{api.snyk.token}}"))
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
            .setHeader(Exchange.HTTP_URI, simple("{{api.snyk.host}}/api/v1"))
            .to("vertx-http:snyk"); 
    }
    
}