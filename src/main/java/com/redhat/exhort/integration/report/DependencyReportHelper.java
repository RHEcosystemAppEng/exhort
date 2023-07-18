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

package com.redhat.exhort.integration.report;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.redhat.exhort.api.DependencyReport;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.Remediation;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public final class DependencyReportHelper {

  public int transitiveIssuesCount(DependencyReport report) {
    return report.getTransitive().stream().mapToInt(t -> t.getIssues().size()).sum();
  }

  public boolean hasRemediation(DependencyReport report) {
    if (!report.getRemediations().isEmpty()) {
      return true;
    }
    return report.getTransitive() != null
        && report.getTransitive().stream().anyMatch(t -> !t.getRemediations().isEmpty());
  }

  public int transitiveRemediationCount(DependencyReport report) {
    return report.getTransitive().stream().mapToInt(t -> t.getRemediations().size()).sum();
  }

  public PackageRef findRemediationByIssue(DependencyReport report, Issue issue) {
    if (issue.getCves() == null || issue.getCves().isEmpty()) {
      return null;
    }
    List<Remediation> result = new ArrayList<>();
    issue.getCves().stream()
        .map(cve -> report.getRemediations().get(cve))
        .filter(Objects::nonNull)
        .forEach(result::add);

    if (result.isEmpty()) {
      return null;
    }
    // Assuming there's only one CVE by issue
    return result.get(0).getMavenPackage();
  }

  public PackageRef findTransitiveRemediationByIssue(DependencyReport report, Issue issue) {
    if (issue.getCves() == null || issue.getCves().isEmpty()) {
      return null;
    }
    List<Remediation> result = new ArrayList<>();
    issue.getCves().stream()
        .forEach(
            cve ->
                report.getTransitive().stream()
                    .map(t -> t.getRemediations().get(cve))
                    .filter(Objects::nonNull)
                    .forEach(result::add));

    if (result.isEmpty()) {
      return null;
    }
    // Assuming there's only one CVE by issue
    return result.get(0).getMavenPackage();
  }
}
