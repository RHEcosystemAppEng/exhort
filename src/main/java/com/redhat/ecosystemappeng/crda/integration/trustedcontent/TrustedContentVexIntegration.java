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

package com.redhat.ecosystemappeng.crda.integration.trustedcontent;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.jackson.ListJacksonDataFormat;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.VexResult;

public class TrustedContentVexIntegration extends EndpointRouteBuilder {

    @Override
    public void configure() {

        from(direct("recommendTrustedContent"))
            .enrich(direct("trustedContentVex"), AggregationStrategies.bean(TrustedContentBodyMapper.class, "filterRecommendations"));

        from(direct("trustedContentVex"))
                .removeHeader(Exchange.HTTP_PATH)
                .removeHeader(Exchange.HTTP_QUERY)
                .removeHeader(Exchange.HTTP_URI)
                .setHeader(Exchange.HTTP_PATH, constant(Constants.TRUSTED_CONTENT_VEX_PATH))
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .setHeader(Exchange.CONTENT_TYPE, constant(MediaType.APPLICATION_JSON))
                .setHeader("Accept", constant(MediaType.APPLICATION_JSON))
                .bean(TrustedContentBodyMapper.class, "buildVexRequest")
                .enrich(direct("vexRequest"), AggregationStrategies.bean(TrustedContentBodyMapper.class, "createRecommendations"));

        from(direct("vexRequest"))
            .marshal().json()
            .to(vertxHttp("{{api.trustedContent.vex.host}}"))
            .unmarshal(new ListJacksonDataFormat(VexResult.class));
    }

}
