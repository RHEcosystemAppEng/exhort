package com.redhat.ecosystemappeng.utils;

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

    public GraphRequest fromDotFile(@Body InputStream file, @Header("pkgManager") String pkgManager, @Header("provider") String provider) {
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
