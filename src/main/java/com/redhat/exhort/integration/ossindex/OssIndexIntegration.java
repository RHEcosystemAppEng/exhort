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

package com.redhat.exhort.integration.ossindex;

import java.util.Base64;
import java.util.List;
import java.util.Objects;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.VulnerabilityProvider;
import com.redhat.exhort.integration.backend.BackendUtils;
import com.redhat.exhort.model.DependencyTree;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class OssIndexIntegration extends EndpointRouteBuilder {

  @ConfigProperty(name = "api.ossindex.timeout", defaultValue = "1000s")
  String timeout;

  @Inject VulnerabilityProvider vulnerabilityProvider;

  @Override
  public void configure() {
    // fmt:off
    from(direct("ossIndexScan"))
        .routeId("ossIndexScan")
        .enrich(direct("ossIndexRequest"), AggregationStrategies.bean(OssIndexAggregationStrategy.class, "aggregate"));

    from(direct("ossIndexRequest"))
        .routeId("ossIndexRequest")
        .circuitBreaker()
          .faultToleranceConfiguration()
            .timeoutEnabled(true)
            .timeoutDuration(timeout)
          .end()
          .to(direct("ossSplitReq"))
        .onFallback()
          .process(e -> BackendUtils.processResponseError(e, Constants.OSS_INDEX_PROVIDER));

    from(direct("ossSplitReq"))
        .routeId("ossSplitReq")
        .transform(method(OssIndexAggregationStrategy.class, "split"))
        .split(body(), AggregationStrategies.bean(OssIndexAggregationStrategy.class, "aggregateSplit"))
          .parallelProcessing()
          .transform().method(OssIndexRequestBuilder.class, "buildRequest")
          .process(this::processComponentRequest)
          .to(vertxHttp("{{api.ossindex.host}}"))
          .transform(method(OssIndexRequestBuilder.class, "responseToIssues"));
    
    from(direct("ossValidateCredentials"))
      .routeId("ossValidateCredentials")
      .circuitBreaker()
        .faultToleranceConfiguration()
            .timeoutEnabled(true)
            .timeoutDuration(timeout)
          .end()
        .setBody(constant(List.of(DependencyTree.getDefaultRoot(Constants.MAVEN_PKG_MANAGER))))
        .transform().method(OssIndexRequestBuilder.class, "buildRequest")
        .process(this::processComponentRequest)  
        .to(vertxHttp("{{api.ossindex.host}}"))
        .setBody(constant("Token validated successfully"))
      .onFallback()
        .process(e -> BackendUtils.processTokenFallBack(e, Constants.OSS_INDEX_PROVIDER));
    // fmt:on
  }

  private void processComponentRequest(Exchange exchange) {
    Message message = exchange.getMessage();
    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeader("Accept-Encoding");
    message.setHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.POST);

    String username = message.getHeader(Constants.OSS_INDEX_USER_HEADER, String.class);
    String token = message.getHeader(Constants.OSS_INDEX_TOKEN_HEADER, String.class);
    if (Objects.nonNull(username) && Objects.nonNull(token)) {
      message.setHeader(Exchange.HTTP_PATH, Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH);
      StringBuilder auth = new StringBuilder().append(username).append(":").append(token);
      message.setHeader(
          "Authorization",
          "Basic " + Base64.getEncoder().encodeToString(auth.toString().getBytes()));
    } else {
      throw new ClientErrorException(401);
    }
    message.removeHeader(Constants.OSS_INDEX_USER_HEADER);
    message.removeHeader(Constants.OSS_INDEX_TOKEN_HEADER);
  }
}
