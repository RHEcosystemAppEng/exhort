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
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

class TcResponseHandlerTest {

  static final String REDHAT_REPOSITORY_SUFFIX =
      "repository_url=https://maven.repository.redhat.com/ga/&type=jar";

  private static Stream<Arguments> getPayload() {
    return Stream.of(
        // full payload with pairs of purls and their recommendations - input, and expected output
        Arguments.of(
            Map.of(
                "recommendations",
                Map.of(
                    "pkg:mgr/io.group/packagename@1.0.0",
                    List.of(
                        Map.of(
                            "package",
                            "pkg:mgr/io.group/packagename@1.0.0-redhat-00001"
                                + REDHAT_REPOSITORY_SUFFIX)),
                    "pkg:mgr/io.group/packagename2@1.0.0",
                    List.of(
                        Map.of(
                            "package",
                            "pkg:mgr/io.group/packagename2@1.0.0-redhat-00001"
                                + REDHAT_REPOSITORY_SUFFIX)),
                    "pkg:mgr/io.group/packagename3@1.0.0",
                    List.of(
                        Map.of(
                            "package",
                            "pkg:mgr/io.group/packagename3@1.0.0-redhat-00004"
                                + REDHAT_REPOSITORY_SUFFIX)))),
            Map.of(
                "pkg:mgr/io.group/packagename@1.0.0",
                "pkg:mgr/io.group/packagename@1.0.0-redhat-00001" + REDHAT_REPOSITORY_SUFFIX,
                "pkg:mgr/io.group/packagename2@1.0.0",
                "pkg:mgr/io.group/packagename2@1.0.0-redhat-00001" + REDHAT_REPOSITORY_SUFFIX,
                "pkg:mgr/io.group/packagename3@1.0.0",
                "pkg:mgr/io.group/packagename3@1.0.0-redhat-00004" + REDHAT_REPOSITORY_SUFFIX)),
        // empty response
        Arguments.of(Map.of("recommendations", Map.of()), Map.of()));
  }

  @ParameterizedTest
  @MethodSource("getPayload")
  void test_Payload_With_Purls(
      Map<String, Map<String, List>> input, Map<String, String> expectedOutput) {
    TcResponseHandler tcResponseHandler = new TcResponseHandler();
    try {
      Map<String, String> actualOutput = tcResponseHandler.responseToMap(input);
      assertEquals(expectedOutput, actualOutput);

    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
