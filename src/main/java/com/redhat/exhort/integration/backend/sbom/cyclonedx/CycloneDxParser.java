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
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.cyclonedx.model.Bom;
import org.cyclonedx.model.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.backend.sbom.SbomParser;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.DirectDependency;

import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.Response;

public class CycloneDxParser extends SbomParser {

  private static final ObjectMapper mapper = ObjectMapperProducer.newInstance();
  private static final Logger LOGGER = LoggerFactory.getLogger(CycloneDxParser.class);

  @Override
  protected DependencyTree buildTree(InputStream input) {
    try {
      DependencyTree.Builder treeBuilder = DependencyTree.builder();
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
      }

      Optional<Component> rootComponent = Optional.ofNullable(bom.getMetadata().getComponent());
      String rootRef = null;
      if (rootComponent.isPresent()) {
        rootRef = rootComponent.get().getBomRef();
      }
      return treeBuilder.dependencies(buildDependencies(bom, componentPurls, rootRef)).build();
    } catch (IOException | IllegalStateException e) {
      LOGGER.error("Unable to parse the CycloneDX SBOM file", e);
      throw new ClientErrorException(
          "Unable to parse received CycloneDX SBOM file: " + e.getMessage(),
          Response.Status.BAD_REQUEST);
    }
  }

  private Map<PackageRef, DirectDependency> buildDependencies(
      Bom bom, Map<String, PackageRef> componentPurls, String rootRef) {
    if (bom.getDependencies() == null || bom.getDependencies().isEmpty()) {
      return buildUnknownDependencies(componentPurls);
    }
    Map<PackageRef, DirectDependency.Builder> direct = new HashMap<>();
    bom.getDependencies().stream()
        .forEach(
            d -> {
              if (rootRef == null) {
                PackageRef ref = componentPurls.get(d.getRef());
                direct.put(ref, DirectDependency.builder().ref(ref));
              } else if (d.getRef().equals(rootRef)) {
                d.getDependencies()
                    .forEach(
                        rootDep -> {
                          PackageRef ref = componentPurls.get(rootDep.getRef());
                          direct.put(
                              ref, DirectDependency.builder().ref(ref).transitive(new HashSet<>()));
                        });
              } else if (d.getDependencies() != null) {
                PackageRef source = componentPurls.get(d.getRef());
                DirectDependency.Builder directBuilder = direct.get(source);
                if (directBuilder == null) {
                  direct.values().stream()
                      .filter(v -> v.transitive.contains(source))
                      .forEach(
                          v ->
                              d.getDependencies()
                                  .forEach(
                                      t -> {
                                        PackageRef target = componentPurls.get(t.getRef());
                                        v.transitive.add(target);
                                      }));
                } else {
                  d.getDependencies()
                      .forEach(
                          t -> {
                            PackageRef target = componentPurls.get(t.getRef());
                            directBuilder.transitive.add(target);
                          });
                }
              }
            });
    return direct.entrySet().stream()
        .map(e -> Map.entry(e.getKey(), e.getValue().build()))
        .collect(Collectors.toUnmodifiableMap(Map.Entry::getKey, Map.Entry::getValue));
  }

  // The SBOM generator does not have info about the dependency hierarchy
  private Map<PackageRef, DirectDependency> buildUnknownDependencies(
      Map<String, PackageRef> componentPurls) {
    Map<PackageRef, DirectDependency> deps = new HashMap<>();
    componentPurls
        .values()
        .forEach(
            v -> {
              if (deps.containsKey(v)) {
                throw new IllegalStateException("Duplicate component: " + v.purl());
              }
              deps.put(v, DirectDependency.builder().ref(v).build());
            });
    return deps;
  }
}
