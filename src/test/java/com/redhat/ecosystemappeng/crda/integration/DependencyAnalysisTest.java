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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import com.redhat.ecosystemappeng.crda.model.AnalysisReport;
import com.redhat.ecosystemappeng.crda.model.DependencyReport;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import com.redhat.ecosystemappeng.crda.model.Summary;
import com.redhat.ecosystemappeng.crda.model.TransitiveDependencyReport;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.ws.rs.core.MediaType;

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
    public void testEmptyRequest() {
        stubEmptySnykRequest();
        // stubTideliftRequest(null);
        stubTCVexRequest();

        String body = given()
                .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
                .body(loadEmptyDependenciesFile())
                .header("Accept", MediaType.APPLICATION_JSON)
            .when()
                .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.APPLICATION_JSON)
                    .extract().body().asPrettyString();

        assertJson("empty_response.json", body);

        verifyTCVexRequest();
        verifySnykRequest(null);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
    }

    @Test
    public void testFullDepAnalysisJson() {
        stubSnykRequest(null);
        // stubTideliftRequest(null);
        stubTCVexRequest();

        AnalysisReport report = given()
                .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
                .body(loadDependenciesFile())
                .header("Accept", MediaType.APPLICATION_JSON)
            .when()
                .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.APPLICATION_JSON)
                    .extract().body().as(AnalysisReport.class);

        assertSummary(report.summary());
        assertDependenciesReport(report.dependencies());

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

        AnalysisReport report = given()
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
                    .extract().body().as(AnalysisReport.class);

        assertSummary(report.summary());
        assertDependenciesReport(report.dependencies());

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
        
        assertHtml("full_report.html", body);
        
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

    private void assertSummary(Summary summary) {
        assertEquals(2, summary.dependencies().scanned());
        assertEquals(7, summary.dependencies().transitive());

        assertEquals(4, summary.vulnerabilities().total());
        assertEquals(2, summary.vulnerabilities().direct());
        assertEquals(0, summary.vulnerabilities().critical());
        assertEquals(1, summary.vulnerabilities().high());
        assertEquals(3, summary.vulnerabilities().medium());
        assertEquals(0, summary.vulnerabilities().low());
    }

    private void assertDependenciesReport(List<DependencyReport> dependencies) {
        assertEquals(2, dependencies.size());

        PackageRef hibernate = new PackageRef("io.quarkus:quarkus-hibernate-orm", "2.13.5.Final");
        DependencyReport report = getReport(hibernate.name(), dependencies);
        assertNotNull(report);
        assertEquals(hibernate, report.ref());
        assertNull(report.recommendation());
        assertTrue(report.issues().isEmpty());
        assertTrue(report.remediations().isEmpty());
        assertTrue(report.hasRemediation());
        
        assertEquals(1, report.transitive().size());
        TransitiveDependencyReport tReport = report.transitive().get(0);
        PackageRef jackson = new PackageRef("com.fasterxml.jackson.core:jackson-databind", "2.13.1");
        assertEquals(jackson, tReport.ref());
        assertEquals(3, tReport.issues().size());
        assertEquals(tReport.highestVulnerability(), tReport.issues().get(0));
        assertEquals(report.highestVulnerability(), tReport.highestVulnerability());

        assertEquals(new PackageRef(jackson.name(), "2.13.1.Final-redhat-00002"), tReport.remediations().get("CVE-2020-36518").mavenPackage());
        assertEquals(new PackageRef(jackson.name(), "2.13.1.Final-redhat-00002"), tReport.remediations().get("CVE-2022-42004").mavenPackage());
        assertNull(tReport.remediations().get("CVE-2022-42003"));
    }

    private DependencyReport getReport(String pkgName, List<DependencyReport> dependencies) {
        DependencyReport dep = dependencies.stream().filter(d -> d.ref().name().equals(pkgName)).findFirst().orElse(null);
        assertNotNull(dep);
        return dep;
    }

}
