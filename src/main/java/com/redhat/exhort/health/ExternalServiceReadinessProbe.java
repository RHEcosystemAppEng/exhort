/*
 * Copyright 2024 Red Hat, Inc. and/or its affiliates
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

package com.redhat.exhort.health;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.HealthCheckResponseBuilder;
import org.eclipse.microprofile.health.Readiness;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.service.RestClient;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.client.Invocation;
import jakarta.ws.rs.core.Response;

@Readiness
@ApplicationScoped
public class ExternalServiceReadinessProbe implements HealthCheck {

  public static final String OSS_INDEX_MINIMAL_REQUEST_BODY = "{ \"coordinates\": [] }";
  public static final String TRUSTED_CONTENT_MINIMAL_REQUEST_BODY = "{ \"purls\": [] }";

  @ConfigProperty(name = "api.snyk.disabled", defaultValue = "false")
  boolean snykDisabled;

  @ConfigProperty(name = "api.ossindex.disabled", defaultValue = "false")
  boolean ossIndexDisabled;

  @ConfigProperty(name = "api.osvnvd.disabled", defaultValue = "false")
  boolean osvNvdDisabled;

  @Inject
  @Named("snyk")
  private RestClient snykClient;

  @Inject
  @Named("osvNvd")
  private RestClient osvNvdClient;

  @Inject
  @Named("ossIndex")
  private RestClient ossIndexClient;

  @Inject
  @Named("trustedContent")
  private RestClient trustedContentClient;

  @ConfigProperty(name = "api.snyk.token")
  private String snykToken;

  /**
   * This method build up the readiness health check, and it's basically checking if external
   * services are available and there is a good communication to bring/fetch vulnerabilities data
   * from them
   *
   * @return a json payload with status of all active external providers, and returns http status of
   *     200 in case of that at least one provider returned positive http code, otherwise, returns
   *     http status of 503
   */
  @Override
  public HealthCheckResponse call() {
    HealthCheckResponseBuilder responseBuilder =
        HealthCheckResponse.named("External Services Checkup");
    Map<String, String> snyk =
        getStatusFromExternalServiceGet(
            snykClient
                .request(RestClient.SNYK_PROVIDER_NAME)
                .header(Constants.AUTHORIZATION_HEADER, String.format("token %s", snykToken)));
    Map<String, String> ossIndex =
        getStatusFromExternalServicePost(
            ossIndexClient.request(RestClient.OSS_INDEX_PROVIDER_NAME),
            OSS_INDEX_MINIMAL_REQUEST_BODY);
    Map<String, String> osvNvd =
        getStatusFromExternalServiceGet(osvNvdClient.request(RestClient.OSV_NVD_PROVIDER_NAME));
    Map<String, String> trustedContent =
        getStatusFromExternalServicePost(
            trustedContentClient.request(RestClient.TRUSTED_CONTENT_PROVIDER_NAME),
            TRUSTED_CONTENT_MINIMAL_REQUEST_BODY);
    if (!snykDisabled) {
      responseBuilder =
          responseBuilder
              .withData("Snyk Provider Status", snyk.get("httpStatus"))
              .withData("Snyk Provider Description", snyk.get("Description"));
    }
    if (!osvNvdDisabled) {
      responseBuilder =
          responseBuilder
              .withData("osvNvd Provider Status", osvNvd.get("httpStatus"))
              .withData("osvNvd Provider Description", osvNvd.get("Description"));
    }
    responseBuilder =
        responseBuilder
            .withData("trusted-Content Provider", trustedContent.get("httpStatus"))
            .withData("trusted-Content Description", trustedContent.get("Description"));

    if (!ossIndexDisabled) {
      responseBuilder =
          responseBuilder
              .withData("oss-index provider Status", (String) ossIndex.get("httpStatus"))
              .withData("oss-index provider Description", (String) ossIndex.get("Description"));
    }
    if (serviceEnabledAndReturnsNoError(snyk, !this.snykDisabled)
        || serviceEnabledAndReturnsNoError(ossIndex, !this.ossIndexDisabled)
        // TODO - instead of considering 401 && 403 as success for oss-index provider, add
        // properties of ossIndex username + token/password to application.properties, as default
        // credentials ( as we have default token in snyk)
        // , and remove the following three lines .
        || (!this.snykDisabled
            && (getStatsCodeFromExternalService(ossIndex) == 401
                || getStatsCodeFromExternalService(ossIndex) == 403))
        || serviceEnabledAndReturnsNoError(osvNvd, !this.osvNvdDisabled))
    // as long as trusted Content is not a self-contained provider, it shouldn't affect the
    // readiness probe result.
    //        || serviceReturnNoError(trustedContent))
    {
      return responseBuilder.up().build();
      // If there is no even one external service that returned Positive HTTP Status, then set the
      // result of the readiness health check as Down ( 503)
    } else {
      return responseBuilder.down().build();
    }
  }

  /**
   * @param provider provider map contains status code and its description
   * @param serviceEnabled only if service is enabled it should impact readiness result
   * @return true only if service enabled and returns non error http code ( < 400)
   */
  private boolean serviceEnabledAndReturnsNoError(
      Map<String, String> provider, boolean serviceEnabled) {
    return serviceEnabled
        && (getStatsCodeFromExternalService(provider) == 200
            || getStatsCodeFromExternalService(provider) < 400);
  }

  /**
   * @param requestClient an object that contains request builder to the desired service
   * @param requestBody a request body for a post request
   * @return {@link Map} 2 entries map, containing the http status and description
   */
  private Map<String, String> getStatusFromExternalServicePost(
      Invocation.Builder requestClient, String requestBody) {

    HashMap<String, String> map = new HashMap<>();
    try {
      Response resp = requestClient.post(Entity.json(requestBody));
      map.put("httpStatus", Integer.valueOf(resp.getStatus()).toString());
      map.put("Description", Response.Status.fromStatusCode(resp.getStatus()).toString());
    } catch (Exception e) {
      map.put("httpStatus", "503");
      map.put("Description", e.getMessage());
    }
    return map;
  }

  /**
   * @param requestClient an object that contains request builder to the desired service
   * @return {@link Map} 2 entries map, containing the http status and description
   */
  private Map<String, String> getStatusFromExternalServiceGet(Invocation.Builder requestClient) {

    HashMap<String, String> map = new HashMap<>();
    try {
      Response resp = requestClient.get();
      map.put("httpStatus", Integer.valueOf(resp.getStatus()).toString());
      map.put("Description", Response.Status.fromStatusCode(resp.getStatus()).toString());
    } catch (Exception e) {
      map.put("httpStatus", "503");
      map.put("Description", e.getMessage());
    }
    return map;
  }

  /**
   * @param resp -2 entries map, containing the http status and description
   * @return The Http status in integer.
   */
  private Integer getStatsCodeFromExternalService(Map<String, String> resp) {
    return Integer.valueOf(resp.get("httpStatus"));
  }
}
