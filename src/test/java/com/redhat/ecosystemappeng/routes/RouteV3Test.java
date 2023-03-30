package com.redhat.ecosystemappeng.routes;

import static io.restassured.RestAssured.given;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.ecosystemappeng.ObjectMapperProducer;
import com.redhat.ecosystemappeng.extensions.WiremockV3Extension;
import com.redhat.ecosystemappeng.model.ComponentRequest;
import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.utils.Constants;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;

@QuarkusTest
@QuarkusTestResource(WiremockV3Extension.class)
public class RouteV3Test {

    static {
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }

    @Test
    public void testComponentAnalysisWithWrongProvider() {
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, "unknown", Collections.emptyList());
        given()
            .header("Content-Type", MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported provider: unknown"));
    }

    @Test
    public void testComponentAnalysisWithWrongPkgManager() {
        ComponentRequest req = new ComponentRequest("unknown", Constants.SNYK_PROVIDER, Collections.emptyList());
        given()
            .header("Content-Type", MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported package manager: unknown"));
    }

    @Test
    public void testComponentAnalysisWithSnyk() {
        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, Constants.SNYK_PROVIDER, pkgs);
        String body = given()
            .header("Content-Type", MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertResponse("snyk_report.json", body);
    }

    @Test
    public void testComponentAnalysisWithRedHat() {
        List<PackageRef> pkgs = List.of(
            new PackageRef("log4j:log4j", "1.2.17"),
            new PackageRef("io.netty:netty-common", "4.1.86"));
        ComponentRequest req = new ComponentRequest(Constants.MAVEN_PKG_MANAGER, Constants.REDHAT_PROVIDER, pkgs);
        String body = given()
            .header("Content-Type", MediaType.APPLICATION_JSON)
            .body(req)
        .when()
            .post("/api/v3/component-analysis")
        .then()
            .assertThat()
            .statusCode(200)
            .extract().body().asPrettyString();

        assertResponse("trustedContent_report.json", body);
    }

    @Test
    public void testDepAnalysisWithWrongProvider() {
        given()
            .header("Content-Type", Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, "unknown")
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported provider: unknown"));
    }

    @Test
    public void testDepAnalysisWithWrongPkgManager() {
        given()
            .header("Content-Type", Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", "unknown", Constants.SNYK_PROVIDER)
        .then()
            .assertThat()
                .statusCode(422)
                .contentType(MediaType.TEXT_PLAIN)
                .body(equalTo("Unsupported package manager: unknown"));
    }

    @Test
    public void testDepAnalysisWithSnyk() {
        String body = given()
            .header("Content-Type", Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, Constants.SNYK_PROVIDER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertResponse("snyk_report.json", body);
    }

    @Test
    public void testDepAnalysisWithRedHat() {
        String body = given()
            .header("Content-Type", Constants.TEXT_VND_GRAPHVIZ)
            .body(loadDependenciesFile())
        .when()
            .post("/api/v3/dependency-analysis/{pkgManager}/{provider}", Constants.MAVEN_PKG_MANAGER, Constants.REDHAT_PROVIDER)
        .then()
            .assertThat()
                .statusCode(200)
                .contentType(MediaType.APPLICATION_JSON)
                .extract().body().asPrettyString();

        assertResponse("trustedContent_report.json", body);
    }

    private void assertResponse(String expectedFile, String currentBody) {
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
}
