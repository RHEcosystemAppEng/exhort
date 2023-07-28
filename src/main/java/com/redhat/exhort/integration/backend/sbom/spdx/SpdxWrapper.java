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

package com.redhat.exhort.integration.backend.sbom.spdx;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.spdx.jacksonstore.MultiFormatStore;
import org.spdx.library.InvalidSPDXAnalysisException;
import org.spdx.library.SpdxConstants;
import org.spdx.library.Version;
import org.spdx.library.model.ExternalRef;
import org.spdx.library.model.SpdxDocument;
import org.spdx.library.model.SpdxPackage;
import org.spdx.library.model.TypedValue;

import com.redhat.exhort.api.PackageRef;

public class SpdxWrapper {

  private static final String SUPPORTED_VERSION = Version.TWO_POINT_THREE_VERSION;
  private static final String PURL_REFERENCE = "http://spdx.org/rdf/references/purl";

  private MultiFormatStore inputStore;
  private SpdxDocument doc;
  private String uri;
  private SpdxPackage root;
  private Collection<SpdxPackage> packages;

  public SpdxWrapper(MultiFormatStore inputStore, InputStream input)
      throws InvalidSPDXAnalysisException, IOException {
    this.inputStore = inputStore;
    this.inputStore.deSerialize(input, false);
    this.uri = inputStore.getDocumentUris().get(0);
    this.doc = new SpdxDocument(inputStore, uri, null, false);
    List<String> verify = doc.verify(Version.TWO_POINT_THREE_VERSION);
    if (!verify.isEmpty()) {
      throw new SpdxProcessingException("Invalid " + SUPPORTED_VERSION + " document received");
    }
    this.packages = parsePackages();
    this.root = findRoot();
  }

  public PackageRef getRootRef() {
    if (root != null) {
      return toPackageRef(root);
    }
    return null;
  }

  private SpdxPackage findRoot() throws InvalidSPDXAnalysisException {
    if (doc.getName().isEmpty()) {
      return null;
    }
    return packages.stream().filter(p -> hasRootName(p)).findFirst().orElse(null);
  }

  public boolean hasRootName(SpdxPackage p) {
    try {
      return p.getName().isPresent() && p.getName().get().equals(doc.getName().get());
    } catch (InvalidSPDXAnalysisException e) {
      throw new SpdxProcessingException("Unable to retrieve name for package", e);
    }
  }

  public PackageRef toPackageRef(SpdxPackage spdxPackage) {
    try {
      Optional<ExternalRef> ref =
          spdxPackage.getExternalRefs().stream()
              .filter(
                  r -> {
                    try {
                      return PURL_REFERENCE.equals(r.getReferenceType().getIndividualURI());
                    } catch (InvalidSPDXAnalysisException e) {
                      throw new SpdxProcessingException("Unalbe to retrieve referenceType", e);
                    }
                  })
              .findFirst();
      if (ref.isEmpty()) {
        throw new SpdxProcessingException(
            "Missing Purl External Reference for Package: " + spdxPackage.getName());
      }
      return new PackageRef(ref.get().getReferenceLocator());
    } catch (InvalidSPDXAnalysisException e) {
      throw new SpdxProcessingException("Unable to find PackageUrl from SpdxPackage", e);
    }
  }

  public Collection<SpdxPackage> getPackages() {
    return this.packages;
  }

  public SpdxPackage getPackageById(String id) {
    try {
      return new SpdxPackage(inputStore, uri, id, null, false);
    } catch (InvalidSPDXAnalysisException e) {
      throw new SpdxProcessingException("Unable to create SpdxPackage for id: " + id, e);
    }
  }

  private Collection<SpdxPackage> parsePackages() throws InvalidSPDXAnalysisException {
    return inputStore
        .getAllItems(uri, SpdxConstants.CLASS_SPDX_PACKAGE)
        .filter(p -> root == null || !p.getId().equals(root.getId()))
        .map(TypedValue::getId)
        .map(this::getPackageById)
        .collect(Collectors.toList());
  }
}
