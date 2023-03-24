package com.redhat.ecosystemappeng.model;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PackageReport {
    
    private Dependency dependency;
    private Collection<Vulnerability> vulnerabilities;
    
}
