package com.redhat.exhort.integration.trustedcontent;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.exhort.api.PackageRef;
import com.redhat.exhort.api.v4.AnalysisReport;
import com.redhat.exhort.config.ObjectMapperProducer;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.camel.AggregationStrategy;
import org.apache.camel.Body;
import org.apache.camel.Exchange;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
@RegisterForReflection
public class TcResponseHandler implements AggregationStrategy {

    ObjectMapper mapper = ObjectMapperProducer.newInstance();
    public Map<String,String> responseToMap(@Body byte[] tcResponse) throws IOException {
        HashMap<String, String> recommendations = new HashMap<>();
        Map recMap = mapper.readValue(tcResponse, Map.class);
        Map <String, List<String>> rec = (Map<String, List<String>>) recMap.get("recommendations");
        rec.entrySet().stream().forEach( (entry) -> {
            recommendations.put(entry.getKey(),entry.getValue().get(0));
        });

     return recommendations;

    }

    @Override
    public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {
        Map<String,String> recommendations = (Map<String,String>)newExchange.getMessage().getBody();
        List<String> keys = recommendations.entrySet().stream().map((entry) -> entry.getKey()).collect(Collectors.toList());
        oldExchange.getIn(AnalysisReport.class).getProviders().forEach( (providerName,providerReport) -> {
            providerReport.getSources().forEach((sourceName, source) -> {
                source.getDependencies().forEach(dependencyReport -> {
                if(keys.contains(dependencyReport.getRef().toString()))
                {
                    String recommendation = recommendations.get(dependencyReport.getRef().toString());
                    dependencyReport.setRecommendation(PackageRef.builder().purl(recommendation).build());
                }

            });
             Long numOfRecommendations= source.getDependencies().stream().filter( dep -> Objects.nonNull(dep.getRecommendation())).count();
             source.getSummary().setRecommendations(Integer.parseInt(numOfRecommendations.toString()));
            });
        });

        return oldExchange;
    }
}
