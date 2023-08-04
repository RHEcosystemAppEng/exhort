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

package com.redhat.exhort.integration.providers.snyk;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.SeverityUtils;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderAggregator;
import com.redhat.exhort.model.CvssParser;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykAggregator extends ProviderAggregator {

  private static final String SNYK_PRIVATE_VULNERABILITY_ID = "SNYK-PRIVATE-VULNERABILITY";
  private static final String SNYK_PRIVATE_VULNERABILITY_TITLE =
      "Sign up for a free Snyk account to learn aboutn the vulnerabilities found";

  private final ObjectMapper mapper = ObjectMapperProducer.newInstance();

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
    List<String> cves = new ArrayList<>();
    data.withArray("/identifiers/CVE").elements().forEachRemaining(cve -> cves.add(cve.asText()));
    String cvssV3 = data.get("CVSSv3").asText();

    if (cves.isEmpty() && filterUnique) {
      return toFilteredIssue(data);
    }
    return new Issue()
        .id(id)
        .title(data.get("title").asText())
        .severity(SeverityUtils.fromValue(data.get("severity").asText()))
        .cvss(CvssParser.fromVectorString(cvssV3))
        .cvssScore(data.get("cvssScore").floatValue())
        .cves(cves)
        .unique(cves.isEmpty());
  }

  private Issue toFilteredIssue(JsonNode data) {
    return new Issue()
        .id(SNYK_PRIVATE_VULNERABILITY_ID)
        .title(SNYK_PRIVATE_VULNERABILITY_TITLE)
        .severity(SeverityUtils.fromValue(data.get("severity").asText()))
        .cvssScore(data.get("cvssScore").floatValue())
        .unique(Boolean.TRUE);
  }

  protected final String getProviderName() {
    return Constants.SNYK_PROVIDER;
  }

  public Map<String, List<Issue>> transformResponse(
      @Body byte[] providerResponse,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) String privateProviders)
      throws IOException {
    boolean filterUnique =
        privateProviders != null && privateProviders.contains(Constants.SNYK_PROVIDER);

    JsonNode snykResponse = mapper.readTree((byte[]) providerResponse);
    return getIssues(snykResponse, filterUnique);
  }
}
