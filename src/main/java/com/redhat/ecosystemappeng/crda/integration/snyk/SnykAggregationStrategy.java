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

package com.redhat.ecosystemappeng.crda.integration.snyk;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.ecosystemappeng.crda.CvssParser;
import com.redhat.ecosystemappeng.crda.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.Issue;
import com.redhat.ecosystemappeng.crda.model.ProviderStatus;
import com.redhat.ecosystemappeng.crda.model.Severity;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.ws.rs.core.Response;

@RegisterForReflection
public class SnykAggregationStrategy {

  private static final String SNYK_PRIVATE_VULNERABILITY_ID = "SNYK-PRIVATE-VULNERABILITY";
  private static final String SNYK_PRIVATE_VULNERABILITY_TITLE =
      "Sign up for a free Snyk account to learn aboutn the vulnerabilities found";

  private static final Logger LOGGER = LoggerFactory.getLogger(SnykAggregationStrategy.class);
  private final ObjectMapper mapper = ObjectMapperProducer.newInstance();

  @SuppressWarnings("unchecked")
  public GraphRequest aggregate(
      GraphRequest graphReq,
      Map<String, String> currentHeaders,
      Map<String, Object> currentProperties,
      Object newExchange,
      Map<String, String> newHeaders,
      Map<String, Object> newProperties)
      throws JsonMappingException, JsonProcessingException {

    List<String> privateProviders =
        (List<String>) currentProperties.get(Constants.PROVIDER_PRIVATE_DATA_PROPERTY);
    boolean filterUnique =
        privateProviders != null && privateProviders.contains(Constants.SNYK_PROVIDER);
    GraphRequest.Builder builder = new GraphRequest.Builder(graphReq);
    if (newExchange instanceof ProviderStatus) {
      return builder.providerStatuses(List.of((ProviderStatus) newExchange)).build();
    }
    ProviderStatus status;
    try {
      JsonNode snykResponse = mapper.readTree((byte[]) newExchange);
      Map<String, List<Issue>> issuesData = getIssues(snykResponse, filterUnique);
      builder.issues(issuesData);
      status =
          new ProviderStatus(
              true,
              Constants.SNYK_PROVIDER,
              Response.Status.OK.getStatusCode(),
              Response.Status.OK.name());
    } catch (IOException e) {
      LOGGER.error("Unable to read Json from Snyk Response", e);
      status =
          new ProviderStatus(
              false,
              Constants.SNYK_PROVIDER,
              Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(),
              e.getMessage());
    }
    return builder.providerStatuses(List.of(status)).build();
  }

  private Map<String, List<Issue>> getIssues(JsonNode snykResponse, boolean filterUnique) {
    Map<String, List<Issue>> reports = new HashMap<>();
    snykResponse
        .withArray("issues")
        .elements()
        .forEachRemaining(
            n -> {
              String pkgName = n.get("pkgName").asText();
              String issueId = n.get("issueId").asText();
              JsonNode issueData = snykResponse.get("issuesData").get(issueId);
              List<Issue> issues = reports.get(pkgName);
              if (issues == null) {
                issues = new ArrayList<>();
                reports.put(pkgName, issues);
              }
              issues.add(toIssue(issueId, issueData, filterUnique));
            });
    return reports;
  }

  private Issue toIssue(String id, JsonNode data, boolean filterUnique) {
    Set<String> cves = new HashSet<>();
    data.withArray("/identifiers/CVE").elements().forEachRemaining(cve -> cves.add(cve.asText()));
    String cvssV3 = data.get("CVSSv3").asText();

    if (cves.isEmpty() && filterUnique) {
      return toFilteredIssue(data);
    }
    Issue.Builder builder = new Issue.Builder(id).source(Constants.SNYK_PROVIDER);
    builder
        .title(data.get("title").asText())
        .severity(Severity.fromValue(data.get("severity").asText()))
        .cvss(CvssParser.fromVectorString(cvssV3))
        .cvssScore(data.get("cvssScore").floatValue())
        .cves(cves)
        .unique(cves.isEmpty());
    return builder.build();
  }

  private Issue toFilteredIssue(JsonNode data) {
    Issue.Builder builder =
        new Issue.Builder(SNYK_PRIVATE_VULNERABILITY_ID).source(Constants.SNYK_PROVIDER);
    builder
        .title(SNYK_PRIVATE_VULNERABILITY_TITLE)
        .severity(Severity.fromValue(data.get("severity").asText()))
        .cvssScore(data.get("cvssScore").floatValue())
        .unique(Boolean.TRUE);
    return builder.build();
  }
}
