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

import static io.restassured.RestAssured.given;
import static org.apache.camel.Exchange.CONTENT_TYPE;
import static org.hamcrest.core.IsEqual.equalTo;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import com.redhat.ecosystemappeng.crda.model.PackageRef;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class ComponentAnalysisTest extends AbstractAnalysisTest {

    @Test
    public void testComponentAnalysisWithWrongProvider() {
        List<PackageRef> req = Collections.emptyList();
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, "unknown")
            .body(req)
        .when()
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported providers: [unknown]"));

        verifyNoInteractions();
    }

    @Test
    public void testComponentAnalysisWithWrongPkgManager() {
        List<PackageRef> req = Collections.emptyList();
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis/{pkgManager}", "unknown")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported package manager: unknown"));

        verifyNoInteractions();
    }

    @Test
    public void testComponentAnalysisWithSnyk() {
        stubSnykRequest(null);
        stubTCVexRequest();

        List<PackageRef> pkgs = List.of(
            new PackageRef("com.fasterxml.jackson.core:jackson-databind", "2.13.1"),
            new PackageRef("io.quarkus:quarkus-jdbc-postgresql", "2.13.5"));
            new PackageRef("com.acme:example", "1.2.3");
         
        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.SNYK_PROVIDER)
            .body(pkgs)
        .when()
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("component_snyk.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
        verifySnykRequest(null);
        verifyTCVexRequest();
    }

    @Test
    @Disabled
    public void testComponentAnalysisWithTidelift() {
        stubTideliftRequest(null);
        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));

        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.TIDELIFT_PROVIDER)
            .body(pkgs)
        .when()
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("tidelift_component_report.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithSnyk();
        verifyTideliftRequest(3, null);
    }

    @Test
    public void testSnykClientToken() {
        String token = "client-token";
        stubSnykRequest(token);
        stubTCVexRequest();
       
        List<PackageRef> pkgs = List.of(
            new PackageRef("com.fasterxml.jackson.core:jackson-databind", "2.13.1"),
            new PackageRef("io.quarkus:quarkus-jdbc-postgresql", "2.13.5"));
            new PackageRef("com.acme:example", "1.2.3");

        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, token)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.SNYK_PROVIDER)
            .body(pkgs)
        .when()
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("component_snyk.json", body);
        
        verifySnykRequest(token);
        verifyTCVexRequest();
        
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
    }


    @Test
    @Disabled
    public void testTideliftClientToken() {
        String token = "client-token";
        stubTideliftRequest(token);

        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));

        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header(Constants.TIDELIFT_TOKEN_HEADER, token)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.TIDELIFT_PROVIDER)
            .body(pkgs)
        .when()
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("tidelift_component_report.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithSnyk();
        verifyTideliftRequest(3, token);
    }

}
