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

import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.builder.GraphTypeBuilder;
import org.junit.jupiter.api.Test;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.model.DependencyReport;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

public class ReportTransformerTest {

    @Test
    public void testTransformGraph() {
        GraphRequest req = new GraphRequest.Builder(Constants.MAVEN_PKG_MANAGER, List.of(Constants.SNYK_PROVIDER))
                .graph(buildGraph())
                .build();

        List<DependencyReport> reports = new ReportTransformer().transform(req);
        
        assertNotNull(reports);
        assertEquals(2, reports.size());
        
        assertEquals("aa", reports.get(0).ref().name());
        assertEquals("ab", reports.get(1).ref().name());

        assertEquals(2, reports.get(0).transitive().size());
        assertEquals(3, reports.get(1).transitive().size());
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

}
