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

package com.redhat.ecosystemappeng.crda.integration.report;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangeProperty;
import org.apache.camel.Header;
import org.apache.camel.attachment.AttachmentMessage;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.traverse.BreadthFirstIterator;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.integration.GraphUtils;
import com.redhat.ecosystemappeng.crda.model.AnalysisReport;
import com.redhat.ecosystemappeng.crda.model.DependenciesSummary;
import com.redhat.ecosystemappeng.crda.model.DependencyReport;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.Issue;
import com.redhat.ecosystemappeng.crda.model.PackageRef;
import com.redhat.ecosystemappeng.crda.model.Remediation;
import com.redhat.ecosystemappeng.crda.model.Summary;
import com.redhat.ecosystemappeng.crda.model.TransitiveDependencyReport;
import com.redhat.ecosystemappeng.crda.model.VulnerabilitiesSummary;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.activation.DataHandler;
import jakarta.ws.rs.core.MediaType;

@RegisterForReflection
public class ReportTransformer {

    public AnalysisReport transform(@Body GraphRequest request) {
        List<DependencyReport> depsReport = new ArrayList<>();
        List<PackageRef> direct = GraphUtils.getFirstLevel(request.graph());
        VulnerabilityCounter counter = new VulnerabilityCounter();
        direct.forEach(
                d -> {
                    List<Issue> issues = request.issues().get(d.name());
                    if (issues == null) {
                        issues = Collections.emptyList();
                    }
                    List<TransitiveDependencyReport> transitiveReport =
                            getTransitiveDependenciesReport(d, request);
                    updateVulnerabilitySummary(issues, transitiveReport, counter);
                    Optional<Issue> highestVulnerability = issues.stream().findFirst();
                    Optional<Issue> highestTransitive =
                            transitiveReport.stream()
                                    .map(TransitiveDependencyReport::highestVulnerability)
                                    .max(Comparator.comparing(Issue::cvssScore));
                    if (!highestTransitive.isEmpty()) {
                        if (highestVulnerability.isEmpty()
                                || highestVulnerability.get().cvssScore()
                                        < highestTransitive.get().cvssScore()) {
                            highestVulnerability = highestTransitive;
                        }
                    }
                    depsReport.add(
                            new DependencyReport(
                                    d,
                                    highestVulnerability.orElse(null),
                                    issues,
                                    transitiveReport,
                                    getRemediations(issues, request.remediations()),
                                    request.recommendations().get(d.toGav())));
                });
        List<DependencyReport> result =
                depsReport.stream()
                        .filter(
                                r ->
                                        (r.issues() != null && !r.issues().isEmpty())
                                                || !r.transitive().isEmpty()
                                                || r.recommendation() != null)
                        .collect(Collectors.toList());
        int total = request.graph().vertexSet().size() - direct.size() - 1;
        DependenciesSummary deps = new DependenciesSummary(direct.size(), total);
        counter.direct.set(result.size());
        Summary summary = new Summary(deps, counter.getSummary(), request.providerStatuses());
        return new AnalysisReport(summary, result);
    }

    private void updateVulnerabilitySummary(
            List<Issue> issues,
            List<TransitiveDependencyReport> transitiveReport,
            VulnerabilityCounter counter) {
        issues.forEach(i -> incrementCounter(i, counter));
        transitiveReport.forEach(
                tr -> {
                    tr.issues().forEach(i -> incrementCounter(i, counter));
                });
    }

    private void incrementCounter(Issue i, VulnerabilityCounter counter) {
        switch (i.severity()) {
            case CRITICAL:
                counter.critical.incrementAndGet();
                break;
            case HIGH:
                counter.high.incrementAndGet();
                break;
            case MEDIUM:
                counter.medium.incrementAndGet();
                break;
            case LOW:
                counter.low.incrementAndGet();
                break;
        }
        counter.total.incrementAndGet();
    }

    public AnalysisReport hideJsonPrivateData(
            @Body AnalysisReport report,
            @Header(Constants.VERBOSE_MODE_HEADER) Boolean verbose,
            @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY)
                    List<String> providerPrivateData) {
        if (Boolean.FALSE.equals(verbose)
                || (providerPrivateData != null && !providerPrivateData.isEmpty())) {
            return new AnalysisReport(report.summary(), Collections.emptyList());
        }
        return report;
    }

    public void attachHtmlReport(Exchange exchange) {
        exchange.getIn(AttachmentMessage.class)
                .addAttachment(
                        "report.html",
                        new DataHandler(
                                exchange.getIn().getBody(String.class), MediaType.TEXT_HTML));
    }

    private List<TransitiveDependencyReport> getTransitiveDependenciesReport(
            PackageRef start, GraphRequest request) {
        List<PackageRef> directDeps = GraphUtils.getNextLevel(request.graph(), start);
        BreadthFirstIterator<PackageRef, DefaultEdge> i =
                new BreadthFirstIterator<>(request.graph(), directDeps);
        List<TransitiveDependencyReport> result = new ArrayList<>();
        while (i.hasNext()) {
            PackageRef ref = i.next();
            List<Issue> issues = request.issues().get(ref.name());
            if (issues != null && !issues.isEmpty()) {
                Optional<Issue> highestVulnerability =
                        issues.stream().max(Comparator.comparing(Issue::cvssScore));
                result.add(
                        new TransitiveDependencyReport(
                                ref,
                                highestVulnerability.orElse(null),
                                issues,
                                getRemediations(issues, request.remediations())));
            }
        }
        return result;
    }

    private Map<String, Remediation> getRemediations(
            List<Issue> issues, Map<String, Remediation> remediations) {
        Map<String, Remediation> result = new HashMap<>();
        if (issues == null) {
            return result;
        }
        issues.stream()
                .map(i -> i.cves())
                .filter(Objects::nonNull)
                .flatMap(Set::stream)
                .forEach(
                        cve -> {
                            Remediation r = remediations.get(cve);
                            if (r != null) {
                                result.put(cve, r);
                            }
                        });
        return result;
    }

    static final record VulnerabilityCounter(
            AtomicInteger total,
            AtomicInteger direct,
            AtomicInteger critical,
            AtomicInteger high,
            AtomicInteger medium,
            AtomicInteger low) {

        VulnerabilityCounter() {
            this(
                    new AtomicInteger(),
                    new AtomicInteger(),
                    new AtomicInteger(),
                    new AtomicInteger(),
                    new AtomicInteger(),
                    new AtomicInteger());
        }

        VulnerabilitiesSummary getSummary() {
            return new VulnerabilitiesSummary(
                    total.get(), direct.get(), critical.get(), high.get(), medium.get(), low.get());
        }
    }
}
