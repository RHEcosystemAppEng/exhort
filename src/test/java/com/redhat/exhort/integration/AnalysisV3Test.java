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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
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

import com.redhat.exhort.api.v3.AnalysisReport;
import com.redhat.exhort.api.v3.ProviderStatus;

import io.quarkus.test.junit.QuarkusTest;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class AnalysisV3Test extends AbstractAnalysisTest {

  private static final String CYCLONEDX = "cyclonedx";
  private static final String DEFAULT_RHDA_TOKEN = "example-rhda-token";

  @ParameterizedTest
  @MethodSource("emptySbomArguments")
  public void testEmptySbom(
      List<String> providers, Map<String, String> authHeaders, String pkgManager) {
    stubAllProviders();

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
          Optional<ProviderStatus> provider =
              report.getSummary().getProviderStatuses().stream()
                  .filter(s -> s.getProvider().equals(p))
                  .findFirst();
          assertEquals(Response.Status.OK.getStatusCode(), provider.get().getStatus());
          assertTrue(provider.get().getOk());
          assertEquals(Response.Status.OK.getReasonPhrase(), provider.get().getMessage());
        });

    verifyProviders(providers, authHeaders, true);
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

    assertJson("reports/v3/report_all_token.json", body);
    verifySnykRequest(OK_TOKEN);
    verifyOssRequest(OK_USER, OK_TOKEN, false);
  }

  @Test
  public void testSnykWithNoToken() {
    stubAllProviders();

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

    assertJson("reports/v3/report_all_no_snyk_token.json", body);
    verifySnykRequest(null);
  }

  @Test
  public void testUnauthorizedRequest() {
    stubAllProviders();

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

    assertEquals(1, report.getSummary().getProviderStatuses().size());
    ProviderStatus status = report.getSummary().getProviderStatuses().get(0);
    assertFalse(status.getOk());
    assertEquals(Constants.SNYK_PROVIDER, status.getProvider());
    assertEquals(Response.Status.UNAUTHORIZED.getStatusCode(), status.getStatus());

    verifySnykRequest(INVALID_TOKEN);
  }

  @Test
  public void testForbiddenRequest() {
    stubAllProviders();

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

    assertEquals(1, report.getSummary().getProviderStatuses().size());
    ProviderStatus status = report.getSummary().getProviderStatuses().get(0);
    assertFalse(status.getOk());
    assertEquals(Constants.SNYK_PROVIDER, status.getProvider());
    assertEquals(Response.Status.FORBIDDEN.getStatusCode(), status.getStatus());

    verifySnykRequest(UNAUTH_TOKEN);
  }

  @ParameterizedTest
  @ValueSource(strings = {"HTTP_1_1", "HTTP_2"})
  public void testMultipart_HttpVersions(String version) throws IOException, InterruptedException {
    stubAllProviders();

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
    verifyOssRequest(OK_USER, OK_TOKEN, false);
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
}
