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

package com.redhat.exhort.integration;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.ProviderStatus;
import com.redhat.exhort.api.Remediation;
import com.redhat.exhort.model.GraphRequest;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ProviderAggregationStrategy {

  public GraphRequest aggregate(GraphRequest oldRequest, GraphRequest newRequest) {
    if (oldRequest == null) {
      return newRequest;
    }
    Map<String, List<Issue>> issues = new HashMap<>(oldRequest.issues());
    newRequest
        .issues()
        .entrySet()
        .forEach(
            e -> {
              List<Issue> newIssues = issues.get(e.getKey());
              if (newIssues == null) {
                newIssues = List.copyOf(e.getValue());
                issues.put(e.getKey(), newIssues);
              } else {
                newIssues.addAll(e.getValue());
              }
            });

    Map<String, Remediation> remediations = new HashMap<>(oldRequest.remediations());
    remediations.putAll(newRequest.remediations());

    Map<String, PackageRef> recommendations = new HashMap<>(oldRequest.recommendations());
    recommendations.putAll(newRequest.recommendations());

    Set<ProviderStatus> providerStatuses = new HashSet<>(oldRequest.providerStatuses());
    providerStatuses.addAll(newRequest.providerStatuses());

    return new GraphRequest.Builder(oldRequest)
        .issues(issues)
        .remediations(remediations)
        .recommendations(recommendations)
        .providerStatuses(List.copyOf(providerStatuses))
        .build();
  }
}
