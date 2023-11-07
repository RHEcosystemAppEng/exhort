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

package com.redhat.exhort.integration.providers.trustification;

import java.io.IOException;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MockTrustificationService extends EndpointRouteBuilder {

  @Inject ObjectMapper mapper;

  @Override
  public void configure() throws Exception {
    rest("/v1").post("/analyze").routeId("mockTrustification").to("direct:mockresponse");

    from(direct("mockresponse")).process(this::setBodyFromFile);
  }

  private void setBodyFromFile(Exchange exchange) throws IOException {
    JsonNode json =
        mapper.readTree(this.getClass().getClassLoader().getResourceAsStream("tc-response.json"));
    exchange.getIn().setBody(json);
  }
}
