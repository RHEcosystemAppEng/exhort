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

package com.redhat.exhort.integration.providers.snyk;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.backend.BackendUtils;
import com.redhat.exhort.integration.providers.VulnerabilityProvider;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class SnykIntegration extends EndpointRouteBuilder {

  @ConfigProperty(name = "api.snyk.timeout", defaultValue = "10s")
  String timeout;

  @ConfigProperty(name = "api.snyk.token")
  String defaultToken;

  @Inject VulnerabilityProvider vulnerabilityProvider;

  @Override
  public void configure() {

    // fmt:off
    from(direct("snykDepGraph"))
        .routeId("snykDepGraph")
        .process(this::setAuthToken)
                .circuitBreaker()
          .faultToleranceConfiguration()
            .timeoutEnabled(true)
            .timeoutDuration(timeout)
          .end()
        .to(direct("snykRequest"))
        .onFallback()
          .process(e -> BackendUtils.processResponseError(e, Constants.SNYK_PROVIDER));

    from(direct("snykRequest"))
        .routeId("snykRequest")
        .transform().method(SnykRequestBuilder.class, "fromDiGraph")
        .process(this::processDepGraphRequest)
        .to(vertxHttp("{{api.snyk.host}}"))
        .transform().method(SnykAggregator.class, "transformResponse")
        .transform().method(SnykAggregator.class, "buildReport")
      ;

    from(direct("snykValidateToken"))
        .routeId("snykValidateToken")
        .process(this::processTokenRequest)
        .circuitBreaker()
          .faultToleranceConfiguration()
            .timeoutEnabled(true)
            .timeoutDuration(timeout)
          .end()
          .to(vertxHttp("{{api.snyk.host}}"))
          .setBody(constant("Token validated successfully"))
        .onFallback()
          .process(e -> BackendUtils.processTokenFallBack(e, Constants.SNYK_PROVIDER));
    // fmt:on
  }

  private void setAuthToken(Exchange exchange) {
    Message message = exchange.getMessage();
    String token = message.getHeader(Constants.SNYK_TOKEN_HEADER, String.class);
    if (token == null) {
      token = defaultToken;
      vulnerabilityProvider.addProviderPrivateData(exchange, Constants.SNYK_PROVIDER);
    }
    message.setHeader("Authorization", "token " + token);
  }

  private void processDepGraphRequest(Exchange exchange) {
    Message message = exchange.getMessage();
    processRequestHeaders(message);
    message.setHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON);
    message.setHeader(Exchange.HTTP_PATH, Constants.SNYK_DEP_GRAPH_API_PATH);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.POST);
    message.removeHeader(Constants.PROVIDERS_PARAM);
  }

  private void processTokenRequest(Exchange exchange) {
    Message message = exchange.getMessage();
    message.setHeader("Authorization", "token " + message.getHeader(Constants.SNYK_TOKEN_HEADER));
    processRequestHeaders(message);
    message.setHeader(Exchange.HTTP_PATH, Constants.SNYK_TOKEN_API_PATH);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.GET);
  }

  private void processRequestHeaders(Message message) {
    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeader(Constants.SNYK_TOKEN_HEADER);
    message.removeHeader("Accept-Encoding");
  }
}
