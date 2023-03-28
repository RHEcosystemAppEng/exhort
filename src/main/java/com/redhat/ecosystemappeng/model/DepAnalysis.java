package com.redhat.ecosystemappeng.model;

import lombok.Builder;

@Builder
public record DepAnalysis (
        boolean ok,
        String ecosystem,
        PackageReport report) {

}
