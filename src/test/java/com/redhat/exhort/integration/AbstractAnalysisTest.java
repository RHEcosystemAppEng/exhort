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

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.equalTo;
import static com.github.tomakehurst.wiremock.client.WireMock.equalToJson;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.getRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static com.github.tomakehurst.wiremock.client.WireMock.urlMatching;
import static com.redhat.exhort.extensions.WiremockV3Extension.SNYK_TOKEN;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Map;

import org.apache.camel.Exchange;
import org.cyclonedx.CycloneDxMediaType;
import org.junit.jupiter.api.AfterEach;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jknack.handlebars.internal.Files;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.BasicCredentials;
import com.google.common.base.Charsets;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.extensions.InjectWireMock;
import com.redhat.exhort.extensions.WiremockV3Extension;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.config.DecoderConfig;
import io.restassured.config.EncoderConfig;

import jakarta.ws.rs.core.MediaType;

@QuarkusTest
@QuarkusTestResource(WiremockV3Extension.class)
public abstract class AbstractAnalysisTest {

  static final String OK_USER = "test-user";
  static final String OK_TOKEN = "test-token";
  static final String ERROR_TOKEN = "fail";
  static final String INVALID_TOKEN = "invalid-token";
  static final String UNAUTH_TOKEN = "test-not-authorized";
  static final String RATE_LIMIT_TOKEN = "too-many-requests-token";

  static final String WIREMOCK_URL_TEMPLATE = "__WIREMOCK_URL__";

  @InjectWireMock WireMockServer server;

  static {
    RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    RestAssured.config()
        .encoderConfig(EncoderConfig.encoderConfig().defaultContentCharset("UTF-8"));
    RestAssured.config()
        .decoderConfig(DecoderConfig.decoderConfig().defaultContentCharset("UTF-8"));
  }

  @AfterEach
  void resetMock() {
    server.resetAll();
  }

  protected void assertJson(String expectedFile, String currentBody) {
    ObjectMapper mapper = ObjectMapperProducer.newInstance();
    JsonNode current;
    try {
      current = mapper.readTree(currentBody);
      JsonNode expected =
          mapper.readTree(
              getClass().getClassLoader().getResourceAsStream("__files/" + expectedFile));
      assertEquals(expected, current);
    } catch (IOException e) {
      fail("Unexpected processing exception");
    }
  }

  protected void assertHtml(String expectedFile, String currentBody) {
    String expected;
    try {
      expected =
          Files.read(
              getClass().getClassLoader().getResourceAsStream("__files/" + expectedFile),
              Charset.defaultCharset());
      expected = expected.replaceAll(WIREMOCK_URL_TEMPLATE, server.baseUrl());
      assertEquals(expected, currentBody);
    } catch (IOException e) {
      fail("Unable to read HTML file", e);
    }
  }

  protected String getContentType(String sbomType) {
    switch (sbomType) {
      case "cyclonedx":
        return CycloneDxMediaType.APPLICATION_CYCLONEDX_JSON;
      case "spdx":
        return Constants.SPDX_MEDIATYPE_JSON;
      default:
        fail("Sbom Type not implemented: " + sbomType);
    }
    return null;
  }

  protected File loadSBOMFile(String sbomType) {
    return new File(
        getClass()
            .getClassLoader()
            .getResource(String.format("%s/maven-sbom.json", sbomType))
            .getPath());
  }

  protected String loadFileAsString(String file) {
    try {
      return Files.read(getClass().getClassLoader().getResourceAsStream(file), Charsets.UTF_8);
    } catch (IOException e) {
      fail("Unable to read expected file: " + file, e);
      return null;
    }
  }

  protected void verifyRequest(String provider, Map<String, String> headers, boolean isEmpty) {
    switch (provider) {
      case Constants.SNYK_PROVIDER:
        verifySnykRequest(headers.get(Constants.SNYK_TOKEN_HEADER));
        break;
      case Constants.OSS_INDEX_PROVIDER:
        verifyOssRequest(
            headers.get(Constants.OSS_INDEX_USER_HEADER),
            headers.get(Constants.OSS_INDEX_TOKEN_HEADER),
            isEmpty);
    }
  }

