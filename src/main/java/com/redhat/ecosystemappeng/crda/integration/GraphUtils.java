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

import java.io.InputStream;
import java.util.List;
import java.util.Scanner;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;
import org.apache.camel.Header;
import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.builder.GraphBuilder;
import org.jgrapht.graph.builder.GraphTypeBuilder;

import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class GraphUtils {

    public static final String DEFAULT_APP_NAME = "com.redhat.ecosystemappeng:default-app";
    public static final String DEFAULT_APP_VERSION = "0.0.1";
    public static final PackageRef DEFAULT_ROOT = new PackageRef(DEFAULT_APP_NAME, DEFAULT_APP_VERSION);

    public GraphRequest fromPackages(@Body List<PackageRef> body, @ExchangeProperty(Constants.PROVIDERS_PARAM) List<String> providers, @Header(Constants.PKG_MANAGER_HEADER) String pkgManager) {
        GraphBuilder<PackageRef, DefaultEdge, Graph<PackageRef, DefaultEdge>> builder = GraphTypeBuilder
                .directed()
                .allowingSelfLoops(false)
                .vertexClass(PackageRef.class)
                .edgeSupplier(DefaultEdge::new)
                .buildGraphBuilder();
        builder.addVertex(DEFAULT_ROOT);
        body.forEach(d -> builder.addEdge(DEFAULT_ROOT, d));
        return new GraphRequest.Builder(pkgManager, providers).graph(builder.buildAsUnmodifiable()).build();
    }

    public GraphRequest fromDotFile(@Body InputStream file, @ExchangeProperty(Constants.PROVIDERS_PARAM) List<String> providers, @Header(Constants.PKG_MANAGER_HEADER) String pkgManager) {
        GraphBuilder<PackageRef, DefaultEdge, Graph<PackageRef, DefaultEdge>> builder = GraphTypeBuilder
                .directed().allowingSelfLoops(false).vertexClass(PackageRef.class)
                .edgeSupplier(DefaultEdge::new)
                .buildGraphBuilder();
        try (Scanner scanner = new Scanner(file)) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.startsWith("digraph") || line.contains("}")) {
                    // ignore
                } else {
                    String[] vertices = line.replace(";", "").replaceAll("\"", "").split("->");
                    try {
                        PackageRef source = PackageRef.parse(vertices[0].trim());
                        PackageRef target = PackageRef.parse(vertices[1].trim());
                        builder.addEdge(source, target);
                    } catch (IllegalArgumentException e) {
                        // ignore loops caused by classifiers
                    }
                }
            }
        }
        return new GraphRequest.Builder(pkgManager, providers).graph(builder.buildAsUnmodifiable()).build();
    }

}
