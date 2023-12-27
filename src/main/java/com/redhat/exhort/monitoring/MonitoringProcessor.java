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

package com.redhat.exhort.monitoring;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.camel.Exchange;

import com.redhat.exhort.integration.Constants;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MonitoringProcessor {

  private static final String MONITORING_CONTEXT = "monitoringContext";
  private static final String ERROR_TYPE_TAG = "error_type";
  private static final String SERVER_ERROR_TYPE = "server";
  private static final String CLIENT_ERROR_TYPE = "client";
  private static final String PROVIDER_ERROR_TYPE = "provider";
  private static final String PROVIDER_TAG = "provider";

  private static final String[] LOGGED_REQUEST_HEADERS = {
    Exchange.CONTENT_TYPE,
    Constants.ACCEPT_HEADER,
    Constants.USER_AGENT_HEADER,
    Constants.RHDA_SOURCE_HEADER,
    Constants.RHDA_OPERATION_TYPE_HEADER
  };

  private static final String[] LOGGED_PROPERTIES = {
    Exchange.FAILURE_ENDPOINT, Exchange.FAILURE_ROUTE_ID, Constants.EXHORT_REQUEST_ID_PROPERTY
  };

  @Inject MonitoringClient client;

  public void processOriginalRequest(Exchange exchange) {
    var metadata =
        Stream.of(LOGGED_REQUEST_HEADERS)
            .filter(e -> exchange.getIn().getHeaders().containsKey(e))
            .collect(Collectors.toMap(h -> h, h -> exchange.getIn().getHeader(h, String.class)));
    var context = exchange.getProperty(MONITORING_CONTEXT, MonitoringContext.class);
    metadata.put(
        Constants.EXHORT_REQUEST_ID_PROPERTY,
        exchange.getProperty(Constants.EXHORT_REQUEST_ID_PROPERTY, String.class));
    if (context == null) {
      context =
          new MonitoringContext(
              null,
              exchange.getIn().getHeader(Constants.RHDA_TOKEN_HEADER, String.class),
              metadata,
              null);
    }
    context.breadcrumbs().add(exchange.getIn().getBody(String.class));
    exchange.setProperty(MONITORING_CONTEXT, context);
  }

  public void processProviderError(Exchange exchange, Exception exception, String providerName) {
    var context = exchange.getProperty(MONITORING_CONTEXT, MonitoringContext.class);
    if (context == null) {
      return;
    }
    var errorContext = MonitoringContext.copyOf(context);
    errorContext.breadcrumbs().add(exchange.getIn().getBody(String.class));
    errorContext.tags().put(PROVIDER_TAG, providerName);
    errorContext.tags().put(ERROR_TYPE_TAG, PROVIDER_ERROR_TYPE);
    Stream.of(LOGGED_PROPERTIES)
        .forEach(p -> errorContext.metadata().put(p, exchange.getProperty(p, String.class)));
    if (exception.getCause() != null) {
      client.reportException(exception.getCause(), errorContext);
    } else {
      client.reportException(exception, errorContext);
    }
  }

  public void processClientException(Exchange exchange) {
    processError(exchange, CLIENT_ERROR_TYPE);
  }

  public void processServerError(Exchange exchange) {
    processError(exchange, SERVER_ERROR_TYPE);
  }

  private void processError(Exchange exchange, String errorType) {
    MonitoringContext context = exchange.getProperty(MONITORING_CONTEXT, MonitoringContext.class);
    if (context == null) {
      return;
    }
    context.tags().put(ERROR_TYPE_TAG, errorType);
    Stream.of(LOGGED_PROPERTIES)
        .forEach(p -> context.metadata().put(p, exchange.getProperty(p, String.class)));

    var exception = exchange.getProperty(Exchange.EXCEPTION_CAUGHT, Exception.class);
    client.reportException(exception, context);
  }
}
