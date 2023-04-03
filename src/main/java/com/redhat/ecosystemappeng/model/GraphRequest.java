package com.redhat.ecosystemappeng.model;

import java.util.Objects;

import org.jgrapht.Graph;

import com.redhat.ecosystemappeng.model.graph.DependencyEdge;
import com.redhat.ecosystemappeng.routes.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record GraphRequest (String pkgManager, String provider, Graph<PackageRef, DependencyEdge> graph) {
    
    public GraphRequest {
        Objects.requireNonNull(pkgManager);
        Objects.requireNonNull(provider);
        Objects.requireNonNull(graph);
        if(!Constants.PKG_MANAGERS.contains(pkgManager)) {
            throw new IllegalArgumentException("Unsupported package manager: " +  pkgManager);
        }
        if(!Constants.PROVIDERS.contains(provider)) {
            throw new IllegalArgumentException("Unsupported provider: " +  provider);
        }
    }
    
}
