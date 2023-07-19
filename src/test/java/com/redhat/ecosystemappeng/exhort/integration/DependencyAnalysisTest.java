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

package com.redhat.ecosystemappeng.exhort.integration;

import static io.restassured.RestAssured.given;
import static org.apache.camel.Exchange.CONTENT_TYPE;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpClient.Version;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redhat.ecosystemappeng.exhort.model.AnalysisReport;
import com.redhat.ecosystemappeng.exhort.model.DependencyReport;
import com.redhat.ecosystemappeng.exhort.model.PackageRef;
import com.redhat.ecosystemappeng.exhort.model.ProviderStatus;
import com.redhat.ecosystemappeng.exhort.model.Summary;
import com.redhat.ecosystemappeng.exhort.model.TransitiveDependencyReport;

import io.quarkus.test.junit.QuarkusTest;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class DependencyAnalysisTest extends AbstractAnalysisTest {

  @Test
  public void testWithWrongProvider() {
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
  public void testWrongPkgManager() {
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
  public void testAllWithToken() {
    stubAllProviders();
    stubTCVexRequest();

    String body =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .header(Constants.OSS_INDEX_USER_HEADER, OK_USER)
            .header(Constants.OSS_INDEX_TOKEN_HEADER, OK_TOKEN)
            .body(loadDependenciesFile())
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .asPrettyString();

    assertJson("reports/report_all_token.json", body);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTidelift();
    verifySnykRequest(OK_TOKEN);
    verifyOssRequest(OK_USER, OK_TOKEN, false);
    verifyTCVexRequest();
  }

  @Test
  public void testSnykWithNoToken() {
    stubAllProviders();
    stubTCVexRequest();

    String body =
        given()
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
            .extract()
            .body()
            .asPrettyString();

    assertJson("reports/report_all_no_snyk_token.json", body);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTidelift();
    verifySnykRequest(null);
    verifyTCVexRequest();
  }

  @Test
  @Disabled
  public void testTidelift() {
    stubTideliftRequest(null);

    String body =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.TIDELIFT_PROVIDER)
            .body(loadDependenciesFile())
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .asPrettyString();

    assertJson("reports/tidelift_report.json", body);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithSnyk();
    verifyTideliftRequest(8, null);
  }

  @Test
  public void testEmptyRequest() {
    stubAllProviders();
    stubTCVexRequest();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadEmptyDependenciesFile())
            .header("Accept", MediaType.APPLICATION_JSON)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertEquals(0, report.summary().dependencies().scanned());
    assertEquals(0, report.summary().dependencies().transitive());
    assertEquals(0, report.summary().vulnerabilities().total());
    assertEquals(0, report.summary().vulnerabilities().direct());
    assertEquals(0, report.summary().vulnerabilities().critical());
    assertEquals(0, report.summary().vulnerabilities().high());
    assertEquals(0, report.summary().vulnerabilities().medium());
    assertEquals(0, report.summary().vulnerabilities().low());

    assertTrue(report.dependencies().isEmpty());

    verifySnykRequest(null);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTCVex();
  }

  @Test
  public void testUnauthorizedRequest() {
    stubAllProviders();
    stubTCVexRequest();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadEmptyDependenciesFile())
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, INVALID_TOKEN)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertEquals(1, report.summary().providerStatuses().size());
    ProviderStatus status = report.summary().providerStatuses().get(0);
    assertFalse(status.ok());
    assertEquals(Constants.SNYK_PROVIDER, status.provider());
    assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), status.status());

    verifySnykRequest(INVALID_TOKEN);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTCVex();
  }

  @Test
  public void testForbiddenRequest() {
    stubAllProviders();
    stubTCVexRequest();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadEmptyDependenciesFile())
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, UNAUTH_TOKEN)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertEquals(1, report.summary().providerStatuses().size());
    ProviderStatus status = report.summary().providerStatuses().get(0);
    assertFalse(status.ok());
    assertEquals(Constants.SNYK_PROVIDER, status.provider());
    assertEquals(Response.Status.FORBIDDEN.getStatusCode(), status.status());

    verifySnykRequest(UNAUTH_TOKEN);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTCVex();
  }

  @Test
  public void testDotGraphWithToken() throws JsonMappingException, JsonProcessingException {
    stubAllProviders();
    stubTCVexRequest();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .body(loadDependenciesFile())
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertSummary(report.summary());
    assertDependenciesReport(report.dependencies());

    verifySnykRequest(OK_TOKEN);
    verifyTCVexRequest();
    verifyNoInteractionsWithTidelift();
    verifyNoInteractionsWithTCGav();
  }

  @Test
  public void testSBOMJsonWithToken() {
    stubAllProviders();
    stubTCVexRequest();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertSummary(report.summary());
    assertDependenciesReport(report.dependencies());

    verifyTCVexRequest();
    verifySnykRequest(OK_TOKEN);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTidelift();
  }

  @Test
  public void testNonVerboseJson() {
    stubAllProviders();
    stubTCVexRequest();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.APPLICATION_JSON)
            .queryParam(Constants.VERBOSE_MODE_HEADER, Boolean.FALSE)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertSummary(report.summary());
    assertTrue(report.dependencies().isEmpty());

    verifyTCVexRequest();
    verifySnykRequest(null);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTidelift();
  }

  @Test
  public void testNonVerboseWithToken() {
    stubAllProviders();
    String tideliftToken = "my-tidelift-token";
    stubTCVexRequest();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.TIDELIFT_TOKEN_HEADER, tideliftToken)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .queryParam(Constants.VERBOSE_MODE_HEADER, Boolean.FALSE)
            .body(loadDependenciesFile())
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertSummary(report.summary());
    assertTrue(report.dependencies().isEmpty());

    verifySnykRequest(OK_TOKEN);
    verifyTCVexRequest();
    verifyNoInteractionsWithTidelift();
    verifyNoInteractionsWithTCGav();
  }

  @Test
  public void testHtmlWithoutToken() {
    stubTCVexRequest();
    stubAllProviders();

    String body =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.TEXT_HTML)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_all_no_snyk_token.html", body);

    verifySnykRequest(null);
    verifyTCVexRequest();
    verifyNoInteractionsWithTidelift();
    verifyNoInteractionsWithTCGav();
  }

  @Test
  public void testHtmlWithToken() {
    stubAllProviders();
    stubTCVexRequest();

    String body =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .header(Constants.OSS_INDEX_USER_HEADER, OK_USER)
            .header(Constants.OSS_INDEX_TOKEN_HEADER, OK_TOKEN)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_all_token.html", body);

    verifySnykRequest(OK_TOKEN);
    verifyOssRequest(OK_USER, OK_TOKEN, false);
    verifyTCVexRequest();
    verifyNoInteractionsWithTidelift();
    verifyNoInteractionsWithTCGav();
  }

  @ParameterizedTest
  @ValueSource(strings = {"HTTP_1_1", "HTTP_2"})
  public void testMultipart_HttpVersions(String version) throws IOException, InterruptedException {
    stubAllProviders();
    stubTCVexRequest();

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request =
        HttpRequest.newBuilder(URI.create("http://localhost:8081/api/v3/dependency-analysis/maven"))
            .setHeader(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .setHeader("Accept", Constants.MULTIPART_MIXED)
            .setHeader(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .setHeader(Constants.OSS_INDEX_USER_HEADER, OK_USER)
            .setHeader(Constants.OSS_INDEX_TOKEN_HEADER, OK_TOKEN)
            .version(Version.valueOf(version))
            .POST(HttpRequest.BodyPublishers.ofFile(loadSBOMFile().toPath()))
            .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    assertEquals(Response.Status.OK.getStatusCode(), response.statusCode());

    verifySnykRequest(OK_TOKEN);
    verifyTCVexRequest();
    verifyOssRequest(OK_USER, OK_TOKEN, false);
  }

  @Test
  public void testHtmlUnauthorized() {
    stubAllProviders();
    stubTCVexRequest();

    String body =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, INVALID_TOKEN)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_unauthorized.html", body);

    verifySnykRequest(INVALID_TOKEN);
    verifyNoInteractionsWithTidelift();
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTCVex();

    verifyNoInteractionsWithOSS();
  }

  @Test
  public void testHtmlForbidden() {
    stubAllProviders();
    stubTCVexRequest();

    String body =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, UNAUTH_TOKEN)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_forbidden.html", body);

    verifySnykRequest(UNAUTH_TOKEN);
    verifyNoInteractionsWithTidelift();
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTCVex();
    verifyNoInteractionsWithOSS();
  }

  @Test
  public void testHtmlError() {
    stubAllProviders();
    stubTCVexRequest();

    String body =
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, ERROR_TOKEN)
            .when()
            .post("/api/v3/dependency-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_error.html", body);

    verifySnykRequest(ERROR_TOKEN);
    verifyNoInteractionsWithTidelift();
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTCVex();
  }

  @Test
  public void testUnknownMediaType() {
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

    PackageRef hibernate =
        PackageRef.builder()
            .pkgManager(Constants.MAVEN_PKG_MANAGER)
            .namespace("io.quarkus")
            .name("quarkus-hibernate-orm")
            .version("2.13.5.Final")
            .build();
    DependencyReport report = getReport(hibernate.name(), dependencies);
    assertNotNull(report);
    assertEquals(hibernate, report.ref());
    assertNull(report.recommendation());
    assertTrue(report.issues().isEmpty());
    assertTrue(report.remediations().isEmpty());
    assertTrue(report.hasRemediation());

    assertEquals(1, report.transitive().size());
    TransitiveDependencyReport tReport = report.transitive().get(0);
    PackageRef jackson =
        PackageRef.builder()
            .pkgManager(Constants.MAVEN_PKG_MANAGER)
            .namespace("com.fasterxml.jackson.core")
            .name("jackson-databind")
            .version("2.13.1")
            .build();
    assertEquals(jackson, tReport.ref());
    assertEquals(3, tReport.issues().size());
    assertEquals(tReport.highestVulnerability(), tReport.issues().get(0));
    assertEquals(report.highestVulnerability(), tReport.highestVulnerability());

    assertEquals(
        PackageRef.builder()
            .pkgManager(Constants.MAVEN_PKG_MANAGER)
            .namespace(jackson.purl().getNamespace())
            .name(jackson.purl().getName())
            .version("2.13.1.Final-redhat-00002")
            .build(),
        tReport.remediations().get("CVE-2020-36518").mavenPackage());

    assertNull(tReport.remediations().get("CVE-2022-42003"));
  }

  private DependencyReport getReport(String pkgName, List<DependencyReport> dependencies) {
    DependencyReport dep =
        dependencies.stream().filter(d -> d.ref().name().equals(pkgName)).findFirst().orElse(null);
    assertNotNull(dep);
    return dep;
  }
}
