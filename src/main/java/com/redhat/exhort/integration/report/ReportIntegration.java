/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.redhat.exhort.integration.report;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;

import com.redhat.exhort.integration.Constants;

import freemarker.template.Configuration;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class ReportIntegration extends EndpointRouteBuilder {

  @Inject ReportTemplate reportTemplate;
  @Inject Configuration configuration;

  @PostConstruct
  void updateFreemarkerConfig() {
    //   TODO: Enable when using reportV2.ftl
    //   This allows the use of freemarker syntax such as [#if] [#/if] and
    //   [=provider.getSummary().getVulnerabilities().getTotal()] in the ui source code, if needed
    configuration.setTagSyntax(Configuration.SQUARE_BRACKET_TAG_SYNTAX);
    configuration.setInterpolationSyntax(Configuration.SQUARE_BRACKET_INTERPOLATION_SYNTAX);
  }

  @Override
  public void configure() {
    // fmt:off
        from(direct("report"))
            .routeId("report")
            .choice()
                .when(exchangeProperty(Constants.REQUEST_CONTENT_PROPERTY).isEqualTo(MediaType.TEXT_HTML))
                    .to(direct("htmlReport"))
                .when(exchangeProperty(Constants.REQUEST_CONTENT_PROPERTY).isEqualTo(Constants.MULTIPART_MIXED))
                    .to(direct("multipartReport"))
                .otherwise()
                    .to(direct("jsonReport"))
            .end();

        from(direct("htmlReport"))
            .routeId("htmlReport")
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_HTML))
            .bean(ReportTransformer.class, "transform")
            .setProperty(Constants.REPORT_PROPERTY, body())
            .setBody(method(reportTemplate, "setVariables"))
            // TODO: Change to reportV2.ftl to use the patternfly-react enabled report
            .to(freemarker("reportV2.ftl"));

        from(direct("multipartReport"))
            .routeId("multipartReport")
            .to(direct("htmlReport"))
            .bean(ReportTransformer.class, "attachHtmlReport")
            .setBody(exchangeProperty(Constants.REPORT_PROPERTY))
            .bean(ReportTransformer.class, "filterVerboseResult")
            .marshal().json()
            .marshal().mimeMultipart(false, false, true)
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_HTML));

        from(direct("jsonReport"))
            .routeId("jsonReport")
            .bean(ReportTransformer.class, "transform")
            .bean(ReportTransformer.class, "filterVerboseResult")
            .marshal().json();
        //fmt:on
  }
}
