package com.redhat.ecosystemappeng.model;

import java.util.Collection;
import java.util.List;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record ComponentRequest (String pkgManager, String provider, Collection<PackageRef> packages) {
    
    public ComponentRequest {
        packages = List.copyOf(packages);
    }
}
