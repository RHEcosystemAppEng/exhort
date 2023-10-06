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

package com.redhat.exhort.integration.providers;

import java.util.ArrayList;
import java.util.List;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.redhat.exhort.api.ProviderResponse;
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.api.v4.DependenciesSummary;
import com.redhat.exhort.api.v4.Summary;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ProviderAggregationStrategy {

  public List<ProviderResponse> aggregate(
      List<ProviderResponse> aggregated, ProviderResponse response) {
    if (aggregated == null) {
      return List.of(response);
    }
    List<ProviderResponse> result = new ArrayList<>(aggregated);
    result.add(response);
    return result;
  }

  public AnalysisReport toReport(
      @Body List<ProviderResponse> responses,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree) {
    Summary summary = new Summary();
    responses.forEach(
        r -> summary.putProvidersItem(r.summary().getStatus().getName(), r.summary()));
    DependenciesSummary depsSummary = new DependenciesSummary();
    depsSummary
        .direct(tree.directCount())
        .transitive(tree.transitiveCount())
        .total(depsSummary.getDirect() + depsSummary.getTransitive());
    summary.dependencies(depsSummary);
    return new AnalysisReport()
        .dependencies(
            responses.stream().map(ProviderResponse::reports).flatMap(List::stream).toList())
        .summary(summary);
  }
}
