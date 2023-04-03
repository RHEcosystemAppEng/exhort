package com.redhat.ecosystemappeng.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class ObjectMapperProducer {

    public static ObjectMapper newInstance() {
        return new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    }

}
