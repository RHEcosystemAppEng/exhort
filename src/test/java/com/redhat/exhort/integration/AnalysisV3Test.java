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
import static org.hamcrest.core.StringStartsWith.startsWithIgnoringCase;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpClient.Version;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import org.cyclonedx.CycloneDxMediaType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.ProviderStatus;
import com.redhat.exhort.api.v4.ProviderSummary;
import com.redhat.exhort.api.v4.Summary;
import com.redhat.exhort.api.v4.TransitiveDependencyReport;

import io.quarkus.test.junit.QuarkusTest;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class AnalysisV3Test extends AbstractAnalysisTest {

  private static final String CYCLONEDX = "cyclonedx";
  private static final String SPDX = "spdx";
  private static final String DEFAULT_RHDA_TOKEN = "example-rhda-token";

  @ParameterizedTest
  @ValueSource(strings = {CYCLONEDX, SPDX})
  public void testWithWrongProvider(String sbom) {
    List<PackageRef> req = Collections.emptyList();
    given()
        .header(CONTENT_TYPE, getContentType(sbom))
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

  @ParameterizedTest
  @ValueSource(strings = {CYCLONEDX, SPDX})
  public void testWithInvalidPkgManagers(String sbom) {
    given()
        .header(CONTENT_TYPE, getContentType(sbom))
        .body(loadFileAsString(String.format("%s/unsupported-invalid-sbom.json", sbom)))
        .when()
        .post("/api/v3/analysis")
        .then()
        .assertThat()
        .statusCode(422)
        .contentType(MediaType.TEXT_PLAIN)
        .body(equalTo("Unsupported package types received: [foo]"));

    verifyNoInteractions();
  }

  @ParameterizedTest
  @ValueSource(strings = {CYCLONEDX, SPDX})
  public void testWithMixedPkgManagers(String sbom) {
    given()
        .header(CONTENT_TYPE, getContentType(sbom))
        .body(loadFileAsString(String.format("%s/unsupported-mixed-sbom.json", sbom)))
        .when()
        .post("/api/v3/analysis")
        .then()
        .assertThat()
        .statusCode(422)
        .contentType(MediaType.TEXT_PLAIN)
        .body(
            startsWithIgnoringCase(
                "It is not supported to submit mixed Package Manager types. Found: ["));

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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .headers(authHeaders)
            .queryParam(Constants.PROVIDERS_PARAM, providers)
            .body(loadFileAsString(String.format("%s/empty-sbom.json", CYCLONEDX)))
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
          Optional<ProviderSummary> summary =
              report.getSummary().getProviders().values().stream()
                  .filter(s -> s.getStatus().getName().equals(p))
                  .findFirst();
          assertEquals(Response.Status.OK.getStatusCode(), summary.get().getStatus().getCode());
          assertTrue(summary.get().getStatus().getOk());
          assertEquals(
              Response.Status.OK.getReasonPhrase(), summary.get().getStatus().getMessage());
        });

    assertEquals(0, report.getSummary().getDependencies().getDirect());
    assertEquals(0, report.getSummary().getDependencies().getTransitive());
    assertEquals(
        0,
        report
            .getSummary()
            .getProviders()
            .get(Constants.SNYK_PROVIDER)
            .getSources()
            .get(Constants.SNYK_PROVIDER)
            .getTotal());

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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .header(Constants.OSS_INDEX_USER_HEADER, OK_USER)
            .header(Constants.OSS_INDEX_TOKEN_HEADER, OK_TOKEN)
            .body(loadSBOMFile(CYCLONEDX))
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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .header("Accept", MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.SNYK_PROVIDER)
            .body(loadSBOMFile(CYCLONEDX))
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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadFileAsString(String.format("%s/empty-sbom.json", CYCLONEDX)))
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

    assertEquals(0, report.getSummary().getDependencies().getTotal());
    assertEquals(1, report.getSummary().getProviders().size());
    ProviderStatus status =
        report.getSummary().getProviders().get(Constants.SNYK_PROVIDER).getStatus();
    assertFalse(status.getOk());
    assertEquals(Constants.SNYK_PROVIDER, status.getName());
    assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), status.getCode());

    verifySnykRequest(INVALID_TOKEN);
    verifyNoInteractionsWithTC();
  }

  @Test
  public void testForbiddenRequest() {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadFileAsString(String.format("%s/empty-sbom.json", CYCLONEDX)))
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

    assertEquals(0, report.getSummary().getDependencies().getTotal());
    assertEquals(1, report.getSummary().getProviders().size());
    ProviderStatus status =
        report.getSummary().getProviders().get(Constants.SNYK_PROVIDER).getStatus();
    assertFalse(status.getOk());
    assertEquals(Constants.SNYK_PROVIDER, status.getName());
    assertEquals(Response.Status.FORBIDDEN.getStatusCode(), status.getCode());

    verifySnykRequest(UNAUTH_TOKEN);
    verifyNoInteractionsWithTC();
  }

  @Test
  public void testSBOMJsonWithToken() {
    stubAllProviders();
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadSBOMFile(CYCLONEDX))
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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadSBOMFile(CYCLONEDX))
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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .queryParam(Constants.VERBOSE_MODE_HEADER, Boolean.FALSE)
            .body(loadSBOMFile(CYCLONEDX))
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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadSBOMFile(CYCLONEDX))
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

    testHtmlIsValid(body);
    // TODO Enhance report rendering and content verification
    assertReportContains("SNYK-PRIVATE-VULNERABILITY", body);

    verifySnykRequest(null);
    verifyTCRequests();
  }

  @Test
  public void testHtmlWithToken() {
    stubAllProviders();
    stubTCRequests();

    String body =
        given()
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadSBOMFile(CYCLONEDX))
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

    testHtmlIsValid(body);
    // TODO Enhance report rendering and content verification
    assertReportDoesNotContains("SNYK-PRIVATE-VULNERABILITY", body);

    verifySnykRequest(OK_TOKEN);
    verifyTCRequests();
    verifyOssRequest(OK_USER, OK_TOKEN, false);
  }

  @ParameterizedTest
  @ValueSource(strings = {"HTTP_1_1", "HTTP_2"})
  public void testMultipart_HttpVersions(String version) throws IOException, InterruptedException {
    stubAllProviders();
    stubTCRequests();

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request =
        HttpRequest.newBuilder(URI.create("http://localhost:8081/api/v3/analysis"))
            .setHeader(Constants.RHDA_TOKEN_HEADER, DEFAULT_RHDA_TOKEN)
            .setHeader(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .setHeader("Accept", Constants.MULTIPART_MIXED)
            .setHeader(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)
            .setHeader(Constants.OSS_INDEX_USER_HEADER, OK_USER)
            .setHeader(Constants.OSS_INDEX_TOKEN_HEADER, OK_TOKEN)
            .version(Version.valueOf(version))
            .POST(HttpRequest.BodyPublishers.ofFile(loadSBOMFile(CYCLONEDX).toPath()))
            .build();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    assertEquals(Response.Status.OK.getStatusCode(), response.statusCode());

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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadSBOMFile(CYCLONEDX))
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

    testHtmlIsValid(body);
    // TODO Enhance report rendering and content verification
    assertReportContains("Unauthorized: Verify the provided credentials are valid.", body);

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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadSBOMFile(CYCLONEDX))
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

    testHtmlIsValid(body);
    assertReportContains(
        "Forbidden: The provided credentials don't have the required permissions.", body);

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
            .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
            .body(loadSBOMFile(CYCLONEDX))
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

    testHtmlIsValid(body);
    assertReportContains("Server Error", body);

    verifySnykRequest(ERROR_TOKEN);
    verifyTCRecommendations();
    verifyNoInteractionsWithTCRemediations();
    verifyNoInteractionsWithOSS();
  }

  @Test
  public void testUnknownMediaType() {
    given()
        .header(CONTENT_TYPE, CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON)
        .body(loadSBOMFile(CYCLONEDX))
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
    assertEquals(2, summary.getDependencies().getDirect());
    assertEquals(7, summary.getDependencies().getTransitive());
    assertEquals(9, summary.getDependencies().getTotal());

    assertEquals(
        4,
        summary
            .getProviders()
            .get(Constants.SNYK_PROVIDER)
            .getSources()
            .get(Constants.SNYK_PROVIDER)
            .getTotal());
    assertEquals(
        2,
        summary
            .getProviders()
            .get(Constants.SNYK_PROVIDER)
            .getSources()
            .get(Constants.SNYK_PROVIDER)
            .getDirect());
    assertEquals(
        0,
        summary
            .getProviders()
            .get(Constants.SNYK_PROVIDER)
            .getSources()
            .get(Constants.SNYK_PROVIDER)
            .getCritical());
    assertEquals(
        1,
        summary
            .getProviders()
            .get(Constants.SNYK_PROVIDER)
            .getSources()
            .get(Constants.SNYK_PROVIDER)
            .getHigh());
    assertEquals(
        3,
        summary
            .getProviders()
            .get(Constants.SNYK_PROVIDER)
            .getSources()
            .get(Constants.SNYK_PROVIDER)
            .getMedium());
    assertEquals(
        0,
        summary
            .getProviders()
            .get(Constants.SNYK_PROVIDER)
            .getSources()
            .get(Constants.SNYK_PROVIDER)
            .getLow());
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
