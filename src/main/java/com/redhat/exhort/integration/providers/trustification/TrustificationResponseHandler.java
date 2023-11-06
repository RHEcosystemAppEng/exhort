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
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.SeverityUtils;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.providers.ProviderResponseHandler;
import com.redhat.exhort.model.CvssParser;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TrustificationResponseHandler extends ProviderResponseHandler {

  private final ObjectMapper mapper = ObjectMapperProducer.newInstance();

  private static final String CVSS3_VERSION = "cvss3";

  @Override
  protected String getProviderName() {
    return TRUSTIFICATION_PROVIDER;
  }

  @Override
  public Map<String, List<Issue>> responseToIssues(
      byte[] rawResponse, String privateProviders, DependencyTree tree) throws IOException {
    JsonNode response = mapper.readTree(rawResponse);
    Map<String, List<String>> vulnerabilityIds = new HashMap<>();
    response
        .get("affected")
        .fields()
        .forEachRemaining(
            e -> {
              String ref = e.getKey().toUpperCase();
              if (!vulnerabilityIds.containsKey(ref)) {
                vulnerabilityIds.put(e.getKey(), new ArrayList<>());
              }
              List<String> ids = vulnerabilityIds.get(ref);
              e.getValue().elements().forEachRemaining(id -> ids.add(id.asText()));
            });
    Map<String, List<Issue>> issuesData = new HashMap<>();
    response
        .get("vulnerabilities")
        .elements()
        .forEachRemaining(
            n -> {
              String vulnerabilityId = n.get("id").asText();
              Optional<String> id =
                  vulnerabilityIds.entrySet().stream()
                      .filter(e -> e.getValue().contains(vulnerabilityId))
                      .map(Entry::getKey)
                      .findFirst();
              if (id.isPresent()) {
                List<Issue> issues = issuesData.get(id.get());
                if (issues == null) {
                  issues = new ArrayList<>();
                  issuesData.put(id.get(), issues);
                }
                issues.add(toIssue(id.get(), n));
              }
            });
    return issuesData;
  }

  private Issue toIssue(String id, JsonNode n) {
    Issue i = new Issue().id(id).source(n.get("origin").asText()).title(n.get("summary").asText());
    if (isCVE(id)) {
      i.addCvesItem(id);
    }
    n.get("aliases")
        .elements()
        .forEachRemaining(
            alias -> {
              if (isCVE(alias.asText())) {
                i.addCvesItem(alias.asText());
              }
            });
    Iterator<JsonNode> severities = n.get("severities").elements();
    while (severities.hasNext()) {
      JsonNode sn = severities.next();
      if (CVSS3_VERSION.equals(sn.get("type").asText())) {
        i.cvssScore(sn.get("score").floatValue())
            .cvss(CvssParser.fromVectorString(sn.get("additional").asText()));
        i.severity(SeverityUtils.fromScore(i.getCvssScore()));
      }
    }
    if (i.getCves().isEmpty()) {
      i.unique(Boolean.TRUE);
    }
    return i;
  }

  private boolean isCVE(String id) {
    return id.toUpperCase().startsWith("CVE-");
  }
}
