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

import org.apache.camel.builder.ExchangeBuilder;
import org.apache.camel.health.HealthCheckResultBuilder;
import org.apache.camel.impl.health.AbstractHealthCheck;

import com.redhat.exhort.integration.Constants;

public class ProviderHealthCheck extends AbstractHealthCheck {

  public ProviderHealthCheck() {
    super("External Providers Readiness Check");
    setEnabled(true);
  }

  @Override
  protected void doCall(HealthCheckResultBuilder builder, Map<String, Object> options) {
    var response =
        getCamelContext()
            .createProducerTemplate()
            .send(
                getHealthCheckRoute(),
                ExchangeBuilder.anExchange(getCamelContext())
                    .withHeader(
                        Constants.HEALTH_CHECKS_LIST_HEADER_NAME, getAllProvidersHealthChecks())
                    .build());

    List<Map<Integer, String>> httpResponseBodiesAndStatuses =
        (List<Map<Integer, String>>) response.getMessage().getBody();
    if (httpResponseBodiesAndStatuses.stream()
        .map(entry -> entry.keySet())
        .flatMap(Collection::stream)
        .anyMatch(status -> status < 400)) {
      builder.up();
    } else {
      builder.down();
    }
  }

  private List<String> getAllProvidersHealthChecks() {
    return List.of("direct:snykHealthCheck", "direct:osvNvdHealthCheck");
  }

  private String getHealthCheckRoute() {
    return "direct:exhortHealthCheck";
  }

  @Override
  public boolean isLiveness() {
    return false;
  }
}
