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

package com.redhat.exhort.model;

import java.util.Collections;
import java.util.Objects;
import java.util.Set;

import com.redhat.exhort.api.PackageRef;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record DirectDependency(
    PackageRef ref, Set<PackageRef> transitive, PackageRef recommendation) {

  public DirectDependency {
    Objects.requireNonNull(ref);
    if (transitive != null) {
      transitive = Collections.unmodifiableSet(transitive);
    } else {
      transitive = Collections.emptySet();
    }
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {

    public PackageRef ref;
    public Set<PackageRef> transitive;
    public PackageRef recommendation;

    public Builder ref(PackageRef ref) {
      this.ref = ref;
      return this;
    }

    public Builder transitive(Set<PackageRef> transitive) {
      this.transitive = transitive;
      return this;
    }

    public Builder recommendation(PackageRef recommendation) {
      this.recommendation = recommendation;
      return this;
    }

    public DirectDependency build() {
      return new DirectDependency(ref, transitive, recommendation);
    }
  }
}
