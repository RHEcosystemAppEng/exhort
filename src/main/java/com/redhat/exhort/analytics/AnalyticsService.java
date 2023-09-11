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

package com.redhat.exhort.analytics;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.camel.Exchange;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.redhat.exhort.analytics.segment.Context;
import com.redhat.exhort.analytics.segment.IdentifyEvent;
import com.redhat.exhort.analytics.segment.Library;
import com.redhat.exhort.analytics.segment.SegmentService;
import com.redhat.exhort.analytics.segment.TrackEvent;
import com.redhat.exhort.api.AnalysisReport;
import com.redhat.exhort.api.DependencyReport;
import com.redhat.exhort.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@RegisterForReflection
public class AnalyticsService {

  private static final Logger LOGGER = LoggerFactory.getLogger(AnalyticsService.class);

  private static final String RHDA_TOKEN = "rhda-token";
  private static final String ANONYMOUS_ID = "telemetry-anonymous-id";
  private static final String ANALYSIS_EVENT = "rhda.exhort.analysis";
  private static final String TOKEN_EVENT = "rhda.exhort.token";

  @ConfigProperty(name = "telemetry.disabled", defaultValue = "false")
  Boolean disabled;

  @ConfigProperty(name = "project.id")
  String projectId;

  @ConfigProperty(name = "project.name")
  String projectName;

  @ConfigProperty(name = "project.version")
  String projectVersion;

  @ConfigProperty(name = "project.build")
  String projectBuild;

  @RestClient SegmentService segmentService;

  public void identify(Exchange exchange) {
    if (disabled) {
      return;
    }

    String userId = exchange.getIn().getHeader(RHDA_TOKEN, String.class);
    if (userId == null) {
      String anonymousId = UUID.randomUUID().toString();
      Map<String, String> traits = new HashMap<>();
      traits.put("serverName", projectName);
      traits.put("serverVersion", projectVersion);
      traits.put("serverBuild", projectBuild);
      IdentifyEvent event =
          new IdentifyEvent.Builder()
              .context(new Context(new Library(projectId, projectVersion)))
              .anonymousId(anonymousId)
              .traits(traits)
              .build();
      try {
        Response response = segmentService.identify(event);
        if (response.getStatus() >= 400) {
          LOGGER.warn(
              String.format(
                  "Unable to send event to segment: %d - %s",
                  response.getStatus(), response.getStatusInfo()));
        }
      } catch (Exception e) {
        LOGGER.warn("Unable to send event to segment", e);
      }
      exchange.setProperty(ANONYMOUS_ID, anonymousId);
    } else {
      // no need to IDENTIFY as we expect the caller to have done that already
      exchange.setProperty(RHDA_TOKEN, userId);
      exchange.getIn().removeHeader(RHDA_TOKEN);
    }
  }

  public void trackAnalysis(Exchange exchange) {
    if (disabled) {
      return;
    }
    TrackEvent.Builder builder = prepareTrackEvent(exchange, ANALYSIS_EVENT);
    AnalysisReport report = exchange.getProperty(Constants.REPORT_PROPERTY, AnalysisReport.class);
    Map<String, Object> properties = new HashMap<>();
    if (report != null) {
      Map<String, Object> providers = new HashMap<>();
      Map<String, Object> reportProps = new HashMap<>();
      properties.put(
          "requestType", exchange.getProperty(Constants.REQUEST_CONTENT_PROPERTY, String.class));
      properties.put("sbom", exchange.getProperty(Constants.SBOM_TYPE_PARAM, String.class));
      // TODO: Adapt after multi-source is implemented
      Map<String, Object> snykReport = new HashMap<>();
      reportProps.put("dependencies", report.getSummary().getDependencies());
      reportProps.put("vulnerabilities", report.getSummary().getVulnerabilities());
      snykReport.put("report", reportProps);
      snykReport.put("recommendations", countRecommendations(report));
      snykReport.put("remediations", countRemediations(report));
      providers.put(Constants.SNYK_PROVIDER, snykReport);
      properties.put("providers", providers);
    }
    try {
      Response response = segmentService.track(builder.properties(properties).build());
      if (response.getStatus() >= 400) {
        LOGGER.warn(
            String.format(
                "Unable to send event to segment: %d - %s",
                response.getStatus(), response.getStatusInfo()));
      }
    } catch (Exception e) {
      LOGGER.warn("Unable to send event to segment", e);
    }
  }

  public void trackToken(Exchange exchange) {
    if (disabled) {
      return;
    }
    TrackEvent.Builder builder = prepareTrackEvent(exchange, TOKEN_EVENT);
    Map<String, Object> properties = new HashMap<>();
    properties.put("providers", exchange.getProperty(Constants.PROVIDERS_PARAM, List.class));
    properties.put(
        "statusCode", exchange.getIn().getHeader(Exchange.HTTP_RESPONSE_CODE, String.class));
    try {
      Response response = segmentService.track(builder.properties(properties).build());
      if (response.getStatus() >= 400) {
        LOGGER.warn(
            String.format(
                "Unable to send event to segment: %d - %s",
                response.getStatus(), response.getStatusInfo()));
      }
    } catch (Exception e) {
      LOGGER.warn("Unable to enqueue event to segment", e);
    }
  }

  private TrackEvent.Builder prepareTrackEvent(Exchange exchange, String eventName) {
    TrackEvent.Builder builder = new TrackEvent.Builder(eventName);
    String userId = exchange.getProperty(RHDA_TOKEN, String.class);
    if (userId != null) {
      builder.userId(userId);
    } else {
      String anonymousId = exchange.getProperty(ANONYMOUS_ID, String.class);
      builder.anonymousId(anonymousId);
    }
    return builder.context(new Context(new Library(projectId, projectVersion)));
  }

  private long countRemediations(AnalysisReport report) {
    AtomicLong counter = new AtomicLong();
    report
        .getDependencies()
        .forEach(
            d -> {
              if (d.getRemediations() != null) {
                counter.addAndGet(d.getRemediations().size());
              }
              if (d.getTransitive() != null) {
                d.getTransitive()
                    .forEach(
                        t -> {
                          if (t.getRemediations() != null) {
                            counter.addAndGet(t.getRemediations().size());
                          }
                        });
              }
            });
    return counter.get();
  }

  private long countRecommendations(AnalysisReport report) {
    return report.getDependencies().stream()
        .map(DependencyReport::getRecommendation)
        .filter(Objects::nonNull)
        .count();
  }
}
