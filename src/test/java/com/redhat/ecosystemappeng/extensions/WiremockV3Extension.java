package com.redhat.ecosystemappeng.extensions;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import com.github.tomakehurst.wiremock.WireMockServer;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;

public class WiremockV3Extension implements QuarkusTestResourceLifecycleManager {

    private static final String SNYK_ORG = "acme-001";
    private static final String SNYK_TOKEN = "snyk-token-xyz";

    private final WireMockServer server = new WireMockServer(options().dynamicPort());

    @Override
    public Map<String, String> start() {
        server.start();

        server.stubFor(post("/api/v1/test/dep-graph?org=" + SNYK_ORG)
                .withHeader("Authorization", equalTo("token " + SNYK_TOKEN))
                .withHeader("Content-Type", equalTo(MediaType.APPLICATION_JSON))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withBodyFile("snyk_report.json")));

        server.stubFor(post("/api/policy/v1alpha1/trusted::gav?minimal=true")
                .withHeader("Content-Type", equalTo(MediaType.APPLICATION_JSON))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withBodyFile("trustedContent_report.json")));

        return Map.of(
                "api.snyk.host", server.baseUrl(),
                "api.snyk.org", SNYK_ORG,
                "api.snyk.token", SNYK_TOKEN,
                "api.trustedContent.host", server.baseUrl());
    }

    @Override
    public void stop() {
        if (server != null) {
            server.stop();
        }
    }

}
