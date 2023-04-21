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

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.traverse.BreadthFirstIterator;

import com.redhat.ecosystemappeng.crda.model.DependencyReport;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.Issue;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import com.redhat.ecosystemappeng.crda.model.Recommendation;
import com.redhat.ecosystemappeng.crda.model.TransitiveDependencyReport;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ReportTransformer {

    public List<DependencyReport> transform(GraphRequest request) {
        Graph<PackageRef, DefaultEdge> graph = request.graph();
        BreadthFirstIterator<PackageRef, DefaultEdge> i = new BreadthFirstIterator<>(graph);
        List<DependencyReport> result = new ArrayList<>();
        if(!i.hasNext()) {
            return result;
        }
        getNextLevel(graph, i.next()).forEach(d -> {
            Collection<Issue> issues = request.issues().get(d.name());
            result.add(new DependencyReport(d, issues, getTransitiveDependenciesReport(d, request),
                    getRecommendations(issues, request.recommendations())));
        });
        return result;
    }

    private List<PackageRef> getNextLevel(Graph<PackageRef, DefaultEdge> graph, PackageRef ref) {
        List<PackageRef> firstLevel = new ArrayList<>();
        graph.outgoingEdgesOf(ref).stream().map(e -> graph.getEdgeTarget(e)).forEach(firstLevel::add);
        return firstLevel;
    }

    private List<TransitiveDependencyReport> getTransitiveDependenciesReport(PackageRef start, GraphRequest request) {
        List<PackageRef> directDeps = getNextLevel(request.graph(), start);
        BreadthFirstIterator<PackageRef, DefaultEdge> i = new BreadthFirstIterator<>(request.graph(), directDeps);
        List<TransitiveDependencyReport> result = new ArrayList<>();
        while (i.hasNext()) {
            PackageRef ref = i.next();
            Collection<Issue> issues = request.issues().get(ref.name());
            result.add(
                    new TransitiveDependencyReport(ref, issues, getRecommendations(issues, request.recommendations())));
        }
        return result;
    }

    private Map<String, Recommendation> getRecommendations(Collection<Issue> issues,
            Map<String, Recommendation> recommendations) {
        if (issues == null) {
            return null;
        }
        Map<String, Recommendation> result = new HashMap<>();
        issues.stream().map(i -> i.cves()).flatMap(Set::stream).forEach(cve -> {
            Recommendation r = recommendations.get(cve);
            if (r != null) {
                result.put(cve, r);
            }
        });
        return result;
    }
}
