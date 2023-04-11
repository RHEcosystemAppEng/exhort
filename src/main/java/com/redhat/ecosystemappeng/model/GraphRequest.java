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

package com.redhat.ecosystemappeng.model;

import java.util.Objects;

import org.jgrapht.Graph;

import com.redhat.ecosystemappeng.model.graph.DependencyEdge;
import com.redhat.ecosystemappeng.routes.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record GraphRequest (String pkgManager, String provider, Graph<PackageRef, DependencyEdge> graph) {
    
    public GraphRequest {
        Objects.requireNonNull(pkgManager);
        Objects.requireNonNull(provider);
        Objects.requireNonNull(graph);
        if(!Constants.PKG_MANAGERS.contains(pkgManager)) {
            throw new IllegalArgumentException("Unsupported package manager: " +  pkgManager);
        }
        if(!Constants.PROVIDERS.contains(provider)) {
            throw new IllegalArgumentException("Unsupported provider: " +  provider);
        }
    }
    
}
