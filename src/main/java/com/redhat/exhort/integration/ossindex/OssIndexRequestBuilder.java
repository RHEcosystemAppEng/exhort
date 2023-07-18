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

package com.redhat.exhort.integration.ossindex;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.SeverityUtils;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.CvssParser;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class OssIndexRequestBuilder {

  private static final Logger LOGGER = LoggerFactory.getLogger(OssIndexRequestBuilder.class);

  private ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public String buildRequest(List<PackageRef> packages) throws JsonProcessingException {
    ArrayNode coordinates = mapper.createArrayNode();
    packages.stream()
        .map(PackageRef::purl)
        .filter(Objects::nonNull)
        .forEach(purl -> coordinates.add(purl.getCoordinates()));

    ObjectNode root = mapper.createObjectNode().set("coordinates", coordinates);
    return mapper.writeValueAsString(root);
  }

  public Map<String, List<Issue>> responseToIssues(byte[] response) throws IOException {
    ArrayNode json = (ArrayNode) mapper.readTree(response);
    return getIssues(json);
  }

  private Map<String, List<Issue>> getIssues(ArrayNode response) {
    Map<String, List<Issue>> reports = new HashMap<>();
    response.forEach(
        n -> {
          String pkgRef = n.get("coordinates").asText();
          try {
            PackageRef ref = PackageRef.builder().purl(pkgRef).build();
            List<Issue> issues = new ArrayList<>();
            ArrayNode vulnerabilities = (ArrayNode) n.get("vulnerabilities");
            vulnerabilities.forEach(v -> issues.add(toIssue(v)));
            if (!issues.isEmpty()) {
              reports.put(ref.name(), issues);
            }
          } catch (IllegalArgumentException e) {
            LOGGER.warn("Unable to parse PackageURL: " + pkgRef, e);
          }
        });

    return reports;
  }

  private Issue toIssue(JsonNode data) {
    float score = data.get("cvssScore").floatValue();
    return new Issue()
        .id(data.get("id").asText())
        .title(data.get("title").asText())
        .cves(List.of(data.get("cve").asText()))
        .cvss(CvssParser.fromVectorString(data.get("cvssVector").asText()))
        .cvssScore(score)
        .severity(SeverityUtils.fromScore(score))
        .source(Constants.OSS_INDEX_PROVIDER);
  }
}
