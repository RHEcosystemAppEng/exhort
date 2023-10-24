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

package com.redhat.exhort.integration.backend.sbom;

import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;

public abstract class SbomParser {

  public DependencyTree parse(InputStream input) {
    DependencyTree tree = buildTree(input);
    validate(tree);
    return tree;
  }

  protected abstract DependencyTree buildTree(InputStream input);

  protected void validate(DependencyTree tree) {
    Set<String> types = new HashSet<>();
    tree.dependencies()
        .values()
        .forEach(
            d -> {
              types.add(d.ref().purl().getType());
              d.transitive().forEach(t -> types.add(t.purl().getType()));
            });

    List<String> invalidTypes =
        types.stream().filter(Predicate.not(Constants.PKG_MANAGERS::contains)).toList();
    if (!invalidTypes.isEmpty()) {
      throw new IllegalArgumentException("Unsupported package types received: " + invalidTypes);
    }
    if (types.size() > 1) {
      throw new IllegalArgumentException(
          "It is not supported to submit mixed Package Manager types. Found: " + types);
    }
  }
}
