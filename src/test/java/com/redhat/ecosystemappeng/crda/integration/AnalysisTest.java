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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import com.redhat.ecosystemappeng.crda.model.AnalysisReport;
import com.redhat.ecosystemappeng.crda.model.DependencyReport;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import com.redhat.ecosystemappeng.crda.model.ProviderStatus;
import com.redhat.ecosystemappeng.crda.model.Summary;
import com.redhat.ecosystemappeng.crda.model.TransitiveDependencyReport;

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
              report.summary().providerStatuses().stream()
                  .filter(s -> s.provider().equals(p))
                  .findFirst();
          assertEquals(Response.Status.OK.getStatusCode(), status.get().status());
          assertTrue(status.get().ok());
          assertEquals(Response.Status.OK.getReasonPhrase(), status.get().message());
        });

    assertEquals(0, report.summary().dependencies().scanned());
    assertEquals(0, report.summary().dependencies().transitive());
    assertEquals(0, report.summary().vulnerabilities().total());
    assertEquals(0, report.summary().vulnerabilities().direct());
    assertEquals(0, report.summary().vulnerabilities().critical());
    assertEquals(0, report.summary().vulnerabilities().high());
    assertEquals(0, report.summary().vulnerabilities().medium());
    assertEquals(0, report.summary().vulnerabilities().low());

    assertTrue(report.dependencies().isEmpty());

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
  @Disabled
  public void testWithTidelift() {
    stubTideliftRequest(null);
    List<PackageRef> pkgs =
        List.of(
            PackageRef.builder()
                .pkgManager(Constants.MAVEN_PKG_MANAGER)
                .namespace("log4j")
                .name("log4j")
                .version("1.2.17")
                .build(),
            PackageRef.builder()
                .pkgManager(Constants.MAVEN_PKG_MANAGER)
                .namespace("io.netty")
                .name("netty-common")
                .version("4.1.86")
                .build());

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.TIDELIFT_PROVIDER)
            .body(pkgs)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .body()
            .asPrettyString();

    assertJson("tidelift_component_report.json", body);
    verifyNoInteractionsWithTC();
    verifyNoInteractionsWithSnyk();
    verifyTideliftRequest(3, null);
  }

  @Test
  @Disabled
  public void testTideliftClientToken() {
    String token = "client-token";
    stubTideliftRequest(token);

    List<PackageRef> pkgs =
        List.of(
            PackageRef.builder()
                .pkgManager(Constants.MAVEN_PKG_MANAGER)
                .namespace("log4j")
                .name("log4j")
                .version("1.2.17")
                .build(),
            PackageRef.builder()
                .pkgManager(Constants.MAVEN_PKG_MANAGER)
                .namespace("io.netty")
                .name("netty-common")
                .version("4.1.86")
                .build());

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header(Constants.TIDELIFT_TOKEN_HEADER, token)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.TIDELIFT_PROVIDER)
            .body(pkgs)
            .when()
            .post("/api/v3/analysis")
            .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .body()
            .asPrettyString();

    assertJson("tidelift_component_report.json", body);
    verifyNoInteractionsWithTC();
    verifyNoInteractionsWithSnyk();
    verifyTideliftRequest(3, token);
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
    verifyNoInteractionsWithTidelift();
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
    verifyNoInteractionsWithTidelift();
    verifySnykRequest(null);
    verifyTCRequests();
  }

  @Test
  @Disabled
  public void testTidelift() {
    stubTideliftRequest(null);

    String body =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .queryParam(Constants.PROVIDERS_PARAM, Constants.TIDELIFT_PROVIDER)
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

    assertJson("reports/tidelift_report.json", body);
    verifyNoInteractionsWithTC();
    verifyNoInteractionsWithSnyk();
    verifyTideliftRequest(8, null);
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

    assertEquals(1, report.summary().providerStatuses().size());
    ProviderStatus status = report.summary().providerStatuses().get(0);
    assertFalse(status.ok());
    assertEquals(Constants.SNYK_PROVIDER, status.provider());
    assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), status.status());

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

    assertEquals(1, report.summary().providerStatuses().size());
    ProviderStatus status = report.summary().providerStatuses().get(0);
    assertFalse(status.ok());
    assertEquals(Constants.SNYK_PROVIDER, status.provider());
    assertEquals(Response.Status.FORBIDDEN.getStatusCode(), status.status());

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

    assertSummary(report.summary());
    assertDependenciesReport(report.dependencies());

    verifyTCRequests();
    verifySnykRequest(OK_TOKEN);
    verifyNoInteractionsWithTidelift();
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

    assertSummary(report.summary());
    assertTrue(report.dependencies().isEmpty());

    verifyTCRequests();
    verifySnykRequest(null);
    verifyNoInteractionsWithTidelift();
  }

  @Test
  public void testNonVerboseWithToken() {
    stubAllProviders();
    String tideliftToken = "my-tidelift-token";
    stubTCRequests();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header("Accept", MediaType.APPLICATION_JSON)
            .header(Constants.TIDELIFT_TOKEN_HEADER, tideliftToken)
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

    assertSummary(report.summary());
    assertTrue(report.dependencies().isEmpty());

    verifySnykRequest(OK_TOKEN);
    verifyTCRequests();
    verifyNoInteractionsWithTidelift();
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
    verifyNoInteractionsWithTidelift();
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
    verifyNoInteractionsWithTidelift();
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
    verifyNoInteractionsWithTidelift();
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
    verifyNoInteractionsWithTidelift();
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
    verifyNoInteractionsWithTidelift();
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
    assertEquals(
        PackageRef.builder()
            .purl("pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.redhat-00001")
            .build(),
        report.recommendation());
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
