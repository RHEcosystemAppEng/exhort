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

import static com.redhat.exhort.integration.Constants.SNYK_PROVIDER;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.SeverityUtils;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.Remediation;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderResponseHandler;
import com.redhat.exhort.model.CvssParser;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
@RegisterForReflection
public class SnykResponseHandler extends ProviderResponseHandler {

  private static final String SNYK_PRIVATE_VULNERABILITY_ID = "SNYK-PRIVATE-VULNERABILITY";
  private static final String SNYK_PRIVATE_VULNERABILITY_TITLE =
      "Sign up for a Snyk account to learn aboutn the vulnerabilities found";
  @Inject ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public Map<String, List<Issue>> responseToIssues(
      @Body byte[] providerResponse,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) String privateProviders,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree)
      throws IOException {
    var filterUnique = privateProviders != null && privateProviders.contains(SNYK_PROVIDER);

    var snykResponse = mapper.readTree((byte[]) providerResponse);
    return getIssues(snykResponse, filterUnique, tree);
  }

  private Map<String, List<Issue>> getIssues(JsonNode snykResponse, boolean filterUnique, DependencyTree tree) {
    Map<String, List<Issue>> reports = new HashMap<>();
    snykResponse
        .withArray("issues")
        .elements()
        .forEachRemaining(
            n -> {
              var pkgName = n.get("pkgName").asText();
              var pkgVersion = n.get("pkgVersion").asText();
              var pkgRef = getDependencyRef(pkgName, pkgVersion, tree);
              var issueId = n.get("issueId").asText();
              var issueData = snykResponse.get("issuesData").get(issueId);
              var issues = reports.get(pkgRef);
              if (issues == null) {
                issues = new ArrayList<>();
                reports.put(pkgRef, issues);
              }
              issues.add(toIssue(issueId, issueData, filterUnique));
            });
    return reports;
  }

  private String getDependencyRef(String pkgName, String pkgVersion, DependencyTree tree) {
    Optional<PackageRef> match = tree.getAll().stream().filter(ref -> ref.name().equals(pkgName) && ref.version().equals(pkgVersion)).findFirst();
    if(match.isPresent()) {
      return match.get().ref();
    }
    return null;
  }

  private Issue toIssue(String id, JsonNode data, boolean filterUnique) {
    List<String> cves = new ArrayList<>();
    data.withArray("/identifiers/CVE").elements().forEachRemaining(cve -> cves.add(cve.asText()));
    var cvssV3 = data.get("CVSSv3").asText();

    var remediation = new Remediation();
    data.withArray("/fixedIn")
        .elements()
        .forEachRemaining(f -> remediation.addFixedInItem(f.asText()));

    if (cves.isEmpty() && filterUnique) {
      return toFilteredIssue(data, remediation);
    }
    return new Issue()
        .id(id)
        .title(data.get("title").asText())
        .source(SNYK_PROVIDER)
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
        .title(SNYK_PRIVATE_VULNERABILITY_TITLE)
        .source(SNYK_PROVIDER)
        .severity(SeverityUtils.fromValue(data.get("severity").asText()))
        .cvssScore(data.get("cvssScore").floatValue())
        .remediation(remediation)
        .unique(Boolean.TRUE);
  }

  @Override
  protected String getProviderName() {
    return SNYK_PROVIDER;
  }
}
