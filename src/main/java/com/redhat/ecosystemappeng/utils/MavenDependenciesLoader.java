package com.redhat.ecosystemappeng.utils;

import java.io.InputStream;
import java.util.Scanner;

import org.jgrapht.Graph;
import org.jgrapht.graph.builder.GraphBuilder;
import org.jgrapht.graph.builder.GraphTypeBuilder;
import com.redhat.ecosystemappeng.model.Dependency;
import com.redhat.ecosystemappeng.model.graph.DependencyEdge;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class MavenDependenciesLoader {

    public Graph<Dependency, DependencyEdge> load(InputStream file) {
        GraphBuilder<Dependency, DependencyEdge, Graph<Dependency, DependencyEdge>> builder = GraphTypeBuilder
                .directed().vertexClass(Dependency.class)
                .edgeSupplier(DependencyEdge::new)
                .buildGraphBuilder();
        try (Scanner scanner = new Scanner(file)) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.startsWith("digraph") || line.contains("}")) {
                    // ignore
                } else {
                    String[] vertices = line.replace(";", "").replaceAll("\"", "").split("->");
                    builder.addEdge(Dependency.parse(vertices[0].trim()), Dependency.parse(vertices[1].trim()));
                }
            }
        }
        return builder.buildAsUnmodifiable();
    }

}
