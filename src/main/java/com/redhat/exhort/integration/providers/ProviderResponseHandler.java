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

package com.redhat.exhort.integration.providers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangeProperty;
import org.apache.camel.RuntimeCamelException;
import org.apache.camel.http.base.HttpOperationFailedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.DependencyReport;
import com.redhat.exhort.api.v4.Issue;
import com.redhat.exhort.api.v4.ProviderReport;
import com.redhat.exhort.api.v4.ProviderStatus;
import com.redhat.exhort.api.v4.Source;
import com.redhat.exhort.api.v4.SourceSummary;
import com.redhat.exhort.api.v4.TransitiveDependencyReport;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.CvssScoreComparable.DependencyScoreComparator;
import com.redhat.exhort.model.CvssScoreComparable.TransitiveScoreComparator;
import com.redhat.exhort.model.DependencyTree;
import com.redhat.exhort.model.ProviderResponse;
import com.redhat.exhort.monitoring.MonitoringProcessor;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;

@RegisterForReflection
@ApplicationScoped
public abstract class ProviderResponseHandler {

  private static final Logger LOGGER = LoggerFactory.getLogger(ProviderResponseHandler.class);

  @Inject MonitoringProcessor monitoringProcessor;

  protected abstract String getProviderName();

  public abstract ProviderResponse responseToIssues(
      byte[] response, String privateProviders, DependencyTree tree) throws IOException;

  protected ProviderStatus defaultOkStatus(String provider) {
    return new ProviderStatus()
        .name(provider)
        .ok(Boolean.TRUE)
        .message(Response.Status.OK.getReasonPhrase())
        .code(Response.Status.OK.getStatusCode());
  }

  protected DependencyReport toDependencyReport(PackageRef ref, List<Issue> issues) {
    return new DependencyReport()
        .ref(ref)
        .issues(
            issues.stream()
                .sorted(Comparator.comparing(Issue::getCvssScore).reversed())
                .collect(Collectors.toList()));
  }

  public ProviderReport unauthenticatedResponse(Exchange exchange) {
    return new ProviderReport()
        .status(
            new ProviderStatus()
                .name(getProviderName())
                .ok(Boolean.FALSE)
                .message(Constants.HTTP_UNAUTHENTICATED)
                .code(Response.Status.UNAUTHORIZED.getStatusCode()));
  }

