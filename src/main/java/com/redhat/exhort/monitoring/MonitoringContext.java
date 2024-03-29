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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public record MonitoringContext(
    List<String> breadcrumbs,
    String userId,
    Map<String, String> metadata,
    Map<String, String> tags) {

  public MonitoringContext {
    if (breadcrumbs == null) {
      breadcrumbs = new ArrayList<>();
    }
    if (metadata == null) {
      metadata = new HashMap<>();
    }
    if (tags == null) {
      tags = new HashMap<>();
    }
  }

  public static MonitoringContext copyOf(MonitoringContext context) {

    return new MonitoringContext(
        new ArrayList<>(context.breadcrumbs),
        context.userId,
        new HashMap<String, String>(context.metadata),
        new HashMap<String, String>(context.tags));
  }
}
