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

package com.redhat.ecosystemappeng.crda.model;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.builder.GraphTypeBuilder;

import com.redhat.ecosystemappeng.crda.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record GraphRequest(
        String pkgManager,
        List<String> providers,
        Graph<PackageRef, DefaultEdge> graph,
        Map<String, Collection<Issue>> issues,
        Map<String, Recommendation> securityRecommendations,
        PackageRef recommendation) {

    public GraphRequest {
        Objects.requireNonNull(pkgManager);
        Objects.requireNonNull(providers);
        Objects.requireNonNull(graph);
        if (!Constants.PKG_MANAGERS.contains(pkgManager)) {
            throw new IllegalArgumentException("Unsupported package manager: " + pkgManager);
        }
        List<String> invalidProviders = providers.stream().filter(Predicate.not(Constants.PROVIDERS::contains))
                .collect(Collectors.toList());
        if (!invalidProviders.isEmpty()) {
            throw new IllegalArgumentException("Unsupported providers: " + invalidProviders);
        }
        if (graph != null) {
            graph = GraphTypeBuilder.forGraph(graph).buildGraphBuilder().addGraph(graph).buildAsUnmodifiable();
        }
        if (issues != null) {
            issues = Collections.unmodifiableMap(issues);
        } else {
            issues = Collections.emptyMap();
        }
        if (securityRecommendations != null) {
            securityRecommendations = Collections.unmodifiableMap(securityRecommendations);
        } else {
            securityRecommendations = Collections.emptyMap();
        }
    }

    public static class Builder {

        String pkgManager;
        List<String> providers;
        Graph<PackageRef, DefaultEdge> graph;
        Map<String, Collection<Issue>> issues;
        Map<String, Recommendation> securityRecommendations;
        PackageRef recommendation;

        public Builder(String pkgManager, List<String> providers) {
            this.pkgManager = pkgManager;
            this.providers = providers;
        }

        public Builder(GraphRequest copy) {
            this.pkgManager = copy.pkgManager;
            this.providers = copy.providers;
            this.graph = copy.graph;
            this.recommendation = copy.recommendation;

            if (copy.issues != null) {
                this.issues = new HashMap<>(copy.issues);
            }

            if (copy.securityRecommendations != null) {
                this.securityRecommendations = new HashMap<>(copy.securityRecommendations);
            }

        }

        public Builder graph(Graph<PackageRef, DefaultEdge> graph) {
            this.graph = graph;
            return this;
        }

        public Builder issues(Map<String, Collection<Issue>> issues) {
            this.issues = issues;
            return this;
        };

        public Builder securityRecommendations(Map<String, Recommendation> securityRecommendations) {
            this.securityRecommendations = securityRecommendations;
            return this;
        }

        public Builder recommendation(PackageRef recommendation) {
            this.recommendation = recommendation;
            return this;
        }
        
        public GraphRequest build() {
            return new GraphRequest(pkgManager, providers, graph, issues, securityRecommendations, recommendation);
        }

    }

}
