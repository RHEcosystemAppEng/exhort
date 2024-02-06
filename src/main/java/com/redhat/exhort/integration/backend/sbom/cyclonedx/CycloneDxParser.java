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
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
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
      var treeBuilder = DependencyTree.builder();
      var bom = mapper.readValue(input, Bom.class);
      Map<String, PackageRef> componentPurls = new HashMap<>();
      if (bom.getComponents() != null) {
        componentPurls.putAll(
            bom.getComponents().stream()
                .filter(c -> c.getBomRef() != null)
                .collect(Collectors.toMap(Component::getBomRef, c -> new PackageRef(c.getPurl()))));
      }

      if (bom.getMetadata() == null) {
        throw new ClientErrorException(
            "Unable to parse CycloneDX SBOM. Missing metadata.", Response.Status.BAD_REQUEST);
      }
      var rootComponent = Optional.ofNullable(bom.getMetadata().getComponent());
      PackageRef rootRef = null;
      if (rootComponent.isPresent()) {
        if (rootComponent.get().getPurl() != null) {
          rootRef = new PackageRef(rootComponent.get().getPurl());
        } else if (componentPurls.containsKey(rootComponent.get().getBomRef())) {
          rootRef = componentPurls.get(rootComponent.get().getBomRef());
        }
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
      Bom bom, Map<String, PackageRef> componentPurls, PackageRef rootRef) {
    if (bom.getDependencies() == null || bom.getDependencies().isEmpty()) {
      return buildUnknownDependencies(componentPurls);
    }

    Map<PackageRef, List<PackageRef>> dependencies =
        bom.getDependencies().stream()
            .collect(
                Collectors.toMap(
                    d -> {
                      if (componentPurls.get(d.getRef()) == null) {
                        return rootRef;
                      }
                      return componentPurls.get(d.getRef());
                    },
                    d -> {
                      if (d.getDependencies() == null) {
                        return Collections.emptyList();
                      }
                      return d.getDependencies().stream()
                          .map(dep -> componentPurls.get(dep.getRef()))
                          .toList();
                    }));
    List<PackageRef> directDeps;
    addUnknownDependencies(dependencies, componentPurls);
    if (rootRef != null && dependencies.get(rootRef) != null) {
      directDeps = dependencies.get(rootRef);
    } else {
      directDeps =
          dependencies.keySet().stream()
              .filter(depRef -> dependencies.values().stream().noneMatch(d -> d.contains(depRef)))
              .toList();
    }

    return directDeps.stream()
        .map(directRef -> toDirectDependency(directRef, dependencies))
        .collect(Collectors.toMap(DirectDependency::ref, d -> d));
  }

  private void addUnknownDependencies(
      Map<PackageRef, List<PackageRef>> dependencies, Map<String, PackageRef> componentPurls) {
    Set<PackageRef> knownDeps = new HashSet<>(dependencies.keySet());
    dependencies.values().forEach(v -> knownDeps.addAll(v));
    componentPurls.values().stream()
        .filter(Predicate.not(knownDeps::contains))
        .forEach(d -> dependencies.put(d, Collections.emptyList()));
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

  private DirectDependency toDirectDependency(
      PackageRef directRef, Map<PackageRef, List<PackageRef>> dependencies) {
    var transitiveRefs = new HashSet<PackageRef>();
    findTransitive(directRef, dependencies, transitiveRefs);
    var transitive = new HashSet<>(transitiveRefs.stream().toList());
    return DirectDependency.builder().ref(directRef).transitive(transitive).build();
  }

  private void findTransitive(
      PackageRef ref, Map<PackageRef, List<PackageRef>> dependencies, Set<PackageRef> acc) {
    var deps = dependencies.get(ref);
    if (deps == null || deps.isEmpty()) {
      return;
    }
    deps.stream()
        .filter(d -> !acc.contains(d))
        .forEach(
            d -> {
              acc.add(d);
              findTransitive(d, dependencies, acc);
            });
  }
}
