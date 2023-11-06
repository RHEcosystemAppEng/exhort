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

package com.redhat.exhort.integration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.ws.rs.core.MediaType;

@RegisterForReflection
public final class Constants {

  private Constants() {}

  public static final String PROVIDERS_PARAM = "providers";
  public static final String SBOM_TYPE_PARAM = "sbomType";

  public static final String ACCEPT_HEADER = "Accept";
  public static final String ACCEPT_ENCODING_HEADER = "Accept-Encoding";
  public static final String SNYK_TOKEN_HEADER = "ex-snyk-token";
  public static final String OSS_INDEX_USER_HEADER = "ex-oss-index-user";
  public static final String OSS_INDEX_TOKEN_HEADER = "ex-oss-index-token";
  public static final String VERBOSE_MODE_HEADER = "verbose";

  public static final String RHDA_TOKEN_HEADER = "rhda-token";
  public static final String RHDA_SOURCE_HEADER = "rhda-source";
  public static final String RHDA_OPERATION_TYPE_HEADER = "rhda-operation-type";
  public static final String USER_AGENT_HEADER = "User-Agent";

  public static final MediaType MULTIPART_MIXED_TYPE = new MediaType("multipart", "mixed");
  public static final String MULTIPART_MIXED = MULTIPART_MIXED_TYPE.toString();
  public static final String SPDX_MEDIATYPE_JSON = "application/vnd.spdx+json";

  public static final String SNYK_PROVIDER = "snyk";
  public static final String OSS_INDEX_PROVIDER = "oss-index";
  public static final String TRUSTIFICATION_PROVIDER = "trustification";
  public static final String UNKNOWN_PROVIDER = "unknown";

  public static final String MAVEN_PKG_MANAGER = "maven";
  public static final String NPM_PKG_MANAGER = "npm";
  public static final String PYPI_PKG_MANAGER = "pypi";
  public static final String GOLANG_PKG_MANAGER = "golang";

  public static final String PKG_MANAGER_PROPERTY = "pkgManager";
  public static final String REQUEST_CONTENT_PROPERTY = "requestContent";
  public static final String REPORT_PROPERTY = "report";
  public static final String PROVIDER_PRIVATE_DATA_PROPERTY = "providerPrivateData";
  public static final String RESPONSE_STATUS_PROPERTY = "responseStatus";
  public static final String DEPENDENCY_TREE_PROPERTY = "dependencyTree";
  public static final String API_VERSION_PROPERTY = "apiVersion";

  public static final String API_VERSION_V4 = "v4";
  public static final String API_VERSION_V3 = "v3";

  public static final String SNYK_DEP_GRAPH_API_PATH = "/test/dep-graph";
  public static final String SNYK_TOKEN_API_PATH = "/user/me";
  public static final String OSS_INDEX_AUTH_COMPONENT_API_PATH = "/authorized/component-report";
  public static final String TRUSTIFICATION_ANALYZE_API_PATH = "/analyze";

  public static final String DEFAULT_ACCEPT_MEDIA_TYPE = MediaType.APPLICATION_JSON;
  public static final boolean DEFAULT_VERBOSE_MODE = false;

  public static final List<String> PROVIDERS =
      Collections.unmodifiableList(
          new ArrayList<>() {
            {
              add(SNYK_PROVIDER);
              add(OSS_INDEX_PROVIDER);
              add(TRUSTIFICATION_PROVIDER);
            }
          });

  public static final List<MediaType> VALID_RESPONSE_MEDIA_TYPES =
      Collections.unmodifiableList(
          new ArrayList<>() {
            {
              add(MediaType.APPLICATION_JSON_TYPE);
              add(MediaType.TEXT_HTML_TYPE);
              add(MULTIPART_MIXED_TYPE);
            }
          });
}
