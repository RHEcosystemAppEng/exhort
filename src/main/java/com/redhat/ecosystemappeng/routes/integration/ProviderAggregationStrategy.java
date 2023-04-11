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

package com.redhat.ecosystemappeng.routes.integration;

import static com.redhat.ecosystemappeng.routes.integration.Constants.PROVIDER_HEADER;

import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.ecosystemappeng.config.ObjectMapperProducer;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ProviderAggregationStrategy implements AggregationStrategy {

    @Override
    public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
        ObjectMapper mapper = ObjectMapperProducer.newInstance();
        JsonNode newExchangeNode;
        String provider = newExchange.getIn().getExchange().getProperty(PROVIDER_HEADER, String.class);
        try {
            newExchangeNode = mapper.readTree(newExchange.getIn().getBody(String.class));
            if (oldExchange == null) {
                newExchange.getIn().setBody(mapper.createObjectNode().set(provider, newExchangeNode));
                return newExchange;
            }
            JsonNode oldExchangeNode = mapper.readTree(oldExchange.getIn().getBody(String.class));
            ((ObjectNode) oldExchangeNode).set(provider, newExchangeNode);
            oldExchange.getIn().setBody(mapper.writeValueAsString(oldExchangeNode));
        } catch (JsonProcessingException e) {
            newExchange.setException(e);
            return newExchange;
        }
        return oldExchange;
    }

}
