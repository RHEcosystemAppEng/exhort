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

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.github.packageurl.MalformedPackageURLException;
import com.github.packageurl.PackageURL;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record PackageRef(
    @JsonSerialize(using = PackageURLSerializer.class) @JsonValue PackageURL purl) {

  @JsonCreator
  public static PackageRef of(String purl) {
    return builder().purl(purl).build();
  }

  public PackageRef {
    Objects.requireNonNull(purl);
  }

  public String name() {
    if (purl.getNamespace() == null) {
      return purl.getName();
    }
    return purl.getNamespace() + ":" + purl.getName();
  }

  public String version() {
    return purl.getVersion();
  }

  @Override
  public int hashCode() {
    return name().hashCode();
  }

  @Override
  public boolean equals(Object other) {
    if (other == null) {
      return false;
    }
    if (!(other instanceof PackageRef)) {
      return false;
    }
    return Objects.equals(name(), ((PackageRef) other).name());
  }

  public static PackageRef parse(String gav, String pkgManager) {
    String[] parts = gav.split(":");
    if (parts.length < 4 || parts.length > 6) {
      throw new IllegalArgumentException("Unexpected GAV format. " + gav);
    }
    if (parts.length < 6) {
      return builder()
          .namespace(parts[0])
          .name(parts[1])
          .version(parts[3])
          .pkgManager(pkgManager)
          .build();
    }
    return builder()
        .namespace(parts[0])
        .name(parts[1])
        .version(parts[4])
        .pkgManager(pkgManager)
        .build();
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {

    String namespace;
    String name;
    String version;
    String pkgManager;
    String purl;

    public Builder purl(String purl) {
      this.purl = purl;
      return this;
    }

    public Builder pkgManager(String pkgManager) {
      this.pkgManager = pkgManager;
      return this;
    }

    public Builder version(String version) {
      this.version = version;
      return this;
    }

    public Builder name(String name) {
      this.name = name;
      return this;
    }

    public Builder namespace(String namespace) {
      this.namespace = namespace;
      return this;
    }

    private Builder() {}

    public PackageRef build() {
      try {
        if (Objects.isNull(purl)) {
          Objects.requireNonNull(pkgManager);
          Objects.requireNonNull(name);
          Objects.requireNonNull(version);
          return new PackageRef(new PackageURL(pkgManager, namespace, name, version, null, null));
        }
        return new PackageRef(new PackageURL(purl));
      } catch (MalformedPackageURLException e) {
        throw new IllegalArgumentException("Unable to parse PackageURL. " + e.getMessage());
      }
    }
  }

  public String toGav() {
    return String.format("%s:%s", name(), purl.getVersion());
  }

  @Override
  public String toString() {
    return purl.getCoordinates();
  }
}
