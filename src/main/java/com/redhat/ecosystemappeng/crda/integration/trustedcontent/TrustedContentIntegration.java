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

import java.util.ArrayList;
import java.util.List;

import org.apache.camel.Exchange;
import org.apache.camel.Message;
import org.apache.camel.builder.AggregationStrategies;
import org.apache.camel.builder.endpoint.EndpointRouteBuilder;
import org.apache.camel.component.jackson.ListJacksonDataFormat;
import org.apache.camel.http.base.HttpOperationFailedException;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.ecosystemappeng.crda.integration.Constants;
import com.redhat.ecosystemappeng.crda.integration.ProviderAggregationStrategy;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.ProviderStatus;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.MavenPackage;
import com.redhat.ecosystemappeng.crda.model.trustedcontent.VexResult;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.HttpMethod;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class TrustedContentIntegration extends EndpointRouteBuilder {

  @ConfigProperty(name = "api.trustedContent.timeout", defaultValue = "10s")
  String timeout;

  @Override
  public void configure() {
    // fmt:off
        from(direct("recommendAllTrustedContent"))
            .routeId("recommendAllTrustedContent")
            .multicast(AggregationStrategies.bean(ProviderAggregationStrategy.class, "aggregate"))
              .parallelProcessing()
              .circuitBreaker()
              .faultToleranceConfiguration()
                  .timeoutEnabled(true)
                  .timeoutDuration(timeout)
              .end()
                .enrich(direct("trustedContentVex"),
                        AggregationStrategies.bean(TrustedContentBodyMapper.class, "filterRecommendations"))
                .enrich(direct("trustedContentGav"),
                        AggregationStrategies.bean(TrustedContentBodyMapper.class, "addRecommendations"))
              .onFallback()
                .process(this::processFallBack);

        from(direct("recommendVexContent"))
            .routeId("addRecommendedVexContent")
            .circuitBreaker()
              .faultToleranceConfiguration()
                  .timeoutEnabled(true)
                  .timeoutDuration(timeout)
              .end()
              .enrich(direct("trustedContentVex"),
                  AggregationStrategies.bean(TrustedContentBodyMapper.class, "filterRecommendations"))
            .onFallback()
                .process(this::processFallBack);

        from(direct("trustedContentVex"))
            .routeId("prepareVexRequest")
            .process(this::processVexRequest)
            .enrich(direct("vexRequest"),
                    AggregationStrategies.bean(TrustedContentBodyMapper.class, "createRemediations"));

        from(direct("vexRequest"))
            .routeId("doVexRequest")
            .marshal().json()
            .to(vertxHttp("{{api.trustedContent.vex.host}}"))
            .unmarshal(new ListJacksonDataFormat(VexResult.class));

        from(direct("trustedContentGav"))
            .routeId("prepareGavRequest")
            .bean(TrustedContentBodyMapper.class, "buildGavRequest")
            .enrich(direct("gavRequest"),
                    AggregationStrategies.bean(TrustedContentBodyMapper.class, "createGavRecommendations"));

        from(direct("gavRequest"))
            .routeId("gavRequest")
            .marshal().json()
            .process(this::processGavRequest)
            .to(vertxHttp("{{api.trustedContent.gav.host}}"))
            .unmarshal(new ListJacksonDataFormat(MavenPackage.class));

        //fmt:on
  }

  private void processVexRequest(Exchange exchange) {
    Message message = exchange.getMessage();
    processRequest(message, Constants.TRUSTED_CONTENT_VEX_PATH);
    message.setBody(TrustedContentBodyMapper.buildVexRequest(message.getBody(GraphRequest.class)));
  }

  private void processGavRequest(Exchange exchange) {
    Message message = exchange.getMessage();
    processRequest(message, Constants.TRUSTED_CONTENT_PATH);
    message.setHeader(Exchange.HTTP_QUERY, "minimal=true");
  }

  private void processRequest(Message message, String path) {
    message.removeHeader(Exchange.HTTP_PATH);
    message.removeHeader(Exchange.HTTP_QUERY);
    message.removeHeader(Exchange.HTTP_URI);
    message.setHeader(Exchange.HTTP_PATH, path);
    message.setHeader(Exchange.HTTP_METHOD, HttpMethod.POST);
    message.setHeader(Exchange.CONTENT_TYPE, MediaType.APPLICATION_JSON);
    message.setHeader("Accept", MediaType.APPLICATION_JSON);
  }

  private void processFallBack(Exchange exchange) {
    GraphRequest req = exchange.getMessage().getBody(GraphRequest.class);
    ProviderStatus.Builder builder =
        ProviderStatus.builder().ok(false).provider(Constants.TRUSTED_CONTENT_NAME);
    Exception exception = (Exception) exchange.getProperty(Exchange.EXCEPTION_CAUGHT);
    Throwable cause = exception.getCause();

    if (cause != null) {
      if (cause instanceof HttpOperationFailedException) {
        HttpOperationFailedException httpException = (HttpOperationFailedException) cause;
        builder.message(httpException.getMessage()).status(httpException.getStatusCode());

      } else {
        builder
            .message(cause.getMessage())
            .status(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
      }
    } else {
      builder
          .message(exception.getMessage())
          .status(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
    }
    List<ProviderStatus> statuses = new ArrayList<>(req.providerStatuses());
    statuses.add(builder.build());
    GraphRequest newReq = new GraphRequest.Builder(req).providerStatuses(statuses).build();
    exchange.getMessage().setBody(newReq);
  }
}
