package com.redhat.ecosystemappeng.routes.integration;

import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.ecosystemappeng.config.ObjectMapperProducer;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ReportTemplate {

    public Map<String, Object> setVariables(String body) throws JsonMappingException, JsonProcessingException {
        ObjectMapper mapper = ObjectMapperProducer.newInstance();
        JsonNode obj = mapper.readTree(body);
        return Constants.PROVIDERS.stream().collect(Collectors.toMap(k -> k, k -> obj.get(k)));
    }
    
}
