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

import java.util.Objects;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.processor.aggregate.AbstractListAggregationStrategy;

import com.redhat.exhort.api.v4.ProviderStatus;
import com.redhat.exhort.integration.Constants;

import jakarta.ws.rs.core.Response;

public class ProvidersBodyPlusResponseCodeAggregationStrategy
    extends AbstractListAggregationStrategy<ProviderStatus> {
  @Override
  public ProviderStatus getValue(Exchange exchange) {
    ProviderStatus providerValues = new ProviderStatus();
    providerValues.setMessage(getHttpResponseBodyFromMessage(exchange.getMessage()));
    Integer statusCode = Integer.valueOf(getHttpResponseStatusFromMessage(exchange.getMessage()));
    if (!serviceExcludedFromReadinessCheck(exchange)) {
      providerValues.setCode(statusCode);
    }
    providerValues.setOk(!serviceExcludedFromReadinessCheck(exchange));
    String providerName = exchange.getProperty(Constants.PROVIDER_NAME, String.class);
    providerValues.setName(providerName);

    return providerValues;
  }

  private static Boolean serviceExcludedFromReadinessCheck(Exchange exchange) {
    return Objects.requireNonNullElse(
        exchange.getProperty(Constants.EXCLUDE_FROM_READINESS_CHECK, Boolean.class), false);
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
      if (Objects.nonNull(message.getBody(String.class))
          && message.getBody(String.class) instanceof String) {
        return message.getBody(String.class);
      } else {
        return Objects.requireNonNull(
            message.getHeader(Exchange.HTTP_RESPONSE_CODE, String.class),
            message.getBody(String.class));
      }
    }
  }
}
