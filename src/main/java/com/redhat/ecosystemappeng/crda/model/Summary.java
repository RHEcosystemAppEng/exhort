package com.redhat.ecosystemappeng.crda.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record Summary(DependenciesSummary dependencies, VulnerabilitiesSummary vulnerabilities) {
    
}
