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

package com.redhat.exhort.integration.backend.sbom.cyclonedx;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.cyclonedx.model.Bom;
import org.cyclonedx.model.Component;
import org.cyclonedx.model.Dependency;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.backend.sbom.SbomParser;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.DirectDependency;
import com.redhat.exhort.model.DirectDependency.Builder;

import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.Response;

public class CycloneDxParser extends SbomParser {

  private static final ObjectMapper mapper = ObjectMapperProducer.newInstance();
  private static final Logger LOGGER = LoggerFactory.getLogger(CycloneDxParser.class);

  @Override
  protected DependencyTree buildTree(InputStream input) {
    try {
      DependencyTree.Builder treeBuilder = DependencyTree.builder();
      Map<PackageRef, DirectDependency.Builder> direct = new HashMap<>();
      String packageManager = Constants.MAVEN_PKG_MANAGER;

      Bom bom = mapper.readValue(input, Bom.class);
      Map<String, PackageRef> componentPurls = new HashMap<>();
      if (bom.getComponents() != null) {
        componentPurls.putAll(
            bom.getComponents().stream()
                .filter(c -> c.getBomRef() != null)
                .collect(
                    Collectors.toMap(
                        Component::getBomRef,
                        c -> PackageRef.builder().purl(c.getPurl()).build())));
        List<String> types =
            componentPurls.values().stream().map(v -> v.purl().getType()).distinct().toList();
        if (!types.isEmpty()) {
          packageManager = types.get(0);
        }
      }

      Optional<Component> rootComponent = Optional.ofNullable(bom.getMetadata().getComponent());
      if (rootComponent.isPresent()) {
        treeBuilder.root(PackageRef.builder().purl(rootComponent.get().getPurl()).build());
        if (!componentPurls.containsKey(rootComponent.get().getBomRef())) {
          componentPurls.put(
              rootComponent.get().getBomRef(), new PackageRef(rootComponent.get().getPurl()));
        }
      } else { // rootless SBOM
        treeBuilder.root(DependencyTree.getDefaultRoot(packageManager));
      }

      if (rootComponent.isPresent()) {
        Map<String, List<Dependency>> indexedDeps =
            bom.getDependencies().stream()
                .collect(
                    Collectors.toMap(
                        d -> d.getRef(),
                        d ->
                            Optional.ofNullable(d.getDependencies())
                                .orElse(Collections.emptyList())));
        List<Dependency> directDeps = indexedDeps.get(rootComponent.get().getBomRef());
        if (directDeps != null) {
          directDeps.forEach(
              d -> {
                PackageRef pkgRef = componentPurls.get(d.getRef());
                direct.put(pkgRef, new Builder().ref(pkgRef).transitive(new HashSet<>()));
                addDependencies(d.getRef(), indexedDeps, direct.get(pkgRef), componentPurls);
              });
        }
      } else {
        // Rootless sboms are expected to be flat. i.e. no transitive dependencies
        bom.getDependencies().stream()
            .map(d -> componentPurls.get(d.getRef()))
            .filter(Objects::nonNull)
            .forEach(
                c ->
                    direct.put(
                        c,
                        new DirectDependency.Builder().ref(c).transitive(Collections.emptySet())));
      }
      Map<PackageRef, DirectDependency> deps =
          direct.entrySet().stream()
              .map(e -> Map.entry(e.getKey(), e.getValue().build()))
              .collect(Collectors.toUnmodifiableMap(Map.Entry::getKey, Map.Entry::getValue));
      return treeBuilder.dependencies(deps).build();
    } catch (IOException e) {
      LOGGER.error("Unable to parse the CycloneDX SBOM file", e);
      throw new ClientErrorException(
          "Unable to parse received CycloneDX SBOM file", Response.Status.BAD_REQUEST);
    }
  }

  private void addDependencies(
      String bomRef,
      Map<String, List<Dependency>> indexedDeps,
      Builder builder,
      Map<String, PackageRef> componentPurls) {
    List<Dependency> deps = indexedDeps.get(bomRef);
    if (deps == null || deps.isEmpty()) {
      return;
    }
    deps.forEach(
        d -> {
          PackageRef tRef = componentPurls.get(d.getRef());
          if (!builder.transitive.contains(tRef)) {
            builder.transitive.add(tRef);
            addDependencies(d.getRef(), indexedDeps, builder, componentPurls);
          }
        });
  }
}
