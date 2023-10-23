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

package com.redhat.exhort.integration.backend;

import java.util.List;

import org.apache.camel.Header;
import org.jboss.resteasy.reactive.common.util.MediaTypeHelper;

import com.redhat.exhort.integration.Constants;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response.Status;

@RegisterForReflection
public class BackendUtils {

  public String getResponseMediaType(@Header(Constants.ACCEPT_HEADER) String acceptHeader) {
    if (acceptHeader == null || acceptHeader.isBlank()) {
      return Constants.DEFAULT_ACCEPT_MEDIA_TYPE;
    }
    List<MediaType> requested = MediaTypeHelper.parseHeader(acceptHeader);
    MediaType match = MediaTypeHelper.getBestMatch(Constants.VALID_RESPONSE_MEDIA_TYPES, requested);
    if (match == null) {
      throw new ClientErrorException(
          "Unexpected Accept header "
              + acceptHeader
              + ". Supported content types are: "
              + Constants.VALID_RESPONSE_MEDIA_TYPES,
          Status.UNSUPPORTED_MEDIA_TYPE);
    }
    return match.toString();
  }
}
