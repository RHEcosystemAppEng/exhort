package com.redhat.ecosystemappeng.extensions;

import java.util.Collections;
import java.util.Map;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;

public class WiremockV3Extension implements QuarkusTestResourceLifecycleManager {

    @Override
    public Map<String, String> start() {
        // TODO Auto-generated method stub
        return Collections.emptyMap();
    }

    @Override
    public void stop() {
        // TODO Auto-generated method stub
    }
    
}
