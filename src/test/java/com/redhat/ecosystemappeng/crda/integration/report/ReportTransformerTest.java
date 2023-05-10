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

package com.redhat.ecosystemappeng.crda.integration.report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.Map;

import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.builder.GraphTypeBuilder;
import org.junit.jupiter.api.Test;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.model.AnalysisReport;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.Issue;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import com.redhat.ecosystemappeng.crda.model.Severity;

public class ReportTransformerTest {

    @Test
    public void testFilterDepsWithoutIssues() {
        Map<String, List<Issue>> issues = Map.of("aa", List.of(buildIssue(1, 5f)));
        GraphRequest req = new GraphRequest.Builder(Constants.MAVEN_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
                .graph(buildGraph()).issues(issues)
                .build();

        AnalysisReport report = new ReportTransformer().transform(req);

        assertNotNull(report);
        assertEquals(1, report.dependencies().size());

        assertEquals("aa", report.dependencies().get(0).ref().name());
    }

    @Test
    public void testFilterTransitiveWithoutIssues() {
        Map<String, List<Issue>> issues = Map.of(
                "aa", List.of(buildIssue(1, 5f)),
                "aaa", List.of(buildIssue(2, 5f)),
                "aba", List.of(buildIssue(3, 5f)));
        GraphRequest req = new GraphRequest.Builder(Constants.MAVEN_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
                .graph(buildGraph()).issues(issues)
                .build();

        AnalysisReport report = new ReportTransformer().transform(req);

        assertNotNull(report);
        assertEquals(2, report.dependencies().size());

        assertEquals("aa", report.dependencies().get(0).ref().name());
        assertEquals("ab", report.dependencies().get(1).ref().name());

        assertEquals(1, report.dependencies().get(0).transitive().size());
        assertEquals(1, report.dependencies().get(1).transitive().size());
    }

    @Test
    public void testFilterRecommendations() {
        Map<String, PackageRef> recommendations = Map.of(
                "aa:1", new PackageRef("aa", "1.redhat-0001"));
        GraphRequest req = new GraphRequest.Builder(Constants.MAVEN_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
                .graph(buildGraph()).recommendations(recommendations)
                .build();

        AnalysisReport report = new ReportTransformer().transform(req);

        assertNotNull(report);
        assertEquals(1, report.dependencies().size());

        assertEquals("aa", report.dependencies().get(0).ref().name());
        assertEquals("1.redhat-0001", report.dependencies().get(0).recommendation().version());
    }

    private Graph<PackageRef, DefaultEdge> buildGraph() {
        return GraphTypeBuilder.directed().allowingSelfLoops(false)
                .vertexClass(PackageRef.class)
                .edgeClass(DefaultEdge.class).buildGraphBuilder()
                .addEdge(new PackageRef("a", "1"), new PackageRef("aa", "1"))
                .addEdge(new PackageRef("a", "1"), new PackageRef("ab", "1"))
                .addEdge(new PackageRef("aa", "1"), new PackageRef("aaa", "1"))
                .addEdge(new PackageRef("aa", "1"), new PackageRef("aab", "1"))
                .addEdge(new PackageRef("ab", "1"), new PackageRef("aba", "1"))
                .addEdge(new PackageRef("ab", "1"), new PackageRef("abb", "1"))
                .addEdge(new PackageRef("ab", "1"), new PackageRef("abc", "1"))
                .buildAsUnmodifiable();
    }

    private Issue buildIssue(int id, Float score) {
        return new Issue.Builder(String.format("ISSUE-00%d", id))
                .title(String.format("ISSUE Example 00%d", id))
                .source(Constants.SNYK_PROVIDER)
                .severity(Severity.values()[id % Severity.values().length])
                .cvssScore(score)
                .build();
    }

}
