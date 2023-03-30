package com.redhat.ecosystemappeng.config;

import org.apache.camel.http.base.HttpOperationFailedException;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection(targets = { HttpOperationFailedException.class })
public class CustomReflectionConfiguration {

}
