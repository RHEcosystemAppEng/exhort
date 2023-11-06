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

import org.apache.camel.Body;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TrustificationRequestBuilder {

  private final ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public String build(@Body DependencyTree tree) throws JsonProcessingException {
    ArrayNode purls = mapper.createArrayNode();
    tree.getAll().stream().map(p -> p.purl().canonicalize()).forEach(purl -> purls.add(purl));
    ObjectNode obj = mapper.createObjectNode().set("purls", purls);
    return mapper.writeValueAsString(obj);
  }
}
