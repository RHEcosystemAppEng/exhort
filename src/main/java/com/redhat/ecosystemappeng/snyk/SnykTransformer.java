package com.redhat.ecosystemappeng.snyk;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.camel.Exchange;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.ecosystemappeng.ObjectMapperProducer;
import com.redhat.ecosystemappeng.model.DepAnalysis;
import com.redhat.ecosystemappeng.model.GraphAnalysis;
import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.model.PackageReport;
import com.redhat.ecosystemappeng.model.Vulnerability;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class SnykTransformer {

    private static ObjectMapper mapper = ObjectMapperProducer.newInstance();

    public DepAnalysis toDepAnalysis(Exchange exchange, String input) throws JsonMappingException, JsonProcessingException {
        ObjectNode root = (ObjectNode) mapper.readTree(input);
        ArrayNode vulnerabilities = (ArrayNode) root.get("issues").get("vulnerabilities");
        PackageRef ref = PackageRef.builder()
            .name(exchange.getIn().getHeader("package", String.class))
            .version(exchange.getIn().getHeader("version", String.class))
            .build();
        PackageReport report = new PackageReport(ref);
        vulnerabilities.forEach(i -> {
            report.vulnerabilities().add(getVulnerability(i));
        });

        return DepAnalysis.builder()
                .ecosystem(root.get("packageManager").asText())
                .ok(root.get("ok").asBoolean())
                .report(report)
                .build();
    }

    public GraphAnalysis toGraphAnalysis(String input) throws JsonMappingException, JsonProcessingException {
        ObjectNode root = (ObjectNode) mapper.readTree(input);
        JsonNode issuesData = root.get("issuesData");
        Map<PackageRef, PackageReport> reports = new HashMap<>();
        ArrayNode issues = (ArrayNode) root.get("issues");
        issues.forEach(i -> {
            PackageRef ref = PackageRef.builder()
                    .name(i.get("pkgName").asText())
                    .version(i.get("pkgVersion").asText())
                    .build();
            PackageReport report = reports.get(ref);
            if (report == null) {
                report = new PackageReport(ref);
                reports.put(ref, report);
            }
            Vulnerability v = getVulnerability(issuesData.get(i.get("issueId").asText()));
            report.vulnerabilities().add(v);
        });

        return GraphAnalysis.builder()
                .ecosystem(root.get("packageManager").asText())
                .ok(root.get("ok").asBoolean())
                .reports(reports.values())
                .build();
    }

    private Vulnerability getVulnerability(JsonNode issue) {
        String id = getText(issue, "id");
        return Vulnerability.builder()
                .id(id)
                .title(getText(issue, "title"))
                .description(getText(issue, "description"))
                .url("https://security.snyk.io/vuln/" + id)
                .severity(getText(issue, "severity"))
                .proprietary(getBoolean(issue, "proprietary"))
                .cvssScore(getText(issue, "cvssScore"))
                .cvssV3(getText(issue, "CVSSv3"))
                .cveIds(getTextCollection(issue.get("identifiers"), "CVE"))
                .cwes(getTextCollection(issue.get("identifiers"), "CWE"))
                .semverVulnerable(getTextCollection(issue.get("semver"), "vulnerable"))
                .fixedIn(getTextCollection(issue, "fixedIn"))
                .build();
    }

    private String getText(JsonNode node, String attr) {
        if (node.has(attr)) {
            return node.get(attr).asText();
        }
        return null;
    }

    private Boolean getBoolean(JsonNode node, String attr) {
        if (node.has(attr)) {
            return node.get(attr).asBoolean();
        }
        return null;
    }

    private Collection<String> getTextCollection(JsonNode node, String attr) {
        Collection<String> data = new ArrayList<>();
        if (node.has(attr)) {
            for (int i = 0; i < node.get(attr).size(); i++) {
                data.add(node.get(attr).get(i).asText());
            }
        }
        return data;
    }
}
