/*
 * Copyright 2024 Red Hat, Inc. and/or its affiliates
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

package com.redhat.exhort.service;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Invocation;

public class RestClient {

  public static final String SNYK_PROVIDER_NAME = "snyk";
  public static final String OSS_INDEX_PROVIDER_NAME = "ossIndex";
  public static final String OSV_NVD_PROVIDER_NAME = "osvNvd";
  public static final String TRUSTED_CONTENT_PROVIDER_NAME = "trustedContent";
  private final Client client;

  private static RestClient theClient;
  public static final Map<String, URI> servicesUrls = new HashMap<>();

  private RestClient(Client client) {
    this.client = client;
  }

  public static RestClient getInstance(String providerName, URI service) {
    if (Objects.isNull(theClient)) {
      theClient = new RestClient(ClientBuilder.newClient());
    }
    if (Objects.isNull(servicesUrls.get(providerName))) {
      servicesUrls.put(providerName, service);
    }
    return theClient;
  }

  public Invocation.Builder request(String providerName) {
    return this.client.target(this.servicesUrls.get(providerName)).request();
  }
}
