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

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.redhat.exhort.api.AnalysisReport;
import com.redhat.exhort.api.AnalysisReportValue;
import com.redhat.exhort.api.DependencyReport;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.Remediation;
import com.redhat.exhort.api.TransitiveDependencyReport;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.trustedcontent.MavenPackage;
import com.redhat.exhort.model.trustedcontent.VexRequest;
import com.redhat.exhort.model.trustedcontent.VexResult;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TrustedContentBodyMapper {

  public static VexRequest buildVexRequest(@Body AnalysisReport reports) {
    Set<String> cves = new HashSet<>();
    reports.values().stream()
        .map(AnalysisReportValue::getDependencies)
        .flatMap(List::stream)
        .forEach(
            d -> {
              if (d.getIssues() != null) {
                d.getIssues().stream().forEach(i -> cves.addAll(i.getCves()));
              }
              if (d.getTransitive() != null) {
                cves.addAll(
                    d.getTransitive().stream()
                        .map(TransitiveDependencyReport::getIssues)
                        .flatMap(List::stream)
                        .filter(Objects::nonNull)
                        .map(Issue::getCves)
                        .filter(Objects::nonNull)
                        .flatMap(List::stream)
                        .collect(Collectors.toSet()));
              }
            });

    return new VexRequest(List.copyOf(cves));
  }

  public Map<String, Remediation> createRemediations(VexRequest request, List<VexResult> response) {
    Map<String, Remediation> remediations = new HashMap<>();
    for (int i = 0; i < request.cves().size(); i++) {
      VexResult result = response.get(i);
      if (result != null) {
        String cve = request.cves().get(i);
        PackageRef ref =
            toMavenPkgRef(
                result.mavenPackage().groupId(),
                result.mavenPackage().artifactId(),
                result.mavenPackage().version());
        Remediation r =
            new Remediation().issueRef(cve).mavenPackage(ref).productStatus(result.productStatus());
        remediations.put(cve, r);
      }
    }
    return remediations;
  }

  public AnalysisReport filterRemediations(
      AnalysisReport req, Map<String, Remediation> remediations) {
    if (remediations == null || remediations.isEmpty()) {
      return req;
    }
    req.values()
        .forEach(
            report ->
                report.getDependencies().stream()
                    .forEach(
                        d -> {
                          Map<String, Remediation> depRemediations = new HashMap<>();
                          if (d.getIssues() != null) {
                            d.getIssues()
                                .forEach(
                                    i -> {
                                      List<String> cves = i.getCves();
                                      if (cves != null) {
                                        cves.forEach(
                                            cve -> {
                                              Remediation r = remediations.get(cve);
                                              if (r != null
                                                  && r.getMavenPackage()
                                                      .name()
                                                      .equals(d.getRef().name())) {
                                                depRemediations.put(cve, r);
                                              }
                                            });
                                      }
                                    });
                            if (d.getTransitive() != null) {
                              d.getTransitive()
                                  .forEach(
                                      transitive -> {
                                        Map<String, Remediation> transRemediations =
                                            new HashMap<>();
                                        if (transitive.getIssues() != null) {
                                          transitive
                                              .getIssues()
                                              .forEach(
                                                  i -> {
                                                    List<String> cves = i.getCves();
                                                    if (cves != null) {
                                                      cves.forEach(
                                                          cve -> {
                                                            Remediation r = remediations.get(cve);
                                                            if (r != null)
                                                              if (r.getMavenPackage()
                                                                  .name()
                                                                  .equals(
                                                                      transitive.getRef().name())) {
                                                                transRemediations.put(cve, r);
                                                              } else if (r.getMavenPackage()
                                                                  .name()
                                                                  .equals(d.getRef().name())) {
                                                                depRemediations.put(cve, r);
                                                              }
                                                          });
                                                    }
                                                  });
                                        }
                                        transitive.setRemediations(transRemediations);
                                      });
                            }
                          }
                          d.setRemediations(depRemediations);
                        }));
    return req;
  }

  // Only look for recommendations for direct dependencies
  public List<String> buildGavRequest(
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree) {
    return tree.dependencies().keySet().stream()
        .map(PackageRef::toGav)
        .sorted()
        .collect(Collectors.toUnmodifiableList());
  }

  public AnalysisReport addRecommendations(
      AnalysisReport reports, Map<String, PackageRef> recommendations) {
    if (recommendations == null || recommendations.isEmpty()) {
      return reports;
    }

    reports
        .values()
        .forEach(
            report ->
                recommendations
                    .entrySet()
                    .forEach(
                        r -> {
                          Optional<DependencyReport> dep =
                              report.getDependencies().stream()
                                  .filter(d -> d.getRef().toGav().equals(r.getKey()))
                                  .findFirst();
                          if (dep.isPresent()) {
                            dep.get().setRecommendation(r.getValue());
                          }
                        }));
    return reports;
  }

  public Map<String, PackageRef> createGavRecommendations(
      List<String> gavRequest, List<MavenPackage> recommendations) {
    Map<String, PackageRef> result = new HashMap<>();
    for (int i = 0; i < gavRequest.size(); i++) {
      MavenPackage pkg = recommendations.get(i);
      if (pkg != null) {
        result.put(
            gavRequest.get(i), toMavenPkgRef(pkg.groupId(), pkg.artifactId(), pkg.version()));
      }
    }
    return result;
  }

  public int cvesSize(@Body VexRequest req) {
    if (req == null || req.cves() == null) {
      return 0;
    }
    return req.cves().size();
  }

  public int gavsSize(@Body List<String> gavs) {
    if (gavs == null) {
      return 0;
    }
    return gavs.size();
  }

  private PackageRef toMavenPkgRef(String groupId, String artifactId, String version) {
    return PackageRef.builder()
        .pkgManager(Constants.MAVEN_PKG_MANAGER)
        .namespace(groupId)
        .name(artifactId)
        .version(version)
        .build();
  }
}
