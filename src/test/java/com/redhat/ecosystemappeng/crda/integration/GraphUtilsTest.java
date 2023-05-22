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

import java.io.InputStream;
import java.util.List;

import org.jgrapht.traverse.BreadthFirstIterator;
import org.junit.jupiter.api.Test;

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
        InputStream file =
                getClass().getClassLoader().getResourceAsStream("empty_dependencies.txt");
        List<String> providers = List.of(Constants.SNYK_PROVIDER);

        GraphRequest request =
                new GraphUtils()
                        .fromDepGraph(
                                file,
                                providers,
                                Constants.MAVEN_PKG_MANAGER,
                                Constants.TEXT_VND_GRAPHVIZ);
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
                                file,
                                providers,
                                Constants.MAVEN_PKG_MANAGER,
                                Constants.TEXT_VND_GRAPHVIZ);
        assertEquals(Constants.MAVEN_PKG_MANAGER, request.pkgManager());
        assertEquals(providers, request.providers());
        assertEquals(9, request.graph().edgeSet().size());
        assertEquals(10, request.graph().vertexSet().size());
        assertEquals(EXPECTED_ROOT, new BreadthFirstIterator<>(request.graph()).next());
    }

    @Test
    public void testParseEmptySBOM() {
        InputStream file = getClass().getClassLoader().getResourceAsStream("empty_sbom.json");
        List<String> providers = List.of(Constants.SNYK_PROVIDER);

        GraphRequest request =
                new GraphUtils()
                        .fromDepGraph(
                                file,
                                providers,
                                Constants.MAVEN_PKG_MANAGER,
                                MediaType.APPLICATION_JSON);
        assertEquals(Constants.MAVEN_PKG_MANAGER, request.pkgManager());
        assertEquals(providers, request.providers());
        assertEquals(0, request.graph().edgeSet().size());
        assertEquals(1, request.graph().vertexSet().size());
        assertEquals(GraphUtils.DEFAULT_ROOT, request.graph().vertexSet().iterator().next());
    }

    @Test
    public void testParseSBOM() {
        InputStream file = getClass().getClassLoader().getResourceAsStream("example_sbom.json");
        List<String> providers = List.of(Constants.SNYK_PROVIDER);

        GraphRequest request =
                new GraphUtils()
                        .fromDepGraph(
                                file,
                                providers,
                                Constants.MAVEN_PKG_MANAGER,
                                MediaType.APPLICATION_JSON);
        assertEquals(Constants.MAVEN_PKG_MANAGER, request.pkgManager());
        assertEquals(providers, request.providers());
        assertEquals(9, request.graph().edgeSet().size());
        assertEquals(10, request.graph().vertexSet().size());
        assertEquals(EXPECTED_ROOT, new BreadthFirstIterator<>(request.graph()).next());
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
                                                file,
                                                providers,
                                                Constants.MAVEN_PKG_MANAGER,
                                                MediaType.APPLICATION_JSON));
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
                                                file,
                                                providers,
                                                Constants.MAVEN_PKG_MANAGER,
                                                MediaType.TEXT_PLAIN));
        assertEquals("Unsupported Content-Type header: " + MediaType.TEXT_PLAIN, ex.getMessage());
        assertEquals(
                Response.Status.UNSUPPORTED_MEDIA_TYPE.getStatusCode(),
                ex.getResponse().getStatus());
    }
}
