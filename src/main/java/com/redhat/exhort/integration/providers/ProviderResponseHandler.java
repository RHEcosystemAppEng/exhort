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
import com.redhat.exhort.api.ProviderResponse;
import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.ProviderStatus;
import com.redhat.exhort.api.v4.ProviderSummary;
import com.redhat.exhort.api.v4.TransitiveDependencyReport;
import com.redhat.exhort.api.v4.VulnerabilitiesSummary;
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

  protected abstract Map<String, List<Issue>> responseToIssues(
      byte[] response, String privateProviders) throws IOException;

  public ProviderResponse emptyResponse(@ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree) {
    ProviderSummary summary =
        new ProviderSummary()
            .status(defaultOkStatus(getProviderName()))
            .sources(buildSummary(Collections.emptyMap(), tree));
    return new ProviderResponse(Collections.emptyList(), summary);
  }

  public ProviderResponse buildReport(
      @Body byte[] response,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) String privateProviders)
      throws IOException {
    Map<String, List<Issue>> issuesData = responseToIssues(response, privateProviders);
    List<DependencyReport> reports = new ArrayList<>();
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
                reports.add(directReport);
              }
            });
    ProviderSummary summary =
        new ProviderSummary()
            .status(defaultOkStatus(getProviderName()))
            .sources(buildSummary(issuesData, tree));
    reports.sort(Collections.reverseOrder(new DependencyScoreComparator()));
    return new ProviderResponse(reports, summary);
  }

  private Map<String, VulnerabilitiesSummary> buildSummary(
      Map<String, List<Issue>> issuesData, DependencyTree tree) {
    Map<String, VulnerabilityCounter> counters = new HashMap<>();
    Set<String> directRefs =
        tree.dependencies().keySet().stream().map(PackageRef::name).collect(Collectors.toSet());
    issuesData
        .entrySet()
        .forEach(
            e -> {
              incrementCounters(e.getValue(), counters, directRefs.contains(e.getKey()));
            });
    return counters.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().getSummary()));
  }

  private void incrementCounters(
      List<Issue> issues, Map<String, VulnerabilityCounter> counters, boolean isDirect) {
    issues.forEach(
        i -> {
          String origin = i.getSource().getOrigin();
          VulnerabilityCounter counter = counters.get(origin);
          if (counter == null) {
            counter = new VulnerabilityCounter();
            counters.put(origin, counter);
          }
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
          counter.dependencies.incrementAndGet();
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

    VulnerabilitiesSummary getSummary() {
      return new VulnerabilitiesSummary()
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
