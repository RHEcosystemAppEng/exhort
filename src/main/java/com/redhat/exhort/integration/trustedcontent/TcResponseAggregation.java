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

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.ProviderReport;
import com.redhat.exhort.api.v4.Remediation;
import com.redhat.exhort.api.v4.RemediationTrustedContent;
import com.redhat.exhort.api.v4.Source;
import com.redhat.exhort.api.v4.TransitiveDependencyReport;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.trustedcontent.IndexedRecommendation;
import com.redhat.exhort.model.trustedcontent.TrustedContentResponse;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.inject.Singleton;

@Singleton
@RegisterForReflection
public class TcResponseAggregation implements AggregationStrategy {

  @Override
  public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
    // map of purls from dependency tree + their recommendations fetched from TC
    // Endpoint.
    var tcResponse = newExchange.getMessage().getBody(TrustedContentResponse.class);
    var report = oldExchange.getMessage().getBody(AnalysisReport.class);

    report
        .getProviders()
        .put(Constants.TRUSTED_CONTENT_PROVIDER, new ProviderReport().status(tcResponse.status()));
    if (tcResponse.recommendations() == null) {
      return oldExchange;
    }

    report
        .getProviders()
        .values()
        .forEach(
            providerReport -> {
              providerReport
                  .getSources()
                  .values()
                  .forEach(
                      source -> {
                        addRecommendationsToSource(tcResponse.recommendations(), source);
                        addNewRecommendations(
                            tcResponse.recommendations(),
                            source,
                            oldExchange.getProperty(
                                Constants.DEPENDENCY_TREE_PROPERTY, DependencyTree.class));
                        setRecommendationsCount(source);
                        setRemediationsCount(source);
                      });
            });
    return oldExchange;
  }

  private void setRecommendationsCount(Source source) {
    source
        .getSummary()
        .setRecommendations(
            source.getDependencies().stream()
                .map(DependencyReport::getRecommendation)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet())
                .size());
  }

  private void setRemediationsCount(Source source) {
    Set<PackageRef> uniqueRemediations = new HashSet<>();
    uniqueRemediations.addAll(
        source.getDependencies().stream()
            .map(DependencyReport::getIssues)
            .filter(Objects::nonNull)
            .map(this::getIssueRemediations)
            .flatMap(Set::stream)
            .toList());
    uniqueRemediations.addAll(
        source.getDependencies().stream()
            .map(DependencyReport::getTransitive)
            .filter(Objects::nonNull)
            .flatMap(List::stream)
            .map(TransitiveDependencyReport::getIssues)
            .map(this::getIssueRemediations)
            .flatMap(Set::stream)
            .toList());
    source.getSummary().setRemediations(uniqueRemediations.size());
  }

  private Set<PackageRef> getIssueRemediations(List<Issue> issues) {
    if (issues == null) {
      return Collections.emptySet();
    }
    return issues.stream()
        .map(
            i -> {
              if (i.getRemediation() != null && i.getRemediation().getTrustedContent() != null) {
                return i.getRemediation().getTrustedContent();
              }
              return null;
            })
        .filter(Objects::nonNull)
        .map(RemediationTrustedContent::getRef)
        .collect(Collectors.toSet());
  }

  private void addRecommendationsToSource(
      Map<PackageRef, IndexedRecommendation> recommendations, Source source) {
    source
        .getDependencies()
        .forEach(
            dependencyReport -> {
              var recommendation = recommendations.get(dependencyReport.getRef());

              if (recommendation != null
                  && !Objects.equals(dependencyReport.getRef(), recommendation.packageName())) {
                dependencyReport.recommendation(recommendation.packageName());
                dependencyReport.getIssues().stream()
                    .forEach(
                        i -> {
                          addRemediation(recommendation, i);
                        });
              }
              dependencyReport
                  .getTransitive()
                  .forEach(
                      transitive -> {
                        transitive.getIssues().stream()
                            .forEach(
                                i -> addRemediation(recommendations.get(transitive.getRef()), i));
                      });
            });
  }

  private void addNewRecommendations(
      Map<PackageRef, IndexedRecommendation> recommendations, Source source, DependencyTree tree) {
    var sourceDeps = source.getDependencies().stream().map(DependencyReport::getRef).toList();
    recommendations.keySet().stream()
        .filter(pkg -> !sourceDeps.contains(pkg))
        .filter(pkg -> tree.dependencies().containsKey(pkg))
        .forEach(
            pkg ->
                source.addDependenciesItem(
                    new DependencyReport()
                        .ref(pkg)
                        .recommendation(recommendations.get(pkg).packageName())));
  }

  private void addRemediation(IndexedRecommendation recommendation, Issue issue) {
    if (recommendation == null) {
      return;
    }
    if (issue.getCves() != null && !issue.getCves().isEmpty()) {
      // we expect only one CVE per issue
      var cve = issue.getCves().get(0);
      var vulnerability = recommendation.vulnerabilities().get(cve);
      if (vulnerability != null) {
        if (issue.getRemediation() == null) {
          issue.setRemediation(new Remediation());
        }
        issue
            .getRemediation()
            .setTrustedContent(
                new RemediationTrustedContent()
                    .ref(recommendation.packageName())
                    .justification(vulnerability.getJustification())
                    .status(vulnerability.getStatus()));
      }
    }
  }
}
