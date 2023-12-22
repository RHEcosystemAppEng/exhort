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

import java.util.HashMap;
import java.util.Map;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.api.v4.ProviderReport;
import com.redhat.exhort.api.v4.Scanned;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.trustedcontent.TrustedContentResponse;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ProviderAggregationStrategy {

  public Map<String, ProviderReport> aggregate(
      Map<String, ProviderReport> aggregated, ProviderReport report) {
    if (aggregated == null) {
      aggregated = new HashMap<>();
    }
    aggregated.put(report.getStatus().getName(), report);
    return aggregated;
  }

  public AnalysisReport toReport(
      @Body Map<String, ProviderReport> reports,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree,
      @ExchangeProperty(Constants.TRUSTED_CONTENT_PROVIDER) TrustedContentResponse tcResponse) {

    reports.put(
        Constants.TRUSTED_CONTENT_PROVIDER, new ProviderReport().status(tcResponse.status()));
    var scanned = new Scanned().direct(tree.directCount()).transitive(tree.transitiveCount());
    scanned.total(scanned.getDirect() + scanned.getTransitive());
    return new AnalysisReport().providers(reports).scanned(scanned);
  }
}
