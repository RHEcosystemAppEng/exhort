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

import static com.redhat.exhort.integration.providers.ProviderHealthCheck.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.processor.aggregate.AbstractListAggregationStrategy;

import com.redhat.exhort.integration.Constants;

import jakarta.ws.rs.core.Response;

public class ProvidersBodyPlusResponseCodeAggregationStrategy
    extends AbstractListAggregationStrategy<Map<String, Map<String, String>>> {
  @Override
  public Map<String, Map<String, String>> getValue(Exchange exchange) {
    Map<String, Map<String, String>> result = new HashMap<>();
    Map<String, String> providerValues = new HashMap<>();
    providerValues.put(
        PROVIDER_RESPONSE_BODY_KEY, getHttpResponseBodyFromMessage(exchange.getMessage()));
    if (!exchange.getProperty(Constants.EXCLUDE_FROM_READINESS_CHECK, Boolean.class)) {
      providerValues.put(
          PROVIDER_HTTP_STATUS_CODE_KEY, getHttpResponseStatusFromMessage(exchange.getMessage()));
    }
    List<String> enabledProviders = exchange.getProperty(Constants.PROVIDERS_PARAM, List.class);

    if (enabledProviders.contains(exchange.getProperty(Constants.PROVIDER_NAME, String.class))) {
      providerValues.put(PROVIDER_IS_ENABLED_KEY, "true");
    } else {
      providerValues.put(PROVIDER_IS_ENABLED_KEY, "false");
    }
    result.put(exchange.getProperty(Constants.PROVIDER_NAME, String.class), providerValues);
    return result;
  }

  private static String getHttpResponseStatusFromMessage(Message message) {
    if (message.getHeader(Exchange.HTTP_RESPONSE_CODE) instanceof Integer) {
      return message.getHeader(Exchange.HTTP_RESPONSE_CODE).toString();
    } else {
      return String.valueOf(
          message.getHeader(Exchange.HTTP_RESPONSE_CODE, Response.Status.class).getStatusCode());
    }
  }

  private static String getHttpResponseBodyFromMessage(Message message) {
    if (Objects.nonNull(message.getHeader(Exchange.HTTP_RESPONSE_TEXT, String.class))) {
      return message.getHeader(Exchange.HTTP_RESPONSE_TEXT, String.class);
    } else {
      return Objects.requireNonNull(
          message.getHeader(Exchange.HTTP_RESPONSE_CODE, String.class),
          message.getBody(String.class));
    }
  }
}
