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

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.api.v4.DependencyReport;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.inject.Singleton;

@Singleton
@RegisterForReflection
public class TcResponseAggregation implements AggregationStrategy {

  @Override
  public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
    // map of purls from dependency tree + their recommendations fetched from TC Endpoint.
    Map<String, String> recommendations = (Map<String, String>) newExchange.getMessage().getBody();
    List<String> keys =
        recommendations.entrySet().stream()
            .map((entry) -> entry.getKey())
            .collect(Collectors.toList());
    ((AnalysisReport) oldExchange.getMessage().getBody())
        .getProviders()
        .forEach(
            (providerName, providerReport) -> {
              providerReport
                  .getSources()
                  .forEach(
                      (sourceName, source) -> {
                        source
                            .getDependencies()
                            .forEach(
                                dependencyReport -> {
                                  if (keys.contains(dependencyReport.getRef().toString())) {
                                    String recommendation =
                                        recommendations.get(dependencyReport.getRef().toString());
                                    dependencyReport.setRecommendation(
                                        PackageRef.builder().purl(recommendation).build());
                                  }
                                });
                        // if purl has no vulnerabilities, then we need to add new DependencyReport
                        // record containing only the ref( original purl) and the recommendation'
                        // purl, without issues.
                        keys.forEach(
                            purl -> {
                              if (source.getDependencies().stream()
                                      .filter(
                                          depReport -> depReport.getRef().toString().equals(purl))
                                      .distinct()
                                      .count()
                                  <= 0) {
                                PackageRef packageRef = new PackageRef(purl);
                                DependencyReport dependency =
                                    new DependencyReport().ref(packageRef);
                                String recommendation = recommendations.get(purl);
                                dependency.recommendation(new PackageRef(recommendation));
                                source.getDependencies().add(dependency);
                              }
                            });
                        Long numOfRecommendations =
                            source.getDependencies().stream()
                                .filter(dep -> Objects.nonNull(dep.getRecommendation()))
                                .count();
                        source
                            .getSummary()
                            .setRecommendations(Integer.parseInt(numOfRecommendations.toString()));
                      });
            });

    return oldExchange;
  }
}
