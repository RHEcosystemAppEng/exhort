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

package com.redhat.ecosystemappeng.crda.integration.trustedcontent;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.camel.Body;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import com.redhat.ecosystemappeng.crda.model.Remediation;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.MavenPackage;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.VexRequest;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.VexResult;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TrustedContentBodyMapper {

  public static VexRequest buildVexRequest(@Body GraphRequest graph) {
    return new VexRequest(
        graph.issues().values().stream()
            .flatMap(Collection::stream)
            .map(e -> e.cves())
            .filter(Objects::nonNull)
            .flatMap(Set::stream)
            .collect(Collectors.toUnmodifiableList()));
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
        Remediation r = new Remediation(cve, ref, result.productStatus());
        remediations.put(cve, r);
      }
    }
    return remediations;
  }

  public GraphRequest filterRemediations(GraphRequest req, Map<String, Remediation> remediations) {
    if (remediations == null || remediations.isEmpty()) {
      return req;
    }
    Map<String, Remediation> merged = new HashMap<>();
    if (req.remediations() != null) {
      merged.putAll(req.remediations());
    }
    remediations.entrySet().stream()
        .filter(Objects::nonNull)
        .filter(
            r -> {
              PackageRef o = r.getValue().mavenPackage();
              return req.tree().getAll().contains(o);
            })
        .forEach(e -> merged.put(e.getKey(), e.getValue()));
    return new GraphRequest.Builder(req).remediations(merged).build();
  }

  public List<String> buildGavRequest(@Body GraphRequest request) {
    return request.tree().getAll().stream()
        .map(PackageRef::toGav)
        .collect(Collectors.toUnmodifiableList());
  }

  public GraphRequest addRecommendations(
      GraphRequest req, Map<String, PackageRef> recommendations) {
    if (recommendations == null || recommendations.isEmpty()) {
      return req;
    }

    Map<String, PackageRef> merged = new HashMap<>(recommendations);
    if (req.recommendations() != null) {
      merged.putAll(req.recommendations());
    }
    return new GraphRequest.Builder(req).recommendations(merged).build();
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
