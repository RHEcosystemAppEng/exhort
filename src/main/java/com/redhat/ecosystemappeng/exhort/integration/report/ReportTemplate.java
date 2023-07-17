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

package com.redhat.ecosystemappeng.exhort.integration.report;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redhat.ecosystemappeng.exhort.integration.Constants;
import com.redhat.ecosystemappeng.exhort.model.AnalysisReport;
import com.redhat.ecosystemappeng.exhort.model.Issue;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;

@RegisterForReflection
@ApplicationScoped
public class ReportTemplate {

  @ConfigProperty(name = "report.trustedContent.link")
  String remediationPath;

  @ConfigProperty(name = "report.snyk.link")
  String packagePath;

  @ConfigProperty(name = "report.snyk.issue.regex")
  String snykIssuePathRegex;

  @ConfigProperty(name = "report.vex.link")
  String vexPath;

  @ConfigProperty(name = "report.sbom.link")
  String sbomPath;

  @ConfigProperty(name = "report.snyk.signup.link")
  String snykSignup;

  @ConfigProperty(name = "report.ossindex.issue.regex")
  String ossIssuePathRegex;

  public Map<String, Object> setVariables(
      @Body AnalysisReport report,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) List<String> providerPrivateData)
      throws JsonMappingException, JsonProcessingException, IOException {

    Map<String, Object> params = new HashMap<>();
    params.put("report", report);
    params.put("remediationPath", remediationPath);
    params.put("packagePath", packagePath);
    params.put("snykIssueLinkFormatter", new IssueLinkFormatter(snykIssuePathRegex));
    params.put("ossIndexIssueLinkFormatter", new IssueLinkFormatter(ossIssuePathRegex));
    params.put("issueVisibilityHelper", new IssueVisibilityHelper(providerPrivateData));
    params.put("vexPath", vexPath);
    params.put("sbomPath", sbomPath);
    params.put("snykSignup", snykSignup);

    return params;
  }

  @RegisterForReflection
  public static record IssueLinkFormatter(String issuePathRegex) {

    public String format(String id) {
      return String.format(issuePathRegex, id, id);
    }
  }

  @RegisterForReflection
  public static record IssueVisibilityHelper(List<String> providerData) {
    public boolean showIssue(Issue issue) {
      if (!issue.unique() || providerData == null) {
        return true;
      }
      return !providerData.contains(issue.source());
    }
  }
}
