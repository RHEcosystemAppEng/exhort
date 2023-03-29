package com.redhat.ecosystemappeng.extensions;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

import java.util.Map;

import javax.ws.rs.core.MediaType;

import com.github.tomakehurst.wiremock.WireMockServer;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;

public class WiremockV2Extension implements QuarkusTestResourceLifecycleManager {

    private static final String USER_KEY = "test_user_key";

    private WireMockServer server;

    @Override
    public Map<String, String> start() {
        server = new WireMockServer(options().dynamicPort());
        server.start();

        server.stubFor(get(urlEqualTo("/api/v2/stack-analyses/1234?user_key=" + USER_KEY))
            .willReturn(aResponse()
            .withStatus(200)
            .withHeader("Content-Type", MediaType.APPLICATION_JSON)
            .withBody("{}")));
        
        server.stubFor(get(urlEqualTo("/api/v2/stack-analyses/9999?user_key=" + USER_KEY)) 
            .willReturn(aResponse()
            .withStatus(404)));

        server.stubFor(get(urlEqualTo("/api/v2/component-analyses/maven/log4j:log4j/1.2.7?user_key=" + USER_KEY))
            .willReturn(aResponse()
            .withHeader("Content-Type", MediaType.APPLICATION_JSON)
            .withStatus(200)
            .withBody("{}")));

        server.stubFor(get(urlEqualTo("/api/v2/component-analyses/maven/notfound:package/x.y.z?user_key=" + USER_KEY))
            .willReturn(aResponse()
            .withStatus(404)));   
            
        server.stubFor(post(urlEqualTo("/api/v2/component-analyses?user_key=" + USER_KEY))
            .willReturn(aResponse()
            .withHeader("Content-Type", MediaType.APPLICATION_JSON)
            .withStatus(200)
            .withBody("{}")));
 
        return Map.of("api.crda.host", server.baseUrl(), "api.crda.key", USER_KEY);
    }

    @Override
    public void stop() {
        if(server != null) {
            server.stop();
        }
    }
    
}
