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

package com.redhat.ecosystemappeng.exhort.model;

import java.util.Objects;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record ProviderStatus(boolean ok, String provider, int status, String message) {

  public ProviderStatus {
    Objects.requireNonNull(provider);
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    boolean ok;
    String provider;
    int status;
    String message;

    private Builder() {}

    public Builder ok(boolean ok) {
      this.ok = ok;
      return this;
    }

    public Builder provider(String provider) {
      this.provider = provider;
      return this;
    }

    public Builder status(int status) {
      this.status = status;
      return this;
    }

    public Builder message(String message) {
      this.message = message;
      return this;
    }

    public ProviderStatus build() {
      return new ProviderStatus(ok, provider, status, message);
    }
  }
}
