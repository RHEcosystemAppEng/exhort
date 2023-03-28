package com.redhat.ecosystemappeng.model;

import java.util.Collection;

import lombok.Builder;

@Builder
public record GraphAnalysis(
        boolean ok,
        String ecosystem,
        Collection<PackageReport> reports,
        Collection<LicenseReport> licenses) {

}
