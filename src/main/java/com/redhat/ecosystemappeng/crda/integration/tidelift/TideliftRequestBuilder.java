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

package com.redhat.ecosystemappeng.crda.integration.tidelift;

import org.apache.camel.Body;
import org.apache.camel.ExchangeProperty;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TideliftRequestBuilder {

  public String buildPath(
      @ExchangeProperty(Constants.PKG_MANAGER_PROPERTY) String pkgManager,
      @Body PackageRef pkgRef) {
    return String.format(
        Constants.TIDELIFT_API_BASE_PATH + Constants.TIDELIFT_RELEASES_PATTERN,
        pkgManager,
        pkgRef.name(),
        pkgRef.version());
  }
}
