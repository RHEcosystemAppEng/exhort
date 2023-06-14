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

package com.redhat.ecosystemappeng.crda.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record VulnerabilitiesSummary(
    int total, int direct, int critical, int high, int medium, int low) {

  public static class Builder {

    int total;
    int direct;
    int critical;
    int high;
    int medium;
    int low;

    public Builder total(int total) {
      this.total = total;
      return this;
    }

    public Builder direct(int direct) {
      this.direct = direct;
      return this;
    }

    public Builder critical(int critical) {
      this.critical = critical;
      return this;
    }

    public Builder high(int high) {
      this.high = high;
      return this;
    }

    public Builder medium(int medium) {
      this.medium = medium;
      return this;
    }

    public Builder low(int low) {
      this.low = low;
      return this;
    }

    public VulnerabilitiesSummary build() {
      return new VulnerabilitiesSummary(total, direct, critical, high, medium, low);
    }
  }
}
