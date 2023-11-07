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

package com.redhat.exhort.integration.providers.trustification;

import static com.redhat.exhort.integration.Constants.TRUSTIFICATION_ANALYZE_API_PATH;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class TrustificationIntegration extends EndpointRouteBuilder {

  @ConfigProperty(name = "api.trustification.timeout", defaultValue = "30s")
  String timeout;

  @Inject TrustificationResponseHandler responseHandler;

  @Override
  public void configure() {

    // fmt:off
    from(direct("trustificationAnalysis"))
        .routeId("trustificationAnalysis")
          .circuitBreaker()
          .faultToleranceConfiguration()
            .timeoutEnabled(true)
            .timeoutDuration(timeout)
          .end()
        .to(direct("trustificationRequest"))
        .onFallback()
          .process(responseHandler::processResponseError);

    from(direct("trustificationRequest"))
        .routeId("trustificationRequest")
        .transform().method(TrustificationRequestBuilder.class, "build")
        .process(this::processRequest)
        .to(vertxHttp("{{api.trustification.host}}"))
        .transform().method(TrustificationResponseHandler.class, "responseToIssues")
        .transform().method(TrustificationResponseHandler.class, "buildReport");
    // fmt:on
  }

  private void processRequest(Exchange exchange) {
    Message message = exchange.getMessage();

    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeader("Accept-Encoding");

    message.setHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON);
    message.setHeader(Exchange.HTTP_PATH, TRUSTIFICATION_ANALYZE_API_PATH);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.POST);
  }
}