  public void processResponseError(Exchange exchange) {
    ProviderStatus status = new ProviderStatus().ok(false).name(getProviderName());
    Exception exception = (Exception) exchange.getProperty(Exchange.EXCEPTION_CAUGHT);
    Throwable cause = exception.getCause();

    while (cause instanceof RuntimeCamelException && cause != null) {
      cause = cause.getCause();
    }
    if (cause == null) {
      cause = exception;
    }
    if (cause instanceof HttpOperationFailedException) {
      HttpOperationFailedException httpException = (HttpOperationFailedException) cause;
      String message = prettifyHttpError(httpException);
      status.message(message).code(httpException.getStatusCode());
      LOGGER.warn("Unable to process request: {}", message, cause);
    } else if (cause instanceof IllegalArgumentException) {
      status.message(cause.getMessage()).code(422);
      LOGGER.warn("Unable to process request to: {}", getProviderName(), exception);
    } else {
      status
          .message(cause.getMessage())
          .code(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
      LOGGER.warn("Unable to process request to: {}", getProviderName(), cause);
    }
    ProviderResponse response = new ProviderResponse(null, status);
    monitoringProcessor.processProviderError(exchange, exception, getProviderName());
    exchange.getMessage().setBody(response);
  }

  public void processTokenFallBack(Exchange exchange) {
    Exception exception = (Exception) exchange.getProperty(Exchange.EXCEPTION_CAUGHT);
    Throwable cause = exception.getCause();
    String body;
    int code = Response.Status.INTERNAL_SERVER_ERROR.getStatusCode();

    if (cause instanceof HttpOperationFailedException) {
      HttpOperationFailedException httpException = (HttpOperationFailedException) cause;
      code = httpException.getStatusCode();
      if (code == Response.Status.UNAUTHORIZED.getStatusCode()) {
        body = "Invalid token provided. Unauthorized";
      } else {
        body =
            "Unable to validate " + getProviderName() + " Token: " + httpException.getStatusText();
      }
    } else {
      body = "Unable to validate " + getProviderName() + " Token: " + cause.getMessage();
    }
    exchange.getMessage().setHeader(Exchange.HTTP_RESPONSE_CODE, code);
    exchange.getMessage().setBody(body);
  }

  private static String prettifyHttpError(HttpOperationFailedException httpException) {
    String text = httpException.getStatusText();
    String defaultReason =
        httpException.getResponseBody() != null
            ? httpException.getResponseBody()
            : httpException.getMessage();
    return text
        + switch (httpException.getStatusCode()) {
          case 401 -> ": Verify the provided credentials are valid.";
          case 403 -> ": The provided credentials don't have the required permissions.";
          case 429 -> ": The rate limit has been exceeded.";
          default -> ": " + defaultReason;
        };
  }

  public ProviderResponse emptyResponse(
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree) {
    return new ProviderResponse(Collections.emptyMap(), null);
  }

  private Map<String, Map<String, List<Issue>>> splitIssuesBySource(
      Map<String, List<Issue>> issuesData) {
    Map<String, Map<String, List<Issue>>> sourcesIssues = new HashMap<>();
    if (issuesData == null) {
      return sourcesIssues;
    }
    issuesData
        .entrySet()
        .forEach(
            e -> {
              e.getValue()
                  .forEach(
                      i -> {
                        var issues = sourcesIssues.get(i.getSource());
                        if (issues == null) {
                          issues = new HashMap<>();
                          sourcesIssues.put(i.getSource(), issues);
                        }
                        var depIssues = issues.get(e.getKey());
                        if (depIssues == null) {
                          depIssues = new ArrayList<>();
                          issues.put(e.getKey(), depIssues);
                        }
                        depIssues.add(i);
                      });
            });
    return sourcesIssues;
  }

  public ProviderReport buildReport(
      @Body ProviderResponse response,
      @ExchangeProperty(Constants.DEPENDENCY_TREE_PROPERTY) DependencyTree tree,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) String privateProviders)
      throws IOException {
    if (response.status() != null) {
      return new ProviderReport().status(response.status()).sources(Collections.emptyMap());
    }
    var sourcesIssues = splitIssuesBySource(response.issues());
    Map<String, Source> reports = new HashMap<>();
    sourcesIssues
        .keySet()
        .forEach(
            k ->
                reports.put(k, buildReportForSource(sourcesIssues.get(k), tree, privateProviders)));
    return new ProviderReport().status(defaultOkStatus(getProviderName())).sources(reports);
  }

