package com.redhat.ecosystemappeng.routes.integration;

import org.apache.camel.Exchange;
import org.apache.camel.ExchangeProperty;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class ExchangeUtils {

    public String extractProvider(@ExchangeProperty(Exchange.MULTICAST_INDEX) int index) {
        return Constants.PROVIDERS.get(index);
    }

    public static String[] getRecipientsForProvider() {
        return Constants.PROVIDERS.stream().map(p -> "direct:depAnalysis").toList().toArray(new String[] {});
    }
}
