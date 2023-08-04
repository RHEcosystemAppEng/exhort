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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.redhat.exhort.api.AnalysisReportValue;
import com.redhat.exhort.api.DependenciesSummary;
import com.redhat.exhort.api.DependencyReport;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.ProviderStatus;
import com.redhat.exhort.api.Summary;
import com.redhat.exhort.api.TransitiveDependencyReport;
import com.redhat.exhort.api.VulnerabilitiesSummary;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.CvssScoreComparable.DependencyScoreComparator;
import com.redhat.exhort.model.CvssScoreComparable.TransitiveScoreComparator;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.ws.rs.core.Response;

@RegisterForReflection
public abstract class ProviderAggregator {

  protected abstract String getProviderName();

  protected ProviderStatus defaultOkStatus(String provider) {
    return new ProviderStatus()
        .name(provider)
        .ok(Boolean.TRUE)
        .message("OK")
        .code(Response.Status.OK.getStatusCode());
  }

  protected DependencyReport toDependencyReport(PackageRef ref, List<Issue> issues) {
    return new DependencyReport()
        .ref(ref)
        .issues(
            issues.stream()
                .sorted(Comparator.comparing(Issue::getCvssScore).reversed())
                .collect(Collectors.toList()));
  }

  public AnalysisReportValue buildReport(
      @Body Map<String, List<Issue>> issuesData,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree) {
    AnalysisReportValue report = new AnalysisReportValue();
    DependenciesSummary deps =
        new DependenciesSummary().scanned(tree.directCount()).transitive(tree.transitiveCount());
    VulnerabilityCounter counter = new VulnerabilityCounter();
    report.status(defaultOkStatus(getProviderName())).dependencies(new ArrayList<>());
    tree.dependencies().entrySet().stream()
        .forEach(
            e -> {
              String ref = e.getKey().name();
              List<Issue> issues = issuesData.get(ref);
              DependencyReport directReport = new DependencyReport().ref(e.getKey());
              if (issues == null) {
                issues = Collections.emptyList();
              }
              directReport.issues(
                  issues.stream()
                      .sorted(Comparator.comparing(Issue::getCvssScore).reversed())
                      .collect(Collectors.toList()));
              directReport.setHighestVulnerability(issues.stream().findFirst().orElse(null));
              directReport
                  .getIssues()
                  .forEach(
                      i -> {
                        incrementCounter(i, counter);
                        counter.direct.incrementAndGet();
                      });

              List<TransitiveDependencyReport> transitiveReports =
                  e.getValue().transitive().stream()
                      .map(
                          t -> {
                            List<Issue> transitiveIssues = Collections.emptyList();
                            String tRef = t.name();
                            if (issuesData.get(tRef) != null) {
                              transitiveIssues =
                                  issuesData.get(tRef).stream()
                                      .sorted(Comparator.comparing(Issue::getCvssScore).reversed())
                                      .collect(Collectors.toList());
                              transitiveIssues.forEach(i -> incrementCounter(i, counter));
                            }
                            Optional<Issue> highestTransitive =
                                transitiveIssues.stream().findFirst();
                            if (highestTransitive.isPresent()) {
                              if (directReport.getHighestVulnerability() == null
                                  || directReport.getHighestVulnerability().getCvssScore()
                                      < highestTransitive.get().getCvssScore()) {
                                directReport.setHighestVulnerability(highestTransitive.get());
                              }
                            }
                            return new TransitiveDependencyReport()
                                .ref(t)
                                .issues(transitiveIssues)
                                .highestVulnerability(highestTransitive.orElse(null));
                          })
                      .collect(Collectors.toList());
              transitiveReports.sort(new TransitiveScoreComparator());
              directReport.setTransitive(transitiveReports);
              report.addDependenciesItem(directReport);
            });
    report.dependencies(
        report.getDependencies().stream()
            .sorted(new DependencyScoreComparator())
            .collect(Collectors.toList()));
    return report.summary(new Summary().dependencies(deps).vulnerabilities(counter.getSummary()));
  }

  private void incrementCounter(Issue i, VulnerabilityCounter counter) {
    switch (i.getSeverity()) {
      case CRITICAL:
        counter.critical.incrementAndGet();
        break;
      case HIGH:
        counter.high.incrementAndGet();
        break;
      case MEDIUM:
        counter.medium.incrementAndGet();
        break;
      case LOW:
        counter.low.incrementAndGet();
        break;
    }
    counter.total.incrementAndGet();
  }

  private static final record VulnerabilityCounter(
      AtomicInteger total,
      AtomicInteger direct,
      AtomicInteger critical,
      AtomicInteger high,
      AtomicInteger medium,
      AtomicInteger low) {

    VulnerabilityCounter() {
      this(
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger());
    }

    VulnerabilitiesSummary getSummary() {
      return new VulnerabilitiesSummary()
          .total(total.get())
          .direct(direct.get())
          .critical(critical.get())
          .high(high.get())
          .medium(medium.get())
          .low(low.get());
    }
  }
}
