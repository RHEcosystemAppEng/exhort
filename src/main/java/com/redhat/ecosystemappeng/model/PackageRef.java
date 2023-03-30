package com.redhat.ecosystemappeng.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record PackageRef (String name, String version) {
 
    @JsonIgnore
    public String getId() {
        return name + "@" + version;
    }

    public static PackageRef parse(String gav) {
        String[] parts = gav.split(":");
        if (parts.length < 4 || parts.length > 6) {
            throw new IllegalArgumentException("Unexpected GAV format. " + gav);
        }
        String name = parts[0] + ":" + parts[1];
        if(parts.length < 6) {
            return new PackageRef(name, parts[3]);
        }
        return new PackageRef(name, parts[4]);
    }
}
