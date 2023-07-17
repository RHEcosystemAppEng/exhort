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

import com.redhat.ecosystemappeng.exhort.model.AnalysisReport;
import com.redhat.ecosystemappeng.exhort.model.ComponentRequest;
import com.redhat.ecosystemappeng.exhort.model.PackageRef;
import com.redhat.ecosystemappeng.exhort.model.ProviderStatus;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.specification.RequestSpecification;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class ComponentAnalysisTest extends AbstractAnalysisTest {

  @Test
  public void testWithWrongProvider() {
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
  public void testWithWrongPkgManager() {
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
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .body()
            .asPrettyString();

    assertJson("tidelift_component_report.json", body);
    verifyNoInteractionsWithTCGav();
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
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .body()
            .asPrettyString();

    assertJson("tidelift_component_report.json", body);
    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithSnyk();
    verifyTideliftRequest(3, token);
  }

  @ParameterizedTest
  @MethodSource("componentArguments")
  public void testBasicRequests(
      List<String> providers, Map<String, String> authHeaders, String expectedReport) {
    stubAllProviders();
    stubTCGavRequest();
    stubTCVexRequest();

    List<ComponentRequest> pkgs =
        List.of(
            new ComponentRequest("com.fasterxml.jackson.core:jackson-databind", "2.13.1"),
            new ComponentRequest("io.quarkus:quarkus-jdbc-postgresql", "2.13.5"));

    RequestSpecification req = given().header(CONTENT_TYPE, MediaType.APPLICATION_JSON);
    if (!providers.isEmpty()) {
      req.queryParam(Constants.PROVIDERS_PARAM, providers);
    }

    String body =
        req.headers(authHeaders)
            .body(pkgs)
            .when()
            .post("/api/v3/component-analysis/{pkgManager}", Constants.MAVEN_PKG_MANAGER)
            .then()
            .assertThat()
            .statusCode(200)
            .extract()
            .body()
            .asPrettyString();

    assertJson(expectedReport, body);

    verifyProviders(providers, authHeaders, false);
    verifyTCVexRequest();
    verifyTCGavRequest();
  }

  private static Stream<Arguments> componentArguments() {
    return Stream.of(
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER),
            Collections.emptyMap(),
            "reports/component_no_snyk_token.json"),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER),
            Map.of(Constants.SNYK_TOKEN_HEADER, OK_TOKEN),
            "reports/component_snyk_token.json"),
        Arguments.of(
            List.of(Constants.OSS_INDEX_PROVIDER),
            Map.of(
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                OK_TOKEN),
            "reports/component_oss_token.json"),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Map.of(
                Constants.SNYK_TOKEN_HEADER,
                OK_TOKEN,
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                OK_TOKEN),
            "reports/component_all_token.json"),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Map.of(
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                OK_TOKEN),
            "reports/component_all_no_snyk_token.json"),
        Arguments.of(
            Collections.emptyList(),
            Map.of(
                Constants.SNYK_TOKEN_HEADER,
                OK_TOKEN,
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                OK_TOKEN),
            "reports/component_all_token.json"),
        Arguments.of(
            Collections.emptyList(),
            Map.of(Constants.SNYK_TOKEN_HEADER, OK_TOKEN),
            "reports/component_snyk_token.json"));
  }

  @ParameterizedTest
  @MethodSource("emptyRequestParams")
  public void testEmptyRequest(
      List<String> providers, Map<String, String> authHeaders, String pkgManager) {
    stubAllProviders();
    stubTCVexRequest();
    stubTCGavRequest();

    List<PackageRef> pkgs = Collections.emptyList();

    AnalysisReport report =
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .headers(authHeaders)
            .queryParam(Constants.PROVIDERS_PARAM, providers)
            .body(pkgs)
            .when()
            .post("/api/v3/component-analysis/{pkgManager}", pkgManager)
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

    verifyNoInteractionsWithTCGav();
    verifyNoInteractionsWithTCVex();
  }

  private static Stream<Arguments> emptyRequestParams() {
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
            Constants.GRADLE_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Collections.emptyMap(),
            Constants.GOMOD_PKG_MANAGER),
        Arguments.of(
            List.of(Constants.SNYK_PROVIDER, Constants.OSS_INDEX_PROVIDER),
            Collections.emptyMap(),
            Constants.PIP_PKG_MANAGER));
  }
}
