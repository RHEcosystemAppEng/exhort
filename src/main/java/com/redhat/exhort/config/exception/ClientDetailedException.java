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

package com.redhat.exhort.config.exception;

import jakarta.ws.rs.core.Response.Status;

public class ClientDetailedException extends DetailedException {
  private Status status;

  public ClientDetailedException(String message) {
    super(message, null);
  }

  public ClientDetailedException(String message, String details) {
    super(message, details);
  }

  public ClientDetailedException(Throwable e) {
    super(e.getMessage(), null);
  }

  public ClientDetailedException(String message, Throwable e) {
    super(message, e.getMessage());
  }

  public ClientDetailedException(String message, String details, Status status) {
    super(message, details);
    this.status = status;
  }

  public String getStatus() {
    return String.valueOf(status.getStatusCode());
  }
}
