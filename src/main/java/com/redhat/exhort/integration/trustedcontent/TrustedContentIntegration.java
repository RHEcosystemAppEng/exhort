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

import java.util.Collections;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.jackson.ListJacksonDataFormat;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.trustedcontent.MavenPackage;
import com.redhat.exhort.model.trustedcontent.VexResult;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class TrustedContentIntegration extends EndpointRouteBuilder {

  private static final Logger LOGGER = LoggerFactory.getLogger(TrustedContentIntegration.class);

  @ConfigProperty(name = "api.trustedContent.timeout", defaultValue = "10s")
  String timeout;

  @Override
  public void configure() {
    // fmt:off
    from(direct("findRemediations"))
        .routeId("findRemediations")
        .circuitBreaker()
        .faultToleranceConfiguration()
        .timeoutEnabled(true)
        .timeoutDuration(timeout)
        .end()
        .enrich(direct("trustedContentVex"),
            AggregationStrategies.bean(TrustedContentBodyMapper.class, "filterRemediations"))
        .onFallback()
        .process(this::processFallback);

    from(direct("trustedContentVex"))
        .routeId("trustedContentVex")
        .process(this::processVexRequest)
        .transform().method(TrustedContentBodyMapper.class, "buildVexRequest")
        .choice().when(method(TrustedContentBodyMapper.class, "cvesSize").isGreaterThan(0))
        .enrich(direct("vexRequest"),
            AggregationStrategies.bean(TrustedContentBodyMapper.class, "createRemediations"))
        .otherwise().setBody(constant(Collections.emptyMap()));

    from(direct("vexRequest"))
        .routeId("doVexRequest")
        .marshal().json()
        .to(vertxHttp("{{api.trustedContent.vex.host}}"))
        .unmarshal(new ListJacksonDataFormat(VexResult.class));

    from(direct("trustedContentGav"))
        .routeId("trustedContentGav")
        .bean(TrustedContentBodyMapper.class, "buildGavRequest")
        .choice().when(method(TrustedContentBodyMapper.class, "gavsSize").isGreaterThan(0))
        .enrich(direct("gavRequest"),
            AggregationStrategies.bean(TrustedContentBodyMapper.class, "createGavRecommendations"))
        .otherwise().setBody(constant(Collections.emptyMap()));

    from(direct("gavRequest"))
        .routeId("gavRequest")
        .marshal().json()
        .process(this::processGavRequest)
        .to(vertxHttp("{{api.trustedContent.gav.host}}"))
        .unmarshal(new ListJacksonDataFormat(MavenPackage.class));

    from(direct("recommendTrustedContent"))
      .routeId("recommendTrustedContent")
      .circuitBreaker()
        .faultToleranceConfiguration()
        .timeoutEnabled(true)
        .timeoutDuration(timeout)
        .end()
        .enrich(direct("trustedContentGav"), AggregationStrategies.bean(TrustedContentBodyMapper.class, "addRecommendations"))
      .onFallback()
        .process(this::processFallback);
    // fmt:on
  }

  private void processVexRequest(Exchange exchange) {
    processRequest(exchange.getMessage(), Constants.TRUSTED_CONTENT_VEX_PATH);
  }

  private void processGavRequest(Exchange exchange) {
    Message message = exchange.getMessage();
    processRequest(message, Constants.TRUSTED_CONTENT_PATH);
    message.setHeader(Exchange.HTTP_QUERY, "minimal=true");
  }

  private void processRequest(Message message, String path) {
    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.setHeader(Exchange.HTTP_PATH, path);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.POST);
    message.setHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON);
    message.setHeader("Accept", MediaType.APPLICATION_JSON);
  }

  private void processFallback(Exchange exchange) {
    // Ignore error and don't process Trusted Content requests
    Exception exception = (Exception) exchange.getProperty(Exchange.EXCEPTION_CAUGHT);
    LOGGER.warn("Unable to process Trusted Content request", exception);
  }
}
