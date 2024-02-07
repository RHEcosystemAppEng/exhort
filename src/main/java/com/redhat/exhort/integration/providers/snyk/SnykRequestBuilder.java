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

import static com.redhat.exhort.integration.Constants.UNSCANNED_REASON_UNSUPPORTED_PACKAGE_TYPE;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.UnscannedDependency;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykRequestBuilder {

  private static final Logger LOGGER = LoggerFactory.getLogger(SnykRequestBuilder.class);

  private static final String GOMODULES_PKG_MANAGER = "gomodules";
  private static final String RUBYGEMS_PKG_MANAGER = "rubygems";
  private static final String PIP_PKG_MANAGER = "pip";

  public static final List<String> SUPPORTED_PURL_TYPES =
      Collections.unmodifiableList(
          new ArrayList<>() {
            {
              add(Constants.MAVEN_PURL_TYPE);
              add(Constants.NPM_PURL_TYPE);
              add(Constants.PYPI_PURL_TYPE);
              add(Constants.GOLANG_PURL_TYPE);
              add(Constants.DEB_PURL_TYPE);
              add(Constants.NUGET_PURL_TYPE);
              add(Constants.GEM_PURL_TYPE);
              add(Constants.RPM_PURL_TYPE);
              add(Constants.COCOAPODS_PURL_TYPE);
            }
          });

  private ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public String buildRequest(Set<PackageRef> refs) throws JsonProcessingException {
    var defaultRoot = DependencyTree.getDefaultRoot(getPkgManager(refs));
    var depGraph = mapper.createObjectNode();
    depGraph.put("schemaVersion", "1.2.0");
    depGraph.set(
        "pkgManager",
        mapper.createObjectNode().put("name", toSnykPackageManager(defaultRoot.purl().getType())));

    depGraph.set("pkgs", addPackages(depGraph, refs, defaultRoot));
    var root = mapper.createObjectNode().set("depGraph", depGraph);
    return mapper.writeValueAsString(root);
  }

  public boolean isEmpty(@Body Collection<Set<PackageRef>> body) {
    return body == null || body.isEmpty();
  }

  @SuppressWarnings("unchecked")
  public static void validate(Exchange exchange) {
    var tree = (Set<PackageRef>) exchange.getIn().getBody(Set.class);
    Set<String> types = new HashSet<>();
    tree.forEach(
        d -> {
          if (d.purl().getVersion() == null) {
            throw new IllegalArgumentException("Version must not be null for package: " + d.purl());
          }
          types.add(d.purl().getType());
        });
    var invalidTypes =
        types.stream().filter(Predicate.not(SUPPORTED_PURL_TYPES::contains)).toList();
    if (!invalidTypes.isEmpty()) {
      LOGGER.debug("Unsupported package url types received: {}", invalidTypes);
      exchange.setProperty(
          Constants.UNSCANNED_REFS_PROPERTY,
          tree.stream()
              .map(
                  ref ->
                      new UnscannedDependency()
                          .ref(ref)
                          .reason(UNSCANNED_REASON_UNSUPPORTED_PACKAGE_TYPE))
              .toList());
    }
  }

  public Collection<Set<PackageRef>> splitByPkgManager(DependencyTree tree) {
    Map<String, Set<PackageRef>> treesByPkg = new HashMap<>();
    tree.getAll()
        .forEach(
            d -> {
              var type = d.purl().getType();
              var pkgTree = treesByPkg.get(type);
              if (pkgTree == null) {
                pkgTree = new HashSet<>();
                treesByPkg.put(type, pkgTree);
              }
              pkgTree.add(d);
            });
    return treesByPkg.values();
  }

  private JsonNode addPackages(ObjectNode depGraph, Set<PackageRef> refs, PackageRef root) {
    var rootNode = createNode(root, refs);
    var nodes = mapper.createArrayNode().add(rootNode);
    var pkgs = mapper.createArrayNode().add(createPkg(root));

    refs.stream()
        .collect(Collectors.toMap(k -> getId(k), v -> v, (a, b) -> a))
        .values()
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

  private String getPkgManager(Set<PackageRef> refs) {
    if (refs == null || refs.isEmpty()) {
      return Constants.MAVEN_PURL_TYPE;
    }
    return refs.iterator().next().purl().getType();
  }

  private String toSnykPackageManager(String pkgManager) {
    return switch (pkgManager) {
      case Constants.GOLANG_PURL_TYPE -> GOMODULES_PKG_MANAGER;
      case Constants.PYPI_PURL_TYPE -> PIP_PKG_MANAGER;
      case Constants.GEM_PURL_TYPE -> RUBYGEMS_PKG_MANAGER;
        // cocoapods
        // rpm
        // maven
        // deb
        // nuget
      default -> pkgManager;
    };
  }
}
