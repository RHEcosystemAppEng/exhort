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
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.getRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static com.github.tomakehurst.wiremock.client.WireMock.urlMatching;
import static io.restassured.RestAssured.given;
import static org.apache.camel.Exchange.CONTENT_TYPE;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.fail;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.redhat.ecosystemappeng.crda.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.crda.extensions.InjectWireMock;
import com.redhat.ecosystemappeng.crda.extensions.WiremockV3Extension;
import com.redhat.ecosystemappeng.crda.model.ComponentRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.config.DecoderConfig;
import io.restassured.config.EncoderConfig;
import io.restassured.path.xml.XmlPath;
import io.restassured.path.xml.XmlPath.CompatibilityMode;

@QuarkusTest
@QuarkusTestResource(WiremockV3Extension.class)
public class DependencyAnalyticsTest {

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

    @Test
    public void testComponentAnalysisWithWrongProvider() {
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, "unknown", Collections.emptyList());
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported provider: unknown"));

        verifyNoInteractions();
    }

    @Test
    public void testComponentAnalysisWithWrongPkgManager() {
        ComponentRequest req = new ComponentRequest("unknown", Constants.SNYK_PROVIDER, Collections.emptyList());
        given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported package manager: unknown"));

        verifyNoInteractions();
    }

    @Test
    public void testComponentAnalysisWithSnyk() {
        stubSnykRequest(null);
        stubTCVexRequest();

        List<PackageRef> pkgs = List.of(
            new PackageRef("com.fasterxml.jackson.core:jackson-databind", "2.13.1"),
            new PackageRef("io.quarkus:quarkus-jdbc-postgresql", "2.13.5"));
            new PackageRef("com.acme:example", "1.2.3");
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, Constants.SNYK_PROVIDER, pkgs);
        
        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("component_snyk.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
        verifySnykRequest(null);
        verifyTCVexRequest();
    }

    @Test
    @Disabled
    public void testComponentAnalysisWithTidelift() {
        stubTideliftRequest(null);
        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, Constants.TIDELIFT_PROVIDER, pkgs);

        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("tidelift_component_report.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithSnyk();
        verifyTideliftRequest(3, null);
    }

    @Test
    public void testSnykClientToken() {
        String token = "client-token";
        stubSnykRequest(token);
        stubTCVexRequest();
       
        List<PackageRef> pkgs = List.of(
            new PackageRef("com.fasterxml.jackson.core:jackson-databind", "2.13.1"),
            new PackageRef("io.quarkus:quarkus-jdbc-postgresql", "2.13.5"));
            new PackageRef("com.acme:example", "1.2.3");
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, Constants.SNYK_PROVIDER, pkgs);
        
        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header(Constants.SNYK_TOKEN_HEADER, token)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("component_snyk.json", body);
        
        verifySnykRequest(token);
        verifyTCVexRequest();
        
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
    }


    @Test
    @Disabled
    public void testTideliftClientToken() {
        String token = "client-token";
        stubTideliftRequest(token);

        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, Constants.TIDELIFT_PROVIDER, pkgs);

        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .header(Constants.TIDELIFT_TOKEN_HEADER, token)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("tidelift_component_report.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithSnyk();
        verifyTideliftRequest(3, token);
    }

    @Test
    public void testDepAnalysisWithWrongProvider() {
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, "unknown")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported provider: unknown"));

        verifyNoInteractions();
    }

    @Test
    public void testDepAnalysisWithWrongPkgManager() {
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", "unknown", Constants.SNYK_PROVIDER)
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported package manager: unknown"));
        
        verifyNoInteractions();
    }

    @Test
    public void testDepAnalysisWithSnyk() {
        stubSnykRequest(null);
        stubTCVexRequest();
        
        String body = given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .header("Accept", MediaType.APPLICATION_JSON)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, Constants.SNYK_PROVIDER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertJson("expected_dep_snyk.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
        verifySnykRequest(null);
        verifyTCVexRequest();
    }

    @Test
    @Disabled
    public void testDepAnalysisWithTidelift() {
        stubTideliftRequest(null);
        
        String body = given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, Constants.TIDELIFT_PROVIDER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertJson("tidelift_report.json", body);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithSnyk();
        verifyTideliftRequest(8, null);
    }

    @Test
    public void testFullDepAnalysisJson() {
        stubSnykRequest(null);
        // stubTideliftRequest(null);
        stubTCVexRequest();

        String body = given()
                .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
                .body(loadDependenciesFile())
                .header("Accept", MediaType.APPLICATION_JSON)
            .when()
                .post("/api/v3/dependency-analysis")
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.APPLICATION_JSON)
                    .extract().body().asPrettyString();

        assertJson("full_report.json", body);

        verifyTCVexRequest();
        verifySnykRequest(null);
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTidelift();
    }

    @Test
    public void testFullDepAnalysisWithToken() {
        String snykToken = "my-snyk-token";
        stubSnykRequest(snykToken);
        String tideliftToken = "my-tidelift-token";
        stubTCVexRequest();

        String body = given()
                .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
                .header("Accept", MediaType.APPLICATION_JSON)
                .header(Constants.TIDELIFT_TOKEN_HEADER, tideliftToken)
                .header(Constants.SNYK_TOKEN_HEADER, snykToken)
                .body(loadDependenciesFile())
            .when()
                .post("/api/v3/dependency-analysis")
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.APPLICATION_JSON)
                    .extract().body().asPrettyString();
        assertJson("full_report.json", body);

        verifySnykRequest(snykToken);
        verifyTCVexRequest();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
    }

    @Test
    public void testFullDepAnalysisHtml() {
        stubTCVexRequest();
        stubSnykRequest(null);

        String body = given().header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ).body(loadDependenciesFile())
            .header("Accept", MediaType.TEXT_HTML)
            .when()
                .post("/api/v3/dependency-analysis")
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.TEXT_HTML)
                    .extract().body().asString();
        
        XmlPath p = new XmlPath(CompatibilityMode.HTML, body);
        assertEquals("CRDA Stack Report", p.getString("html.header.title"));
        assertFalse(p.getString("html.body.ul.li.find {it == 'io.quarkus:quarkus-hibernate-orm:2.13.5.Final'}").isEmpty());
        assertFalse(p.getString("html.body.ul.li.find {it == 'io.quarkus:quarkus-jdbc-postgresql:2.13.5.Final'}").isEmpty());
        
        verifySnykRequest(null);
        verifyTCVexRequest();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
    }

    @Test
    public void testFullDepAnalysisUnknownMediaType() {
        given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
            .header("Accept", MediaType.APPLICATION_XML)
            .when()
                .post("/api/v3/dependency-analysis")
            .then()
                .assertThat()
                    .statusCode(415)
                    .contentType(MediaType.TEXT_PLAIN);
        
        verifyNoInteractions();
    }

    private void assertJson(String expectedFile, String currentBody) {
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

    private File loadDependenciesFile() {
        return new File(getClass().getClassLoader().getResource("dependencies.txt").getPath());
    }

    private void stubSnykRequest(String token) {
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


    private void verifySnykRequest(String token) {
        if(token == null) {
            token = WiremockV3Extension.SNYK_TOKEN;
        }
        server.verify(1, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH))
            .withHeader("Authorization", WireMock.equalTo("token " + token)));
    }


    private void stubTideliftRequest(String token) {
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

    private void verifyTideliftRequest(int times, String token) {
        if(token == null) {
            token = WiremockV3Extension.TIDELIFT_TOKEN;
        }
        server.verify(times, getRequestedFor(urlMatching(Constants.TIDELIFT_API_BASE_PATH + ".*"))
            .withHeader("Authorization", WireMock.equalTo("Bearer " + token)));
    }

    private void stubTCGavRequest() {
        server.stubFor(post(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*"))
            .withHeader(Exchange.CONTENT_TYPE, WireMock.equalTo(MediaType.APPLICATION_JSON))
            .willReturn(aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_ENCODING, "identity")
                    .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .withBodyFile("trustedContent_report.json")));
    }

    private void verifyTCGavRequest() {
        server.verify(1, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
    }

    private void stubTCVexRequest() {
        server.stubFor(post(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH))
            .withHeader(Exchange.CONTENT_TYPE, WireMock.equalTo(MediaType.APPLICATION_JSON))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader(Exchange.CONTENT_ENCODING, "identity")
                .withHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                .withBodyFile("trustedContent_vex_report.json")));
    }

    private void verifyTCVexRequest() {
        server.verify(1, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH)));
    }

    private void verifyNoInteractions() {
        verifyNoInteractionsWithSnyk();
        verifyNoInteractionsWithTidelift();
        verifyNoInteractionsWithTCGav();
        verifyNoInteractionsWithTCVex();
    }

    private void verifyNoInteractionsWithSnyk() {
        server.verify(0, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH)));
    }

    private void verifyNoInteractionsWithTidelift() {
        server.verify(0, getRequestedFor(urlMatching(Constants.TIDELIFT_API_BASE_PATH + ".*")));
    }

    private void verifyNoInteractionsWithTCGav() {
        server.verify(0, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
    }

    private void verifyNoInteractionsWithTCVex() {
        server.verify(0, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_VEX_PATH)));
    }

}
