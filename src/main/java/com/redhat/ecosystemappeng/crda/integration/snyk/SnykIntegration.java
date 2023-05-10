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

package com.redhat.ecosystemappeng.crda.integration.snyk;

import org.apache.camel.Exchange;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;

import com.redhat.ecosystemappeng.crda.integration.Constants;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class SnykIntegration  extends EndpointRouteBuilder {

    @Override
    public void configure() {

        from(direct("snykDepGraph"))
            .enrich(direct("snykRequest"), AggregationStrategies.bean(SnykAggregationStrategy.class, "aggregate"));

        from(direct("snykRequest"))
            .transform().method(SnykRequestBuilder.class, "fromDiGraph")
            .removeHeader(Exchange.HTTP_PATH)
            .removeHeader(Exchange.HTTP_QUERY)
            .removeHeader(Exchange.HTTP_URI)
            .removeHeader("Accept-Encoding")
            .choice()
                .when(header(Constants.SNYK_TOKEN_HEADER).isNotNull())
                    .setHeader("Authorization", simple("token ${header.crda-snyk-token}"))
            .otherwise()
                .setHeader("Authorization", simple("token {{api.snyk.token}}"))
            .end()
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
            .setHeader(Exchange.HTTP_PATH, constant(Constants.SNYK_DEP_GRAPH_API_PATH))
            .setHeader(Exchange.HTTP_METHOD, constant("POST"))
            .to(vertxHttp("{{api.snyk.host}}"));

    }
    
}
