package com.redhat.ecosystemappeng.config;

import javax.ws.rs.ClientErrorException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import org.apache.camel.http.base.HttpOperationFailedException;
import org.jboss.resteasy.reactive.common.jaxrs.ResponseImpl;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection(targets = { HttpOperationFailedException.class, ClientErrorException.class, WebApplicationException.class, Response.class, ResponseImpl.class })
public class CustomReflectionConfiguration {

}
