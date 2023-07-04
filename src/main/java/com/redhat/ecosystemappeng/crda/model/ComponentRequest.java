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
public record ComponentRequest(String name, String version) {

  public PackageRef toPackageRef(String pkgManager) {
    String[] parts = name.split(":");
    PackageRef.Builder builder = PackageRef.builder().version(version).pkgManager(pkgManager);
    if (parts.length == 1) {
      builder.name(parts[0]);
    } else if (parts.length == 2) {
      builder.namespace(parts[0]).name(parts[1]);
    } else {
      throw new IllegalArgumentException("Invalid package format for: " + name);
    }
    return builder.build();
  }
}
