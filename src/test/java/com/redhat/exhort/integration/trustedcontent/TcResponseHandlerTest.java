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

package com.redhat.exhort.integration.trustedcontent;

import static org.junit.jupiter.api.Assertions.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.junit.jupiter.params.provider.Arguments;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.model.trustedcontent.TcRecommendation;
import com.redhat.exhort.model.trustedcontent.TrustedContentResponse;
import com.redhat.exhort.model.trustedcontent.Vulnerability;

class TcResponseHandlerTest {

  static final String REDHAT_REPOSITORY_SUFFIX =
      "repository_url=https://maven.repository.redhat.com/ga/&type=jar";

  private static Stream<Arguments> getPayload() {
    return Stream.of(
        // full payload with pairs of purls and their recommendations - input, and expected output
        Arguments.of(
            "{\"recommendations\": {\n"
                + "        \"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final\": [\n"
                + "            {\n"
                + "                \"package\":"
                + " \"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar\",\n"
                + "                \"vulnerabilities\": [\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2023-0044\",\n"
                + "                        \"status\": \"Affected\",\n"
                + "                        \"justification\": \"NotProvided\"\n"
                + "                    },\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2023-0481\",\n"
                + "                        \"status\": \"NotAffected\",\n"
                + "                        \"justification\": \"VulnerableCodeNotPresent\"\n"
                + "                    },\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2023-2974\",\n"
                + "                        \"status\": \"Fixed\",\n"
                + "                        \"justification\": \"NotProvided\"\n"
                + "                    },\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2023-1584\",\n"
                + "                        \"status\": \"NotAffected\",\n"
                + "                        \"justification\": \"VulnerableCodeNotPresent\"\n"
                + "                    },\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2023-28867\",\n"
                + "                        \"status\": \"NotAffected\",\n"
                + "                        \"justification\": \"VulnerableCodeNotPresent\"\n"
                + "                    },\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2022-45787\",\n"
                + "                        \"status\": \"NotAffected\",\n"
                + "                        \"justification\": \"VulnerableCodeNotPresent\"\n"
                + "                    }\n"
                + "                ]\n"
                + "            },\n"
                + "            {\n"
                + "                \"package\":"
                + " \"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https://maven.repository.redhat.com/ga/&type=jar\",\n"
                + "                \"vulnerabilities\": [\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2023-44487\",\n"
                + "                        \"status\": \"NotAffected\",\n"
                + "                        \"justification\": \"VulnerableCodeNotPresent\"\n"
                + "                    }\n"
                + "                ]\n"
                + "            },\n"
                + "            {\n"
                + "                \"package\":"
                + " \"pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00005?repository_url=https://maven.repository.redhat.com/ga/&type=jar\",\n"
                + "                \"vulnerabilities\": [\n"
                + "                    {\n"
                + "                        \"id\": \"cve-2023-4853\",\n"
                + "                        \"status\": \"Fixed\",\n"
                + "                        \"justification\": \"NotProvided\"\n"
                + "                    }\n"
                + "                ]\n"
                + "            }\n"
                + "        ]\n"
                + "    }\n"
                + "}",
            buildEquivalentTrustedContentResponse()),

        // empty response
        Arguments.of("{ \"recommendations\": {}\n}", new TrustedContentResponse(null)));
  }

  static TrustedContentResponse buildEquivalentTrustedContentResponse() {
    Map<String, List<TcRecommendation>> recommendationsMap = new HashMap<>();
    recommendationsMap.put(
        "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
        buildTcRecommendationsList(
            "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final",
            List.of("00004", "00005", "00006")));
    return TrustedContentResponse.builder().recommendationsMatching(recommendationsMap).build();
  }

  static List<TcRecommendation> buildTcRecommendationsList(
      String redhatPackage, List<String> classifiers) {
    List<TcRecommendation> recommendations = new ArrayList<>();
    classifiers.forEach(
        classifier -> {
          recommendations.add(
              new TcRecommendation(
                  new PackageRef(redhatPackage + "-" + classifier),
                  buildVulnerabilitiesList(classifier)));
        });

    return recommendations;
  }

  private static List<Vulnerability> buildVulnerabilitiesList(String classifier) {
    switch (classifier) {
      case "00004":
        return List.of(
            new Vulnerability("cve-2023-0044", "Affected", "NotProvided"),
            new Vulnerability("cve-2023-0481", "NotAffected", "VulnerableCodeNotPresent"),
            new Vulnerability("ccve-2023-2974", "Fixed", "NotProvided"),
            new Vulnerability("cve-2023-1584", "NotAffected", "VulnerableCodeNotPresent"),
            new Vulnerability("cve-2023-28867", "NotAffected", "VulnerableCodeNotPresent"),
            new Vulnerability("cve-2022-45787", "NotAffected", "VulnerableCodeNotPresent"));
      case "00005":
        return List.of(new Vulnerability("cve-2023-4853", "Fixed", "NotProvided"));

      case "00006":
        return List.of(
            new Vulnerability("cve-2023-44487", "NotAffected", "VulnerableCodeNotPresent"));

      default:
        return List.of();
    }
  }

  //  @ParameterizedTest
  //  @MethodSource("getPayload")
  void test_Payload_With_Purls(String input, TrustedContentResponse expectedOutput) {
    TcResponseHandler tcResponseHandler = new TcResponseHandler();
    try {
      byte[] bytes = input.getBytes();
      TrustedContentResponse actualOutput = tcResponseHandler.responseToMap(bytes);
      assertEquals(expectedOutput, actualOutput);

    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
