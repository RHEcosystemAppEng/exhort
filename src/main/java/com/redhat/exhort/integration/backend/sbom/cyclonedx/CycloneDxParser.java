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
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.cyclonedx.model.Bom;
import org.cyclonedx.model.Component;
import org.cyclonedx.model.Dependency;
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
      var treeBuilder = DependencyTree.builder();
      var bom = mapper.readValue(input, Bom.class);
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

      if (bom.getMetadata() == null) {
        throw new ClientErrorException(
            "Unable to parse CycloneDX SBOM. Missing metadata.", Response.Status.BAD_REQUEST);
      }
      var rootComponent = Optional.ofNullable(bom.getMetadata().getComponent());
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
    Map<PackageRef, DirectDependency.Builder> directDepBuilders = new HashMap<>();
    if (rootRef == null) {
      var transitive =
          bom.getDependencies().stream()
              .map(Dependency::getDependencies)
              .filter(Objects::nonNull)
              .flatMap(List::stream)
              .map(Dependency::getRef)
              .toList();
      bom.getDependencies().stream()
          .map(Dependency::getRef)
          .filter(Predicate.not(transitive::contains))
          .forEach(
              dref -> {
                PackageRef r = componentPurls.get(dref);
                directDepBuilders.put(
                    r, DirectDependency.builder().ref(r).transitive(new HashSet<>()));
              });
    }
    bom.getDependencies().stream()
        .forEach(
            bomDep -> {
              if (bomDep.getRef().equals(rootRef)) {
                bomDep
                    .getDependencies()
                    .forEach(
                        rootDep -> {
                          var ref = componentPurls.get(rootDep.getRef());
                          directDepBuilders.put(
                              ref, DirectDependency.builder().ref(ref).transitive(new HashSet<>()));
                        });
              } else if (bomDep.getDependencies() != null) {
                var source = componentPurls.get(bomDep.getRef());
                var directBuilder = directDepBuilders.get(source);
                if (directBuilder == null) {
                  directDepBuilders.values().stream()
                      .forEach(
                          builder ->
                              bomDep
                                  .getDependencies()
                                  .forEach(
                                      t -> {
                                        PackageRef target = componentPurls.get(t.getRef());
                                        builder.transitive.add(target);
                                      }));
                } else {
                  bomDep
                      .getDependencies()
                      .forEach(
                          t -> {
                            PackageRef target = componentPurls.get(t.getRef());
                            directBuilder.transitive.add(target);
                          });
                }
              }
            });
    return directDepBuilders.entrySet().stream()
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
