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

package com.redhat.exhort.integration.providers;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.camel.builder.ExchangeBuilder;
import org.apache.camel.health.HealthCheckResultBuilder;
import org.apache.camel.impl.health.AbstractHealthCheck;

import com.redhat.exhort.api.v4.ProviderStatus;
import com.redhat.exhort.integration.Constants;

public class ProviderHealthCheck extends AbstractHealthCheck {

  private static final List<String> allProvidersHealthChecks =
      List.of("direct:snykHealthCheck", "direct:osvNvdHealthCheck", "direct:ossIndexHealthCheck");
  public static final String PROVIDER_HTTP_STATUS_CODE_KEY = "StatusCode";
  public static final String PROVIDER_IS_ENABLED_KEY = "isEnabled";
  public static final String PROVIDER_RESPONSE_BODY_KEY = "responseBody";

  public ProviderHealthCheck() {
    super("External Providers Readiness Check");
  }

  @Override
  protected void doCall(HealthCheckResultBuilder builder, Map<String, Object> options) {
    var response =
        getCamelContext()
            .createProducerTemplate()
            .send(
                "direct:exhortHealthCheck",
                ExchangeBuilder.anExchange(getCamelContext())
                    .withHeader(
                        Constants.HEALTH_CHECKS_LIST_HEADER_NAME, this.allProvidersHealthChecks)
                    .build());

    List<Map<String, ProviderStatus>> httpResponseBodiesAndStatuses =
        (List<Map<String, ProviderStatus>>) response.getMessage().getBody();
    Map<String, Object> providers =
        httpResponseBodiesAndStatuses.stream()
            .map(Map::entrySet)
            .flatMap(Collection::stream)
            .collect(
                Collectors.toMap(
                    entry -> entry.getKey(), entry -> formatProviderStatus(entry), (a, b) -> a));
    builder.details(providers);

    if (httpResponseBodiesAndStatuses.stream()
        .map(Map::values)
        .flatMap(Collection::stream)
        .anyMatch(providerDetails -> providerDetails.getCode() < 400 && providerDetails.getOk())) {
      builder.up();

    } else {
      builder.down();
    }
  }

  private static String formatProviderStatus(Map.Entry<String, ProviderStatus> entry) {
    ProviderStatus provider = entry.getValue();
    if (Objects.nonNull(provider.getCode())) {
      return String.format(
          "providerName=%s, isEnabled=%s, statusCode=%s, message=%s",
          provider.getName(), provider.getOk(), provider.getCode(), provider.getMessage());
    } else {
      return String.format(
          "providerName=%s, isEnabled=%s, message=%s",
          provider.getName(), provider.getOk(), provider.getMessage());
    }
  }

  @Override
  public boolean isLiveness() {
    return false;
  }
}
