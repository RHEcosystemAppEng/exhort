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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import javax.ws.rs.core.MediaType;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.path.xml.XmlPath;
import io.restassured.path.xml.XmlPath.CompatibilityMode;
import org.junit.platform.commons.logging.Logger;

@QuarkusTest
public class DependencyAnalysisTest extends AbstractAnalysisTest {

    @Test
    public void testDepAnalysisWithWrongProvider() {
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .queryParam(Constants.PROVIDERS_PARAM, "unknown")
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported providers: [unknown]"));

        verifyNoInteractions();
    }

    @Test
    public void testDepAnalysisWithWrongPkgManager() {
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.SNYK_PROVIDER)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", "unknown")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported package manager: unknown"));
        
        verifyNoInteractions();
    }

    @Test
    public void testDepAnalysisWithSnyk() {
        stubSnykRequest(null);
        stubTCVexRequest();
        
        String body = given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .header("Accept", MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.SNYK_PROVIDER)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertJson("expected_dep_snyk.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
        verifySnykRequest(null);
        verifyTCVexRequest();
    }

    @Test
    @Disabled
    public void testDepAnalysisWithTidelift() {
        stubTideliftRequest(null);
        
        String body = given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.TIDELIFT_PROVIDER)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertJson("tidelift_report.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithSnyk();
        verifyTideliftRequest(8, null);
    }

    @Test
    public void testFullDepAnalysisJson() {
        stubSnykRequest(null);
        // stubTideliftRequest(null);
        stubTCVexRequest();

        String body = given()
                .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
                .body(loadDependenciesFile())
                .header("Accept", MediaType.APPLICATION_JSON)
            .when()
                .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.APPLICATION_JSON)
                    .extract().body().asPrettyString();

        assertJson("full_report.json", body);

        verifyTCVexRequest();
        verifySnykRequest(null);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
    }

    @Test
    public void testFullDepAnalysisWithToken() {
        String snykToken = "my-snyk-token";
        stubSnykRequest(snykToken);
        String tideliftToken = "my-tidelift-token";
        stubTCVexRequest();

        String body = given()
                .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
                .header("Accept", MediaType.APPLICATION_JSON)
                .header(Constants.TIDELIFT_TOKEN_HEADER, tideliftToken)
                .header(Constants.SNYK_TOKEN_HEADER, snykToken)
                .body(loadDependenciesFile())
            .when()
                .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.APPLICATION_JSON)
                    .extract().body().asPrettyString();
        assertJson("full_report.json", body);

        verifySnykRequest(snykToken);
        verifyTCVexRequest();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
    }

    @Test
    public void testFullDepAnalysisHtml() {
        stubTCVexRequest();
        stubSnykRequest(null);

        String body = given().header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ).body(loadDependenciesFile())
            .header("Accept", MediaType.TEXT_HTML)
            .when()
                .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.TEXT_HTML)
                    .extract().body().asString();
        
        XmlPath p = new XmlPath(CompatibilityMode.HTML, body);
        assertFalse(p.getString("html.body.div.div.span").contains("Security Issues"));
//        assertEquals("CRDA Stack Report", p.getString("html.header.title"));
//        assertFalse(p.getString("html.body.ul.li.find {it == 'io.quarkus:quarkus-hibernate-orm:2.13.5.Final'}").isEmpty());
//        assertFalse(p.getString("html.body.ul.li.find {it == 'io.quarkus:quarkus-jdbc-postgresql:2.13.5.Final'}").isEmpty());
        
        verifySnykRequest(null);
        verifyTCVexRequest();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
    }

    @Test
    public void testFullDepAnalysisUnknownMediaType() {
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.APPLICATION_XML)
            .when()
                .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
                .assertThat()
                    .statusCode(415)
                    .contentType(MediaType.TEXT_PLAIN);
        
        verifyNoInteractions();
    }

}
