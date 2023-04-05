package com.redhat.ecosystemappeng.extensions;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import io.quarkus.test.common.QuarkusTestResource;

@QuarkusTestResource(WiremockV3Extension.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface InjectWireMock {
    
}
