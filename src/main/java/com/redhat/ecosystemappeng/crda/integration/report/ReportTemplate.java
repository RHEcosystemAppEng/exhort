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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.redhat.ecosystemappeng.crda.model.DependencyReport;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RegisterForReflection
public class ReportTemplate {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportTemplate.class);
    public Map<String, Object> setVariables(List<DependencyReport> report) throws JsonMappingException, JsonProcessingException, IOException {

        Map<String, Object> reportMap = new HashMap<>();
        List<DependencyReportWrapper> wrappers = new ArrayList<>();
        for (DependencyReport dependencyReport : report) {
            wrappers.add(new DependencyReportWrapper(dependencyReport));
        }

        int totalVul = countTotalVul(wrappers);
        reportMap.put("directs", wrappers);
        reportMap.put("totalVul", totalVul);
        reportMap.put("vulnerableDeps", report.size());

        return reportMap;
    }

    private int countTotalVul(List<DependencyReportWrapper> report) {
        int total = 0;
        for (DependencyReportWrapper dependencyReport : report) {
            total += dependencyReport.countDirectVulnerabilities() + dependencyReport.countTransitiveVulnerabilities();
        }
        return total;
    }

}
