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

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.redhat.exhort.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;

@RegisterForReflection
@ApplicationScoped
public class ReportTemplate {

  @ConfigProperty(name = "report.snyk.issue.regex")
  String snykIssuePathRegex;

  @ConfigProperty(name = "report.snyk.signup.link")
  String snykSignup;

  @ConfigProperty(name = "report.ossindex.issue.regex")
  String ossIssuePathRegex;

  @ConfigProperty(name = "report.nvd.issue.regex")
  String nvdIssuePathRegex;

  @ConfigProperty(name = "report.cve.issue.regex")
  String cveIssuePathRegex;

  public Map<String, Object> setVariables(
      @Body Object report,
      @ExchangeProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY) List<String> providerPrivateData)
      throws JsonMappingException, JsonProcessingException, IOException {

    Map<String, Object> params = new HashMap<>();
    params.put("report", report);
    params.put("snykIssueTemplate", snykIssuePathRegex);
    params.put("ossIssueTemplate", ossIssuePathRegex);
    params.put("nvdIssueTemplate", nvdIssuePathRegex);
    params.put("providerPrivateData", providerPrivateData);
    params.put("snykSignup", snykSignup);
    params.put("cveIssueTemplate", cveIssuePathRegex);

    ObjectWriter objectWriter = new ObjectMapper().writer();
    String appData = objectWriter.writeValueAsString(params);
    params.put("appData", appData);

    return params;
  }

  @RegisterForReflection
  public static record IssueLinkFormatter(String issuePathRegex) {

    public String format(String id) {
      return String.format(issuePathRegex, id, id);
    }
  }
}
