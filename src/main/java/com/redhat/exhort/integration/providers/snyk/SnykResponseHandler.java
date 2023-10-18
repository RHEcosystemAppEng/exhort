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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.SeverityUtils;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.Remediation;
import com.redhat.exhort.api.v4.Source;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderResponseHandler;
import com.redhat.exhort.model.CvssParser;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykResponseHandler extends ProviderResponseHandler {

  private static final String SNYK_PRIVATE_VULNERABILITY_ID = "SNYK-PRIVATE-VULNERABILITY";
  private static final String SNYK_PRIVATE_VULNERABILITY_TITLE =
      "Sign up for a Snyk account to learn aboutn the vulnerabilities found";
  private static final Source SNYK_SOURCE =
      new Source().origin(Constants.SNYK_PROVIDER).provider(Constants.SNYK_PROVIDER);

  private static final Logger LOGGER = LoggerFactory.getLogger(SnykResponseHandler.class);
  private final ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public Map<String, List<Issue>> responseToIssues(
      @Body byte[] providerResponse,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) String privateProviders)
      throws IOException {
    boolean filterUnique =
        privateProviders != null && privateProviders.contains(Constants.SNYK_PROVIDER);

    JsonNode snykResponse = mapper.readTree((byte[]) providerResponse);
    return getIssues(snykResponse, filterUnique);
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
    List<String> cves = new ArrayList<>();
    data.withArray("/identifiers/CVE").elements().forEachRemaining(cve -> cves.add(cve.asText()));
    String cvssV3 = data.get("CVSSv3").asText();

    Remediation remediation = new Remediation();
    data.withArray("/fixedIn")
        .elements()
        .forEachRemaining(f -> remediation.addFixedInItem(f.asText()));

    if (cves.isEmpty() && filterUnique) {
      return toFilteredIssue(data, remediation);
    }
    return new Issue()
        .id(id)
        .source(SNYK_SOURCE)
        .title(data.get("title").asText())
        .severity(SeverityUtils.fromValue(data.get("severity").asText()))
        .cvss(CvssParser.fromVectorString(cvssV3))
        .cvssScore(data.get("cvssScore").floatValue())
        .cves(cves)
        .remediation(remediation)
        .unique(cves.isEmpty());
  }

  private Issue toFilteredIssue(JsonNode data, Remediation remediation) {
    return new Issue()
        .id(SNYK_PRIVATE_VULNERABILITY_ID)
        .source(SNYK_SOURCE)
        .title(SNYK_PRIVATE_VULNERABILITY_TITLE)
        .severity(SeverityUtils.fromValue(data.get("severity").asText()))
        .cvssScore(data.get("cvssScore").floatValue())
        .remediation(remediation)
        .unique(Boolean.TRUE);
  }

  @Override
  protected String getProviderName() {
    return SNYK_SOURCE.getProvider();
  }
}
