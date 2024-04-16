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

import org.cyclonedx.CycloneDxSchema.Version;
import org.cyclonedx.exception.ParseException;
import org.cyclonedx.model.Bom;
import org.cyclonedx.model.Component;
import org.cyclonedx.parsers.JsonParser;
import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.ValidationMessage;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.config.exception.CycloneDXValidationException;
import com.redhat.exhort.integration.backend.sbom.SbomParser;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.DirectDependency;

import jakarta.ws.rs.core.Response;

public class CycloneDxParser extends SbomParser {

  private static final ObjectMapper MAPPER = ObjectMapperProducer.newInstance();
  private static final Logger LOGGER = Logger.getLogger(CycloneDxParser.class);
  private static final JsonParser JSON_PARSER = new JsonParser();

  @Override
  protected DependencyTree buildTree(InputStream input) {

    var treeBuilder = DependencyTree.builder();
    var bom = parseBom(input);
    Map<String, PackageRef> componentPurls = new HashMap<>();
    if (bom.getComponents() != null) {
      componentPurls.putAll(
          bom.getComponents().stream()
              .filter(c -> c.getBomRef() != null && c.getPurl() != null)
              .collect(Collectors.toMap(Component::getBomRef, c -> new PackageRef(c.getPurl()))));
    }

    Optional<Component> rootComponent = Optional.empty();
    if (bom.getMetadata() != null) {
      rootComponent = Optional.ofNullable(bom.getMetadata().getComponent());
    }

    PackageRef rootRef = null;
    if (rootComponent.isPresent()) {
      if (rootComponent.get().getPurl() != null) {
        rootRef = new PackageRef(rootComponent.get().getPurl());
      } else if (componentPurls.containsKey(rootComponent.get().getBomRef())) {
        rootRef = componentPurls.get(rootComponent.get().getBomRef());
      }
    }
    return treeBuilder.dependencies(buildDependencies(bom, componentPurls, rootRef)).build();
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
                LOGGER.debugf("Ignore duplicate key %s", v);
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

  private Bom parseBom(InputStream input) {
    try {
      JsonNode node = MAPPER.readTree(input);
      var bom = MAPPER.treeToValue(node, Bom.class);
      var version = parseSchemaVersion(bom.getSpecVersion());
      var schema = JSON_PARSER.getJsonSchema(version, MAPPER);
      var errors = schema.validate(node);
      if (errors != null && !errors.isEmpty()) {
        throw new ParseException(
            errors.stream().map(ValidationMessage::getMessage).toList().toString());
      }
      return bom;
    } catch (ParseException e) {
      LOGGER.debug("CycloneDX Validation error: ", e);
      throw new CycloneDXValidationException(e, Response.Status.BAD_REQUEST);
    } catch (IOException e) {
      LOGGER.error("CycloneDX Validation error: ", e);
      throw new CycloneDXValidationException(e, Response.Status.BAD_REQUEST);
    }
  }

  private Version parseSchemaVersion(String version) throws ParseException {
    if (version == null) {
      throw new ParseException("Missing CycloneDX Spec Version");
    }
    switch (version) {
      case "1.5":
        return Version.VERSION_15;
      case "1.4":
        return Version.VERSION_14;
      case "1.3":
        return Version.VERSION_13;
      case "1.2":
        return Version.VERSION_12;
      case "1.1":
        return Version.VERSION_11;
      case "1.0":
        return Version.VERSION_10;
      default:
        throw new ParseException("Invalid Spec Version received");
    }
  }
}
