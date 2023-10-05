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

import java.util.Collections;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.apache.camel.Header;
import org.apache.camel.attachment.AttachmentMessage;

import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.activation.DataHandler;
import jakarta.ws.rs.core.MediaType;

@RegisterForReflection
public class ReportTransformer {

  public AnalysisReport filterVerboseResult(
      @Body AnalysisReport report, @Header(Constants.VERBOSE_MODE_HEADER) Boolean verbose) {
    if (Boolean.FALSE.equals(verbose)) {
      return new AnalysisReport()
          .summary(report.getSummary())
          .dependencies(Collections.emptyList());
    }
    return report;
  }

  public void attachHtmlReport(Exchange exchange) {
    exchange
        .getIn(AttachmentMessage.class)
        .addAttachment(
            "report.html",
            new DataHandler(exchange.getIn().getBody(String.class), MediaType.TEXT_HTML));
  }
}
