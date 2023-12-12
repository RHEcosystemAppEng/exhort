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

package com.redhat.exhort.api.converter;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.redhat.exhort.api.v3.AnalysisReport;
import com.redhat.exhort.api.v3.CvssVector;
import com.redhat.exhort.api.v3.DependenciesSummary;
import com.redhat.exhort.api.v3.DependencyReport;
import com.redhat.exhort.api.v3.Issue;
import com.redhat.exhort.api.v3.ProviderStatus;
import com.redhat.exhort.api.v3.Remediation;
import com.redhat.exhort.api.v3.Severity;
import com.redhat.exhort.api.v3.Summary;
import com.redhat.exhort.api.v3.TransitiveDependencyReport;
import com.redhat.exhort.api.v3.VulnerabilitiesSummary;
import com.redhat.exhort.api.v4.ProviderReport;
import com.redhat.exhort.api.v4.Source;

public class AnalysisReportV3Converter {

  public static AnalysisReport convert(com.redhat.exhort.api.v4.AnalysisReport report) {
    var v3 = new AnalysisReport();
    v3.summary(getSummary(report));
    report.getProviders().values().stream()
        .map(ProviderReport::getSources)
        .map(Map::values)
        .flatMap(Collection::stream)
        .map(Source::getDependencies)
        .flatMap(List::stream)
        .forEach(d -> v3.addDependenciesItem(getReport(d)));
    return v3;
  }

  private static Summary getSummary(com.redhat.exhort.api.v4.AnalysisReport report) {
    var summary =
        new Summary()
            .dependencies(
                new DependenciesSummary()
                    .scanned(report.getScanned().getDirect())
                    .transitive(report.getScanned().getTransitive()));
    VulnerabilitiesSummary accVuln =
        new VulnerabilitiesSummary().critical(0).high(0).medium(0).low(0).direct(0).total(0);
    report.getProviders().values().stream()
        .forEach(
            p -> {
              var status = p.getStatus();
              summary.addProviderStatusesItem(
                  new ProviderStatus()
                      .ok(status.getOk())
                      .message(status.getMessage())
                      .provider(status.getName())
                      .status(status.getCode()));
              p.getSources().values().stream()
                  .map(Source::getSummary)
                  .forEach(
                      sourceSummary -> {
                        accVuln.critical(accVuln.getCritical() + sourceSummary.getCritical());
                        accVuln.high(accVuln.getHigh() + sourceSummary.getHigh());
                        accVuln.medium(accVuln.getMedium() + sourceSummary.getMedium());
                        accVuln.low(accVuln.getLow() + sourceSummary.getLow());
                        accVuln.direct(accVuln.getDirect() + sourceSummary.getDirect());
                        accVuln.total(accVuln.getTotal() + sourceSummary.getTotal());
                      });
            });
    return summary.vulnerabilities(accVuln);
  }

  private static DependencyReport getReport(com.redhat.exhort.api.v4.DependencyReport d) {
    List<Issue> issues = Collections.emptyList();
    if (d.getIssues() != null) {
      issues = d.getIssues().stream().map(AnalysisReportV3Converter::getIssue).toList();
    }
    var dep =
        new DependencyReport()
            .ref(d.getRef())
            .highestVulnerability(getIssue(d.getHighestVulnerability()))
            .recommendation(d.getRecommendation())
            .issues(issues)
            .remediations(getRemediations(d.getIssues()));
    d.getTransitive().forEach(t -> dep.addTransitiveItem(getTransitive(t)));
    return dep;
  }

  private static TransitiveDependencyReport getTransitive(
      com.redhat.exhort.api.v4.TransitiveDependencyReport t) {
    List<Issue> issues = Collections.emptyList();
    if (t.getIssues() != null) {
      issues = t.getIssues().stream().map(AnalysisReportV3Converter::getIssue).toList();
    }
    var transitive =
        new TransitiveDependencyReport()
            .ref(t.getRef())
            .issues(issues)
            .highestVulnerability(getIssue(t.getHighestVulnerability()))
            .remediations(getRemediations(t.getIssues()));
    return transitive;
  }

  private static Issue getIssue(com.redhat.exhort.api.v4.Issue i) {
    return new Issue()
        .cves(i.getCves())
        .id(i.getId())
        .source(i.getSource())
        .cvssScore(i.getCvssScore())
        .cvss(getCvss(i.getCvss()))
        .unique(i.getUnique())
        .title(i.getTitle())
        .severity(Severity.fromValue(i.getSeverity().getValue()));
  }

  private static Map<String, Remediation> getRemediations(
      List<com.redhat.exhort.api.v4.Issue> issues) {
    Map<String, Remediation> remediations = new HashMap<>();
    issues.forEach(
        i -> {
          if (i.getRemediation() != null && i.getRemediation().getTrustedContent() != null) {
            var tc = i.getRemediation().getTrustedContent();
            var r =
                new Remediation()
                    .issueRef(i.getId())
                    .mavenPackage(tc.getPackage())
                    .productStatus(tc.getStatus());
            i.getCves().forEach(cve -> remediations.put(i.getId(), r));
          }
        });
    return remediations;
  }

  private static CvssVector getCvss(com.redhat.exhort.api.v4.CvssVector v) {
    if (v == null) {
      return null;
    }
    return new CvssVector()
        .attackComplexity(v.getAttackComplexity())
        .attackVector(v.getAttackVector())
        .availabilityImpact(v.getAvailabilityImpact())
        .confidentialityImpact(v.getConfidentialityImpact())
        .cvss(v.getCvss())
        .exploitCodeMaturity(v.getExploitCodeMaturity())
        .integrityImpact(v.getIntegrityImpact())
        .privilegesRequired(v.getPrivilegesRequired())
        .remediationLevel(v.getRemediationLevel())
        .reportConfidence(v.getReportConfidence())
        .scope(v.getScope())
        .userInteraction(v.getUserInteraction());
  }
}
