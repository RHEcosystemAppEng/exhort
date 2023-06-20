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

package com.redhat.ecosystemappeng.crda.integration.snyk;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.http.base.HttpOperationFailedException;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.integration.VulnerabilityProvider;
import com.redhat.ecosystemappeng.crda.model.ProviderStatus;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class SnykIntegration extends EndpointRouteBuilder {

  @ConfigProperty(name = "api.snyk.timeout", defaultValue = "20s")
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
        .enrich(direct("snykRequest"), AggregationStrategies.bean(SnykAggregationStrategy.class, "aggregate"));

    from(direct("snykRequest"))
        .routeId("snykRequest")
        .transform().method(SnykRequestBuilder.class, "fromDiGraph")
        .process(this::processDepGraphRequest)
        .circuitBreaker()
          .faultToleranceConfiguration()
            .timeoutEnabled(true)
            .timeoutDuration(timeout)
          .end()
            .to(vertxHttp("{{api.snyk.host}}"))
        .onFallback()
          .process(this::processSnykResponseError);

    from(direct("validateSnykToken"))
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
          .process(this::processTokenFallBack);
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
  }

  private void processTokenRequest(Exchange exchange) {
    Message message = exchange.getMessage();
    processRequestHeaders(message);
    message.setHeader("Authorization", "token " + message.getHeader(Constants.SNYK_TOKEN_HEADER));
    message.setHeader(Exchange.HTTP_PATH, Constants.SNYK_TOKEN_API_PATH);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.GET);
  }

  private void processRequestHeaders(Message message) {
    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeader("Accept-Encoding");
  }

  private void processTokenFallBack(Exchange exchange) {
    Exception exception = (Exception) exchange.getProperty(Exchange.EXCEPTION_CAUGHT);
    Throwable cause = exception.getCause();
    String body;
    int code = Response.Status.INTERNAL_SERVER_ERROR.getStatusCode();

    if (cause instanceof HttpOperationFailedException) {
      HttpOperationFailedException httpException = (HttpOperationFailedException) cause;
      code = httpException.getStatusCode();
      if (code == Response.Status.UNAUTHORIZED.getStatusCode()) {
        body = "Invalid token provided. Unauthorized";
      } else {
        body = "Unable to validate Snyk Token: " + httpException.getStatusText();
      }
    } else {
      body = "Unable to validate Snyk Token: " + cause.getMessage();
    }
    exchange.getMessage().setHeader(Exchange.HTTP_RESPONSE_CODE, code);
    exchange.getMessage().setBody(body);
  }

  private void processSnykResponseError(Exchange exchange) {
    ProviderStatus.Builder builder =
        ProviderStatus.builder().ok(false).provider(Constants.SNYK_PROVIDER);
    Exception exception = (Exception) exchange.getProperty(Exchange.EXCEPTION_CAUGHT);
    Throwable cause = exception.getCause();

    if (cause != null) {
      if (cause instanceof HttpOperationFailedException) {
        HttpOperationFailedException httpException = (HttpOperationFailedException) cause;
        builder.message(httpException.getMessage()).status(httpException.getStatusCode());

      } else {
        builder
            .message(cause.getMessage())
            .status(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
      }
    } else {
      builder
          .message(exception.getMessage())
          .status(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
    }
    exchange.getMessage().setBody(builder.build());
  }
}
