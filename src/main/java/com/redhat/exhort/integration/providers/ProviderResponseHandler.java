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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.ProviderReport;
import com.redhat.exhort.api.v4.ProviderStatus;
import com.redhat.exhort.api.v4.Source;
import com.redhat.exhort.api.v4.SourceSummary;
import com.redhat.exhort.api.v4.TransitiveDependencyReport;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.CvssScoreComparable.DependencyScoreComparator;
import com.redhat.exhort.model.CvssScoreComparable.TransitiveScoreComparator;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.ws.rs.core.Response;

@RegisterForReflection
public abstract class ProviderResponseHandler {

  protected abstract String getProviderName();

  protected ProviderStatus defaultOkStatus(String provider) {
    return new ProviderStatus()
        .name(provider)
        .ok(Boolean.TRUE)
        .message(Response.Status.OK.getReasonPhrase())
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

  public abstract Map<String, List<Issue>> responseToIssues(
      byte[] response, String privateProviders) throws IOException;

  public ProviderReport emptyResponse(
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree) {
    return new ProviderReport()
        .status(defaultOkStatus(getProviderName()))
        .sources(Collections.emptyMap());
  }

  private Map<String, Map<String, List<Issue>>> splitIssuesBySource(
      Map<String, List<Issue>> issuesData) {
    Map<String, Map<String, List<Issue>>> sourcesIssues = new HashMap<>();
    if (issuesData == null) {
      return sourcesIssues;
    }
    issuesData
        .entrySet()
        .forEach(
            e -> {
              e.getValue()
                  .forEach(
                      i -> {
                        Map<String, List<Issue>> issues = sourcesIssues.get(i.getSource());
                        if (issues == null) {
                          issues = new HashMap<>();
                          sourcesIssues.put(i.getSource(), issues);
                        }
                        List<Issue> depIssues = issues.get(e.getKey());
                        if (depIssues == null) {
                          depIssues = new ArrayList<>();
                          issues.put(e.getKey(), depIssues);
                        }
                        depIssues.add(i);
                      });
            });
    return sourcesIssues;
  }

  public ProviderReport buildReport(
      @Body Map<String, List<Issue>> issuesData,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) String privateProviders)
      throws IOException {
    Map<String, Map<String, List<Issue>>> sourcesIssues = splitIssuesBySource(issuesData);
    Map<String, Source> reports = new HashMap<>();
    sourcesIssues
        .keySet()
        .forEach(
            k -> {
              reports.put(k, buildReportForSource(sourcesIssues.get(k), tree, privateProviders));
            });
    return new ProviderReport().status(defaultOkStatus(getProviderName())).sources(reports);
  }

  public Source buildReportForSource(
      Map<String, List<Issue>> issuesData, DependencyTree tree, String privateProviders) {
    List<DependencyReport> sourceReport = new ArrayList<>();
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
                      .filter(d -> !d.getIssues().isEmpty())
                      .collect(Collectors.toList());
              transitiveReports.sort(Collections.reverseOrder(new TransitiveScoreComparator()));
              directReport.setTransitive(transitiveReports);
              if (directReport.getHighestVulnerability() != null) {
                sourceReport.add(directReport);
              }
            });

    sourceReport.sort(Collections.reverseOrder(new DependencyScoreComparator()));
    return new Source().summary(buildSummary(issuesData, tree)).dependencies(sourceReport);
  }

  private SourceSummary buildSummary(Map<String, List<Issue>> issuesData, DependencyTree tree) {
    VulnerabilityCounter counter = new VulnerabilityCounter();
    Set<String> directRefs =
        tree.dependencies().keySet().stream().map(PackageRef::name).collect(Collectors.toSet());
    issuesData
        .entrySet()
        .forEach(
            e -> {
              incrementCounter(e.getValue(), counter, directRefs.contains(e.getKey()));
            });
    return counter.getSummary();
  }

  private void incrementCounter(
      List<Issue> issues, VulnerabilityCounter counter, boolean isDirect) {
    if(!issues.isEmpty()) {
counter.dependencies.incrementAndGet();
    }
    issues.forEach(
        i -> {
          int vulnerabilities = countVulnerabilities(i);
          switch (i.getSeverity()) {
            case CRITICAL:
              counter.critical.addAndGet(vulnerabilities);
              break;
            case HIGH:
              counter.high.addAndGet(vulnerabilities);
              break;
            case MEDIUM:
              counter.medium.addAndGet(vulnerabilities);
              break;
            case LOW:
              counter.low.addAndGet(vulnerabilities);
              break;
          }
          counter.total.addAndGet(vulnerabilities);
          if (isDirect) {
            counter.direct.addAndGet(vulnerabilities);
          }
          if (i.getRemediation() != null
              && i.getRemediation().getTrustedContent() != null
              && i.getRemediation().getTrustedContent().getMavenPackage() != null) {
            counter.remediations.incrementAndGet();
          }
        });
  }

  // The number of vulnerabilities is the total count of public CVEs
  // or if it is private it will be 1
  private int countVulnerabilities(Issue i) {
    if (i.getCves() != null && !i.getCves().isEmpty()) {
      return i.getCves().size();
    }
    if (i.getUnique() != null && i.getUnique()) {
      return 1;
    }
    return 0;
  }

  private static final record VulnerabilityCounter(
      AtomicInteger total,
      AtomicInteger critical,
      AtomicInteger high,
      AtomicInteger medium,
      AtomicInteger low,
      AtomicInteger direct,
      AtomicInteger dependencies,
      AtomicInteger remediations) {

    VulnerabilityCounter() {
      this(
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger());
    }

    SourceSummary getSummary() {
      return new SourceSummary()
          .total(total.get())
          .critical(critical.get())
          .high(high.get())
          .medium(medium.get())
          .low(low.get())
          .direct(direct.get())
          .transitive(total.get() - direct.get())
          .dependencies(dependencies.get())
          .remediations(remediations.get())
          // TODO: Calculate recommendations
          .recommendations(0);
    }
  }
}
