/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.redhat.ecosystemappeng.crda.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

public class GraphUtilsTest {

    @Test
    public void ignoreDuplicatedDependenciesInRequest() {
        GraphUtils utils = new GraphUtils();
        List<PackageRef> packages =
                List.of(
                        PackageRef.parse("io.quarkus:quarkus-vertx-http:jar:2.13.5.Final"),
                        PackageRef.parse("io.quarkus:quarkus-vertx-http:jar:2.13.5.Final"),
                        PackageRef.parse("io.quarkus:quarkus-vertx-http:jar:1.2.3.Final"));
        List<String> providers = List.of(Constants.SNYK_PROVIDER);
        GraphRequest req = utils.fromPackages(packages, providers, Constants.MAVEN_PKG_MANAGER);
        assertEquals(Constants.MAVEN_PKG_MANAGER, req.pkgManager());
        assertEquals(providers, req.providers());
        // Only the Root and two packages. Ignore the duplicated.
        assertEquals(3, req.graph().vertexSet().size());
    }
}
