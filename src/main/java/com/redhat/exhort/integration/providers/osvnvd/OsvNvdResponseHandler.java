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

package com.redhat.exhort.integration.providers.osvnvd;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.Remediation;
import com.redhat.exhort.api.v4.SeverityUtils;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderResponseHandler;
import com.redhat.exhort.model.CvssParser;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.ProviderResponse;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
@RegisterForReflection
public class OsvNvdResponseHandler extends ProviderResponseHandler {

  @Inject ObjectMapper mapper;

  @Override
  protected String getProviderName() {
    return Constants.OSV_NVD_PROVIDER;
  }

  @Override
  public ProviderResponse responseToIssues(
      @Body byte[] response,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) String privateProviders,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree)
      throws IOException {
    var json = (ObjectNode) mapper.readTree(response);
    return new ProviderResponse(getIssues(json, tree), null, null);
  }

  private Map<String, List<Issue>> getIssues(ObjectNode response, DependencyTree tree) {
    return tree.getAll().stream()
        .map(PackageRef::ref)
        .filter(ref -> response.has(ref))
        .collect(Collectors.toMap(ref -> ref, ref -> toIssues(ref, (ArrayNode) response.get(ref))));
  }

  private List<Issue> toIssues(String ref, ArrayNode response) {
    if (response.isEmpty()) {
      return Collections.emptyList();
    }
    List<Issue> issues = new ArrayList<>();
    response.forEach(
        data -> {
          var issue = new Issue().source(Constants.OSV_NVD_PROVIDER);

          String cve = getTextValue(data, "cveId");
          issue.id(cve).cves(List.of(cve));
          issue.title(getTextValue(data, "summary"));
          if (issue.getTitle() == null || issue.getTitle().isEmpty()) {
            issue.title(getTextValue(data, "description"));
          }
          var metrics = data.get("metrics");
          if (metrics != null) {
            setMetrics(metrics, issue);
          }
          var affected = data.get("affected");
          if (affected != null) {
            issue.setRemediation(getRemediation((ArrayNode) affected));
          }
          if (issue.getCvssScore() != null) {
            issues.add(issue);
          }
        });
    return issues;
  }

  // Parse only V3.1, V3.0 and V2 CVSS vectors
  private void setMetrics(JsonNode metrics, Issue issue) {
    ArrayNode metricsNode = null;
    if (metrics.has("cvssMetricV31")) {
      metricsNode = (ArrayNode) metrics.get("cvssMetricV31");
    } else if (metrics.has("cvssMetricV30")) {
      metricsNode = (ArrayNode) metrics.get("cvssMetricV30");
    } else if (metrics.has("cvssMetricV2")) {
      metricsNode = (ArrayNode) metrics.get("cvssMetricV2");
    }
    if (metricsNode == null) {
      return;
    }
    metricsNode.forEach(
        metricNode -> {
          if ("Primary".equalsIgnoreCase(getTextValue(metricNode, "type"))) {
            var cvssData = (JsonNode) metricNode.get("cvssData");
            var score = getFloatValue(cvssData, "baseScore");
            issue
                .cvssScore(score)
                .cvss(CvssParser.fromVectorString(getTextValue(cvssData, "vectorString")))
                .severity(SeverityUtils.fromScore(score));
          }
        });
  }

  private Remediation getRemediation(ArrayNode affected) {
    var r = new Remediation();
    affected.forEach(
        affectedNode -> {
          var ranges = (ArrayNode) affectedNode.get("ranges");
          if (ranges == null) {
            return;
          }
          ranges.forEach(
              rangeNode -> {
                var events = (ArrayNode) rangeNode.get("events");
                events.forEach(
                    eventNode -> {
                      var fixed = getTextValue(eventNode, "fixed");
                      if (fixed != null) {
                        r.addFixedInItem(fixed);
                      }
                    });
              });
        });
    return r;
  }

  private String getTextValue(JsonNode node, String key) {
    if (node.has(key)) {
      return node.get(key).asText();
    }
    return null;
  }

  private Float getFloatValue(JsonNode node, String key) {
    if (node.has(key)) {
      return node.get(key).floatValue();
    }
    return null;
  }
}
