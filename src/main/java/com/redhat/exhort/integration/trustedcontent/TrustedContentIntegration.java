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

import java.util.*;

import jakarta.enterprise.context.ApplicationScoped;
import org.apache.camel.Exchange;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;

import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.model.DependencyTree;

import jakarta.ws.rs.core.MediaType;

@ApplicationScoped
public class TrustedContentIntegration extends EndpointRouteBuilder {

  @Override
  public void configure() {

    from(direct("recommendationsTrustedContent"))
        .to(direct("extractPurls"))
        .process(this::handleHeaders)
        .to(direct("tcRequest"))
        .transform()
        .method(TcResponseHandler.class, "responseToMap");

    from(direct("extractPurls")).process(this::extractPurlsFromDependencyTree);

    from(direct("tcRequest"))
        .marshal()
        .json()
        .setHeader(Exchange.HTTP_PATH, constant(Constants.TRUSTED_CONTENT_PATH))
        .setHeader(Exchange.HTTP_METHOD, constant("POST"))
        .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
        .to(vertxHttp("{{api.trustedcontent.host}}"))
        .unmarshal()
        .json(JsonLibrary.Jackson, Map.class);
  }

  private void handleHeaders(Exchange exchange) {
    var message = exchange.getMessage();
    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.removeHeaders("*-token");
    message.removeHeader("Accept-Encoding");
  }

  private void extractPurlsFromDependencyTree(Exchange exchange) {
    Map<String, List<String>> purlsMap = new HashMap<>();
    Set<String> purls = new HashSet<>();
    //    AnalysisReport report = (AnalysisReport) exchange.getMessage().getBody();
    //    report.getProviders().values().stream()
    //        .forEach(
    //            providerReport ->
    //                Objects.requireNonNull(providerReport.getSources())
    //                    .forEach(
    //                        (k, v) ->
    //                            v.getDependencies()
    //                                .forEach(dep -> purls.add(dep.getRef().toString()))));
    List<String> allPurls =
        ((DependencyTree) exchange.getProperty(Constants.DEPENDENCY_TREE_PROPERTY))
            .getAll().stream().map(PackageRef::toString).toList();
    purlsMap.put("purls", allPurls);
    exchange.getMessage().setBody(purlsMap);
  }
}
