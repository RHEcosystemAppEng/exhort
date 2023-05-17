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

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redhat.ecosystemappeng.crda.model.AnalysisReport;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;

@RegisterForReflection
@ApplicationScoped
public class ReportTemplate {

    @ConfigProperty(name = "report.trustedContent.link")
    String remediationPath;

    @ConfigProperty(name = "report.snyk.link")
    String packagePath;

    @ConfigProperty(name = "api.snyk.issue.regex")
    String issuePathRegex;

    @ConfigProperty(name = "report.vex.link")
    String vexPath;

    @ConfigProperty(name = "report.sbom.link")
    String sbomPath;

    public Map<String, Object> setVariables(AnalysisReport report)
            throws JsonMappingException, JsonProcessingException, IOException {

        Map<String, Object> params = new HashMap<>();
        params.put("report", report);
        params.put("remediationPath", remediationPath);
        params.put("packagePath", packagePath);
        params.put("issueLinkFormatter", new IssueLinkFormatter(issuePathRegex));
        params.put("vexPath", vexPath);
        params.put("sbomPath", sbomPath);

        return params;
    }

    @RegisterForReflection
    public static record IssueLinkFormatter(String issuePathRegex) {

        public String format(String id) {
            return String.format(issuePathRegex, id, id);
        }
    }
}
