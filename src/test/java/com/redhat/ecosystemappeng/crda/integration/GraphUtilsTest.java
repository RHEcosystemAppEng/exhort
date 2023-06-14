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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.params.provider.Arguments.arguments;

import java.io.InputStream;
import java.util.List;
import java.util.stream.Stream;

import org.jgrapht.traverse.BreadthFirstIterator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

public class GraphUtilsTest {

  private static final PackageRef EXPECTED_ROOT =
      new PackageRef("org.acme.dbaas:postgresql-orm-quarkus", "1.0.0-SNAPSHOT");

  @Test
  public void testParseEmptyDotFile() {
    InputStream file = getClass().getClassLoader().getResourceAsStream("empty_dependencies.txt");
    List<String> providers = List.of(Constants.SNYK_PROVIDER);

    GraphRequest request =
        new GraphUtils()
            .fromDepGraph(
                file, providers, Constants.MAVEN_PKG_MANAGER, Constants.TEXT_VND_GRAPHVIZ);
    assertEquals(Constants.MAVEN_PKG_MANAGER, request.pkgManager());
    assertEquals(providers, request.providers());
    assertEquals(0, request.graph().edgeSet().size());
    assertEquals(1, request.graph().vertexSet().size());
    assertEquals(GraphUtils.DEFAULT_ROOT, request.graph().vertexSet().iterator().next());
  }

  @Test
  public void testParseDotFile() {
    InputStream file = getClass().getClassLoader().getResourceAsStream("dependencies.txt");
    List<String> providers = List.of(Constants.SNYK_PROVIDER);

    GraphRequest request =
        new GraphUtils()
            .fromDepGraph(
                file, providers, Constants.MAVEN_PKG_MANAGER, Constants.TEXT_VND_GRAPHVIZ);
    assertEquals(Constants.MAVEN_PKG_MANAGER, request.pkgManager());
    assertEquals(providers, request.providers());
    assertEquals(9, request.graph().edgeSet().size());
    assertEquals(10, request.graph().vertexSet().size());
    assertEquals(EXPECTED_ROOT, new BreadthFirstIterator<>(request.graph()).next());
  }

  @Test
  public void testParseEmptySBOM() {
    InputStream file = getClass().getClassLoader().getResourceAsStream("sboms/empty-sbom.json");
    List<String> providers = List.of(Constants.SNYK_PROVIDER);

    GraphRequest request =
        new GraphUtils()
            .fromDepGraph(file, providers, Constants.MAVEN_PKG_MANAGER, MediaType.APPLICATION_JSON);
    assertEquals(Constants.MAVEN_PKG_MANAGER, request.pkgManager());
    assertEquals(providers, request.providers());
    assertEquals(0, request.graph().edgeSet().size());
    assertEquals(1, request.graph().vertexSet().size());
    assertEquals(GraphUtils.DEFAULT_ROOT, request.graph().vertexSet().iterator().next());
  }

  @Test
  public void testParseInvalidSBOM() {
    InputStream file = getClass().getClassLoader().getResourceAsStream("invalid_deps_file.txt");
    List<String> providers = List.of(Constants.SNYK_PROVIDER);
    ClientErrorException ex =
        assertThrows(
            ClientErrorException.class,
            () ->
                new GraphUtils()
                    .fromDepGraph(
                        file, providers, Constants.MAVEN_PKG_MANAGER, MediaType.APPLICATION_JSON));
    assertEquals("Unable to parse received SBOM file", ex.getMessage());
    assertEquals(Response.Status.BAD_REQUEST.getStatusCode(), ex.getResponse().getStatus());
  }

  @Test
  public void testInvalidContentType() {
    InputStream file = getClass().getClassLoader().getResourceAsStream("invalid_deps_file.txt");
    List<String> providers = List.of(Constants.SNYK_PROVIDER);
    ClientErrorException ex =
        assertThrows(
            ClientErrorException.class,
            () ->
                new GraphUtils()
                    .fromDepGraph(
                        file, providers, Constants.MAVEN_PKG_MANAGER, MediaType.TEXT_PLAIN));
    assertEquals("Unsupported Content-Type header: " + MediaType.TEXT_PLAIN, ex.getMessage());
    assertEquals(
        Response.Status.UNSUPPORTED_MEDIA_TYPE.getStatusCode(), ex.getResponse().getStatus());
  }

  @ParameterizedTest
  @MethodSource("getSbomUseCases")
  void testSbom(String pkgManager, int edges, int vertices, PackageRef root) {
    String fileName = String.format("sboms/%s-sbom.json", pkgManager);
    InputStream file = getClass().getClassLoader().getResourceAsStream(fileName);
    List<String> providers = List.of(Constants.SNYK_PROVIDER);

    GraphRequest request =
        new GraphUtils().fromDepGraph(file, providers, pkgManager, MediaType.APPLICATION_JSON);
    assertEquals(pkgManager, request.pkgManager());
    assertEquals(providers, request.providers());
    assertEquals(edges, request.graph().edgeSet().size());
    assertEquals(vertices, request.graph().vertexSet().size());
    assertEquals(root, new BreadthFirstIterator<>(request.graph()).next());
  }

  static Stream<Arguments> getSbomUseCases() {
    return Stream.of(
        arguments(Constants.MAVEN_PKG_MANAGER, 9, 10, EXPECTED_ROOT),
        arguments(Constants.GRADLE_PKG_MANAGER, 338, 146, EXPECTED_ROOT),
        arguments(
            Constants.GOMOD_PKG_MANAGER,
            52,
            36,
            new PackageRef(
                "github.com/fabric8-analytics:cli-tools", "v0.2.6-0.20211007133944-2af417bfb988")),
        arguments(
            Constants.NPM_PKG_MANAGER,
            17,
            16,
            new PackageRef("fabric8-analytics-lsp-server", "0.0.0-development")),
        arguments(Constants.PIP_PKG_MANAGER, 96, 97, GraphUtils.DEFAULT_ROOT));
  }
}
