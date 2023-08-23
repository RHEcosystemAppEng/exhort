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

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

import com.redhat.exhort.api.AnalysisReportValue;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderAggregator;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.DirectDependency;

import jakarta.ws.rs.core.Response.Status;

public class ProviderAggregatorTest {

  @Test
  public void testBuildReport_empty() {
    AnalysisReportValue report =
        new SimpleProviderAggregator()
            .buildReport(Collections.emptyMap(), DependencyTree.builder().build());
    assertEmptyReport(report);

    report =
        new SimpleProviderAggregator()
            .buildReport(
                Collections.emptyMap(),
                DependencyTree.builder().dependencies(Collections.emptyMap()).build());
    assertEmptyReport(report);
  }

  @Test
  public void testBuildReport() {
    DependencyTree tree = buildTree();
    AnalysisReportValue report = new SimpleProviderAggregator().buildReport(buildIssues(), tree);
    assertNotNull(report);

    assertEquals(3, report.getSummary().getDependencies().getScanned());
    assertEquals(4, report.getSummary().getDependencies().getTransitive());
    assertEquals(3, report.getDependencies().size());

    assertEquals(4, report.getSummary().getVulnerabilities().getTotal());
    assertEquals(1, report.getSummary().getVulnerabilities().getHigh());
    assertEquals(1, report.getSummary().getVulnerabilities().getCritical());
    assertEquals(1, report.getSummary().getVulnerabilities().getDirect());
    assertEquals(1, report.getSummary().getVulnerabilities().getMedium());
    assertEquals(1, report.getSummary().getVulnerabilities().getLow());

    assertOkStatus(report);

    // this dependency has one transitive dependency with 3 issues
    assertEquals(
        Float.valueOf(10),
        report.getDependencies().get(0).getHighestVulnerability().getCvssScore());

    assertEquals(
        Float.valueOf(10),
        report
            .getDependencies()
            .get(0)
            .getTransitive()
            .get(0)
            .getHighestVulnerability()
            .getCvssScore());
    assertEquals(
        Float.valueOf(10),
        report.getDependencies().get(0).getTransitive().get(0).getIssues().get(0).getCvssScore());
    assertEquals(
        Float.valueOf(8),
        report.getDependencies().get(0).getTransitive().get(0).getIssues().get(1).getCvssScore());
    assertEquals(
        Float.valueOf(5),
        report.getDependencies().get(0).getTransitive().get(0).getIssues().get(2).getCvssScore());

    assertEquals(Collections.emptyList(), report.getDependencies().get(0).getIssues());
    assertEquals(
        Collections.emptyList(),
        report.getDependencies().get(0).getTransitive().get(1).getIssues());
    assertNull(report.getDependencies().get(0).getTransitive().get(1).getHighestVulnerability());

    // this has only one issue in the direct dependency
    assertEquals(
        Float.valueOf(3), report.getDependencies().get(1).getHighestVulnerability().getCvssScore());
    assertEquals(
        Float.valueOf(3), report.getDependencies().get(1).getIssues().get(0).getCvssScore());

    // this dependency does not have issues
    assertNull(report.getDependencies().get(2).getHighestVulnerability());
  }

  private void assertEmptyReport(AnalysisReportValue report) {
    assertNotNull(report);

    assertEquals(0, report.getSummary().getDependencies().getScanned());
    assertEquals(0, report.getSummary().getDependencies().getTransitive());

    assertNoVulnerabilities(report);
    assertEquals(Collections.emptyList(), report.getDependencies());
  }

  private void assertNoVulnerabilities(AnalysisReportValue report) {
    assertEquals(0, report.getSummary().getVulnerabilities().getTotal());
    assertEquals(0, report.getSummary().getVulnerabilities().getHigh());
    assertEquals(0, report.getSummary().getVulnerabilities().getCritical());
    assertEquals(0, report.getSummary().getVulnerabilities().getDirect());
    assertEquals(0, report.getSummary().getVulnerabilities().getMedium());
    assertEquals(0, report.getSummary().getVulnerabilities().getLow());

    assertOkStatus(report);
  }

  private void assertOkStatus(AnalysisReportValue report) {
    assertEquals(Boolean.TRUE, report.getStatus().getOk());
    assertEquals(Status.OK.getStatusCode(), report.getStatus().getCode());
    assertEquals(Status.OK.getReasonPhrase(), report.getStatus().getMessage());
    assertEquals("simple", report.getStatus().getName());
  }

  private static final Map<String, Collection<String>> DEFAULT_TREE =
      Map.of(
          "com.example:dep-a:jar:1.0.0",
          List.of("com.example:dep-a-a:jar:1.0.0", "com.example:dep-a-b:jar:1.0.0"),
          "com.example:dep-b:jar:1.0.0",
          List.of("com.example:dep-b-a:jar:1.0.0", "com.example:dep-b-b:jar:1.0.0"),
          "com.example:dep-c:jar:1.0.0",
          Collections.emptyList());

  private static DependencyTree buildTree() {
    Map<PackageRef, DirectDependency> deps = new HashMap<>();
    DEFAULT_TREE.entrySet().stream()
        .sorted(Comparator.comparing(Entry::getKey))
        .forEach(
            e -> {
              PackageRef ref = PackageRef.parse(e.getKey(), Constants.MAVEN_PKG_MANAGER);
              Set<PackageRef> transitive =
                  e.getValue().stream()
                      .sorted()
                      .map(s -> PackageRef.parse(s, Constants.MAVEN_PKG_MANAGER))
                      .collect(Collectors.toSet());
              deps.put(ref, DirectDependency.builder().ref(ref).transitive(transitive).build());
            });

    DependencyTree tree = DependencyTree.builder().dependencies(deps).build();
    return tree;
  }

  private static Map<String, List<Issue>> buildIssues() {
    Map<String, List<Issue>> issues = new HashMap<>();
    issues.put("com.example:dep-a-a", List.of(buildIssue(5), buildIssue(10), buildIssue(8)));
    issues.put("com.example:dep-c", List.of(buildIssue(3)));

    return issues;
  }

  static final class SimpleProviderAggregator extends ProviderAggregator {

    @Override
    protected String getProviderName() {
      return "simple";
    }
  }
}
