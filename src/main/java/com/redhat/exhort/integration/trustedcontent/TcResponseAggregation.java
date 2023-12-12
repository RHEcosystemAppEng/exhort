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

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.Remediation;
import com.redhat.exhort.api.v4.RemediationTrustedContent;
import com.redhat.exhort.model.trustedcontent.TcRecommendation;
import com.redhat.exhort.model.trustedcontent.TrustedContentResponse;
import com.redhat.exhort.model.trustedcontent.Vulnerability;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.inject.Singleton;

@Singleton
@RegisterForReflection
public class TcResponseAggregation implements AggregationStrategy {

  @Override
  public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
    // map of purls from dependency tree + their recommendations fetched from TC Endpoint.
    //    Map<String, String> recommendations = (Map<String, String>)
    // newExchange.getMessage().getBody();
    TrustedContentResponse recommendations =
        (TrustedContentResponse) newExchange.getMessage().getBody();
    List<String> purls =
        recommendations.getRecommendationsMatching().entrySet().stream()
            .map(entry -> entry.getKey())
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
                                  List<TcRecommendation> tcRecommendations =
                                      getTcRecommendationsList(recommendations, dependencyReport);
                                  if (tcRecommendations != null && tcRecommendations.size() > 0) {
                                    PackageRef recommendation =
                                        getHighestRemediationRecommendation(tcRecommendations);
                                    dependencyReport.setRecommendation(recommendation);
                                    dependencyReport
                                        .getIssues()
                                        .forEach(
                                            issue -> {
                                              Optional<TcRecommendation> tcRecommendationWrapper =
                                                  sortStreamAccordingToPackageNameDescending(
                                                          getTcRecommendationsList(
                                                                  recommendations, dependencyReport)
                                                              .stream()
                                                              .filter(
                                                                  entry ->
                                                                      entry
                                                                              .vulnerabilities()
                                                                              .stream()
                                                                              .filter(
                                                                                  vulnerability ->
                                                                                      vulnerability
                                                                                              .getId()
                                                                                              .equalsIgnoreCase(
                                                                                                  issue
                                                                                                      .getId())
                                                                                          && !vulnerability
                                                                                              .getStatus()
                                                                                              .equalsIgnoreCase(
                                                                                                  "Affected"))
                                                                              .count()
                                                                          > 0))
                                                      .findFirst();
                                              if (tcRecommendationWrapper.isPresent()) {
                                                if (Objects.isNull(issue.getRemediation())) {
                                                  issue.setRemediation(new Remediation());
                                                }
                                                RemediationTrustedContent
                                                    remediationTrustedContent =
                                                        new RemediationTrustedContent();
                                                TcRecommendation tcRecommendation =
                                                    tcRecommendationWrapper.get();
                                                // Instead of getting the package of the
                                                // remediation, takes the highest remediation
                                                // version,
                                                // as we are assuming that it contains fixes for all
                                                // cves of all older remediation versions.
                                                remediationTrustedContent.setPackage(
                                                    getHighestRemediationRecommendation(
                                                        tcRecommendations));
                                                // get vulnerability object containing the cve'
                                                // status and justification.
                                                Optional<Vulnerability> vulnerability =
                                                    tcRecommendation.vulnerabilities().stream()
                                                        .filter(
                                                            theVulnerability ->
                                                                theVulnerability
                                                                    .getId()
                                                                    .equalsIgnoreCase(
                                                                        issue.getId()))
                                                        .findFirst();
                                                if (vulnerability.isPresent()) {
                                                  Vulnerability theVulnerability =
                                                      vulnerability.get();
                                                  remediationTrustedContent.setStatus(
                                                      theVulnerability.getStatus());
                                                  remediationTrustedContent.setJustification(
                                                      theVulnerability.getJustification());
                                                  issue
                                                      .getRemediation()
                                                      .setTrustedContent(remediationTrustedContent);
                                                }

                                                Integer remediationsCounter =
                                                    source.getSummary().getRemediations() + 1;
                                                source
                                                    .getSummary()
                                                    .setRemediations(remediationsCounter);
                                              }
                                            });
                                  }
                                });
                        // if purl has no vulnerabilities, then we need to add new DependencyReport
                        // record containing only the ref( original purl) and the recommendation'
                        // purl, without issues.
                        purls.forEach(
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
                                Optional<String> first =
                                    sortStreamAccordingToPackageNameDescending(
                                            getTcRecommendationsList(recommendations, dependency)
                                                .stream())
                                        .map(
                                            recommendationPurl ->
                                                recommendationPurl.packageName().toString())
                                        .findFirst();
                                String recommendation = first.isPresent() ? first.get() : null;

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

  private PackageRef getHighestRemediationRecommendation(List<TcRecommendation> tcRecommendations) {
    return sortStreamAccordingToPackageNameDescending(tcRecommendations.stream())
        .map(recommendedPackage -> recommendedPackage.packageName())
        .findFirst()
        .get();
  }

  private Stream<TcRecommendation> sortStreamAccordingToPackageNameDescending(
      Stream<TcRecommendation> tcRecommendationStream) {
    return tcRecommendationStream.sorted(
        (rec1, rec2) ->
            Arrays.compare(
                rec2.packageName().toString().toCharArray(),
                rec1.packageName().toString().toCharArray()));
  }

  private static List<TcRecommendation> getTcRecommendationsList(
      TrustedContentResponse recommendations, DependencyReport dependencyReport) {
    return recommendations.getRecommendationsMatching().get(dependencyReport.getRef().toString());
  }
}
