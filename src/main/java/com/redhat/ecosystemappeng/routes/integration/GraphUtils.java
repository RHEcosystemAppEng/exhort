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

package com.redhat.ecosystemappeng.routes.integration;

import static com.redhat.ecosystemappeng.routes.integration.Constants.PKG_MANAGER_HEADER;
import static com.redhat.ecosystemappeng.routes.integration.Constants.PROVIDER_HEADER;

import java.io.InputStream;
import java.util.Scanner;

import org.apache.camel.Body;
import org.apache.camel.Header;
import org.jgrapht.Graph;
import org.jgrapht.graph.builder.GraphBuilder;
import org.jgrapht.graph.builder.GraphTypeBuilder;

import com.redhat.ecosystemappeng.model.ComponentRequest;
import com.redhat.ecosystemappeng.model.GraphRequest;
import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.model.graph.DependencyEdge;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class GraphUtils {

    public static final String DEFAULT_APP_NAME = "com.redhat.ecosystemappeng:default-app";
    public static final String DEFAULT_APP_VERSION = "0.0.1";
    public static final PackageRef DEFAULT_ROOT = new PackageRef(DEFAULT_APP_NAME, DEFAULT_APP_VERSION);

    public GraphRequest fromPackages(ComponentRequest body) {
        GraphBuilder<PackageRef, DependencyEdge, Graph<PackageRef, DependencyEdge>> builder = GraphTypeBuilder
                .directed()
                .allowingSelfLoops(false)
                .vertexClass(PackageRef.class)
                .edgeSupplier(DependencyEdge::new)
                .buildGraphBuilder();
        builder.addVertex(DEFAULT_ROOT);
        body.packages().forEach(d -> builder.addEdge(DEFAULT_ROOT, d));
        return new GraphRequest(body.pkgManager(), body.provider(), builder.buildAsUnmodifiable());
    }

    public GraphRequest fromDotFile(@Body InputStream file, @Header(PKG_MANAGER_HEADER) String pkgManager, @Header(PROVIDER_HEADER) String provider) {
        GraphBuilder<PackageRef, DependencyEdge, Graph<PackageRef, DependencyEdge>> builder = GraphTypeBuilder
                .directed().allowingSelfLoops(false).vertexClass(PackageRef.class)
                .edgeSupplier(DependencyEdge::new)
                .buildGraphBuilder();
        try (Scanner scanner = new Scanner(file)) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.startsWith("digraph") || line.contains("}")) {
                    // ignore
                } else {
                    String[] vertices = line.replace(";", "").replaceAll("\"", "").split("->");
                    try {
                        builder.addEdge(PackageRef.parse(vertices[0].trim()), PackageRef.parse(vertices[1].trim()));
                    } catch (IllegalArgumentException e) {
                        // ignore loops caused by classifiers
                    }
                }
            }
        }
        return new GraphRequest(pkgManager, provider, builder.buildAsUnmodifiable());
    }
}
