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

import java.io.IOException;
import java.util.*;

import org.apache.camel.Body;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
@RegisterForReflection
public class TcResponseHandler {

  //  ObjectMapper mapper = ObjectMapperProducer.newInstance();

  public Map<String, String> responseToMap(@Body Map<String, Map<String,List>> tcResponse) throws IOException {
    HashMap<String, String> recommendations = new HashMap<>();

    Map<String, List> rec = (Map<String, List>) tcResponse.get("recommendations");
    rec.entrySet().stream()
        .forEach(
            (entry) -> {
              recommendations.put(entry.getKey(), (String)((Map)entry.getValue().stream().findFirst().get()).get("package"));
            });

    return recommendations;
  }
}
