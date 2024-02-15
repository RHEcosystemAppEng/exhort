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

import com.redhat.exhort.integration.Constants;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.HealthCheckResponseBuilder;
import org.eclipse.microprofile.health.Readiness;

import com.redhat.exhort.service.RestClient;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.ws.rs.client.Entity;

@Readiness
@ApplicationScoped
public class ExternalServiceReadinessProbe implements HealthCheck {

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
    Integer snykStatus = snykClient.request().header(Constants.AUTHORIZATION_HEADER,String.format("token %s",snykToken)).post(Entity.json("{\"depGraph\":{\"schemaVersion\":\"1.2.0\",\"pkgManager\":{\"name\":\"maven\"},\"pkgs\":[{\"id\":\"com.redhat.exhort:default-app@0.0.1\",\"info\":{\"name\":\"com.redhat.exhort:default-app\",\"version\":\"0.0.1\"}},{\"id\":\"com.redhat.exhort:default-dep@0.0.1\",\"info\":{\"name\":\"com.redhat.exhort:default-dep\",\"version\":\"0.0.1\"}}],\"graph\":{\"rootNodeId\":\"com.redhat.exhort:default-app@0.0.1\",\"nodes\":[{\"nodeId\":\"com.redhat.exhort:default-app@0.0.1\",\"pkgId\":\"com.redhat.exhort:default-app@0.0.1\",\"deps\":[{\"nodeId\":\"com.redhat.exhort:default-dep@0.0.1\"}]},{\"nodeId\":\"com.redhat.exhort:default-dep@0.0.1\",\"pkgId\":\"com.redhat.exhort:default-dep@0.0.1\",\"deps\":[]}]}}}")).getStatus();
    Integer ossIndexStatus = ossIndexClient.request().post(Entity.json("{ \"coordinates\": [] }")).getStatus();
    Integer osvNvdStatus = osvNvdClient.request().post(Entity.json("{ \"purls\": [] }")).getStatus();
    Integer trustedContentStatus =
        trustedContentClient.request().post(Entity.json("{ \"purls\": [] }")).getStatus();
    responseBuilder =
        responseBuilder
            .withData("snyk Http Status", snykStatus)
            .withData("osvNvd Http Status", osvNvdStatus)
            .withData("trusted-Content Http status", trustedContentStatus);

    // if enabled
    responseBuilder = responseBuilder.withData("oss-index Http Status", ossIndexStatus);

    if (snykStatus == 200 || ossIndexStatus == 200 || osvNvdStatus == 200) {
      return responseBuilder.up().build();
    } else {
      return responseBuilder.down().build();
    }
  }
}
