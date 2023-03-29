package com.redhat.ecosystemappeng.model;

import java.util.Collection;

public record ComponentRequest (String pkgManager, String provider, Collection<PackageRef> packages) {
    
}
