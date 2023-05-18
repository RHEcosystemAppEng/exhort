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

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record DependencyReport(
        PackageRef ref,
        Issue highestVulnerability,
        List<Issue> issues,
        List<TransitiveDependencyReport> transitive,
        Map<String, Remediation> remediations,
        PackageRef recommendation) {

    public DependencyReport {
        if (issues != null) {
            issues =
                    issues.stream()
                            .sorted(Comparator.comparing(Issue::cvssScore).reversed())
                            .collect(Collectors.toUnmodifiableList());
        }
    }

    public int transitiveIssuesCount() {
        return transitive.stream().mapToInt(t -> t.issues().size()).sum();
    }

    public boolean hasRemediation() {
        if (!remediations.isEmpty()) {
            return true;
        }
        return transitive != null && transitive.stream().anyMatch(t -> !t.remediations().isEmpty());
    }

    public int transitiveRemediationCount() {
        return transitive.stream().mapToInt(t -> t.remediations().size()).sum();
    }

    public PackageRef findRemediationByIssue(Issue issue) {
        if (issue.cves().isEmpty()) {
            return null;
        }
        List<Remediation> result = new ArrayList<>();
        issue.cves().stream()
                .map(cve -> remediations.get(cve))
                .filter(Objects::nonNull)
                .forEach(result::add);

        if (result.isEmpty()) {
            return null;
        }
        // Assuming there's only one CVE by issue
        return result.get(0).mavenPackage();
    }

    public PackageRef findTransitiveRemediationByIssue(Issue issue) {
        if (issue.cves().isEmpty()) {
            return null;
        }
        List<Remediation> result = new ArrayList<>();
        issue.cves().stream()
                .forEach(
                        cve ->
                                transitive.stream()
                                        .map(t -> t.remediations().get(cve))
                                        .filter(Objects::nonNull)
                                        .forEach(result::add));

        if (result.isEmpty()) {
            return null;
        }
        // Assuming there's only one CVE by issue
        return result.get(0).mavenPackage();
    }
}
