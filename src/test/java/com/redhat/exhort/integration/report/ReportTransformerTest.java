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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.Test;

import com.redhat.exhort.api.AnalysisReport;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.Severity;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.DirectDependency;
import com.redhat.exhort.model.GraphRequest;

public class ReportTransformerTest {

  @Test
  public void testFilterDepsWithoutIssues() {
    Map<String, List<Issue>> issues = Map.of("aa", List.of(buildIssue(1, 5f)));
    GraphRequest req =
        new GraphRequest.Builder(Constants.NPM_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
            .tree(buildTree())
            .issues(issues)
            .build();

    AnalysisReport report = new ReportTransformer().transform(req);

    assertNotNull(report);
    assertEquals(1, report.getDependencies().size());

    assertEquals("aa", report.getDependencies().get(0).getRef().name());
  }

  @Test
  public void testFilterTransitiveWithoutIssues() {
    Map<String, List<Issue>> issues =
        Map.of(
            "aa", List.of(buildIssue(1, 5f)),
            "aaa", List.of(buildIssue(2, 5f)),
            "aba", List.of(buildIssue(3, 5f)));
    GraphRequest req =
        new GraphRequest.Builder(Constants.NPM_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
            .tree(buildTree())
            .issues(issues)
            .build();

    AnalysisReport report = new ReportTransformer().transform(req);

    assertNotNull(report);
    assertEquals(2, report.getDependencies().size());

    assertTrue(report.getDependencies().stream().anyMatch(d -> d.getRef().name().equals("aa")));
    assertTrue(report.getDependencies().stream().anyMatch(d -> d.getRef().name().equals("aa")));

    assertEquals(1, report.getDependencies().get(0).getTransitive().size());
    assertEquals(1, report.getDependencies().get(1).getTransitive().size());
  }

  @Test
  public void testIgnoreDuplicates() {
    Map<String, List<Issue>> issues =
        Map.of(
            "aa", List.of(buildIssue(1, 5f)),
            "aaa", List.of(buildIssue(2, 5f)));
    GraphRequest req =
        new GraphRequest.Builder(Constants.NPM_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
            .tree(buildTreeWithDuplicates())
            .issues(issues)
            .build();

    AnalysisReport report = new ReportTransformer().transform(req);

    assertNotNull(report);
    assertEquals(2, report.getDependencies().size());

    assertTrue(report.getDependencies().stream().anyMatch(d -> d.getRef().name().equals("aa")));
    assertTrue(report.getDependencies().stream().anyMatch(d -> d.getRef().name().equals("aa")));

    assertEquals(1, report.getDependencies().get(0).getTransitive().size());
    assertEquals(1, report.getDependencies().get(1).getTransitive().size());

    assertEquals(2, report.getSummary().getDependencies().getScanned());
    assertEquals(4, report.getSummary().getDependencies().getTransitive());

    assertEquals(2, report.getSummary().getVulnerabilities().getTotal());
  }

  @Test
  public void testFilterRecommendations() {
    Map<String, PackageRef> recommendations =
        Map.of(
            "aa:1",
            PackageRef.builder()
                .name("aa")
                .version("1.redhat-0001")
                .pkgManager(Constants.NPM_PKG_MANAGER)
                .build());
    GraphRequest req =
        new GraphRequest.Builder(Constants.NPM_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
            .tree(buildTree())
            .recommendations(recommendations)
            .build();

    AnalysisReport report = new ReportTransformer().transform(req);

    assertNotNull(report);
    assertTrue(report.getDependencies().isEmpty());
  }

  private DependencyTree buildTree() {
    Map<PackageRef, DirectDependency> direct =
        Map.of(
            PackageRef.builder()
                .name("aa")
                .version("1")
                .pkgManager(Constants.NPM_PKG_MANAGER)
                .build(),
            DirectDependency.builder()
                .ref(
                    PackageRef.builder()
                        .name("aa")
                        .version("1")
                        .pkgManager(Constants.NPM_PKG_MANAGER)
                        .build())
                .transitive(
                    Set.of(
                        PackageRef.builder()
                            .name("aaa")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build(),
                        PackageRef.builder()
                            .name("aab")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build()))
                .build(),
            PackageRef.builder()
                .name("ab")
                .version("1")
                .pkgManager(Constants.NPM_PKG_MANAGER)
                .build(),
            DirectDependency.builder()
                .ref(
                    PackageRef.builder()
                        .name("ab")
                        .version("1")
                        .pkgManager(Constants.NPM_PKG_MANAGER)
                        .build())
                .transitive(
                    Set.of(
                        PackageRef.builder()
                            .name("aba")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build(),
                        PackageRef.builder()
                            .name("abb")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build(),
                        PackageRef.builder()
                            .name("abc")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build()))
                .build());
    return DependencyTree.builder()
        .root(
            PackageRef.builder()
                .name("a")
                .version("1")
                .pkgManager(Constants.NPM_PKG_MANAGER)
                .build())
        .dependencies(direct)
        .build();
  }

  private DependencyTree buildTreeWithDuplicates() {
    Map<PackageRef, DirectDependency> direct =
        Map.of(
            PackageRef.builder()
                .name("aa")
                .version("1")
                .pkgManager(Constants.NPM_PKG_MANAGER)
                .build(),
            DirectDependency.builder()
                .ref(
                    PackageRef.builder()
                        .name("aa")
                        .version("1")
                        .pkgManager(Constants.NPM_PKG_MANAGER)
                        .build())
                .transitive(
                    Set.of(
                        PackageRef.builder()
                            .name("aaa")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build(),
                        PackageRef.builder()
                            .name("aab")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build()))
                .build(),
            PackageRef.builder()
                .name("ab")
                .version("1")
                .pkgManager(Constants.NPM_PKG_MANAGER)
                .build(),
            DirectDependency.builder()
                .ref(
                    PackageRef.builder()
                        .name("ab")
                        .version("1")
                        .pkgManager(Constants.NPM_PKG_MANAGER)
                        .build())
                .transitive(
                    Set.of(
                        PackageRef.builder()
                            .name("aaa")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build(),
                        PackageRef.builder()
                            .name("abb")
                            .version("1")
                            .pkgManager(Constants.NPM_PKG_MANAGER)
                            .build()))
                .build());
    return DependencyTree.builder()
        .root(
            PackageRef.builder()
                .name("a")
                .version("1")
                .pkgManager(Constants.NPM_PKG_MANAGER)
                .build())
        .dependencies(direct)
        .build();
  }

  private Issue buildIssue(int id, Float score) {
    return new Issue()
        .id(String.format("ISSUE-00%d", id))
        .title(String.format("ISSUE Example 00%d", id))
        .source(Constants.SNYK_PROVIDER)
        .severity(Severity.values()[id % Severity.values().length])
        .cvssScore(score);
  }
}
