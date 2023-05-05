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

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.ecosystemappeng.crda.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.Issue;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykAggregationStrategy {

    private final ObjectMapper mapper = ObjectMapperProducer.newInstance();

    public GraphRequest aggregate(GraphRequest graphReq, String newExchange)
            throws JsonMappingException, JsonProcessingException {
        JsonNode snykResponse = mapper.readTree(newExchange);
        Map<String, Collection<Issue>> issuesData = getIssues(snykResponse);
        return new GraphRequest.Builder(graphReq).issues(issuesData).build();
    }

    private Map<String, Collection<Issue>> getIssues(JsonNode snykResponse) {
        Map<String, Collection<Issue>> reports = new HashMap<>();
        snykResponse.withArray("issues").elements().forEachRemaining(n -> {
            String pkgName = n.get("pkgName").asText();
            String issueId = n.get("issueId").asText();
            JsonNode issueData = snykResponse.get("issuesData").get(issueId);
            Collection<Issue> issues = reports.get(pkgName);
            if (issues == null) {
                issues = new ArrayList<>();
                reports.put(pkgName, issues);
            }
            issues.add(toIssue(issueId, issueData));
        });
        return reports;
    }

    private Issue toIssue(String id, JsonNode data) {
        Issue.Builder builder = new Issue.Builder(id).source(Constants.SNYK_PROVIDER);
        Set<String> cves = new HashSet<>();
        data.withArray("/identifiers/CVE")
                .elements()
                .forEachRemaining(cve -> cves.add(cve.asText()));
        builder.rawData(data)
                .cves(cves);
        return builder.build();
    }

}