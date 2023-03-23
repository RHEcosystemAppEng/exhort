package com.redhat.ecosystemappeng;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class ObjectMapperProducer {

    public static ObjectMapper newInstance() {
        return new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    }

}