  protected void verifySnykRequest(String token) {
    if (token == null) {
      server.verify(1, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH)));
    } else {
      server.verify(
          1,
          postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH))
              .withHeader("Authorization", equalTo("token " + token)));
    }
  }

  protected void verifyTokenRequest(String provider, Map<String, String> headers) {
    switch (provider) {
      case Constants.SNYK_PROVIDER:
        verifySnykTokenRequest(headers.get(Constants.SNYK_TOKEN_HEADER));
        break;
      case Constants.OSS_INDEX_PROVIDER:
        verifyOssRequest(
            headers.get(Constants.OSS_INDEX_USER_HEADER),
            headers.get(Constants.OSS_INDEX_TOKEN_HEADER),
            false);
    }
  }

  protected void verifySnykTokenRequest(String token) {
    if (token == null) {
      server.verify(1, getRequestedFor(urlEqualTo(Constants.SNYK_TOKEN_API_PATH)));
    } else {
      server.verify(
          1,
          getRequestedFor(urlEqualTo(Constants.SNYK_TOKEN_API_PATH))
              .withHeader("Authorization", equalTo("token " + token)));
    }
  }

  protected void stubAllProviders() {
    stubSnykRequests();
    stubOssToken();
  }

  protected void verifyProviders(
      Collection<String> providers, Map<String, String> credentials, boolean isEmpty) {
    providers.stream()
        .forEach(
            p -> {
              switch (p) {
                case Constants.SNYK_PROVIDER:
                  verifySnykRequest(credentials.get(Constants.SNYK_TOKEN_HEADER));
                  break;
                case Constants.OSS_INDEX_PROVIDER:
                  verifyOssRequest(
                      credentials.get(Constants.OSS_INDEX_USER_HEADER),
                      credentials.get(Constants.OSS_INDEX_TOKEN_HEADER),
                      isEmpty);
                  break;
              }
            });
  }

  protected void stubSnykTokenRequests() {
    // Missing token
    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .willReturn(
                aResponse()
                    .withStatus(401)
                    .withBody(
                        "{\"code\": 401, \"error\": \"Not authorised\""
                            + ", \"message\": \"Not authorised\"}")));
    // Default request
    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .withHeader("Authorization", equalTo("token " + OK_TOKEN))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("snyk/user_validation.json")));
    // Internal Error
    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .withHeader("Authorization", equalTo("token " + ERROR_TOKEN))
            .willReturn(aResponse().withStatus(500)));
    // Invalid token
    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .withHeader("Authorization", equalTo("token " + INVALID_TOKEN))
            .willReturn(
                aResponse()
                    .withStatus(401)
                    .withBody(
                        "{\"code\": 401, \"error\": \"Invalid auth token"
                            + " provided\", \"message\": \"Invalid auth"
                            + " token provided\"}")));
    // Too many requests
    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .withHeader("Authorization", equalTo("token " + RATE_LIMIT_TOKEN))
            .willReturn(
                aResponse()
                    .withStatus(429)
                    .withBody(
                        "{\"message\": \"The org acme (82be6926-dff6-4c22-a54a-8fb25ed4ee43)"
                            + " has exceeded the rate limit.\""
                            + ", \"error\": \"true\"}")));
  }

  protected void stubSnykRequests() {
    // Missing token
    server.stubFor(
        post(Constants.SNYK_DEP_GRAPH_API_PATH)
            .willReturn(
                aResponse()
                    .withStatus(401)
                    .withBody(
                        "{\"code\": 401, \"error\": \"Not authorised\""
                            + ", \"message\": \"Not authorised\"}")));
    // Other requests
    Constants.PKG_MANAGERS.forEach(this::stubSnykEmptyRequest);
    // Dependency request
    server.stubFor(
        post(Constants.SNYK_DEP_GRAPH_API_PATH)
            .withHeader(
                "Authorization", equalTo("token " + OK_TOKEN).or(equalTo("token " + SNYK_TOKEN)))
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .withRequestBody(equalToJson(loadFileAsString("__files/snyk/maven_request.json")))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("snyk/maven_report.json")));
    // Internal Error
    server.stubFor(
        post(Constants.SNYK_DEP_GRAPH_API_PATH)
            .withHeader("Authorization", equalTo("token " + ERROR_TOKEN))
            .willReturn(aResponse().withStatus(500)));
    // Invalid token
    server.stubFor(
        post(Constants.SNYK_DEP_GRAPH_API_PATH)
            .withHeader("Authorization", equalTo("token " + INVALID_TOKEN))
            .willReturn(
                aResponse()
                    .withStatus(401)
                    .withBody(
                        "{\"code\": 401, \"error\": \"Invalid auth token"
                            + " provided\", \"message\": \"Invalid auth"
                            + " token provided\"}")));
    // Forbidden (i.e. token does not have access to the API)
    server.stubFor(
        post(Constants.SNYK_DEP_GRAPH_API_PATH)
            .withHeader("Authorization", equalTo("token " + UNAUTH_TOKEN))
            .willReturn(
                aResponse()
                    .withStatus(403)
                    .withBody(
                        "{\"message\": \"The org acme (82be6926-dff6-4c22-a54a-8fb25ed4ee43) is not"
                            + " entitled for api access. Please upgrade your plan to access this"
                            + " capability\", \"error\": \"true\"}")));
    // Too many requests
    server.stubFor(
        post(Constants.SNYK_DEP_GRAPH_API_PATH)
            .withHeader("Authorization", equalTo("token " + RATE_LIMIT_TOKEN))
            .willReturn(
                aResponse()
                    .withStatus(429)
                    .withBody(
                        "{\"message\": \"The org acme (82be6926-dff6-4c22-a54a-8fb25ed4ee43)"
                            + " has exceeded the rate limit.\""
                            + ", \"error\": \"true\"}")));
  }

  private void stubSnykEmptyRequest(String provider) {
    // Empty request
    server.stubFor(
        post(Constants.SNYK_DEP_GRAPH_API_PATH)
            .withHeader(
                "Authorization", equalTo("token " + OK_TOKEN).or(equalTo("token " + SNYK_TOKEN)))
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .withRequestBody(
                equalToJson(
                    loadFileAsString("__files/snyk/empty_request.json")
                        .replaceAll("__PKG_MANAGER__", provider)))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBody(
                        loadFileAsString("__files/snyk/empty_report.json")
                            .replaceAll("__PKG_MANAGER__", provider))));
  }

  protected void stubOssToken() {

    server.stubFor(
        post(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH)
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .willReturn(
                aResponse()
                    .withStatus(401)
                    .withBody(
                        "{\"code\": 401, \"error\": \"Not authorised\""
                            + ", \"message\": \"Not authorised\"}")));
    server.stubFor(
        post(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH)
            .withBasicAuth(OK_USER, OK_TOKEN)
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .withRequestBody(equalToJson(loadFileAsString("__files/ossindex/empty_request.json")))
            .willReturn(aResponse().withStatus(200).withBodyFile("ossindex/empty_report.json")));
    server.stubFor(
        post(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH)
            .withBasicAuth(OK_USER, OK_TOKEN)
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .withRequestBody(equalToJson(loadFileAsString("__files/ossindex/maven_request.json")))
            .willReturn(aResponse().withStatus(200).withBodyFile("ossindex/maven_report.json")));
    server.stubFor(
        post(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH)
            .withBasicAuth(OK_USER, RATE_LIMIT_TOKEN)
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .willReturn(
                aResponse()
                    .withStatus(429)
                    .withBody(
                        "{\"message\": \"The org acme (82be6926-dff6-4c22-a54a-8fb25ed4ee43)"
                            + " has exceeded the rate limit.\""
                            + ", \"error\": \"true\"}")));
    server.stubFor(
        post(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH)
            .withBasicAuth(OK_USER, ERROR_TOKEN)
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .willReturn(aResponse().withStatus(500)));
  }

  protected void verifyOssRequest(String user, String pass, boolean isEmpty) {
    if (user == null || pass == null || isEmpty) {
      server.verify(0, postRequestedFor(urlEqualTo(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH)));
    } else {
      server.verify(
          1,
          postRequestedFor(urlEqualTo(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH))
              .withBasicAuth(new BasicCredentials(user, pass)));
    }
  }

  protected void stubTCRequests() {
    server.stubFor(
        post(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*"))
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_ENCODING, "identity")
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("trustedcontent/gav_report.json")));
    server.stubFor(
        post(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH))
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .withRequestBody(
                equalToJson(loadFileAsString("__files/trustedcontent/oss_vulns_vex_request.json")))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_ENCODING, "identity")
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("trustedcontent/short_vex_report.json")));
    server.stubFor(
        post(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH))
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .withRequestBody(
                equalToJson(loadFileAsString("__files/trustedcontent/snyk_vulns_vex_request.json")))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_ENCODING, "identity")
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("trustedcontent/short_vex_report.json")));
    server.stubFor(
        post(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH))
            .withHeader(Exchange.CONTENT_TYPE, equalTo(MediaType.APPLICATION_JSON))
            .withRequestBody(
                equalToJson(loadFileAsString("__files/trustedcontent/long_vex_request.json")))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_ENCODING, "identity")
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("trustedcontent/long_vex_report.json")));
  }

  protected void verifyTCRequests() {
    verifyTCRemediations();
    verifyTCRecommendations();
  }

  protected void verifyTCRecommendations() {
    server.verify(1, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
  }

  protected void verifyTCRemediations() {
    server.verify(1, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH)));
  }

  protected void verifyNoInteractions() {
    verifyNoInteractionsWithSnyk();
    verifyNoInteractionsWithOSS();
    verifyNoInteractionsWithTC();
  }

  protected void verifyNoInteractionsWithSnyk() {
    server.verify(0, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH)));
    server.verify(0, getRequestedFor(urlEqualTo(Constants.SNYK_TOKEN_API_PATH)));
  }

  protected void verifyNoInteractionsWithOSS() {
    server.verify(0, postRequestedFor(urlEqualTo(Constants.OSS_INDEX_AUTH_COMPONENT_API_PATH)));
  }

  protected void verifyNoInteractionsWithTC() {
    verifyNoInteractionsWithTCRecommendations();
    verifyNoInteractionsWithTCRemediations();
  }

  protected void verifyNoInteractionsWithTCRemediations() {
    server.verify(0, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH)));
  }

  protected void verifyNoInteractionsWithTCRecommendations() {
    server.verify(0, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
  }
}
