package com.redhat.ecosystemappeng.crda.integration.report;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import com.redhat.ecosystemappeng.crda.integration.Constants;

@ApplicationScoped
public class ReportIntegration extends EndpointRouteBuilder {

    @Inject
    ReportTemplate reportTemplate;
    
    @Override
    public void configure() {

        from(direct("report"))
            .choice()
                .when(exchangeProperty(Constants.REQUEST_CONTENT_PROPERTY).isEqualTo(MediaType.TEXT_HTML))
                    .to(direct("htmlReport"))
                .when(exchangeProperty(Constants.REQUEST_CONTENT_PROPERTY).isEqualTo(Constants.MULTIPART_MIXED))
                    .to(direct("multipartReport"))
                .otherwise()
                    .to(direct("jsonReport"))
            .end()
            .removeHeader(Constants.PKG_MANAGER_HEADER);

        from(direct("htmlReport"))
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_HTML))
            .bean(ReportTransformer.class, "transform")
            .setProperty(Constants.REPORT_PROPERTY, body())
            .setBody(method(reportTemplate))
            .to(freemarker("report.ftl"));

        from(direct("multipartReport"))
            .to(direct("htmlReport"))
            .bean(ReportTransformer.class, "attachHtmlReport")
            .setBody(exchangeProperty(Constants.REPORT_PROPERTY))
            .marshal().json()
            .marshal().mimeMultipart(Constants.MULTIPART_MIXED_TYPE.getSubtype(), false, false, true);
        
        from(direct("jsonReport"))
            .bean(ReportTransformer.class, "transform")
            .marshal().json();
    }
}
