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
import java.util.Map;
import java.util.Objects;

import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.builder.GraphTypeBuilder;

import com.redhat.ecosystemappeng.crda.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record GraphRequest(
        String pkgManager,
        String provider,
        Graph<PackageRef, DefaultEdge> graph,
        Map<String, Collection<Issue>> issues,
        Map<String, Recommendation> recommendations) {

    public GraphRequest {
        Objects.requireNonNull(pkgManager);
        Objects.requireNonNull(provider);
        Objects.requireNonNull(graph);
        if (!Constants.PKG_MANAGERS.contains(pkgManager)) {
            throw new IllegalArgumentException("Unsupported package manager: " + pkgManager);
        }
        if (!Constants.PROVIDERS.contains(provider)) {
            throw new IllegalArgumentException("Unsupported provider: " + provider);
        }
        if (graph != null)  {
            graph = GraphTypeBuilder.forGraph(graph).buildGraphBuilder().addGraph(graph).buildAsUnmodifiable();
        }
        if(issues != null) {
            issues = Collections.unmodifiableMap(issues);
        } else {
            issues = Collections.emptyMap();
        }
        if(recommendations != null) {
            recommendations = Collections.unmodifiableMap(recommendations);
        } else {
            recommendations = Collections.emptyMap();
        }
    }

    public static class Builder {

        String pkgManager;
        String provider;
        Graph<PackageRef, DefaultEdge> graph;
        Map<String, Collection<Issue>> issues;
        Map<String, Recommendation> recommendations;

        public Builder(String pkgManager, String provider) {
            this.pkgManager = pkgManager;
            this.provider = provider;
        }

        public Builder(GraphRequest copy) {
            this.pkgManager = copy.pkgManager;
            this.provider = copy.provider;
            this.graph = copy.graph;

            if(copy.issues != null) {
                this.issues = new HashMap<>(copy.issues);
            }
            
            if(copy.recommendations != null) {
                this.recommendations = new HashMap<>(copy.recommendations);
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

        public Builder recommendations(Map<String, Recommendation> recommendations) {
            this.recommendations = recommendations;
            return this;
        }

        public GraphRequest build() {
            return new GraphRequest(pkgManager, provider, graph, issues, recommendations);
        }

    }

}
