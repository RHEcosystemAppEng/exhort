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

package com.redhat.ecosystemappeng.crda.integration;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.Issue;
import com.redhat.ecosystemappeng.crda.model.Recommendation;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ProviderAggregationStrategy {

    public GraphRequest aggregate(GraphRequest oldRequest, GraphRequest newRequest) {
        if (oldRequest == null) {
            return newRequest;
        }
        Map<String, Collection<Issue>> issues = new HashMap<>(oldRequest.issues());
        issues.putAll(newRequest.issues());

        Map<String, Recommendation> recommendations = new HashMap<>(oldRequest.recommendations());
        recommendations.putAll(newRequest.recommendations());
        return new GraphRequest.Builder(oldRequest).issues(issues).recommendations(recommendations).build();
    }

}
