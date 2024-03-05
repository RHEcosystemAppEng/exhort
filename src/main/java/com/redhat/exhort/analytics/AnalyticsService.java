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

import static com.redhat.exhort.integration.Constants.RHDA_OPERATION_TYPE_HEADER;
import static com.redhat.exhort.integration.Constants.RHDA_SOURCE_HEADER;
import static com.redhat.exhort.integration.Constants.RHDA_TOKEN_HEADER;
import static com.redhat.exhort.integration.Constants.USER_AGENT_HEADER;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.packageurl.PackageURL;
import com.redhat.exhort.analytics.segment.Context;
import com.redhat.exhort.analytics.segment.IdentifyEvent;
import com.redhat.exhort.analytics.segment.Library;
import com.redhat.exhort.analytics.segment.SegmentService;
import com.redhat.exhort.analytics.segment.TrackEvent;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
@RegisterForReflection
public class AnalyticsService {

  private static final Logger LOGGER = LoggerFactory.getLogger(AnalyticsService.class);

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

    var userId = exchange.getIn().getHeader(RHDA_TOKEN_HEADER, String.class);
    Map<String, String> traits = new HashMap<>();
    traits.put("serverName", projectName);
    traits.put("serverVersion", projectVersion);
    traits.put("serverBuild", projectBuild);

    var builder =
        new IdentifyEvent.Builder()
            .context(
                new Context(new Library(projectId, projectVersion), getSource(exchange.getIn())))
            .traits(traits);

    if (userId == null) {
      var anonymousId = UUID.randomUUID().toString();
      builder.anonymousId(anonymousId);
      exchange.setProperty(ANONYMOUS_ID, anonymousId);
    } else {
      builder.userId(userId);
      exchange.setProperty(RHDA_TOKEN_HEADER, userId);
    }
    try {
      var response = segmentService.identify(builder.build());
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

  public void trackAnalysis(Exchange exchange) {
    if (disabled) {
      return;
    }
    var builder = prepareTrackEvent(exchange, ANALYSIS_EVENT);
    var report = exchange.getProperty(Constants.REPORT_PROPERTY, AnalysisReport.class);
    Map<String, Object> properties = new HashMap<>();
    if (report != null) {
      Map<String, Object> providers = new HashMap<>();
      report
          .getProviders()
          .entrySet()
          .forEach(
              pe -> {
                Map<String, Object> summaries = new HashMap<>();
                pe.getValue()
                    .getSources()
                    .entrySet()
                    .forEach(
                        se -> {
                          summaries.put(se.getKey(), se.getValue().getSummary());
                        });
                Map<String, Object> providerReport = new HashMap<>();
                providerReport.put("sources", summaries);
                providerReport.put(
                    "withCredentials",
                    exchange.getProperty(
                        Constants.AUTH_PROVIDER_REQ_PROPERTY_PREFIX + pe.getKey(),
                        Boolean.FALSE,
                        Boolean.class));
                providers.put(pe.getKey(), providerReport);
              });
      properties.put("providers", providers);
      properties.put(
          "requestType", exchange.getProperty(Constants.REQUEST_CONTENT_PROPERTY, String.class));
      properties.put("sbom", exchange.getProperty(Constants.SBOM_TYPE_PARAM, String.class));
      properties.put("scanned", getScannedProps(exchange, report));
      var operationType = exchange.getIn().getHeader(RHDA_OPERATION_TYPE_HEADER, String.class);
      if (operationType != null) {
        properties.put("operationType", operationType);
      }
    }
    try {
      var response = segmentService.track(builder.properties(properties).build());
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

  private Map<String, Object> getScannedProps(Exchange exchange, AnalysisReport report) {
    Map<String, Object> scanned = new HashMap<>();
    var tree = exchange.getProperty(Constants.DEPENDENCY_TREE_PROPERTY, DependencyTree.class);
    scanned.put("direct", report.getScanned().getDirect());
    scanned.put("total", report.getScanned().getTotal());
    scanned.put("transitive", report.getScanned().getTransitive());
    scanned.put(
        "packageTypes",
        tree.getAll().stream()
            .map(PackageRef::purl)
            .map(PackageURL::getType)
            .collect(Collectors.groupingBy(Function.identity(), Collectors.counting())));
    return scanned;
  }

  public void trackToken(Exchange exchange) {
    if (disabled) {
      return;
    }
    var builder = prepareTrackEvent(exchange, TOKEN_EVENT);
    Map<String, Object> properties = new HashMap<>();
    properties.put("providers", exchange.getProperty(Constants.PROVIDERS_PARAM, List.class));
    properties.put(
        "statusCode", exchange.getIn().getHeader(Exchange.HTTP_RESPONSE_CODE, String.class));
    try {
      var response = segmentService.track(builder.properties(properties).build());
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

  private String getSource(Message message) {
    var customSource = message.getHeader(RHDA_SOURCE_HEADER, String.class);
    if (customSource != null) {
      return customSource;
    }
    var userAgent = message.getHeader(USER_AGENT_HEADER, String.class);
    if (userAgent != null) {
      return userAgent;
    }
    return null;
  }

  private TrackEvent.Builder prepareTrackEvent(Exchange exchange, String eventName) {
    var builder =
        new TrackEvent.Builder(eventName)
            .context(
                new Context(new Library(projectId, projectVersion), getSource(exchange.getIn())));
    var userId = exchange.getProperty(RHDA_TOKEN_HEADER, String.class);
    if (userId != null) {
      builder.userId(userId);
    } else {
      var anonymousId = exchange.getProperty(ANONYMOUS_ID, String.class);
      builder.anonymousId(anonymousId);
    }
    return builder;
  }
}
