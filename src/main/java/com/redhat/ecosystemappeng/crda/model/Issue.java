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

package com.redhat.ecosystemappeng.crda.model;

import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record Issue(String id, String source, Set<String> cves, JsonNode rawData) {

    public static final class Builder {
        String id;
        String source;
        Set<String> cves;
        JsonNode rawData;

        public Builder(String id) {
            this.id = id;
        }

        public Builder source(String source) {
            this.source = source;
            return this;
        }

        public Builder cves(Set<String> cves) {
            this.cves = cves;
            return this;
        }

        public Builder rawData(JsonNode rawData) {
            this.rawData = rawData;
            return this;
        }

        public Issue build() {
            return new Issue(id, source, cves, rawData);
        }
    }

}
