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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.ProviderReport;
import com.redhat.exhort.api.v4.SeverityUtils;
import com.redhat.exhort.api.v4.Source;
import com.redhat.exhort.api.v4.SourceSummary;
import com.redhat.exhort.api.v4.TransitiveDependencyReport;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.DirectDependency;

import jakarta.ws.rs.core.Response;

public class ProviderResponseHandlerTest {

  private static final String TEST_PROVIDER = "example";
  private static final String TEST_SOURCE = "test-source";

  @ParameterizedTest
  @MethodSource("getSummaryValues")
  public void testSummary(
      Map<String, List<Issue>> issuesData, DependencyTree tree, SourceSummary expected)
      throws IOException {

    ProviderResponseHandler handler = new TestResponseHandler();
    ProviderReport response = handler.buildReport(issuesData, tree, null);
    assertOkStatus(response);
    SourceSummary summary = getValidSource(response).getSummary();

    assertEquals(expected.getDirect(), summary.getDirect());
    assertEquals(expected.getTotal(), summary.getTotal());
    assertEquals(expected.getTransitive(), summary.getTransitive());
    assertEquals(expected.getCritical(), summary.getCritical());
    assertEquals(expected.getHigh(), summary.getHigh());
    assertEquals(expected.getMedium(), summary.getMedium());
    assertEquals(expected.getLow(), summary.getLow());
    assertEquals(expected.getRecommendations(), summary.getRecommendations());
    assertEquals(expected.getRemediations(), summary.getRemediations());
    assertEquals(expected.getDependencies(), summary.getDependencies());
  }

  private static Stream<Arguments> getSummaryValues() {
    return Stream.of(
        Arguments.of(
            Map.of("pkg:npm/aa@1", List.of(buildIssue(1, 5f))),
            buildTree(),
            new SourceSummary().direct(1).total(1).medium(1).dependencies(1)),
        Arguments.of(
            Map.of(
                "pkg:npm/aa@1", List.of(buildIssue(1, 3f)),
                "pkg:npm/aaa@1", List.of(buildIssue(2, 4f)),
                "pkg:npm/aba@1", List.of(buildIssue(3, 8f))),
            buildTree(),
            new SourceSummary()
                .total(3)
                .direct(1)
                .transitive(2)
                .high(1)
                .medium(1)
                .low(1)
                .dependencies(3)),
        Arguments.of(
            Map.of(
                "pkg:npm/aa@1", List.of(buildIssue(1, 5f)),
                "pkg:npm/aaa@1", List.of(buildIssue(2, 5f))),
            buildTreeWithDuplicates(),
            new SourceSummary().total(2).direct(1).transitive(1).medium(2).dependencies(2)));
  }

  @Test
  public void testFilterDepsWithoutIssues() throws IOException {
    Map<String, List<Issue>> issues = Map.of("pkg:npm/aa@1", List.of(buildIssue(1, 5f)));
    ProviderResponseHandler handler = new TestResponseHandler();
    DependencyTree tree = buildTree();
    ProviderReport response = handler.buildReport(issues, tree, null);
    assertOkStatus(response);
    assertEquals(1, response.getSources().size());
    Source report = response.getSources().get(TEST_SOURCE);
    assertEquals(1, report.getDependencies().size());
    assertEquals(1, report.getDependencies().get(0).getIssues().size());
    assertEquals("aa", report.getDependencies().get(0).getRef().name());
  }

