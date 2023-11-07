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

package com.redhat.exhort.integration.providers.trustification;

import static com.redhat.exhort.integration.Constants.TRUSTIFICATION_PROVIDER;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.SeverityUtils;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.Severity;
import com.redhat.exhort.integration.providers.ProviderResponseHandler;
import com.redhat.exhort.model.CvssParser;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
@RegisterForReflection
public class TrustificationResponseHandler extends ProviderResponseHandler {

  @Inject ObjectMapper mapper;

  @Override
  protected String getProviderName() {
    return TRUSTIFICATION_PROVIDER;
  }

  @Override
  public Map<String, List<Issue>> responseToIssues(
      byte[] rawResponse, String privateProviders, DependencyTree tree) throws IOException {
    JsonNode response = mapper.readTree(rawResponse);
    Map<String, List<Issue>> issuesData = new HashMap<>();
    Map<String, JsonNode> cvesJson = new HashMap<>();
    response
        .get("cves")
        .elements()
        .forEachRemaining(
            cveJson -> {
              String cve = cveJson.get("id").asText().toUpperCase();
              cvesJson.put(cve, cveJson);
            });
    response
        .get("analysis")
        .fields()
        .forEachRemaining(
            e -> {
              String ref = e.getKey();
              if (!issuesData.containsKey(ref)) {
                issuesData.put(ref, new ArrayList<>());
              }
              List<Issue> issues = issuesData.get(ref);
              e.getValue()
                  .forEach(
                      analysis -> {
                        String vendor = analysis.get("vendor").asText();
                        analysis
                            .get("vulnerable")
                            .forEach(
                                vulnerable -> {
                                  String vulnId = vulnerable.get("id").asText().toUpperCase();
                                  Issue issue = new Issue().id(vulnId).source(vendor);
                                  vulnerable
                                      .get("severity")
                                      .forEach(
                                          severity -> {
                                            if (severity
                                                .get("source")
                                                .asText()
                                                .toLowerCase()
                                                .equals(vendor)) {
                                              Double dscore = severity.get("score").asDouble(0);
                                              issue.cvssScore(dscore.floatValue());
                                            }
                                          });

                                  if (isCVE(vulnId)) {
                                    issue.addCvesItem(vulnId);
                                  }
                                  vulnerable
                                      .get("aliases")
                                      .forEach(
                                          a -> {
                                            String alias = a.asText();
                                            if (isCVE(alias)) {
                                              issue.addCvesItem(alias.toUpperCase());
                                            }
                                            ;
                                          });
                                  completeIssueData(issue, cvesJson);
                                  issues.add(issue);
                                });
                      });
            });

    return issuesData;
  }

  private void completeIssueData(Issue issue, Map<String, JsonNode> cvesJson) {
    Optional<String> firstCve =
        issue.getCves().stream().filter(cve -> cvesJson.keySet().contains(cve)).findFirst();
    if (firstCve.isEmpty()) {
      issue.severity(SeverityUtils.fromScore(issue.getCvssScore()));
      issue.unique(Boolean.TRUE);
      return;
    }
    JsonNode cveJson = cvesJson.get(firstCve.get());
    issue.title(cveJson.get("cisaVulnerabilityName").asText());

    cveJson
        .get("metrics")
        .get("cvssMetricV31")
        .forEach(
            metric -> {
              if ("Primary".equalsIgnoreCase(metric.get("type").asText())) {
                issue.cvss(
                    CvssParser.fromVectorString(
                        metric.get("cvssData").get("vectorString").asText()));
                issue.severity(
                    Severity.fromValue(metric.get("cvssData").get("baseSeverity").asText()));
              }
            });
  }

  private boolean isCVE(String vulnerabilityId) {
    return vulnerabilityId != null && vulnerabilityId.toUpperCase().startsWith("CVE-");
  }
}
