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

package com.redhat.ecosystemappeng.trustedcontent;

import org.jgrapht.traverse.BreadthFirstIterator;

import com.redhat.ecosystemappeng.model.GraphRequest;
import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.model.graph.DependencyEdge;
import com.redhat.ecosystemappeng.routes.integration.GraphUtils;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TrustedContentBodyMapper {

    public String toPackages(GraphRequest req) {
        BreadthFirstIterator<PackageRef, DependencyEdge> iterator = new BreadthFirstIterator<>(req.graph());
        StringBuilder builder = new StringBuilder("[");
        while (iterator.hasNext()) {
            PackageRef dep = iterator.next();
            if (!GraphUtils.DEFAULT_ROOT.equals(dep)) {
                builder.append("\"").append(dep.name()).append(":").append(dep.version()).append("\"");
                if (iterator.hasNext()) {
                    builder.append(",");
                }
            }
        }
        return builder.append("]").toString();
    }

}
