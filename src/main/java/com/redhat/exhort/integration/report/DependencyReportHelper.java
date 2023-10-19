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

package com.redhat.exhort.integration.report;

import java.util.List;
import java.util.Objects;

import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.TransitiveDependencyReport;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public final class DependencyReportHelper {

  public int transitiveIssuesCount(DependencyReport report) {
    return report.getTransitive().stream().mapToInt(t -> t.getIssues().size()).sum();
  }

  public long directRemediationCount(DependencyReport report) {
    return report.getIssues().stream().map(Issue::getRemediation).filter(Objects::nonNull).count();
  }

  public long transitiveRemediationCount(DependencyReport report) {
    return report.getTransitive().stream()
        .map(TransitiveDependencyReport::getIssues)
        .flatMap(List::stream)
        .map(Issue::getRemediation)
        .filter(Objects::nonNull)
        .count();
  }
}
