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

package com.redhat.exhort.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.redhat.exhort.api.CvssVector;

public class CvssParserTest {

  private static final String[] INPUTS = {
    "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H",
    "CVSS:3.1/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:L/A:L/E:U/RL:U/RC:R"
  };

  private static final CvssVector[] EXPECTATIONS = {
    new CvssVector()
        .attackVector("Network")
        .attackComplexity("High")
        .privilegesRequired("None")
        .userInteraction("None")
        .scope("Unchanged")
        .confidentialityImpact("None")
        .integrityImpact("None")
        .availabilityImpact("High")
        .cvss(INPUTS[0]),
    new CvssVector()
        .attackVector("Adjacent Network")
        .attackComplexity("High")
        .privilegesRequired("Low")
        .userInteraction("Required")
        .scope("Unchanged")
        .confidentialityImpact("High")
        .integrityImpact("Low")
        .availabilityImpact("Low")
        .exploitCodeMaturity("Unproven that exploit exists")
        .remediationLevel("Unavailable")
        .reportConfidence("Reasonable")
        .cvss(INPUTS[1])
  };

  @Test
  void testVectors() {
    for (int i = 0; i < INPUTS.length; i++) {
      assertEquals(EXPECTATIONS[i], CvssParser.fromVectorString(INPUTS[i]), "Failed: " + INPUTS[i]);
    }
  }
}
