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

package com.redhat.exhort.integration.backend.sbom;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.junit.jupiter.params.provider.Arguments.arguments;

import java.io.InputStream;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

import org.cyclonedx.CycloneDxMediaType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.backend.sbom.cyclonedx.CycloneDxParser;
import com.redhat.exhort.integration.backend.sbom.spdx.SpdxParser;
import com.redhat.exhort.model.DependencyTree;

import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

public class SbomParserTest {

  private static final Collection<String> MEDIA_TYPES =
      List.of(Constants.SPDX_MEDIATYPE_JSON, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON);
  private static final PackageRef DEFAULT_MAVEN_ROOT =
      DependencyTree.getDefaultRoot(Constants.MAVEN_PKG_MANAGER);
  private static final PackageRef EXPECTED_ROOT =
      PackageRef.builder()
          .namespace("org.acme.dbaas")
          .name("postgresql-orm-quarkus")
          .version("1.0.0-SNAPSHOT")
          .pkgManager(Constants.MAVEN_PKG_MANAGER)
          .build();

  @Test
  void testInvalidContentType() {
    ClientErrorException ex =
        assertThrows(
            ClientErrorException.class, () -> SbomParserFactory.newInstance(MediaType.TEXT_PLAIN));
    assertEquals("Unsupported Content-Type header: " + MediaType.TEXT_PLAIN, ex.getMessage());
    assertEquals(
        Response.Status.UNSUPPORTED_MEDIA_TYPE.getStatusCode(), ex.getResponse().getStatus());
  }

  @Test
  void testCycloneDxContentType() {
    SbomParser parser =
        SbomParserFactory.newInstance(CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON);
    assertNotNull(parser);
    assertTrue(parser instanceof CycloneDxParser);
  }

  @Test
  void testSpdxContentType() {
    SbomParser parser = SbomParserFactory.newInstance(Constants.SPDX_MEDIATYPE_JSON);
    assertNotNull(parser);
    assertTrue(parser instanceof SpdxParser);
  }

  @ParameterizedTest
  @MethodSource("getMediaTypes")
  void testParseEmptySBOM(String mediaType) {
    SbomParser parser = SbomParserFactory.newInstance(mediaType);
    String fileName = String.format("%s/empty-sbom.json", getFolder(mediaType));
    InputStream file = getClass().getClassLoader().getResourceAsStream(fileName);

    DependencyTree tree = parser.buildTree(file);
    assertEquals(0, tree.dependencies().size());
    assertEquals(EXPECTED_ROOT, tree.root());
  }

  @ParameterizedTest
  @MethodSource("getMediaTypes")
  void testSBOMWithoutDependencies(String mediaType) {
    SbomParser parser = SbomParserFactory.newInstance(mediaType);
    String fileName = String.format("%s/no-deps-sbom.json", getFolder(mediaType));
    InputStream file = getClass().getClassLoader().getResourceAsStream(fileName);

    DependencyTree tree = parser.buildTree(file);
    assertEquals(0, tree.dependencies().size());
    assertEquals(EXPECTED_ROOT, tree.root());
  }

  @ParameterizedTest
  @MethodSource("getMediaTypes")
  void testParseInvalidSBOM(String mediaType) {
    SbomParser parser = SbomParserFactory.newInstance(mediaType);
    InputStream file = getClass().getClassLoader().getResourceAsStream("invalid_deps_file.txt");
    ClientErrorException ex =
        assertThrows(ClientErrorException.class, () -> parser.buildTree(file));
    assertNotNull(ex);
    assertEquals(Response.Status.BAD_REQUEST.getStatusCode(), ex.getResponse().getStatus());
  }

  @ParameterizedTest
  @MethodSource("getMediaTypes")
  void testMinimalSbom(String mediaType) {
    SbomParser parser = SbomParserFactory.newInstance(mediaType);
    String fileName = String.format("%s/minimal-sbom.json", getFolder(mediaType));
    InputStream file = getClass().getClassLoader().getResourceAsStream(fileName);

    DependencyTree tree = parser.buildTree(file);
    assertEquals(2, tree.dependencies().size());
    assertEquals(7, tree.transitiveCount());
    assertEquals(EXPECTED_ROOT, tree.root());
  }

  @ParameterizedTest
  @MethodSource("getSbomUseCases")
  void testSbom(String mediaType, String pkgManager, int direct, int transitive, PackageRef root) {
    SbomParser parser = SbomParserFactory.newInstance(mediaType);
    String fileName = String.format("%s/%s-sbom.json", getFolder(mediaType), pkgManager);
    InputStream file = getClass().getClassLoader().getResourceAsStream(fileName);

    DependencyTree tree = parser.buildTree(file);
    assertEquals(direct, tree.dependencies().size());
    assertEquals(transitive, tree.transitiveCount());
    assertEquals(root, tree.root());
  }

  static Stream<String> getMediaTypes() {
    return MEDIA_TYPES.stream();
  }

  static Stream<Arguments> getSbomUseCases() {
    return getMediaTypes()
        .mapMulti(
            (t, consumer) -> {
              consumer.accept(arguments(t, Constants.MAVEN_PKG_MANAGER, 2, 7, EXPECTED_ROOT));
              consumer.accept(
                  arguments(
                      t,
                      Constants.GOLANG_PKG_MANAGER,
                      2,
                      3,
                      PackageRef.builder()
                          .namespace("github.com/fabric8-analytics")
                          .name("cli-tools")
                          .version("v0.2.6-0.20211007133944-2af417bfb988")
                          .pkgManager(Constants.NPM_PKG_MANAGER)
                          .build()));
              consumer.accept(
                  arguments(
                      t,
                      Constants.NPM_PKG_MANAGER,
                      2,
                      3,
                      PackageRef.builder()
                          .name("fabric8-analytics-lsp-server")
                          .version("0.0.0-development")
                          .pkgManager(Constants.NPM_PKG_MANAGER)
                          .build()));
              consumer.accept(arguments(t, Constants.PYPI_PKG_MANAGER, 2, 0, DEFAULT_MAVEN_ROOT));
            });
  }

  private String getFolder(String mediaType) {
    switch (mediaType) {
      case CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON:
        return "cyclonedx";
      case Constants.SPDX_MEDIATYPE_JSON:
        return "spdx";
      default:
        fail("Not implemented: " + mediaType);
    }
    return null;
  }
}
