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

package com.redhat.exhort.integration.providers.snyk;

import java.util.Collections;
import java.util.Set;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykRequestBuilder {

  private ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public String fromDiGraph(DependencyTree req) throws JsonProcessingException {
    var defaultRoot = DependencyTree.getDefaultRoot(getPkgManager(req));
    var depGraph = mapper.createObjectNode();
    depGraph.put("schemaVersion", "1.2.0");
    depGraph.set(
        "pkgManager",
        mapper.createObjectNode().put("name", toSnykPackageManager(defaultRoot.purl().getType())));

    depGraph.set("pkgs", addPackages(depGraph, req, defaultRoot));
    var root = mapper.createObjectNode().set("depGraph", depGraph);
    return mapper.writeValueAsString(root);
  }

  private JsonNode addPackages(ObjectNode depGraph, DependencyTree tree, PackageRef root) {
    var allDeps = tree.getAll();
    var rootNode = createNode(root, allDeps);
    var nodes = mapper.createArrayNode().add(rootNode);
    var pkgs = mapper.createArrayNode().add(createPkg(root));

    allDeps.stream()
        .forEach(
            d -> {
              pkgs.add(createPkg(d));
              nodes.add(createNode(d, Collections.emptySet()));
            });
    depGraph.set("pkgs", pkgs);
    depGraph.set(
        "graph", mapper.createObjectNode().put("rootNodeId", getId(root)).set("nodes", nodes));
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
    var depsNode = mapper.createArrayNode();
    deps.forEach(e -> depsNode.add(mapper.createObjectNode().put("nodeId", getId(e))));
    return mapper
        .createObjectNode()
        .put("nodeId", getId(source))
        .put("pkgId", getId(source))
        .set("deps", depsNode);
  }

  private String getId(PackageRef pkg) {
    return new StringBuilder(pkg.name()).append("@").append(pkg.version()).toString();
  }

  private String getPkgManager(DependencyTree tree) {
    var first = tree.dependencies().keySet().stream().findFirst();
    if (first.isEmpty()) {
      return Constants.MAVEN_PKG_MANAGER;
    }
    return first.get().purl().getType();
  }

  private String toSnykPackageManager(String pkgManager) {
    return switch (pkgManager) {
      case Constants.GOLANG_PKG_MANAGER -> "gomodules";
      case Constants.PYPI_PKG_MANAGER -> "pip";
      default -> pkgManager;
    };
  }
}
