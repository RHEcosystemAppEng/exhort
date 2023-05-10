package com.redhat.ecosystemappeng.crda.model;

import java.util.List;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record AnalysisReport(Summary summary, List<DependencyReport> dependencies) {
    
}
