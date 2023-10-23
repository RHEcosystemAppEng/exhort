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

package com.redhat.exhort.monitoring.impl;

import java.util.Map;

import com.redhat.exhort.monitoring.MonitoringClient;
import com.redhat.exhort.monitoring.MonitoringContext;

import io.quarkus.runtime.annotations.RegisterForReflection;
import io.sentry.SentryClient;
import io.sentry.event.BreadcrumbBuilder;
import io.sentry.event.UserBuilder;

@RegisterForReflection
public class SentryMonitoringClient implements MonitoringClient {

  private final SentryClient client;

  public SentryMonitoringClient(SentryClient client) {
    this.client = client;
  }

  @Override
  public void reportException(Throwable exception, MonitoringContext context) {
    if (!context.breadcrumbs().isEmpty()) {
      context
          .breadcrumbs()
          .forEach(
              b ->
                  this.client
                      .getContext()
                      .recordBreadcrumb(
                          new BreadcrumbBuilder().setMessage(b).setType(null).build()));
    }
    if (context.userId() != null) {
      this.client.getContext().setUser(new UserBuilder().setId(context.userId()).build());
    }
    addAdditionalData(context.metadata(), context.tags());
    this.client.sendException(exception);
  }

  private void addAdditionalData(Map<String, String> metadata, Map<String, String> tags) {
    if (metadata != null) {
      metadata.entrySet().stream()
          .filter(e -> e.getValue() != null)
          .forEach(e -> this.client.getContext().addExtra(e.getKey(), e.getValue()));
    }
    if (tags != null) {
      tags.entrySet().stream()
          .filter(e -> e.getValue() != null)
          .forEach(t -> this.client.getContext().addTag(t.getKey(), t.getValue()));
    }
  }
}