  public Source buildReportForSource(
      Map<String, List<Issue>> issuesData, DependencyTree tree, String privateProviders) {
    List<DependencyReport> sourceReport = new ArrayList<>();
    tree.dependencies().entrySet().stream()
        .forEach(
            depEntry -> {
              var ref = depEntry.getKey().ref();
              var issues = issuesData.get(ref);
              var directReport = new DependencyReport().ref(depEntry.getKey());
              if (issues == null) {
                issues = Collections.emptyList();
              }
              directReport.issues(
                  issues.stream()
                      .sorted(Comparator.comparing(Issue::getCvssScore).reversed())
                      .collect(Collectors.toList()));
              directReport.setHighestVulnerability(issues.stream().findFirst().orElse(null));
              List<TransitiveDependencyReport> transitiveReports =
                  depEntry.getValue().transitive().stream()
                      .map(
                          t -> {
                            List<Issue> transitiveIssues = Collections.emptyList();
                            var tRef = t.ref();
                            if (issuesData.get(tRef) != null) {
                              transitiveIssues =
                                  issuesData.get(tRef).stream()
                                      .sorted(Comparator.comparing(Issue::getCvssScore).reversed())
                                      .collect(Collectors.toList());
                            }
                            var highestTransitive = transitiveIssues.stream().findFirst();
                            if (highestTransitive.isPresent()) {
                              if (directReport.getHighestVulnerability() == null
                                  || directReport.getHighestVulnerability().getCvssScore()
                                      < highestTransitive.get().getCvssScore()) {
                                directReport.setHighestVulnerability(highestTransitive.get());
                              }
                            }
                            return new TransitiveDependencyReport()
                                .ref(t)
                                .issues(transitiveIssues)
                                .highestVulnerability(highestTransitive.orElse(null));
                          })
                      .filter(transitiveReport -> !transitiveReport.getIssues().isEmpty())
                      .collect(Collectors.toList());
              transitiveReports.sort(Collections.reverseOrder(new TransitiveScoreComparator()));
              directReport.setTransitive(transitiveReports);
              if (directReport.getHighestVulnerability() != null) {
                sourceReport.add(directReport);
              }
            });

    sourceReport.sort(Collections.reverseOrder(new DependencyScoreComparator()));
    return new Source().summary(buildSummary(issuesData, tree)).dependencies(sourceReport);
  }

  private SourceSummary buildSummary(Map<String, List<Issue>> issuesData, DependencyTree tree) {
    var counter = new VulnerabilityCounter();
    var directRefs =
        tree.dependencies().keySet().stream().map(PackageRef::ref).collect(Collectors.toSet());
    issuesData
        .entrySet()
        .forEach(e -> incrementCounter(e.getValue(), counter, directRefs.contains(e.getKey())));
    return counter.getSummary();
  }

  private void incrementCounter(
      List<Issue> issues, VulnerabilityCounter counter, boolean isDirect) {
    if (!issues.isEmpty()) {
      counter.dependencies.incrementAndGet();
    }
    issues.forEach(
        i -> {
          var vulnerabilities = countVulnerabilities(i);
          switch (i.getSeverity()) {
            case CRITICAL -> counter.critical.addAndGet(vulnerabilities);
            case HIGH -> counter.high.addAndGet(vulnerabilities);
            case MEDIUM -> counter.medium.addAndGet(vulnerabilities);
            case LOW -> counter.low.addAndGet(vulnerabilities);
          }
          counter.total.addAndGet(vulnerabilities);
          if (isDirect) {
            counter.direct.addAndGet(vulnerabilities);
          }
          if (i.getRemediation() != null
              && i.getRemediation().getTrustedContent() != null
              && i.getRemediation().getTrustedContent().getMavenPackage() != null) {
            counter.remediations.incrementAndGet();
          }
        });
  }

  // The number of vulnerabilities is the total count of public CVEs
  // or if it is private it will be 1
  private int countVulnerabilities(Issue i) {
    if (i.getCves() != null && !i.getCves().isEmpty()) {
      return i.getCves().size();
    }
    if (i.getUnique() != null && i.getUnique()) {
      return 1;
    }
    return 0;
  }

  private static final record VulnerabilityCounter(
      AtomicInteger total,
      AtomicInteger critical,
      AtomicInteger high,
      AtomicInteger medium,
      AtomicInteger low,
      AtomicInteger direct,
      AtomicInteger dependencies,
      AtomicInteger remediations) {

    VulnerabilityCounter() {
      this(
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger(),
          new AtomicInteger());
    }

    SourceSummary getSummary() {
      return new SourceSummary()
          .total(total.get())
          .critical(critical.get())
          .high(high.get())
          .medium(medium.get())
          .low(low.get())
          .direct(direct.get())
          .transitive(total.get() - direct.get())
          .dependencies(dependencies.get())
          .remediations(remediations.get())
          // Will be calculated later when TC recommendations will be added.
          .recommendations(0);
    }
  }
}
