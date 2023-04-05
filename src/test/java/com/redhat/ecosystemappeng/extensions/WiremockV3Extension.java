package com.redhat.ecosystemappeng.extensions;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;

import java.util.Map;

import com.github.tomakehurst.wiremock.WireMockServer;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;

public class WiremockV3Extension implements QuarkusTestResourceLifecycleManager {

    public static final String SNYK_TOKEN = "snyk-token-xyz";

    private final WireMockServer server = new WireMockServer(options().dynamicPort());

    @Override
    public Map<String, String> start() {
        server.start();

        return Map.of(
                "api.snyk.host", server.baseUrl(),
                "api.snyk.token", SNYK_TOKEN,
                "api.trustedContent.host", server.baseUrl());
    }

    @Override
    public void stop() {
        if (server != null) {
            server.stop();
        }
    }

    @Override
    public void inject(TestInjector testInjector) {
        testInjector.injectIntoFields(server, new TestInjector.AnnotatedAndMatchesType(InjectWireMock.class, WireMockServer.class));
    }
}
