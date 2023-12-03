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
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.integration.Constants;
import com.redhat.exhort.integration.providers.ProviderAggregationStrategy;
import jakarta.ws.rs.core.MediaType;
import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.jackson.ListJacksonDataFormat;
import org.apache.camel.model.dataformat.JsonLibrary;

import java.util.*;


public class TrustedContentIntegration extends EndpointRouteBuilder {

    @Override
    public void configure() {

        from(direct("recommendationsTrustedContent"))
                .to(direct("extractPurls"))
                .to(direct("tcRequest"))
                .transform().method(TcResponseHandler.class,"responseToMap");


        from(direct("extractPurls"))
                .process(this::extractPurlsFromStructure);

        from(direct("tcRequest"))
                .marshal().json()
                .setHeader(Exchange.HTTP_PATH, constant(Constants.TRUSTED_CONTENT_PATH))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
                .to(vertxHttp("{{api.trustedcontent.host}}"))
                .unmarshal().json(JsonLibrary.Jackson, Map.class);

    }

    private void extractPurlsFromStructure(Exchange exchange) {
        Map<String,List<String>> purlsMap = new HashMap<>();
        Set<String> purls = new HashSet<>();
        AnalysisReport report = (AnalysisReport) exchange.getMessage().getBody();
        report.getProviders().values().stream()
                             .forEach(providerReport -> Objects.requireNonNull(providerReport.getSources())
                                     .forEach((k, v) -> v.getDependencies()
                                             .forEach( dep -> purls.add(dep.getRef().toString())))
                             );
        purlsMap.put("purls",purls.stream().toList());
        exchange.getMessage().setBody(purlsMap);
    }

}
