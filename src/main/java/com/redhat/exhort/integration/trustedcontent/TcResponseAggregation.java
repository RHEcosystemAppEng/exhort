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

package com.redhat.exhort.integration.trustedcontent;

import org.apache.camel.AggregationStrategy;
import org.apache.camel.Exchange;

import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.trustedcontent.TrustedContentResponse;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.inject.Singleton;

@Singleton
@RegisterForReflection
public class TcResponseAggregation implements AggregationStrategy {

  @Override
  public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
    oldExchange.setProperty(
        Constants.TRUSTED_CONTENT_PROVIDER,
        newExchange.getIn().getBody(TrustedContentResponse.class));
    return oldExchange;
  }
}
