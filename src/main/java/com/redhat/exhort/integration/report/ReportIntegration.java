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

import java.io.FileOutputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.redhat.exhort.integration.Constants;

import io.quarkus.fs.util.ZipUtils;
import io.quarkus.qute.Location;
import io.quarkus.qute.Template;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class ReportIntegration extends EndpointRouteBuilder {

  @Inject ReportTemplate reportTemplate;

  @Location("data.js")
  Template dataJS;

  @Override
  public void configure() {
    // fmt:off
        from(direct("report"))
                .routeId("report")
                .to(direct("htmlReport"));
//                .choice()
//                    .when(exchangeProperty(Constants.REQUEST_CONTENT_PROPERTY).isEqualTo(MediaType.TEXT_HTML))
//                        .to(direct("htmlReport"))
//                        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_OCTET_STREAM))
//                    .when(exchangeProperty(Constants.REQUEST_CONTENT_PROPERTY).isEqualTo(Constants.MULTIPART_MIXED))
////                        .to(direct("htmlReport"))
//                        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_OCTET_STREAM))
//                    .otherwise()
//                        .to(direct("jsonReport"))
//                .end();

        from(direct("htmlReport"))
            .routeId("htmlReport")
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.TEXT_HTML))
            .bean(ReportTransformer.class, "transform")
            .setProperty(Constants.REPORT_PROPERTY, body())
            .setBody(method(reportTemplate, "setVariables"))
            .process(exchange -> {
                String reportOutputDirectory = "/tmp/crda"; // Just for a demo, this should be better handled
                Path reportOutputPath = Paths.get(reportOutputDirectory);

                final String uiZipFilename = "crda-report-ui.zip";
                Path uiZipPath = Paths.get(reportOutputDirectory, uiZipFilename);

                // Prepare report
                reportOutputPath.toFile().delete();
                Files.createDirectories(reportOutputPath);

                InputStream uiZipIS = ReportIntegration.class.getClassLoader().getResourceAsStream(uiZipFilename);
                Files.copy(uiZipIS, uiZipPath);

                // Unzip UI
                Path uiZipFile = reportOutputPath.resolve(uiZipFilename);
                ZipUtils.unzip(uiZipFile, reportOutputPath);

                // Generate data
                Object params = exchange.getIn().getBody();
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String json = ow.writeValueAsString(params);
                String data = dataJS.data("params", json).render();

                // Merge UI and Data
                Path outputDataJs = Paths.get(reportOutputDirectory, "data.js");
                outputDataJs.toFile().delete(); // Cleans prev data
                FileOutputStream outputStream = new FileOutputStream(outputDataJs.toFile());
                byte[] strToBytes = data.getBytes();
                outputStream.write(strToBytes);
                outputStream.close();

                // Zip final result
                uiZipPath.toFile().delete();

                Path reportOutputfile = reportOutputPath.resolve("report.zip");
                ZipUtils.zip(reportOutputPath, reportOutputfile);

                exchange.getIn().setBody(reportOutputfile.toFile());
            });

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
