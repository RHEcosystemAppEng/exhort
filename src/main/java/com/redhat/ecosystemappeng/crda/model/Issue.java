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

import java.util.Collections;
import java.util.Objects;
import java.util.Set;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record Issue(
        String id,
        String title,
        String source,
        CvssVector cvss,
        Float cvssScore,
        Severity severity,
        Set<String> cves) {

    public Issue {
        Objects.requireNonNull(id);
        Objects.requireNonNull(title);
        Objects.requireNonNull(source);
        Objects.requireNonNull(severity);
        Objects.requireNonNull(cvssScore);
        if(cves != null) {
            cves = Collections.unmodifiableSet(cves);
        }
    }            

    public static class Builder {

        String id;
        String title;
        String source;
        CvssVector cvss;
        Float cvssScore;
        Severity severity;
        Set<String> cves;

        public Builder(String id) {
            this.id = id;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder source(String source) {
            this.source = source;
            return this;
        }

        public Builder cvss(CvssVector cvss) {
            this.cvss = cvss;
            return this;
        }

        public Builder cvssScore(Float cvssScore) {
            this.cvssScore = cvssScore;
            return this;
        }

        public Builder cves(Set<String> cves) {
            this.cves = cves;
            return this;
        }

        public Builder severity(Severity severity) {
            this.severity = severity;
            return this;
        }

        public Issue build() {
            return new Issue(id, title, source, cvss, cvssScore, severity, cves);
        }
    }
}
