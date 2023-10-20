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

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.exhort.monitoring.impl.NoopMonitoringClient;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Produces;

public class MonitoringClientFactory {

  @ConfigProperty(name = "monitoring.enabled", defaultValue = "false")
  Boolean enabled;

  @Inject SentryMonitoringClientFactory sentryFactory;

  @Produces
  @Singleton
  public MonitoringClient newInstance() {
    if (enabled) {
      return sentryFactory.newInstance();
    }
    return new NoopMonitoringClient();
  }
}
