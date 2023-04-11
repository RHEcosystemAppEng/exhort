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

package com.redhat.ecosystemappeng.snyk;

import java.util.Set;

import org.jgrapht.Graph;
import org.jgrapht.traverse.BreadthFirstIterator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.ecosystemappeng.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.model.GraphRequest;
import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.model.graph.DependencyEdge;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykRequestBuilder {

    private ObjectMapper mapper = ObjectMapperProducer.newInstance();

    public String fromDiGraph(GraphRequest req) throws JsonProcessingException {
        ObjectNode depGraph = mapper.createObjectNode();
        depGraph.put("schemaVersion", "1.2.0");
        depGraph.set("pkgManager", mapper.createObjectNode().put("name", "maven"));

        depGraph.set("pkgs", addPackages(depGraph, req.graph()));
        ObjectNode root = mapper.createObjectNode().set("depGraph", depGraph);
        return mapper.writeValueAsString(root);
    }

    private JsonNode addPackages(ObjectNode depGraph, Graph<PackageRef, DependencyEdge> graph) {
        ArrayNode pkgs = mapper.createArrayNode();
        ArrayNode nodes = mapper.createArrayNode();
        PackageRef root = null;
        BreadthFirstIterator<PackageRef, DependencyEdge> iterator = new BreadthFirstIterator<>(graph);
        while (iterator.hasNext()) {
            PackageRef dep = iterator.next();
            if (root == null) {
                root = dep;
            }
            nodes.add(createNode(dep, graph.outgoingEdgesOf(dep)));
            pkgs.add(mapper.createObjectNode()
                    .put("id", dep.getId())
                    .set("info", mapper.createObjectNode()
                            .put("name", dep.name())
                            .put("version", dep.version())));
        }
        depGraph.set("pkgs", pkgs);
        depGraph.set("graph", mapper.createObjectNode()
                .put("rootNodeId", root.getId())
                .set("nodes", nodes));
        return pkgs;
    }

    private ObjectNode createNode(PackageRef dep, Set<DependencyEdge> edges) {
        ArrayNode depsNode = mapper.createArrayNode();
        edges.forEach(e -> depsNode.add(mapper.createObjectNode().put("nodeId", e.toString())));
        return mapper.createObjectNode()
                .put("nodeId", dep.getId())
                .put("pkgId", dep.getId())
                .set("deps", depsNode);
    }

}
