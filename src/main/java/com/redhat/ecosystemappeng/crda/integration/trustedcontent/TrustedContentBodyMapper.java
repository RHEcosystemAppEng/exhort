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
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import com.redhat.ecosystemappeng.crda.model.Recommendation;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.VexRequest;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.VexResult;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TrustedContentBodyMapper {

    public VexRequest buildVexRequest(@Body GraphRequest graph) {
        return new VexRequest(
                graph.issues().values().stream()
                        .flatMap(Collection::stream)
                        .map(e -> e.cves())
                        .flatMap(Set::stream)
                        .collect(Collectors.toUnmodifiableList()));
    }

    public Map<String, Recommendation> createRecommendations(VexRequest request, List<VexResult> response) {
        Map<String, Recommendation> recommendations = new HashMap<>();
        for (int i = 0; i < request.cves().size(); i++) {
            VexResult result = response.get(i);
            if (result != null) {
                String cve = request.cves().get(i);
                PackageRef ref = new PackageRef(
                        result.mavenPackage().groupId() + ":" + result.mavenPackage().artifactId(),
                        result.mavenPackage().version());
                Recommendation r = new Recommendation(cve, ref, result.productStatus());
                recommendations.put(cve, r);
            }
        }
        return recommendations;
    }

    public GraphRequest filterRecommendations(GraphRequest req, Map<String, Recommendation> recommendations) {
        recommendations.entrySet().stream()
                .filter(Objects::nonNull)
                .filter(r -> req.graph().containsVertex(r.getValue().mavenPackage()));

        if (recommendations.isEmpty()) {
            return req;
        }
        return new GraphRequest.Builder(req).securityRecommendations(recommendations).build();

    }

}
