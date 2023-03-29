package com.redhat.ecosystemappeng.routes;

import org.apache.camel.quarkus.test.CamelQuarkusTestSupport;
import org.junit.jupiter.api.Test;

import com.redhat.ecosystemappeng.extensions.WiremockV3Extension;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
@QuarkusTestResource(WiremockV3Extension.class)
public class RouteV3Test extends CamelQuarkusTestSupport {
 
    @Test
    public void testWrongProvider() {
        
    }
}
