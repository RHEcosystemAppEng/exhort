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

package com.redhat.ecosystemappeng.exhort.integration.tidelift;

import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.http.base.HttpOperationFailedException;
import org.apache.camel.processor.aggregate.GroupedBodyAggregationStrategy;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.ecosystemappeng.exhort.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.exhort.integration.Constants;
import com.redhat.ecosystemappeng.exhort.model.GraphRequest;

import jakarta.ws.rs.core.MediaType;

public class TideliftIntegration extends EndpointRouteBuilder {

  @Override
  public void configure() throws Exception {

    ObjectNode emptyNode = ObjectMapperProducer.newInstance().createObjectNode();
    // fmt:off
        from(direct("tideliftReleases"))
            .routeId("tideliftReleases")
            .to(direct("preTidelift"))
            .setHeader(Constants.PKG_MANAGER_PROPERTY, simple("${body.pkgManager()}"))
            .split().body(GraphRequest.class, g -> g.tree().getAll())
            .aggregationStrategy(new GroupedBodyAggregationStrategy())
            .parallelProcessing().timeout(5000L)
                .setHeader(Exchange.HTTP_PATH, method(TideliftRequestBuilder.class))
                .setBody().constant(null)
                .to(direct("tideliftRequest"))
                .unmarshal().json()
            .end()
            .marshal().json();
            
        from(direct("preTidelift"))
            .routeId("prepareTideliftRequest")
            .removeHeader(Exchange.HTTP_PATH)
            .removeHeader(Exchange.HTTP_QUERY)
            .removeHeader(Exchange.HTTP_URI)
            .setHeader(Exchange.HTTP_METHOD, constant("GET"))
            .removeHeader("Accept-Encoding")
            .choice().when(header(Constants.TIDELIFT_TOKEN_HEADER).isNotNull())
                .setHeader("Authorization", simple("Bearer ${header.ex-tidelift-token}"))
            .otherwise()
                .setHeader("Authorization", simple("Bearer {{api.tidelift.token}}"))
            .end()
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON));

        from(direct("tideliftRequest"))
            .routeId("tideliftRequest")
            .doTry()
                .to(vertxHttp("{{api.tidelift.host}}"))
            .doCatch(HttpOperationFailedException.class)
                // Ignore not found packages and just add an empty object
                .onWhen(simple("${exception.getStatusCode()} == 404"))
                    .setBody(constant(emptyNode)).marshal().json();
           
        //fmt:on
  }
}
