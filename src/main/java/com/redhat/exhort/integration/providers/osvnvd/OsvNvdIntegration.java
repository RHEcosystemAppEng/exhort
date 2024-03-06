/*
 * Copyright 2024 Red Hat, Inc. and/or its affiliates
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

package com.redhat.exhort.integration.providers.osvnvd;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.VulnerabilityProvider;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class OsvNvdIntegration extends EndpointRouteBuilder {

  @ConfigProperty(name = "api.osvnvd.timeout", defaultValue = "10s")
  String timeout;

  @Inject VulnerabilityProvider vulnerabilityProvider;
  @Inject OsvNvdResponseHandler responseHandler;

  @Override
  public void configure() throws Exception {
    // fmt:off
    from(direct("osvNvdScan"))
      .routeId("osvNvdScan")
      .circuitBreaker()
        .faultToleranceConfiguration()
          .timeoutEnabled(true)
          .timeoutDuration(timeout)
        .end()
        .transform(method(OsvNvdRequestBuilder.class, "buildRequest"))
        .to(direct("osvNvdRequest"))
      .onFallback()
        .process(responseHandler::processResponseError)
      .end()
      .transform().method(responseHandler, "buildReport");

    from(direct("osvNvdRequest"))
      .routeId("osvNvdRequest")
      .process(this::processRequest)
      .to(vertxHttp("{{api.osvnvd.host}}"))
      .transform().method(responseHandler, "responseToIssues");

    from(direct("osvNvdHealthCheck"))
      .routeId("osvNvdHealthCheck")
      .setProperty(Constants.PROVIDER_NAME, constant(Constants.OSV_NVD_PROVIDER))
      .choice()
         .when(method(vulnerabilityProvider, "getEnabled").contains(Constants.OSV_NVD_PROVIDER))
            .to(direct("osvNvdHealthCheckEndpoint"))
         .otherwise()
            .to(direct("healthCheckProviderDisabled"));

    from(direct("osvNvdHealthCheckEndpoint"))
      .routeId("osvNvdHealthCheckEndpoint")
      .process(this::processHealthRequest)
      .circuitBreaker()
         .faultToleranceConfiguration()
            .timeoutEnabled(true)
            .timeoutDuration(timeout)
         .end()
         .to(vertxHttp("{{api.osvnvd.management.host}}"))
         .setHeader(Exchange.HTTP_RESPONSE_TEXT,constant("Service is up and running"))
         .setBody(constant("Service is up and running"))
      .onFallback()
         .setBody(constant(Constants.OSV_NVD_PROVIDER + "Service is down"))
         .setHeader(Exchange.HTTP_RESPONSE_CODE,constant(Response.Status.SERVICE_UNAVAILABLE))
      .end();
    // fmt:on
  }

  private void processRequest(Exchange exchange) {
    var message = exchange.getMessage();
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeader(Constants.ACCEPT_ENCODING_HEADER);
    message.setHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON);
    message.setHeader(Exchange.HTTP_PATH, Constants.OSV_NVD_PURLS_PATH);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.POST);
  }

  private void processHealthRequest(Exchange exchange) {
    var message = exchange.getMessage();
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeader(Constants.ACCEPT_ENCODING_HEADER);
    message.removeHeader(Exchange.CONTENT_TYPE);
    message.setHeader(Exchange.HTTP_PATH, Constants.OSV_NVD_HEALTH_PATH);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.GET);
  }
}
