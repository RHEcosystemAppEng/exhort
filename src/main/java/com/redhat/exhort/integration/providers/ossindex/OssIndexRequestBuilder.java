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

package com.redhat.exhort.integration.providers.ossindex;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.config.ObjectMapperProducer;
import com.redhat.exhort.model.DependencyTree;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class OssIndexRequestBuilder {

  private static final int BULK_SIZE = 128;

  private ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public List<List<PackageRef>> split(DependencyTree tree) {
    List<List<PackageRef>> bulks = new ArrayList<>();
    tree.getAll()
        .forEach(
            d -> {
              if (bulks.isEmpty()) {
                bulks.add(new ArrayList<>());
              }
              List<PackageRef> bulk = bulks.get(bulks.size() - 1);
              if (bulk.size() == BULK_SIZE) {
                bulk = new ArrayList<>();
                bulks.add(bulk);
              }
              bulk.add(d);
            });
    return bulks;
  }

  public String buildRequest(List<PackageRef> packages) throws JsonProcessingException {
    ArrayNode coordinates = mapper.createArrayNode();
    packages.stream()
        .map(PackageRef::purl)
        .filter(Objects::nonNull)
        .forEach(purl -> coordinates.add(purl.getCoordinates()));

    ObjectNode root = mapper.createObjectNode().set("coordinates", coordinates);
    return mapper.writeValueAsString(root);
  }
}
