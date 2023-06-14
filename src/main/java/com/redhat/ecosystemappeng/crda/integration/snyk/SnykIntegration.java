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
import org.apache.camel.Processor;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.http.base.HttpOperationFailedException;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.integration.VulnerabilityProvider;
import com.redhat.ecosystemappeng.crda.model.ProviderStatus;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class SnykIntegration extends EndpointRouteBuilder {

    @Override
    public void configure() {

        // fmt:off
        onException(HttpOperationFailedException.class)
            .logStackTrace(false)
            .process(new Processor() {
                @Override
                public void process(Exchange exchange) throws Exception {
                    HttpOperationFailedException e = exchange.getProperty(Exchange.EXCEPTION_CAUGHT, HttpOperationFailedException.class);
                    exchange.getIn().setBody(new ProviderStatus(false, Constants.SNYK_PROVIDER, e.getStatusCode(), e.getMessage()));
                }
        
            })
            .handled(true);

        from(direct("snykDepGraph"))
            .choice()
                .when(header(Constants.SNYK_TOKEN_HEADER).isNotNull())
                    .setHeader("Authorization", simple("token ${header.crda-snyk-token}"))
            .otherwise()
                .setHeader("Authorization", simple("token {{api.snyk.token}}"))
                .setProperty(Constants.PROVIDER_PRIVATE_DATA_PROPERTY, method(VulnerabilityProvider.class, "providersPrivateData(${exchangeProperty." + Constants.PROVIDER_PRIVATE_DATA_PROPERTY + "}, " + Constants.SNYK_PROVIDER + ")"))
            .end()
            .enrich(direct("snykRequest"), AggregationStrategies.bean(SnykAggregationStrategy.class, "aggregate"));

        from(direct("snykRequest"))
            .transform().method(SnykRequestBuilder.class, "fromDiGraph")
            .removeHeader(Exchange.HTTP_PATH)
            .removeHeader(Exchange.HTTP_QUERY)
            .removeHeader(Exchange.HTTP_URI)
            .removeHeader("Accept-Encoding")
            .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
            .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
            .setHeader(Exchange.HTTP_PATH, constant(Constants.SNYK_DEP_GRAPH_API_PATH))
            .setHeader(Exchange.HTTP_METHOD, constant("POST"))
            .to(vertxHttp("{{api.snyk.host}}"));
        
        from(direct("validateSnykToken"))
            .removeHeader(Exchange.HTTP_PATH)
            .removeHeader(Exchange.HTTP_QUERY)
            .removeHeader(Exchange.HTTP_URI)
            .removeHeader("Accept-Encoding")    
            .setHeader("Authorization", simple("token ${header.crda-snyk-token}"))
            .setHeader(Exchange.HTTP_PATH, constant(Constants.SNYK_TOKEN_API_PATH))
            .setHeader(Exchange.HTTP_METHOD, constant("GET"))
            // TODO: Consider using circuit breaker
            .to(vertxHttp("{{api.snyk.host}}").throwExceptionOnFailure(false))
            .setProperty(Constants.RESPONSE_STATUS_PROPERTY, header(Exchange.HTTP_RESPONSE_CODE))
            .choice().when(header(Exchange.HTTP_RESPONSE_CODE).isEqualTo(Response.Status.OK.getStatusCode())) 
                .setBody(constant("Token validated successfully"))
            .when(header(Exchange.HTTP_RESPONSE_CODE).isGreaterThanOrEqualTo(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode()))
                .setBody(constant("Unable to validate Snyk token"))
            .otherwise()
                .setBody(jsonpath("$.error"));
        //fmt:on
    }
}
