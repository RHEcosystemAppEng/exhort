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

  public static final String OSV_NVD_MINIMAL_REQUEST_BODY = "{\"purls\": [] }";
  public static final String SNYK_MINIMAL_REQUEST_BODY =
      "{\"depGraph\":{\"schemaVersion\":\"1.2.0\",\"pkgManager\":{\"name\":\"maven\"},\"pkgs\":[{\"id\":\"com.redhat.exhort:default-app@0.0.1\",\"info\":{\"name\":\"com.redhat.exhort:default-app\",\"version\":\"0.0.1\"}},{\"id\":\"com.redhat.exhort:default-dep@0.0.1\",\"info\":{\"name\":\"com.redhat.exhort:default-dep\",\"version\":\"0.0.1\"}}],\"graph\":{\"rootNodeId\":\"com.redhat.exhort:default-app@0.0.1\",\"nodes\":[{\"nodeId\":\"com.redhat.exhort:default-app@0.0.1\",\"pkgId\":\"com.redhat.exhort:default-app@0.0.1\",\"deps\":[{\"nodeId\":\"com.redhat.exhort:default-dep@0.0.1\"}]},{\"nodeId\":\"com.redhat.exhort:default-dep@0.0.1\",\"pkgId\":\"com.redhat.exhort:default-dep@0.0.1\",\"deps\":[]}]}}}";
  public static final String OSS_INDEX_MINIMAL_REQUEST_BODY = "{ \"coordinates\": [] }";
  public static final String TRUSTED_CONTENT_MINIMAL_REQUEST_BODY = "{ \"purls\": [] }";

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

  @Override
  public HealthCheckResponse call() {
    HealthCheckResponseBuilder responseBuilder =
        HealthCheckResponse.named("External Services Checkup");
    Map<String, String> snyk =
        getStatusFromExternalService(
            snykClient
                .request()
                .header(Constants.AUTHORIZATION_HEADER, String.format("token %s", snykToken)),
            SNYK_MINIMAL_REQUEST_BODY);
    Map<String, String> ossIndex =
        getStatusFromExternalService(ossIndexClient.request(), OSS_INDEX_MINIMAL_REQUEST_BODY);
    Map<String, String> osvNvd =
        getStatusFromExternalService(osvNvdClient.request(), OSV_NVD_MINIMAL_REQUEST_BODY);
    Map<String, String> trustedContent =
        getStatusFromExternalService(
            trustedContentClient.request(), TRUSTED_CONTENT_MINIMAL_REQUEST_BODY);
    responseBuilder =
        responseBuilder
            .withData("Snyk Provider Status", (String) snyk.get("httpStatus"))
            .withData("Snyk Provider Description", (String) snyk.get("Description"))
            .withData("osvNvd Provider Status", (String) osvNvd.get("httpStatus"))
            .withData("osvNvd Provider Description", (String) osvNvd.get("Description"))
            .withData("trusted-Content Provider", (String) trustedContent.get("httpStatus"))
            .withData("trusted-Content Description", (String) trustedContent.get("Description"));

    // if enabled
    responseBuilder =
        responseBuilder
            .withData("oss-index provider Status", (String) ossIndex.get("httpStatus"))
            .withData("oss-index provider Description", (String) ossIndex.get("Description"));

    if (serviceReturnNoError(snyk)
        || serviceReturnNoError(ossIndex)
        // TODO - instead of considering 401 && 403 as success for oss-index provider, add
        // properties of ossIndex username + token/password to application.properties, as default
        // credentials ( as we have default token in snyk)
        // , and remove the following two lines .
        || getStatsCodeFromExternalService(ossIndex) == 401
        || getStatsCodeFromExternalService(ossIndex) == 403
        || serviceReturnNoError(osvNvd))
    // as long as trusted Content is not a self-contained provider, it shouldn't affect the
    // readiness probe result.
    //        || serviceReturnNoError(trustedContent))
    {
      return responseBuilder.up().build();
    } else {
      return responseBuilder.down().build();
    }
  }

  private boolean serviceReturnNoError(Map<String, String> provider) {
    return getStatsCodeFromExternalService(provider) == 200
        || getStatsCodeFromExternalService(provider) < 400;
  }

  private Map<String, String> getStatusFromExternalService(
      Invocation.Builder client, String requestBody) {

    HashMap<String, String> map = new HashMap<>();
    try {
      Response resp = client.post(Entity.json(requestBody));
      map.put("httpStatus", Integer.valueOf(resp.getStatus()).toString());
      map.put("Description", Response.Status.fromStatusCode(resp.getStatus()).toString());
    } catch (Exception e) {
      map.put("httpStatus", "503");
      map.put("Description", e.getMessage());
    }
    return map;
  }

  private Integer getStatsCodeFromExternalService(Map<String, String> resp) {
    return Integer.valueOf(resp.get("httpStatus"));
  }
}
