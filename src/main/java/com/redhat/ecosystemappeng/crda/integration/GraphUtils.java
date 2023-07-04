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

package com.redhat.ecosystemappeng.crda.integration;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangeProperty;
import org.apache.camel.Header;
import org.cyclonedx.model.Bom;
import org.cyclonedx.model.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.ecosystemappeng.crda.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.crda.model.ComponentRequest;
import com.redhat.ecosystemappeng.crda.model.DependencyTree;
import com.redhat.ecosystemappeng.crda.model.DirectDependency;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.mail.internet.ContentType;
import jakarta.mail.internet.ParseException;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@RegisterForReflection
public class GraphUtils {

  public static final PackageRef DEFAULT_ROOT =
      PackageRef.builder()
          .namespace("com.redhat.ecosystemappeng")
          .name("default-app")
          .version("0.0.1")
          .pkgManager(Constants.MAVEN_PKG_MANAGER)
          .build();

  private static final ObjectMapper mapper = ObjectMapperProducer.newInstance();
  private static final Logger LOGGER = LoggerFactory.getLogger(GraphUtils.class);

  public GraphRequest fromPackages(
      @Body List<ComponentRequest> body,
      @ExchangeProperty(Constants.PROVIDERS_PARAM) List<String> providers,
      @Header(Constants.PKG_MANAGER_HEADER) String pkgManager) {
    DependencyTree tree =
        DependencyTree.builder()
            .root(DEFAULT_ROOT)
            .dependencies(
                body.stream()
                    .map(c -> c.toPackageRef(pkgManager))
                    .distinct()
                    .collect(
                        Collectors.toUnmodifiableMap(
                            d -> d, d -> DirectDependency.builder().ref(d).build())))
            .build();
    return new GraphRequest.Builder(pkgManager, providers).tree(tree).build();
  }

  public GraphRequest fromDepGraph(
      @Body InputStream file,
      @ExchangeProperty(Constants.PROVIDERS_PARAM) List<String> providers,
      @Header(Constants.PKG_MANAGER_HEADER) String pkgManager,
      @Header(Exchange.CONTENT_TYPE) String contentType) {
    DependencyTree tree;
    ContentType ct;
    try {
      ct = new ContentType(contentType);
    } catch (ParseException e) {
      throw new ClientErrorException(Response.Status.UNSUPPORTED_MEDIA_TYPE, e);
    }
    switch (ct.getBaseType()) {
      case Constants.TEXT_VND_GRAPHVIZ:
        // fromDot(file, builder);
        tree = fromDot(file, pkgManager);
        break;
      case MediaType.APPLICATION_JSON:
        // fromSbom(file, builder, pkgManager);
        tree = fromSbom(file, pkgManager);
        break;
      default:
        throw new ClientErrorException(
            "Unsupported Content-Type header: " + contentType,
            Response.Status.UNSUPPORTED_MEDIA_TYPE);
    }
    return new GraphRequest.Builder(pkgManager, providers).tree(tree).build();
  }

  private DependencyTree fromDot(InputStream file, String pkgManager) {
    DependencyTree.Builder treeBuilder = DependencyTree.builder();
    Map<PackageRef, DirectDependency.Builder> direct = new HashMap<>();
    try (Scanner scanner = new Scanner(file)) {
      while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        if (line.startsWith("digraph") || line.contains("}")) {
          // ignore
        } else {
          String[] vertices = line.replace(";", "").replaceAll("\"", "").split("->");
          PackageRef source;
          PackageRef target;
          try {
            source = PackageRef.parse(vertices[0].trim(), pkgManager);
            target = PackageRef.parse(vertices[1].trim(), pkgManager);
          } catch (IllegalArgumentException e) {
            // ignore loops caused by classifiers
            continue;
          }
          if (treeBuilder.root == null) {
            treeBuilder.root(source);
          }
          if (source.equals(treeBuilder.root)) {
            direct.put(target, DirectDependency.builder().ref(target).transitive(new HashSet<>()));
          } else {
            DirectDependency.Builder directBuilder = direct.get(source);
            if (directBuilder == null) {
              direct.values().stream()
                  .filter(d -> d.transitive.contains(source))
                  .forEach(d -> d.transitive.add(target));
            } else {
              directBuilder.transitive.add(target);
            }
          }
        }
      }
      Map<PackageRef, DirectDependency> deps =
          direct.entrySet().stream()
              .map(e -> Map.entry(e.getKey(), e.getValue().build()))
              .collect(Collectors.toUnmodifiableMap(Map.Entry::getKey, Map.Entry::getValue));
      treeBuilder.dependencies(deps);
    }
    if (treeBuilder.root == null) {
      treeBuilder.root(DEFAULT_ROOT);
    }
    return treeBuilder.build();
  }

  private DependencyTree fromSbom(InputStream file, String pkgManager) {
    try {
      boolean decode = requiresDecoding(pkgManager);
      DependencyTree.Builder treeBuilder = DependencyTree.builder();
      Map<PackageRef, DirectDependency.Builder> direct = new HashMap<>();

      Bom bom = mapper.readValue(file, Bom.class);
      Map<String, PackageRef> componentPurls = new HashMap<>();
      if (bom.getComponents() != null) {
        componentPurls.putAll(
            bom.getComponents().stream()
                .filter(c -> c.getBomRef() != null)
                .collect(
                    Collectors.toMap(
                        Component::getBomRef,
                        c -> fromComponent(c, requiresDecoding(pkgManager)))));
      }

      Optional<Component> rootComponent = Optional.ofNullable(bom.getMetadata().getComponent());
      if (rootComponent.isPresent()) {
        treeBuilder.root(fromComponent(rootComponent.get(), decode));
      } else { // rootless SBOM
        treeBuilder.root(DEFAULT_ROOT);
      }

      bom.getDependencies().stream()
          .forEach(
              d -> {
                if (rootComponent.isEmpty()) {
                  PackageRef ref = componentPurls.get(d.getRef());
                  direct.put(ref, DirectDependency.builder().ref(ref));
                } else if (d.getRef().equals(rootComponent.get().getBomRef())) {
                  d.getDependencies()
                      .forEach(
                          rootDep -> {
                            PackageRef ref = componentPurls.get(rootDep.getRef());
                            direct.put(
                                ref,
                                DirectDependency.builder().ref(ref).transitive(new HashSet<>()));
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
      Map<PackageRef, DirectDependency> deps =
          direct.entrySet().stream()
              .map(e -> Map.entry(e.getKey(), e.getValue().build()))
              .collect(Collectors.toUnmodifiableMap(Map.Entry::getKey, Map.Entry::getValue));
      return treeBuilder.dependencies(deps).build();
    } catch (IOException e) {
      LOGGER.error("Unable to parse the SBOM file", e);
      throw new ClientErrorException(
          "Unable to parse received SBOM file", Response.Status.BAD_REQUEST);
    }
  }

  private boolean requiresDecoding(String pkgManager) {
    return Constants.PIP_PKG_MANAGER.equals(pkgManager);
  }

  private PackageRef fromComponent(Component component, boolean decode) {
    try {
      String purl = component.getPurl();
      if (decode) {
        purl = URLDecoder.decode(component.getPurl(), StandardCharsets.UTF_8.name());
      }
      return PackageRef.builder().purl(purl).build();
    } catch (UnsupportedEncodingException e) {
      LOGGER.warn("Unsupported PURL format {}", component.getPurl(), e);
      throw new IllegalArgumentException("Unsupported PURL format: " + component.getPurl(), e);
    }
  }
}
