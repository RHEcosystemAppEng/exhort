package com.redhat.ecosystemappeng.model;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Analysis {

    private boolean ok;
    private Collection<PackageReport> packages;
    private Collection<LicenseReport> licenses;
    
}
