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
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import io.quarkus.test.junit.QuarkusTest;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@QuarkusTest
public class TokenValidationTest extends AbstractAnalysisTest {

  @Test
  public void testMissingToken() {
    String msg =
        given()
            .when()
            .get("/api/v4/token")
            .then()
            .assertThat()
            .statusCode(400)
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();
    assertEquals("Missing provider authentication headers", msg);

    verifyNoInteractions();
  }

  @ParameterizedTest
  @MethodSource("tokenErrorArguments")
  public void testServerError(String provider, Map<String, String> headers) {
    stubOssToken();
    stubSnykTokenRequests();

    String msg =
        given()
            .when()
            .headers(headers)
            .get("/api/v4/token")
            .then()
            .assertThat()
            .statusCode(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode())
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();

    assertEquals("Unable to validate " + provider + " Token: Server Error", msg);
    verifyTokenRequest(provider, headers);
  }

  private static Stream<Arguments> tokenErrorArguments() {
    return Stream.of(
        Arguments.of(
            Constants.OSS_INDEX_PROVIDER,
            Map.of(
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                ERROR_TOKEN)),
        Arguments.of(Constants.SNYK_PROVIDER, Map.of(Constants.SNYK_TOKEN_HEADER, ERROR_TOKEN)));
  }

  @ParameterizedTest
  @MethodSource("tokenSuccessArguments")
  public void testSuccess(String provider, Map<String, String> headers) {
    stubOssToken();
    stubSnykTokenRequests();

    String msg =
        given()
            .when()
            .headers(headers)
            .get("/api/v4/token")
            .then()
            .assertThat()
            .statusCode(Response.Status.OK.getStatusCode())
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();

    assertEquals("Token validated successfully", msg);
    verifyTokenRequest(provider, headers);
  }

  private static Stream<Arguments> tokenSuccessArguments() {
    return Stream.of(
        Arguments.of(
            Constants.OSS_INDEX_PROVIDER,
            Map.of(
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                OK_TOKEN)),
        Arguments.of(Constants.SNYK_PROVIDER, Map.of(Constants.SNYK_TOKEN_HEADER, OK_TOKEN)));
  }

  @ParameterizedTest
  @MethodSource("tokenUnauthorizedArguments")
  public void testUnauthorized(String provider, Map<String, String> headers) {
    stubOssToken();
    stubSnykTokenRequests();

    String msg =
        given()
            .when()
            .headers(headers)
            .get("/api/v4/token")
            .then()
            .assertThat()
            .statusCode(Response.Status.UNAUTHORIZED.getStatusCode())
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();

    assertEquals("Invalid token provided. Unauthorized", msg);
    verifyTokenRequest(provider, headers);
  }

  private static Stream<Arguments> tokenUnauthorizedArguments() {
    return Stream.of(
        Arguments.of(
            Constants.OSS_INDEX_PROVIDER,
            Map.of(
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                INVALID_TOKEN)),
        Arguments.of(Constants.SNYK_PROVIDER, Map.of(Constants.SNYK_TOKEN_HEADER, INVALID_TOKEN)));
  }

  @ParameterizedTest
  @MethodSource("tokenTooManyRequestsArguments")
  public void testTooManyRequests(String provider, Map<String, String> headers) {
    stubOssToken();
    stubSnykTokenRequests();

    String msg =
        given()
            .when()
            .headers(headers)
            .get("/api/v4/token")
            .then()
            .assertThat()
            .statusCode(Response.Status.TOO_MANY_REQUESTS.getStatusCode())
            .contentType(MediaType.TEXT_PLAIN)
            .extract()
            .body()
            .asString();

    assertEquals("Unable to validate " + provider + " Token: Too Many Requests", msg);
    verifyTokenRequest(provider, headers);
  }

  private static Stream<Arguments> tokenTooManyRequestsArguments() {
    return Stream.of(
        Arguments.of(
            Constants.OSS_INDEX_PROVIDER,
            Map.of(
                Constants.OSS_INDEX_USER_HEADER,
                OK_USER,
                Constants.OSS_INDEX_TOKEN_HEADER,
                RATE_LIMIT_TOKEN)),
        Arguments.of(
            Constants.SNYK_PROVIDER, Map.of(Constants.SNYK_TOKEN_HEADER, RATE_LIMIT_TOKEN)));
  }
}
