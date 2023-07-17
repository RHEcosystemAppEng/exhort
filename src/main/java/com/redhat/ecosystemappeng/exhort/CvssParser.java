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

package com.redhat.ecosystemappeng.exhort;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.BiConsumer;

import com.redhat.ecosystemappeng.exhort.model.CvssVector;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class CvssParser {

  private static final record IndexItem(
      BiConsumer<String, CvssVector.Builder> setter, Map<String, String> parameters) {}

  private static final Map<String, IndexItem> INDEX = new HashMap<>();
  private static final Map<String, String> ATTACK_VECTORS = new HashMap<>();
  private static final Map<String, String> ATTACK_COMPLEXITY = new HashMap<>();
  private static final Map<String, String> PRIVILEGES_REQUIRED = new HashMap<>();
  private static final Map<String, String> USER_INTERACTION = new HashMap<>();
  private static final Map<String, String> SCOPE = new HashMap<>();
  private static final Map<String, String> IMPACT = new HashMap<>();
  private static final Map<String, String> EXPLOIT_CODE_MATURITY = new HashMap<>();
  private static final Map<String, String> REMEDIATION_LEVEL = new HashMap<>();
  private static final Map<String, String> REPORT_CONFIDENCE = new HashMap<>();

  static {
    INDEX.put("AV", new IndexItem((v, b) -> b.attackVector(v), ATTACK_VECTORS));
    INDEX.put("AC", new IndexItem((v, b) -> b.attackComplexity(v), ATTACK_COMPLEXITY));
    INDEX.put("PR", new IndexItem((v, b) -> b.privilegesRequired(v), PRIVILEGES_REQUIRED));
    INDEX.put("UI", new IndexItem((v, b) -> b.userInteraction(v), USER_INTERACTION));
    INDEX.put("S", new IndexItem((v, b) -> b.scope(v), SCOPE));
    INDEX.put("C", new IndexItem((v, b) -> b.confidentialityImpact(v), IMPACT));
    INDEX.put("I", new IndexItem((v, b) -> b.integrityImpact(v), IMPACT));
    INDEX.put("A", new IndexItem((v, b) -> b.availabilityImpact(v), IMPACT));
    INDEX.put("E", new IndexItem((v, b) -> b.exploitCodeMaturity(v), EXPLOIT_CODE_MATURITY));
    INDEX.put("RL", new IndexItem((v, b) -> b.remediationLevel(v), REMEDIATION_LEVEL));
    INDEX.put("RC", new IndexItem((v, b) -> b.reportConfidence(v), REPORT_CONFIDENCE));

    ATTACK_VECTORS.put("N", "Network");
    ATTACK_VECTORS.put("A", "Adjacent Network");
    ATTACK_VECTORS.put("L", "Local");
    ATTACK_VECTORS.put("P", "Physical");

    ATTACK_COMPLEXITY.put("L", "Low");
    ATTACK_COMPLEXITY.put("H", "High");

    PRIVILEGES_REQUIRED.put("N", "None");
    PRIVILEGES_REQUIRED.put("L", "Low");
    PRIVILEGES_REQUIRED.put("H", "High");

    USER_INTERACTION.put("N", "None");
    USER_INTERACTION.put("R", "Required");

    SCOPE.put("U", "Unchanged");
    SCOPE.put("C", "Changed");

    IMPACT.put("N", "None");
    IMPACT.put("L", "Low");
    IMPACT.put("H", "High");

    EXPLOIT_CODE_MATURITY.put("X", "Not Defined");
    EXPLOIT_CODE_MATURITY.put("U", "Unproven that exploit exists");
    EXPLOIT_CODE_MATURITY.put("P", "Proof of concept code");
    EXPLOIT_CODE_MATURITY.put("F", "Functional exploit exists");
    EXPLOIT_CODE_MATURITY.put("H", "High");

    REMEDIATION_LEVEL.put("X", "Not Defined");
    REMEDIATION_LEVEL.put("O", "Official fix");
    REMEDIATION_LEVEL.put("T", "Temporary fix");
    REMEDIATION_LEVEL.put("W", "Workaround");
    REMEDIATION_LEVEL.put("U", "Unavailable");

    REPORT_CONFIDENCE.put("X", "Not Defined");
    REPORT_CONFIDENCE.put("U", "Unknown");
    REPORT_CONFIDENCE.put("R", "Reasonable");
    REPORT_CONFIDENCE.put("C", "Confirmed");
  }

  public static CvssVector fromVectorString(String vector) {
    Objects.requireNonNull(vector);
    CvssVector.Builder builder = new CvssVector.Builder();
    String[] parts = vector.split("/");
    for (int i = 0; i < parts.length; i++) {
      String[] metrics = parts[i].split(":");
      if (metrics.length == 2 && INDEX.containsKey(metrics[0])) {
        IndexItem item = INDEX.get(metrics[0]);
        String value = item.parameters().get(metrics[1]);
        item.setter().accept(value, builder);
      }
    }

    return builder.cvss(vector).build();
  }

  private CvssParser() {}
}
