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

package com.redhat.exhort.model.trustedcontent;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonRootName;

import io.quarkus.runtime.annotations.RegisterForReflection;

@JsonRootName("recommendations")
@RegisterForReflection
public record TrustedContentResponse(Map<String, List<TcRecommendation>> recommendationsMatching) {

  public TrustedContentResponse {
    if (recommendationsMatching == null) {
      recommendationsMatching = new HashMap<>();
    }
  }

  @JsonAnySetter
  public void addEntry(String name, List<TcRecommendation> value) {
    getRecommendationsMatching().put(name, value);
  }

  @JsonAnyGetter
  public Map<String, List<TcRecommendation>> getRecommendationsMatching() {
    return recommendationsMatching;
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    public Map<String, List<TcRecommendation>> recommendationsMatching;

    public Builder recommendationsMatching(
        Map<String, List<TcRecommendation>> recommendationsMatching) {
      this.recommendationsMatching = recommendationsMatching;
      return this;
    }

    public TrustedContentResponse build() {
      return new TrustedContentResponse(this.recommendationsMatching);
    }
  }
}
