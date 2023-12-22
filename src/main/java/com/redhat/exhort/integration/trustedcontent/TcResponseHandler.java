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

package com.redhat.exhort.integration.trustedcontent;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.Exchange;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.ProviderStatus;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderResponseHandler;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.ProviderResponse;
import com.redhat.exhort.model.trustedcontent.IndexedRecommendation;
import com.redhat.exhort.model.trustedcontent.Recommendations;
import com.redhat.exhort.model.trustedcontent.TcRecommendation;
import com.redhat.exhort.model.trustedcontent.TrustedContentResponse;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response.Status;

@ApplicationScoped
@RegisterForReflection
public class TcResponseHandler extends ProviderResponseHandler {

  @Inject ObjectMapper mapper;

  public TrustedContentResponse parseResponse(@Body byte[] tcResponse) throws IOException {
    var recommendations = mapper.readValue(tcResponse, Recommendations.class);

    var mergedRecommendations = mergeRecommendations(recommendations);

    return new TrustedContentResponse(
        mergedRecommendations,
        new ProviderStatus()
            .name(getProviderName())
            .code(Status.OK.getStatusCode())
            .message(Status.OK.getReasonPhrase())
            .ok(Boolean.TRUE));
  }

  private Map<PackageRef, IndexedRecommendation> mergeRecommendations(
      Recommendations recommendations) {
    Map<PackageRef, IndexedRecommendation> result = new HashMap<>();
    recommendations.getMatchings().entrySet().stream()
        .forEach(
            e -> result.put(new PackageRef(e.getKey()), aggregateRecommendations(e.getValue())));
    return result;
  }

  private IndexedRecommendation aggregateRecommendations(List<TcRecommendation> recommendations) {
    PackageRef pkgRef = getHighestRemediationRecommendation(recommendations);
    return new IndexedRecommendation(
        pkgRef,
        recommendations.stream()
            .map(TcRecommendation::vulnerabilities)
            .flatMap(List::stream)
            .collect(Collectors.toMap(v -> v.getId().toUpperCase(), v -> v)));
  }

  private PackageRef getHighestRemediationRecommendation(List<TcRecommendation> tcRecommendations) {
    return tcRecommendations.stream()
        .sorted(
            (rec1, rec2) ->
                Arrays.compare(
                    rec2.packageName().toString().toCharArray(),
                    rec1.packageName().toString().toCharArray()))
        .map(recommendedPackage -> recommendedPackage.packageName())
        .findFirst()
        .get();
  }

  @Override
  protected String getProviderName() {
    return Constants.TRUSTED_CONTENT_PROVIDER;
  }

  @Override
  public void processResponseError(Exchange exchange) {
    super.processResponseError(exchange);
    var response = exchange.getIn().getBody(ProviderResponse.class);
    exchange.getIn().setBody(new TrustedContentResponse(null, response.status()));
  }

  @Override
  public ProviderResponse responseToIssues(
      byte[] response, String privateProviders, DependencyTree tree) throws IOException {
    throw new UnsupportedOperationException("Not yet implemented");
  }
}
