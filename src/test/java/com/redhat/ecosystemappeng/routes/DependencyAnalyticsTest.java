package com.redhat.ecosystemappeng.routes;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static com.github.tomakehurst.wiremock.client.WireMock.urlMatching;
import static io.restassured.RestAssured.given;
import static org.apache.camel.Exchange.CONTENT_TYPE;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.redhat.ecosystemappeng.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.extensions.InjectWireMock;
import com.redhat.ecosystemappeng.extensions.WiremockV3Extension;
import com.redhat.ecosystemappeng.model.ComponentRequest;
import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.routes.integration.Constants;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import io.restassured.path.xml.XmlPath;
import io.restassured.path.xml.XmlPath.CompatibilityMode;

@QuarkusTest
@QuarkusTestResource(WiremockV3Extension.class)
public class DependencyAnalyticsTest {

    @InjectWireMock
    WireMockServer server;

    static {
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
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
        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));
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

        assertJson("snyk_report.json", body);
        verifyNoInteractionsWithRedHat();
        verifySnykRequest(null);
    }

    @Test
    public void testComponentAnalysisWithRedHat() {
        stubRedHatRequest();
        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, Constants.REDHAT_PROVIDER, pkgs);
        
        String body = given()
            .header(CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertJson("trustedContent_report.json", body);
        verifyNoInteractionsWithSnyk();
        verifyRedHatRequest();
    }

    @Test
    public void testSnykClientToken() {
        String token = "client-token";
        stubSnykRequest(token);
       
        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));
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

        assertJson("snyk_report.json", body);
        verifyNoInteractionsWithRedHat();
        verifySnykRequest(token);
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
        String body = given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, Constants.SNYK_PROVIDER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertJson("snyk_report.json", body);
        verifyNoInteractionsWithRedHat();
        verifySnykRequest(null);
    }

    @Test
    public void testDepAnalysisWithRedHat() {
        stubRedHatRequest();
        String body = given()
            .header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, Constants.REDHAT_PROVIDER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertJson("trustedContent_report.json", body);
        verifyNoInteractionsWithSnyk();
        verifyRedHatRequest();
    }

    @Test
    public void testFullDepAnalysisJson() {
        stubSnykRequest(null);
        stubRedHatRequest();

        String body = given().header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ).body(loadDependenciesFile())
        .header("Accept", MediaType.APPLICATION_JSON)
            .when()
            .post("/api/v3/dependency-analysis")
            .then()
                .assertThat()
                    .statusCode(200)
                    .contentType(MediaType.APPLICATION_JSON)
                    .extract().body().asPrettyString();
        assertJson("full_report.json", body);

        verifySnykRequest(null);
        verifyRedHatRequest();
    }


    @Test
    public void testFullDepAnalysisHtml() {
        stubSnykRequest(null);
        stubRedHatRequest();

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
        assertEquals("Snyk", p.getString("html.body.div.find {it.@name == 'snyk_report'}.h2"));
        assertEquals("Red Hat",p.getString("html.body.div.find {it.@name == 'redhat_report'}.h2"));
        
        verifySnykRequest(null);
        verifyRedHatRequest();
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
                        .withBodyFile("snyk_report.json")));
    }

    private void verifySnykRequest(String token) {
        if(token == null) {
            token = WiremockV3Extension.SNYK_TOKEN;
        }
        server.verify(1, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH))
            .withHeader("Authorization", WireMock.equalTo("token " + token)));
    }

    private void stubRedHatRequest() {
        server.stubFor(post(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*"))
            .withHeader(Exchange.CONTENT_TYPE, WireMock.equalTo(MediaType.APPLICATION_JSON))
            .willReturn(aResponse()
                    .withStatus(200)
                    .withHeader(Exchange.CONTENT_ENCODING, "identity")
                    .withBodyFile("trustedContent_report.json")));
    }

    private void verifyRedHatRequest() {
        server.verify(1, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
    }

    private void verifyNoInteractions() {
        verifyNoInteractionsWithSnyk();
        verifyNoInteractionsWithRedHat();
    }

    private void verifyNoInteractionsWithSnyk() {
        server.verify(0, postRequestedFor(urlEqualTo(Constants.SNYK_DEP_GRAPH_API_PATH)));
    }

    private void verifyNoInteractionsWithRedHat() {
        server.verify(0, postRequestedFor(urlMatching(Constants.TRUSTED_CONTENT_PATH + ".*")));
    }

}
