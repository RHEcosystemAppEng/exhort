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

package com.redhat.exhort.integration.backend.sbom.spdx;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spdx.jacksonstore.MultiFormatStore;
import org.spdx.jacksonstore.MultiFormatStore.Format;
import org.spdx.library.InvalidSPDXAnalysisException;
import org.spdx.library.model.SpdxPackage;
import org.spdx.library.model.enumerations.RelationshipType;
import org.spdx.storage.simple.InMemSpdxStore;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.integration.backend.sbom.SbomParser;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.DirectDependency;

import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.Response;

public class SpdxParser extends SbomParser {

  private static final Logger LOGGER = LoggerFactory.getLogger(SpdxParser.class);

  @Override
  protected DependencyTree buildTree(InputStream input) {
    try {
      var inputStore = new MultiFormatStore(new InMemSpdxStore(), Format.JSON_PRETTY);
      var wrapper = new SpdxWrapper(inputStore, input);
      var deps = buildDeps(wrapper);
      var tree = new DependencyTree(deps);
      return tree;
    } catch (SpdxProcessingException | InvalidSPDXAnalysisException | IOException e) {
      LOGGER.error("Unable to parse the SPDX SBOM file", e);
      throw new ClientErrorException(
          "Unable to parse received SPDX SBOM file: " + e.getMessage(),
          Response.Status.BAD_REQUEST);
    }
  }

  private Map<PackageRef, DirectDependency> buildDeps(SpdxWrapper wrapper) {
    var packages = wrapper.getPackages();
    Map<String, Set<String>> links = new HashMap<>();
    packages.stream().forEach(p -> createPackageLinks(p, packages, links));

    var directDeps =
        links.keySet().stream()
            .filter(
                k ->
                    links.entrySet().stream()
                        .filter(e -> !e.getKey().equals(k))
                        .noneMatch(e -> e.getValue().contains(k)))
            .collect(Collectors.toSet());
    if (!links.isEmpty() && directDeps.isEmpty()) {
      throw new SpdxProcessingException(
          "Unable to calculate direct dependencies due to a cyclic relationship");
    }

    Map<String, Set<String>> flatDepTree = new HashMap<>();
    directDeps.stream()
        .forEach(
            d -> {
              flatDepTree.put(d, addAllTransitive(d, links));
            });
    Map<PackageRef, DirectDependency> deps = new HashMap<>();
    flatDepTree.keySet().stream()
        .map(wrapper::getPackageById)
        .forEach(
            p -> {
              PackageRef ref = wrapper.toPackageRef(p);
              Set<PackageRef> transitive =
                  flatDepTree.get(p.getId()).stream()
                      .map(wrapper::getPackageById)
                      .map(wrapper::toPackageRef)
                      .collect(Collectors.toSet());
              DirectDependency dep = new DirectDependency(ref, transitive);
              deps.put(ref, dep);
            });
    return deps;
  }

  private void createPackageLinks(
      SpdxPackage p, Collection<SpdxPackage> packages, Map<String, Set<String>> links) {
    try {
      var pkgId = p.getId();
      if (packages.stream().noneMatch(pkg -> pkg.getId().equals(pkgId))) {
        return;
      }
      if (p.getRelationships() == null || p.getRelationships().isEmpty()) {
        addLink(links, pkgId, null);
      }
      p.getRelationships().stream()
          .forEach(
              rel -> {
                try {
                  String relatedId;
                  if (rel.getRelatedSpdxElement().isPresent()) {
                    relatedId = rel.getRelatedSpdxElement().get().getId();
                  } else {
                    relatedId = null;
                  }
                  boolean shouldIndexRelated =
                      packages.stream().anyMatch(pkg -> pkg.getId().equals(relatedId));

                  switch (RelationshipDirection.fromRelationshipType(rel.getRelationshipType())) {
                    case FORWARD:
                      if (shouldIndexRelated) {
                        addLink(links, pkgId, relatedId);
                      } else {
                        addLink(links, pkgId, null);
                      }
                      break;
                    case BACKWARDS:
                      if (shouldIndexRelated) {
                        addLink(links, relatedId, pkgId);
                      }
                      break;
                    case IGNORED:
                  }
                } catch (InvalidSPDXAnalysisException e) {
                  throw new SpdxProcessingException(
                      "Unable to determine relationship for " + p.getId(), e);
                }
              });
    } catch (InvalidSPDXAnalysisException e) {
      throw new SpdxProcessingException("Unable to build package relationships", e);
    }
  }

  private enum RelationshipDirection {
    FORWARD,
    BACKWARDS,
    IGNORED;

    static RelationshipDirection fromRelationshipType(RelationshipType type) {
      return switch (type) {
        case DEPENDS_ON,
            CONTAINS,
            BUILD_DEPENDENCY_OF,
            OPTIONAL_COMPONENT_OF,
            OPTIONAL_DEPENDENCY_OF,
            PROVIDED_DEPENDENCY_OF,
            TEST_DEPENDENCY_OF,
            RUNTIME_DEPENDENCY_OF,
            DEV_DEPENDENCY_OF,
            ANCESTOR_OF -> FORWARD;
        case DEPENDENCY_OF, DESCENDANT_OF, PACKAGE_OF, CONTAINED_BY -> BACKWARDS;
        default -> IGNORED;
      };
    }
  }

  private void addLink(Map<String, Set<String>> links, String fromId, String toId) {
    var toRefs = links.get(fromId);
    if (toRefs == null) {
      toRefs = new HashSet<>();
      links.put(fromId, toRefs);
    }
    if (toId != null) {
      toRefs.add(toId);
    }
  }

  private Set<String> addAllTransitive(String depKey, Map<String, Set<String>> links) {
    var deps = links.get(depKey);
    if (deps == null) {
      return Collections.emptySet();
    }
    var result = new HashSet<>(deps);
    deps.stream()
        .forEach(
            d -> {
              result.addAll(addAllTransitive(d, links));
            });
    return result;
  }
}
