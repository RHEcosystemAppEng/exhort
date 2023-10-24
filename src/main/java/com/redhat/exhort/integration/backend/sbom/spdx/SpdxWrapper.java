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
            "Missing Purl External Reference for Package: "
                + spdxPackage.getName().orElse("unknown"));
      }
      return new PackageRef(ref.get().getReferenceLocator());
    } catch (InvalidSPDXAnalysisException e) {
      throw new SpdxProcessingException("Unable to find PackageUrl from SpdxPackage", e);
    }
  }

  public boolean hasPurl(SpdxPackage pkg) {
    try {
      if (pkg.getExternalRefs() == null || pkg.getExternalRefs().isEmpty()) {
        return false;
      }
      return pkg.getExternalRefs().stream()
          .anyMatch(
              ref -> {
                try {
                  return PURL_REFERENCE.equals(ref.getReferenceType().getIndividualURI());
                } catch (InvalidSPDXAnalysisException e) {
                  return false;
                }
              });
    } catch (InvalidSPDXAnalysisException e) {
      return false;
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
    Optional<String> docName = doc.getName();
    return inputStore
        .getAllItems(uri, SpdxConstants.CLASS_SPDX_PACKAGE)
        .map(TypedValue::getId)
        .map(this::getPackageById)
        .filter(this::hasPurl)
        .filter(p -> !packageHasName(p, docName))
        .collect(Collectors.toList());
  }

  private boolean packageHasName(SpdxPackage pkg, Optional<String> expected) {
    Optional<String> name;
    try {
      name = pkg.getName();
      if (name.isPresent()) {
        return name.get().equals(expected.orElse(null));
      }
      return expected.isEmpty();
    } catch (InvalidSPDXAnalysisException e) {
      throw new SpdxProcessingException("Unable to retrieve package name", e);
    }
  }
}