  @Test
  public void testFilterTransitiveWithoutIssues() throws IOException {

    Map<String, List<Issue>> issues =
        Map.of(
            "pkg:npm/aa@1", List.of(buildIssue(1, 3f)),
            "pkg:npm/aaa@1", List.of(buildIssue(2, 4f)),
            "pkg:npm/aba@1", List.of(buildIssue(3, 8f)));
    ProviderResponseHandler handler = new TestResponseHandler();

    ProviderReport response = handler.buildReport(issues, buildTree(), null);

    assertOkStatus(response);

    // Validate aa has 1 direct and 1 transitive being the transitive the highestVulnerability
    assertEquals(1, response.getSources().size());
    Source source = response.getSources().get(TEST_SOURCE);
    assertEquals(2, source.getDependencies().size());
    DependencyReport report =
        source.getDependencies().stream()
            .filter(r -> "aa".equals(r.getRef().name()))
            .findFirst()
            .get();
    assertEquals(1, report.getIssues().size());
    assertEquals("aa", report.getRef().name());
    assertEquals(4f, report.getHighestVulnerability().getCvssScore());
    assertEquals("ISSUE-002", report.getHighestVulnerability().getId());

    assertEquals(1, report.getTransitive().size());
    TransitiveDependencyReport transitive = report.getTransitive().get(0);
    assertEquals("aaa", transitive.getRef().name());

    // Validate that ab has no issues and one transitive.
    report =
        source.getDependencies().stream()
            .filter(r -> "ab".equals(r.getRef().name()))
            .findFirst()
            .get();
    assertTrue(report.getIssues().isEmpty());
    assertEquals("ab", report.getRef().name());
    assertEquals(8f, report.getHighestVulnerability().getCvssScore());
    assertEquals("ISSUE-003", report.getHighestVulnerability().getId());

    assertEquals(1, report.getTransitive().size());
    transitive = report.getTransitive().get(0);
    assertEquals("aba", transitive.getRef().name());
  }

  @Test
  public void testSorted() throws IOException {
    Map<String, List<Issue>> issues =
        Map.of(
            "pkg:npm/aa@1", List.of(buildIssue(1, 4f)),
            "pkg:npm/aaa@1", List.of(buildIssue(2, 3f)),
            "pkg:npm/aab@1", List.of(buildIssue(3, 1f)),
            "pkg:npm/ab@1", List.of(buildIssue(4, 2f)),
            "pkg:npm/aba@1", List.of(buildIssue(5, 3f)),
            "pkg:npm/abb@1", List.of(buildIssue(6, 9f)),
            "pkg:npm/abc@1", List.of(buildIssue(7, 6f)));
    ProviderResponseHandler handler = new TestResponseHandler();

    ProviderReport response = handler.buildReport(issues, buildTree(), null);

    assertOkStatus(response);
    DependencyReport reportHighest = getValidSource(response).getDependencies().get(0);
    assertEquals("ab", reportHighest.getRef().name());

    assertEquals("abb", reportHighest.getTransitive().get(0).getRef().name());
    assertEquals("abc", reportHighest.getTransitive().get(1).getRef().name());
    assertEquals("aba", reportHighest.getTransitive().get(2).getRef().name());

    DependencyReport reportLowest = getValidSource(response).getDependencies().get(1);
    assertEquals("aa", reportLowest.getRef().name());
    assertEquals("aaa", reportLowest.getTransitive().get(0).getRef().name());
    assertEquals("aab", reportLowest.getTransitive().get(1).getRef().name());
  }

  private void assertOkStatus(ProviderReport response) {
    assertNotNull(response);
    assertNotNull(response.getStatus());

    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus().getCode());
    assertEquals(Response.Status.OK.getReasonPhrase(), response.getStatus().getMessage());
    assertTrue(response.getStatus().getOk());
    assertEquals(TEST_PROVIDER, response.getStatus().getName());
  }

  private Source getValidSource(ProviderReport report) {
    assertNotNull(report);
    assertNotNull(report.getSources());
    Source source = report.getSources().get(TEST_SOURCE);
    assertNotNull(source);
    return source;
  }

  private static DependencyTree buildTree() {
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
    return DependencyTree.builder().dependencies(direct).build();
  }

  private static DependencyTree buildTreeWithDuplicates() {
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
    return DependencyTree.builder().dependencies(direct).build();
  }

  private static Issue buildIssue(int id, Float score) {
    return new Issue()
        .id(String.format("ISSUE-00%d", id))
        .title(String.format("ISSUE Example 00%d", id))
        .source(TEST_SOURCE)
        .severity(SeverityUtils.fromScore(score))
        .cves(List.of(String.format("CVE-00%d", id)))
        .cvssScore(score);
  }

  private static class TestResponseHandler extends ProviderResponseHandler {

    @Override
    protected String getProviderName() {
      return TEST_PROVIDER;
    }

    @Override
    public Map<String, List<Issue>> responseToIssues(
        byte[] response, String privateProviders, DependencyTree tree) throws IOException {
      throw new IllegalArgumentException("not implemented");
    }
  }
}
