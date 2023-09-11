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

package com.redhat.exhort.config.metrics;

import java.util.Collection;
import java.util.List;

import io.micrometer.core.instrument.Meter.Id;
import io.micrometer.core.instrument.config.MeterFilter;
import io.micrometer.core.instrument.distribution.DistributionStatisticConfig;

import jakarta.enterprise.inject.Produces;
import jakarta.inject.Singleton;

@Singleton
public class CustomMetrics {

  private static final Collection<String> HISTOGRAMS =
      List.of("http.server.connections", "camel.route.policy");

  @Produces
  @Singleton
  public MeterFilter enableHistogram() {
    return new MeterFilter() {
      @Override
      public DistributionStatisticConfig configure(Id id, DistributionStatisticConfig config) {
        if (HISTOGRAMS.contains(id.getName())) {
          return DistributionStatisticConfig.builder()
              .percentiles(0.7, 0.95, 0.99)
              .percentilesHistogram(Boolean.TRUE)
              .build()
              .merge(config);
        }
        return config;
      }
    };
  }
}
