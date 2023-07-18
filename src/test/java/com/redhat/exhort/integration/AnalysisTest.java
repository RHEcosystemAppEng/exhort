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

package com.redhat.exhort.integration;

import static io.restassured.RestAssured.given;
import static org.apache.camel.Exchange.CONTENT_TYPE;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.redhat.exhort.api.AnalysisReport;
import com.redhat.exhort.api.DependencyReport;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.ProviderStatus;
import com.redhat.exhort.api.Summary;
import com.redhat.exhort.api.TransitiveDependencyReport;
import com.redhat.exhort.integration.report.DependencyReportHelper;

import io.quarkus.test.junit.QuarkusTest;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class AnalysisTest extends AbstractAnalysisTest {

  @Test
  public void testWithWrongProvider() {
    List<PackageRef> req = Collections.emptyList();
    given()
        .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
        .queryParam(Constants.PROVIDERS_PARAM, "unknown")
        .body(req)
        .when()
        .post("/api/v3/analysis")
        .then()
        .assertThat()
        .statusCode(422)
        .contentType(MediaType.TEXT_PLAIN)
        .body(equalTo("Unsupported providers: [unknown]"));

    verifyNoInteractions();
  }

  @Test
  public void testWithInvalidPkgManagers() {
    given()
        .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
        .body(loadFileAsString("sboms/unsupported-invalid-sbom.json"))
        .when()
        .post("/api/v3/analysis")
        .then()
        .assertThat()
        .statusCode(422)
        .contentType(MediaType.TEXT_PLAIN)
        .body(equalTo("Unsupported package manager: foo"));

    verifyNoInteractions();
  }

  @Test
  public void testWithMixedPkgManagers() {
    given()
        .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
        .body(loadFileAsString("sboms/unsupported-mixed-sbom.json"))
        .when()
        .post("/api/v3/analysis")
        .then()
        .assertThat()
        .statusCode(422)
        .contentType(MediaType.TEXT_PLAIN)
        .body(
            equalTo(
                "It is not supported to submit mixed Package Manager types. Found: [pypi, npm]"));

    verifyNoInteractions();
  }

  @ParameterizedTest
  @MethodSource("emptySbomArguments")
  public void testEmptySbom(
      List<String> providers, Map<String, String> authHeaders, String pkgManager) {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .headers(authHeaders)
            .queryParam(Constants.PROVIDERS_PARAM, providers)
            .body(loadFileAsString("sboms/empty-sbom.json"))
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .body()
            .as(AnalysisReport.class);

    providers.forEach(
        p -> {
          Optional<ProviderStatus> status =
              report.getSummary().getProviderStatuses().stream()
                  .filter(s -> s.getProvider().equals(p))
                  .findFirst();
          assertEquals(Response.Status.OK.getStatusCode(), status.get().getStatus());
          assertTrue(status.get().getOk());
          assertEquals(Response.Status.OK.getReasonPhrase(), status.get().getMessage());
        });

    assertEquals(0, report.getSummary().getDependencies().getScanned());
    assertEquals(0, report.getSummary().getDependencies().getTransitive());
    assertEquals(0, report.getSummary().getVulnerabilities().getTotal());
    assertEquals(0, report.getSummary().getVulnerabilities().getDirect());
    assertEquals(0, report.getSummary().getVulnerabilities().getCritical());
    assertEquals(0, report.getSummary().getVulnerabilities().getHigh());
    assertEquals(0, report.getSummary().getVulnerabilities().getMedium());
    assertEquals(0, report.getSummary().getVulnerabilities().getLow());

    assertTrue(report.getDependencies().isEmpty());

    verifyProviders(providers, authHeaders, true);

    verifyNoInteractionsWithTC();
  }

  private static Stream<Arguments> emptySbomArguments() {
    return Stream.of(
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER), Collections.emptyMap(), Constants.MAVEN_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.OSS_INDEX_PROVIDER),
            Collections.emptyMap(),
            Constants.MAVEN_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Map.of(Constants.SNYK_TOKEN_HEADER, OK_TOKEN),
            Constants.MAVEN_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Map.of(
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                OK_TOKEN),
            Constants.MAVEN_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Map.of(
                Constants.SNYK_TOKEN_HEADER,
                OK_TOKEN,
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                OK_TOKEN),
            Constants.MAVEN_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Collections.emptyMap(),
            Constants.MAVEN_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Collections.emptyMap(),
            Constants.NPM_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Collections.emptyMap(),
            Constants.GOLANG_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Collections.emptyMap(),
            Constants.PYPI_PKG_MANAGER));
  }

  @Test
  public void testAllWithToken() {
    stubAllProviders();
    stubTCRequests();
    stubTCRequests();

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .header(Constants.OSS_INDEX_USER_HEADER, OK_USER)
            .header(Constants.OSS_INDEX_TOKEN_HEADER, OK_TOKEN)
            .body(loadSBOMFile())
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .asPrettyString();

    assertJson("reports/report_all_token.json", body);
    verifySnykRequest(OK_TOKEN);
    verifyOssRequest(OK_USER, OK_TOKEN, false);
    verifyTCRequests();
  }

  @Test
  public void testSnykWithNoToken() {
    stubAllProviders();
    stubTCRequests();

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header("Accept", MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.SNYK_PROVIDER)
            .body(loadSBOMFile())
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .asPrettyString();

    assertJson("reports/report_all_no_snyk_token.json", body);
    verifySnykRequest(null);
    verifyTCRequests();
  }

  @Test
  public void testUnauthorizedRequest() {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadFileAsString("sboms/empty-sbom.json"))
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, INVALID_TOKEN)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertEquals(1, report.getSummary().getProviderStatuses().size());
    ProviderStatus status = report.getSummary().getProviderStatuses().get(0);
    assertFalse(status.getOk());
    assertEquals(Constants.SNYK_PROVIDER, status.getProvider());
    assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), status.getStatus());

    verifySnykRequest(INVALID_TOKEN);
    verifyNoInteractionsWithTC();
  }

  @Test
  public void testForbiddenRequest() {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadFileAsString("sboms/empty-sbom.json"))
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, UNAUTH_TOKEN)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertEquals(1, report.getSummary().getProviderStatuses().size());
    ProviderStatus status = report.getSummary().getProviderStatuses().get(0);
    assertFalse(status.getOk());
    assertEquals(Constants.SNYK_PROVIDER, status.getProvider());
    assertEquals(Response.Status.FORBIDDEN.getStatusCode(), status.getStatus());

    verifySnykRequest(UNAUTH_TOKEN);
    verifyNoInteractionsWithTC();
  }

  @Test
  public void testSBOMJsonWithToken() {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertSummary(report.getSummary());
    assertDependenciesReport(report.getDependencies());

    verifyTCRequests();
    verifySnykRequest(OK_TOKEN);
  }

  @Test
  public void testNonVerboseJson() {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.APPLICATION_JSON)
            .queryParam(Constants.VERBOSE_MODE_HEADER, Boolean.FALSE)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertSummary(report.getSummary());
    assertTrue(report.getDependencies().isEmpty());

    verifyTCRequests();
    verifySnykRequest(null);
  }

  @Test
  public void testNonVerboseWithToken() {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .queryParam(Constants.VERBOSE_MODE_HEADER, Boolean.FALSE)
            .body(loadSBOMFile())
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.APPLICATION_JSON)
            .extract()
            .body()
            .as(AnalysisReport.class);

    assertSummary(report.getSummary());
    assertTrue(report.getDependencies().isEmpty());

    verifySnykRequest(OK_TOKEN);
    verifyTCRequests();
  }

  @Test
  public void testHtmlWithoutToken() {
    stubTCRequests();
    stubAllProviders();

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.TEXT_HTML)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_all_no_snyk_token.html", body);

    verifySnykRequest(null);
    verifyTCRequests();
  }

  @Test
  public void testHtmlWithToken() {
    stubAllProviders();
    stubTCRequests();

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .header(Constants.OSS_INDEX_USER_HEADER, OK_USER)
            .header(Constants.OSS_INDEX_TOKEN_HEADER, OK_TOKEN)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_all_token.html", body);

    verifySnykRequest(OK_TOKEN);
    verifyTCRequests();
    verifyOssRequest(OK_USER, OK_TOKEN, false);
  }

  @Test
  public void testHtmlUnauthorized() {
    stubAllProviders();
    stubTCRequests();

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, INVALID_TOKEN)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_unauthorized.html", body);

    verifySnykRequest(INVALID_TOKEN);
    verifyTCRecommendations();
    verifyNoInteractionsWithTCRemediations();
    verifyNoInteractionsWithOSS();
  }

  @Test
  public void testHtmlForbidden() {
    stubAllProviders();
    stubTCRequests();

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, UNAUTH_TOKEN)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_forbidden.html", body);

    verifySnykRequest(UNAUTH_TOKEN);
    verifyTCRecommendations();
    verifyNoInteractionsWithTCRemediations();
    verifyNoInteractionsWithOSS();
  }

  @Test
  public void testHtmlError() {
    stubAllProviders();
    stubTCRequests();

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(loadSBOMFile())
            .header("Accept", MediaType.TEXT_HTML)
            .header(Constants.SNYK_TOKEN_HEADER, ERROR_TOKEN)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_HTML)
            .extract()
            .body()
            .asString();

    assertHtml("reports/report_error.html", body);

    verifySnykRequest(ERROR_TOKEN);
    verifyTCRecommendations();
    verifyNoInteractionsWithTCRemediations();
    verifyNoInteractionsWithOSS();
  }

  @Test
  public void testUnknownMediaType() {
    given()
        .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
        .body(loadSBOMFile())
        .header("Accept", MediaType.APPLICATION_XML)
        .when()
        .post("/api/v3/analysis")
        .then()
        .assertThat()
        .statusCode(415)
        .contentType(MediaType.TEXT_PLAIN);

    verifyNoInteractions();
  }

  private void assertSummary(Summary summary) {
    assertEquals(2, summary.getDependencies().getScanned());
    assertEquals(7, summary.getDependencies().getTransitive());

    assertEquals(4, summary.getVulnerabilities().getTotal());
    assertEquals(2, summary.getVulnerabilities().getDirect());
    assertEquals(0, summary.getVulnerabilities().getCritical());
    assertEquals(1, summary.getVulnerabilities().getHigh());
    assertEquals(3, summary.getVulnerabilities().getMedium());
    assertEquals(0, summary.getVulnerabilities().getLow());
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
    assertEquals(hibernate, report.getRef());
    assertEquals(
        PackageRef.builder()
            .purl("pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.redhat-00001")
            .build(),
        report.getRecommendation());
    assertTrue(report.getIssues().isEmpty());
    assertTrue(report.getRemediations().isEmpty());
    assertTrue(new DependencyReportHelper().hasRemediation(report));

    assertEquals(1, report.getTransitive().size());
    TransitiveDependencyReport tReport = report.getTransitive().get(0);
    PackageRef jackson =
        PackageRef.builder()
            .pkgManager(Constants.MAVEN_PKG_MANAGER)
            .namespace("com.fasterxml.jackson.core")
            .name("jackson-databind")
            .version("2.13.1")
            .build();
    assertEquals(jackson, tReport.getRef());
    assertEquals(3, tReport.getIssues().size());
    assertEquals(tReport.getHighestVulnerability(), tReport.getIssues().get(0));
    assertEquals(report.getHighestVulnerability(), tReport.getHighestVulnerability());

    assertEquals(
        PackageRef.builder()
            .pkgManager(Constants.MAVEN_PKG_MANAGER)
            .namespace(jackson.purl().getNamespace())
            .name(jackson.purl().getName())
            .version("2.13.1.Final-redhat-00002")
            .build(),
        tReport.getRemediations().get("CVE-2020-36518").getMavenPackage());

    assertNull(tReport.getRemediations().get("CVE-2022-42003"));
  }

  private DependencyReport getReport(String pkgName, List<DependencyReport> dependencies) {
    DependencyReport dep =
        dependencies.stream()
            .filter(d -> d.getRef().name().equals(pkgName))
            .findFirst()
            .orElse(null);
    assertNotNull(dep);
    return dep;
  }
}
