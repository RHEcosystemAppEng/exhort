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

package com.redhat.exhort.integration.providers.ossindex;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Supplier;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.ProviderResponse;
import com.redhat.exhort.api.SeverityUtils;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.Source;
import com.redhat.exhort.api.v4.VulnerabilitiesSummary;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderResponseHandler;
import com.redhat.exhort.model.CvssParser;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class OssIndexResponseHandler extends ProviderResponseHandler {

  private static final Logger LOGGER = LoggerFactory.getLogger(OssIndexRequestBuilder.class);

  private static final Source OSS_INDEX_SOURCE =
      new Source().origin(Constants.OSS_INDEX_PROVIDER).provider(Constants.OSS_INDEX_PROVIDER);

  private final ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public ProviderResponse aggregateSplit(ProviderResponse oldExchange, ProviderResponse newExchange)
      throws IOException {
    if (!newExchange.summary().getStatus().getOk()) {
      return newExchange;
    }
    if (oldExchange != null) {
      if (!oldExchange.summary().getStatus().getOk()) {
        return oldExchange;
      }
      oldExchange.report().addAll(newExchange.report());
      oldExchange
          .summary()
          .getSources()
          .entrySet()
          .forEach(
              e -> {
                accumulateSummaries(
                    e.getValue(), newExchange.summary().getSources().get(e.getKey()));
              });
      return oldExchange;
    }
    return newExchange;
  }

  private void accumulateSummaries(VulnerabilitiesSummary acc, VulnerabilitiesSummary inc) {
    if (inc == null) {
      return;
    }
    accumulate(acc::setDirect, acc::getDirect, inc::getDirect);
    accumulate(acc::setTransitive, acc::getTransitive, inc::getTransitive);
    accumulate(acc::setTotal, acc::getTotal, inc::getTotal);
    accumulate(acc::setCritical, acc::getCritical, inc::getCritical);
    accumulate(acc::setHigh, acc::getHigh, inc::getHigh);
    accumulate(acc::setMedium, acc::getMedium, inc::getMedium);
    accumulate(acc::setLow, acc::getLow, inc::getLow);
    accumulate(acc::setRecommendations, acc::getRemediations, inc::getRecommendations);
    accumulate(acc::setRemediations, acc::getRemediations, inc::getRemediations);
  }

  private void accumulate(
      Consumer<Integer> setter, Supplier<Integer> accGetter, Supplier<Integer> incGetter) {
    Integer acc = accGetter.get();
    Integer inc = incGetter.get();
    if (acc == null) {
      setter.accept(inc);
    } else if (inc == null) {
      setter.accept(acc);
    } else {
      setter.accept(acc + inc);
    }
  }

  public Map<String, List<Issue>> responseToIssues(byte[] response, String privateProviders)
      throws IOException {
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
        .source(OSS_INDEX_SOURCE);
  }

  @Override
  protected String getProviderName() {
    return OSS_INDEX_SOURCE.getProvider();
  }
}
