package com.redhat.ecosystemappeng.tidelift;

import org.apache.camel.Body;
import org.apache.camel.Header;

import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.routes.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TideliftRequestBuilder {
    
    public String buildPath(@Header(Constants.PKG_MANAGER_HEADER) String pkgManager, @Body PackageRef pkgRef) {
        return String.format(Constants.TIDELIFT_API_BASE_PATH + Constants.TIDELIFT_RELEASES_PATTERN, pkgManager, pkgRef.name(), pkgRef.version());
    }
}
