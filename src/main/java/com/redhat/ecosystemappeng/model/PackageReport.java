package com.redhat.ecosystemappeng.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

import lombok.Builder;

@Builder
public record PackageReport(PackageRef ref, Collection<PackageRef> dependencies, PackageRef trustedDependency,
        Collection<Vulnerability> vulnerabilities) {

            public PackageReport(PackageRef ref) {
                this(ref, new ArrayList<>(), null, new ArrayList<>());
            }

            public PackageReport(PackageRef ref, Collection<PackageRef> dependencies, PackageRef trustedDependency,
            Collection<Vulnerability> vulnerabilities) {
                Objects.requireNonNull(ref);
                Objects.requireNonNull(dependencies);
                Objects.requireNonNull(vulnerabilities);
                this.ref = ref;
                this.dependencies = dependencies;
                this.vulnerabilities = vulnerabilities;
                this.trustedDependency = trustedDependency;
            }
}
