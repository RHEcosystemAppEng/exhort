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

package com.redhat.ecosystemappeng.crda.integration;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.getRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static com.github.tomakehurst.wiremock.client.WireMock.urlMatching;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;

import org.apache.camel.Exchange;
import org.junit.jupiter.api.AfterEach;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jknack.handlebars.internal.Files;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.redhat.ecosystemappeng.crda.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.crda.extensions.InjectWireMock;
import com.redhat.ecosystemappeng.crda.extensions.WiremockV3Extension;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.config.DecoderConfig;
import io.restassured.config.EncoderConfig;
import jakarta.ws.rs.core.MediaType;

@QuarkusTest
@QuarkusTestResource(WiremockV3Extension.class)
public abstract class AbstractAnalysisTest {

    @InjectWireMock
    WireMockServer server;

    static {
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
        RestAssured.config().encoderConfig(EncoderConfig.encoderConfig().defaultContentCharset("UTF-8"));
        RestAssured.config().decoderConfig(DecoderConfig.decoderConfig().defaultContentCharset("UTF-8"));
    }

    @AfterEach
    void resetMock() {
        server.resetAll();
    }

    protected void assertJson(String expectedFile, String currentBody) {
        ObjectMapper mapper = ObjectMapperProducer.newInstance();
        JsonNode current;
        try {
            current = mapper.readTree(currentBody);
            JsonNode expected = mapper.readTree(getClass().getClassLoader().getResourceAsStream("__files/" + expectedFile));
            assertEquals(expected, current);
        } catch (IOException e) {
            fail("Unexpected processing exception");
        }
    }

    protected void assertHtml(String expectedFile, String currentBody) {
        String expected;
        try {
            expected = Files.read(getClass().getClassLoader().getResourceAsStream("__files/" + expectedFile), Charset.defaultCharset());
            assertEquals(expected, currentBody);
        } catch (IOException e) {
            fail("Unable to read HTML file", e);
        }
    }

    protected File loadDependenciesFile() {
        return new File(getClass().getClassLoader().getResource("dependencies.txt").getPath());
    }

    protected void stubSnykRequest(String token) {
        if(token == null) {
            token = WiremockV3Extension.SNYK_TOKEN;
        }
        server.stubFor(post(Constants.SNYK_DEP_GRAPH_API_PATH)
                .withHeader("Authorization", WireMock.equalTo("token " + token))
                .withHeader(Exchange.CONTENT_TYPE, WireMock.equalTo(MediaType.APPLICATION_JSON))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                        .withBodyFile("snyk_report.json")));
    }


    protected void verifySnykRequest(String token) {
        if(token == null) {
            token = WiremockV3Extension.SNYK_TOKEN;
        }
        server.verify(1, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH))
            .withHeader("Authorization", WireMock.equalTo("token " + token)));
    }


    protected void stubTideliftRequest(String token) {
        if(token == null) {
            token = WiremockV3Extension.TIDELIFT_TOKEN;
        }
        server.stubFor(
                get(Constants.TIDELIFT_API_BASE_PATH + "/maven/log4j:log4j/releases/1.2.17")
                        .withHeader("Authorization", WireMock.equalTo("Bearer " + token))
                        .willReturn(aResponse()
                                .withStatus(200)
                                .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                                .withBodyFile("tidelift_log4j_report.json")));
        server.stubFor(
                get(Constants.TIDELIFT_API_BASE_PATH + "/maven/io.netty:netty-buffer/releases/4.1.86.Final")
                        .withHeader("Authorization", WireMock.equalTo("Bearer " + token))
                        .willReturn(aResponse()
                                .withStatus(200)
                                .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                                .withBodyFile("tidelift_netty_buffer_report.json")));
        server.stubFor(
                get(Constants.TIDELIFT_API_BASE_PATH + "/maven/commons-beanutils:commons-beanutils/releases/1.9.4")
                        .withHeader("Authorization", WireMock.equalTo("Bearer " + token))
                        .willReturn(aResponse()
                                .withStatus(200)
                                .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                                .withBodyFile("tidelift_commons_beanutils_report.json")));

        server.stubFor(
                get(Constants.TIDELIFT_API_BASE_PATH + "/maven/org.slf4j:slf4j-api/releases/1.7.36")
                        .withHeader("Authorization", WireMock.equalTo("Bearer " + token))
                        .willReturn(aResponse()
                                .withStatus(200)
                                .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                                .withBodyFile("tidelift_slf4j_report.json")));
    }

    protected void verifyTideliftRequest(int times, String token) {
        if(token == null) {
            token = WiremockV3Extension.TIDELIFT_TOKEN;
        }
        server.verify(times, getRequestedFor(urlMatching(Constants.TIDELIFT_API_BASE_PATH + ".*"))
            .withHeader("Authorization", WireMock.equalTo("Bearer " + token)));
    }

    protected void stubTCGavRequest() {
        server.stubFor(post(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*"))
            .withHeader(Exchange.CONTENT_TYPE, WireMock.equalTo(MediaType.APPLICATION_JSON))
            .willReturn(aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_ENCODING, "identity")
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("trustedContent_gav_report.json")));
    }

    protected void verifyTCGavRequest() {
        server.verify(1, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
    }

    protected void stubTCVexRequest() {
        server.stubFor(post(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH))
            .withHeader(Exchange.CONTENT_TYPE, WireMock.equalTo(MediaType.APPLICATION_JSON))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader(Exchange.CONTENT_ENCODING, "identity")
                .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                .withBodyFile("trustedContent_vex_report.json")));
    }

    protected void verifyTCVexRequest() {
        server.verify(1, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH)));
    }

    protected void verifyNoInteractions() {
        verifyNoInteractionsWithSnyk();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTCVex();
    }

    protected void verifyNoInteractionsWithSnyk() {
        server.verify(0, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH)));
    }

    protected void verifyNoInteractionsWithTidelift() {
        server.verify(0, getRequestedFor(urlMatching(Constants.TIDELIFT_API_BASE_PATH + ".*")));
    }

    protected void verifyNoInteractionsWithTCGav() {
        server.verify(0, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
    }

    protected void verifyNoInteractionsWithTCVex() {
        server.verify(0, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH)));
    }

}
