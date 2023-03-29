package com.redhat.ecosystemappeng.utils;

import java.io.InputStream;
import java.util.Scanner;

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

    public GraphRequest fromPackages(ComponentRequest body) {
        GraphBuilder<PackageRef, DependencyEdge, Graph<PackageRef, DependencyEdge>> builder = GraphTypeBuilder
                .directed()
                .allowingSelfLoops(false)
                .vertexClass(PackageRef.class)
                .edgeSupplier(DependencyEdge::new)
                .buildGraphBuilder();
        PackageRef root = new PackageRef("com.redhat.ecosystemappeng:default-app", "0.0.1");
        builder.addVertex(root);
        body.packages().forEach(d -> builder.addEdge(root, d));
        return GraphRequest.builder()
                .graph(builder.buildAsUnmodifiable())
                .pkgManager(body.pkgManager())
                .provider(body.provider())
                .build();
    }

    public GraphRequest fromDotFile(InputStream file, String pkgManager, String provider) {
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
        return GraphRequest.builder()
                .graph(builder.buildAsUnmodifiable())
                .pkgManager(pkgManager)
                .provider(provider)
                .build();
    }
}
