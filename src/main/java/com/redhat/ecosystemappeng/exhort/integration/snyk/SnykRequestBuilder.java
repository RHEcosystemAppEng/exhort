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

package com.redhat.ecosystemappeng.exhort.integration.snyk;

import java.util.Collections;
import java.util.Set;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.ecosystemappeng.exhort.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.exhort.model.DependencyTree;
import com.redhat.ecosystemappeng.exhort.model.GraphRequest;
import com.redhat.ecosystemappeng.exhort.model.PackageRef;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykRequestBuilder {

  private ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public String fromDiGraph(GraphRequest req) throws JsonProcessingException {
    ObjectNode depGraph = mapper.createObjectNode();
    depGraph.put("schemaVersion", "1.2.0");
    depGraph.set("pkgManager", mapper.createObjectNode().put("name", req.pkgManager()));

    depGraph.set("pkgs", addPackages(depGraph, req.tree()));
    ObjectNode root = mapper.createObjectNode().set("depGraph", depGraph);
    return mapper.writeValueAsString(root);
  }

  private JsonNode addPackages(ObjectNode depGraph, DependencyTree tree) {
    Set<PackageRef> allDeps = tree.getAll();
    ObjectNode rootNode = createNode(tree.root(), allDeps);
    ArrayNode nodes = mapper.createArrayNode().add(rootNode);
    ArrayNode pkgs = mapper.createArrayNode().add(createPkg(tree.root()));

    allDeps.stream()
        .forEach(
            d -> {
              pkgs.add(createPkg(d));
              nodes.add(createNode(d, Collections.emptySet()));
            });
    depGraph.set("pkgs", pkgs);
    depGraph.set(
        "graph",
        mapper.createObjectNode().put("rootNodeId", getId(tree.root())).set("nodes", nodes));
    return pkgs;
  }

  private ObjectNode createPkg(PackageRef source) {
    return mapper
        .createObjectNode()
        .put("id", getId(source))
        .set(
            "info",
            mapper.createObjectNode().put("name", source.name()).put("version", source.version()));
  }

  private ObjectNode createNode(PackageRef source, Set<PackageRef> deps) {
    ArrayNode depsNode = mapper.createArrayNode();
    deps.forEach(e -> depsNode.add(mapper.createObjectNode().put("nodeId", getId(e))));
    return mapper
        .createObjectNode()
        .put("nodeId", getId(source))
        .put("pkgId", getId(source))
        .set("deps", depsNode);
  }

  private String getId(PackageRef ref) {
    return new StringBuilder(ref.name()).append("@").append(ref.version()).toString();
  }
}
