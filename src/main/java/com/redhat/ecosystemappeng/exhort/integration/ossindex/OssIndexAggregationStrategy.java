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

package com.redhat.ecosystemappeng.exhort.integration.ossindex;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redhat.ecosystemappeng.exhort.integration.Constants;
import com.redhat.ecosystemappeng.exhort.model.GraphRequest;
import com.redhat.ecosystemappeng.exhort.model.Issue;
import com.redhat.ecosystemappeng.exhort.model.PackageRef;
import com.redhat.ecosystemappeng.exhort.model.ProviderStatus;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.ws.rs.core.Response;

@RegisterForReflection
public class OssIndexAggregationStrategy {

  private static final int BULK_SIZE = 128;

  public List<List<PackageRef>> split(GraphRequest graphRequest) {
    List<List<PackageRef>> bulks = new ArrayList<>();
    graphRequest
        .tree()
        .getAll()
        .forEach(
            d -> {
              if (bulks.isEmpty()) {
                bulks.add(new ArrayList<>());
              }
              List<PackageRef> bulk = bulks.get(bulks.size() - 1);
              if (bulk.size() == BULK_SIZE) {
                bulk = new ArrayList<>();
                bulks.add(bulk);
              }
              bulk.add(d);
            });
    return bulks;
  }

  public Map<String, List<Issue>> aggregateSplit(
      Map<String, List<Issue>> oldExchange, Map<String, List<Issue>> newExchange)
      throws IOException {
    if (oldExchange != null) {
      oldExchange.putAll(newExchange);
      return oldExchange;
    }
    return newExchange;
  }

  @SuppressWarnings("unchecked")
  public GraphRequest aggregate(GraphRequest graphReq, Object newExchange)
      throws JsonMappingException, JsonProcessingException {
    GraphRequest.Builder builder = new GraphRequest.Builder(graphReq);
    if (newExchange instanceof ProviderStatus) {
      return builder.providerStatuses(List.of((ProviderStatus) newExchange)).build();
    }

    Map<String, List<Issue>> issues;
    if (newExchange instanceof List) {
      issues = Collections.emptyMap();
    } else {
      issues = (Map<String, List<Issue>>) newExchange;
    }

    ProviderStatus status =
        new ProviderStatus(
            true,
            Constants.OSS_INDEX_PROVIDER,
            Response.Status.OK.getStatusCode(),
            Response.Status.OK.name());
    return builder.issues(issues).providerStatuses(List.of(status)).build();
  }
}
