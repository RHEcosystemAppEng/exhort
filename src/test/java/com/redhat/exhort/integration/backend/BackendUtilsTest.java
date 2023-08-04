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

package com.redhat.exhort.integration.backend;

import static com.redhat.exhort.integration.backend.IssueTestUtils.buildIssue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.redhat.exhort.api.AnalysisReport;
import com.redhat.exhort.api.AnalysisReportValue;
import com.redhat.exhort.api.DependencyReport;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.ProviderStatus;
import com.redhat.exhort.api.TransitiveDependencyReport;

public class BackendUtilsTest {

  @Test
  public void testRemoveEmptyDependencies_empty() {
    AnalysisReport result = BackendUtils.removeEmptyDependencies(new AnalysisReport());
    assertEquals(new AnalysisReport(), result);
  }

  @Test
  public void testRemoveEmptyDependencies_empty_reports() {

    AnalysisReport reports = new AnalysisReport();
    reports.put("one", new AnalysisReportValue());
    reports.put("two", new AnalysisReportValue());
    AnalysisReport result = BackendUtils.removeEmptyDependencies(reports);
    assertEquals(reports, result);
  }

  @Test
  public void testRemoveDependencies_no_issues_no_recommendations() {
    AnalysisReport result = BackendUtils.removeEmptyDependencies(buildReport());
    assertNotNull(result);
    AnalysisReportValue report = result.get(PROVIDER_NAME);
    assertNotNull(report);
    assertTrue(report.getDependencies().isEmpty());
  }

  @Test
  public void testRemoveDependencies_with_recommendations() {
    AnalysisReport reports = buildReport();
    addRecommendations(reports);
    AnalysisReport result = BackendUtils.removeEmptyDependencies(reports);
    List<DependencyReport> dependencies = result.get(PROVIDER_NAME).getDependencies();
    assertEquals(2, dependencies.size());
    assertEquals(
        "pkg:maven/com.example/dep-a@1.0.0", dependencies.get(0).getRef().purl().getCoordinates());
    assertEquals(
        "pkg:maven/com.example/dep-a@1.0.0-redhat-001",
        dependencies.get(0).getRecommendation().purl().getCoordinates());
    assertEquals(
        "pkg:maven/com.example/dep-b@1.0.0", dependencies.get(1).getRef().purl().getCoordinates());
    assertEquals(
        "pkg:maven/com.example/dep-b@1.0.0-redhat-001",
        dependencies.get(1).getRecommendation().purl().getCoordinates());
  }

  @Test
  public void testRemoveDependencies_with_issues() {
    AnalysisReport reports = buildReport();
    addIssues(reports);
    AnalysisReport result = BackendUtils.removeEmptyDependencies(reports);
    List<DependencyReport> dependencies = result.get(PROVIDER_NAME).getDependencies();
    assertEquals(2, dependencies.size());
    assertEquals(
        "pkg:maven/com.example/dep-a@1.0.0", dependencies.get(0).getRef().purl().getCoordinates());
    assertEquals(2, dependencies.get(0).getIssues().size());
    assertEquals(Float.valueOf(10), dependencies.get(0).getHighestVulnerability().getCvssScore());
    assertEquals(
        "pkg:maven/com.example/dep-c@1.0.0", dependencies.get(1).getRef().purl().getCoordinates());
    assertEquals(Float.valueOf(8), dependencies.get(1).getHighestVulnerability().getCvssScore());
    assertNull(dependencies.get(1).getIssues());
    assertEquals(1, dependencies.get(1).getTransitive().get(0).getIssues().size());
    assertEquals(
        Float.valueOf(8),
        dependencies.get(1).getTransitive().get(0).getHighestVulnerability().getCvssScore());
  }

