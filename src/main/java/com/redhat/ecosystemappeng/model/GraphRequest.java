package com.redhat.ecosystemappeng.model;

import java.util.Collection;
import java.util.Objects;

import org.jgrapht.Graph;

import com.redhat.ecosystemappeng.model.graph.DependencyEdge;
import com.redhat.ecosystemappeng.utils.Constants;

import lombok.Builder;

@Builder
public record GraphRequest (String pkgManager, String provider, Graph<PackageRef, DependencyEdge> graph) {
    
    public GraphRequest(String pkgManager, String provider, Graph<PackageRef, DependencyEdge> graph) {
        Objects.requireNonNull(pkgManager);
        Objects.requireNonNull(provider);
        Objects.requireNonNull(graph);
        if(!Constants.PKG_MANAGERS.contains(pkgManager)) {
            throw new IllegalArgumentException("Unsupported package manager: " +  pkgManager);
        }
        if(!Constants.PROVIDERS.contains(provider)) {
            throw new IllegalArgumentException("Unsupported provider: " +  provider);
        }
        this.pkgManager = pkgManager;
        this.provider = provider;
        this.graph = graph;
    }
}
