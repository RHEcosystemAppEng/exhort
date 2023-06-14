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

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.getRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.camel.Exchange;
import org.junit.jupiter.api.Test;

import com.github.tomakehurst.wiremock.client.WireMock;

import io.quarkus.test.junit.QuarkusTest;

import jakarta.ws.rs.core.MediaType;

@QuarkusTest
public class TokenValidationTest extends AbstractAnalysisTest {

  @Test
  public void testMissingToken() {
    stubSnykToken(null);

    String msg =
        given()
            .when()
            .get("/api/v3/token")
            .then()
            .assertThat()
            .statusCode(400)
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();
    assertEquals("Missing authentication header", msg);

    verifyNoTokenInteractions();
  }

  @Test
  public void testServerError() {
    stubSnykToken(ERROR_TOKEN);

    String msg =
        given()
            .when()
            .header(Constants.SNYK_TOKEN_HEADER, ERROR_TOKEN)
            .get("/api/v3/token")
            .then()
            .assertThat()
            .statusCode(500)
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();
    assertEquals("Unable to validate Snyk token", msg);

    verifyTokenApiCall(ERROR_TOKEN);
  }

  @Test
  public void testUnauthorizedError() {
    String token = "other";
    stubSnykToken("some token");

    String msg =
        given()
            .when()
            .header(Constants.SNYK_TOKEN_HEADER, token)
            .get("/api/v3/token")
            .then()
            .assertThat()
            .statusCode(401)
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();
    assertEquals("Invalid auth token provided", msg);

    verifyTokenApiCall(token);
  }

  @Test
  public void testValidToken() {
    String token = "some token";
    stubSnykToken(token);

    String msg =
        given()
            .when()
            .header(Constants.SNYK_TOKEN_HEADER, token)
            .get("/api/v3/token")
            .then()
            .assertThat()
            .statusCode(200)
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();
    assertEquals("Token validated successfully", msg);

    verifyTokenApiCall(token);
  }

  private void stubSnykToken(String token) {
    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .withHeader("Authorization", WireMock.equalTo("token " + token))
            .willReturn(
                aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("snyk_report.json")));
    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .withHeader("Authorization", WireMock.not(WireMock.equalTo("token " + token)))
            .willReturn(
                aResponse()
                    .withStatus(401)
                    .withBody(
                        "{\"code\": 401, \"error\": \"Invalid auth token"
                            + " provided\", \"message\": \"Invalid auth"
                            + " token provided\"}")));

    server.stubFor(
        get(Constants.SNYK_TOKEN_API_PATH)
            .withHeader("Authorization", WireMock.equalTo("token " + ERROR_TOKEN))
            .willReturn(aResponse().withStatus(500)));
  }

  private void verifyNoTokenInteractions() {
    server.verify(0, getRequestedFor(urlEqualTo(Constants.SNYK_TOKEN_API_PATH)));
  }

  private void verifyTokenApiCall(String token) {
    server.verify(
        1,
        getRequestedFor(urlEqualTo(Constants.SNYK_TOKEN_API_PATH))
            .withHeader("Authorization", WireMock.equalTo("token " + token)));
  }
}
