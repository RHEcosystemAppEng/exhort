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

package com.redhat.exhort.integration.trustedcontent;

import java.util.*;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.exhort.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
@RegisterForReflection
public class TrustedContentIntegration extends EndpointRouteBuilder {

  @ConfigProperty(name = "api.trustedcontent.timeout", defaultValue = "5s")
  String timeout;

  @Inject TcResponseHandler responseHandler;

  @Override
  public void configure() {

    from(direct("recommendationsTrustedContent"))
        .transform()
        .method(TrustedContentRequestBuilder.class, "extractPurlsFromDependencyTree")
        .process(this::handleHeaders)
        .to(direct("tcRequest"))
        .transform()
        .method(TcResponseHandler.class, "responseToMap");

    from(direct("tcRequest"))
        .marshal()
        .json()
        .setHeader(Exchange.HTTP_PATH, constant(Constants.TRUSTED_CONTENT_PATH))
        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethod.POST))
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
        .circuitBreaker()
        .faultToleranceConfiguration()
        .timeoutEnabled(true)
        .timeoutDuration(timeout)
        .end()
        .to(vertxHttp("{{api.trustedcontent.host}}"))
        .endCircuitBreaker()
        .onFallback()
        .process(responseHandler::processResponseError)
        .setBody(constant(Map.of("recommendations", Map.of())))
        .end();
  }

  private void handleHeaders(Exchange exchange) {
    var message = exchange.getMessage();
    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeaders("*-token");
    message.removeHeader("Accept-Encoding");
  }
}
