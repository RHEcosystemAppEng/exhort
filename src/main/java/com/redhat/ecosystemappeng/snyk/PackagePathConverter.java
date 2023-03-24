package com.redhat.ecosystemappeng.snyk;

import org.apache.camel.Header;

public class PackagePathConverter {
    public String convert(@Header("ecosystem") String ecosystem, @Header("package") String pkgName) {
        switch (ecosystem) {
            case "maven":
            return pkgName.replace(":", "/");
            default:
            return pkgName;
        }
    }
}
