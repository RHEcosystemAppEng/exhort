package com.redhat.ecosystemappeng.routes;

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
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.junit.jupiter.api.Test;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.ecosystemappeng.config.ObjectMapperProducer;
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

    static {
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
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
    }

    @Test
    public void testComponentAnalysisWithSnyk() {
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
    }

    @Test
    public void testComponentAnalysisWithRedHat() {
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
    }

    @Test
    public void testDepAnalysisWithSnyk() {
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
    }

    @Test
    public void testDepAnalysisWithRedHat() {
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
    }

    @Test
    public void testFullDepAnalysisJson() {
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
    }


    @Test
    public void testFullDepAnalysisHtml() {
        
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
    }

    @Test
    public void testFullDepAnalysisUnknownMediaType() {
        given().header(CONTENT_TYPE, Constants.TEXT_VND_GRAPHVIZ).body(loadDependenciesFile())
        .header("Accept", MediaType.APPLICATION_XML)
            .when()
            .post("/api/v3/dependency-analysis")
            .then()
                .assertThat()
                    .statusCode(415)
                    .contentType(MediaType.TEXT_PLAIN);
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

}