  @Test
  public void testRemoveDependencies() {
    AnalysisReport reports = buildReport();
    addIssues(reports);
    addRecommendations(reports);
    AnalysisReport result = BackendUtils.removeEmptyDependencies(reports);

    List<DependencyReport> dependencies = result.get(PROVIDER_NAME).getDependencies();
    assertEquals(3, dependencies.size());
    assertEquals(
        "pkg:maven/com.example/dep-a@1.0.0", dependencies.get(0).getRef().purl().getCoordinates());
    assertEquals(2, dependencies.get(0).getIssues().size());
    assertEquals(Float.valueOf(10), dependencies.get(0).getHighestVulnerability().getCvssScore());
    assertEquals(
        "pkg:maven/com.example/dep-c@1.0.0", dependencies.get(2).getRef().purl().getCoordinates());
    assertEquals(Float.valueOf(8), dependencies.get(2).getHighestVulnerability().getCvssScore());
    assertNull(dependencies.get(1).getIssues());
    assertEquals(1, dependencies.get(2).getTransitive().get(0).getIssues().size());
    assertEquals(
        Float.valueOf(8),
        dependencies.get(2).getTransitive().get(0).getHighestVulnerability().getCvssScore());

    assertEquals(
        "pkg:maven/com.example/dep-a@1.0.0", dependencies.get(0).getRef().purl().getCoordinates());
    assertEquals(
        "pkg:maven/com.example/dep-a@1.0.0-redhat-001",
        dependencies.get(0).getRecommendation().purl().getCoordinates());
    assertEquals(
        "pkg:maven/com.example/dep-b@1.0.0", dependencies.get(1).getRef().purl().getCoordinates());
    assertEquals(
        "pkg:maven/com.example/dep-b@1.0.0-redhat-001",
        dependencies.get(1).getRecommendation().purl().getCoordinates());
  }

  private static AnalysisReportValue emptyReport(String providerName) {
    return new AnalysisReportValue()
        .status(new ProviderStatus().name(providerName))
        .dependencies(Collections.emptyList());
  }

  private static void addIssues(AnalysisReport report) {
    // Add issues to direct dependency dep-a
    report
        .get(PROVIDER_NAME)
        .getDependencies()
        .get(0)
        .issues(List.of(buildIssue(10), buildIssue(5)))
        .highestVulnerability(buildIssue(10));
    // Add issues to transitive dependency dep-c-a
    report
        .get(PROVIDER_NAME)
        .getDependencies()
        .get(2)
        .highestVulnerability(buildIssue(8))
        .getTransitive()
        .get(0)
        .issues(List.of(buildIssue(8)))
        .highestVulnerability(buildIssue(8));
  }

  private static void addRecommendations(AnalysisReport report) {
    // Add recommendation dependency dep-a
    report
        .get(PROVIDER_NAME)
        .getDependencies()
        .get(0)
        .recommendation(new PackageRef("pkg:maven/com.example/dep-a@1.0.0-redhat-001"));
    // Add recommendation to dependency dep-b
    report
        .get(PROVIDER_NAME)
        .getDependencies()
        .get(1)
        .recommendation(new PackageRef("pkg:maven/com.example/dep-b@1.0.0-redhat-001"));
  }

  private static final String PROVIDER_NAME = "example";

  private static final AnalysisReport buildReport() {
    AnalysisReport result = new AnalysisReport();
    result.put(
        PROVIDER_NAME,
        emptyReport(PROVIDER_NAME)
            .dependencies(
                List.of(
                    new DependencyReport()
                        .ref(new PackageRef("pkg:maven/com.example/dep-a@1.0.0"))
                        .transitive(
                            List.of(
                                new TransitiveDependencyReport()
                                    .ref(new PackageRef("pkg:maven/com.example/dep-a-a@1.0.0")),
                                new TransitiveDependencyReport()
                                    .ref(new PackageRef("pkg:maven/com.example/dep-a-b@1.0.0")))),
                    new DependencyReport().ref(new PackageRef("pkg:maven/com.example/dep-b@1.0.0")),
                    new DependencyReport()
                        .ref(new PackageRef("pkg:maven/com.example/dep-c@1.0.0"))
                        .transitive(
                            List.of(
                                new TransitiveDependencyReport()
                                    .ref(new PackageRef("pkg:maven/com.example/dep-c-a@1.0.0")),
                                new TransitiveDependencyReport()
                                    .ref(new PackageRef("pkg:maven/com.example/dep-c-b@1.0.0")),
                                new TransitiveDependencyReport()
                                    .ref(
                                        new PackageRef("pkg:maven/com.example/dep-c-c@1.0.0")))))));
    return result;
  }
}
