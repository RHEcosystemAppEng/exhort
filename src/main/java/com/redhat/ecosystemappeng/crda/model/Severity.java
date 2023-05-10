package com.redhat.ecosystemappeng.crda.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public enum Severity {

    CRITICAL,
    HIGH,
    MEDIUM,
    LOW;

    public static Severity fromValue(String value) {
        if(value == null) {
            return null;
        }
        return Severity.valueOf(value.toUpperCase());
    }

    public String toString() {
        return name().toLowerCase();
    }
}
