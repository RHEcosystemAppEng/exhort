package com.redhat.ecosystemappeng.model;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode
@Builder
@ToString
public class Dependency {

    String groupId;
    String artifactId;
    String version;
    String packaging;
    String classifier;
    String scope;

    public String getId() {
        return getName() + "@" + version;
    }

    public String getName() {
        return groupId + ":" + artifactId;
    }

    public static Dependency parse(String gav) {
        String[] parts = gav.split(":");
        if (parts.length < 4 || parts.length > 6) {
            throw new IllegalArgumentException("Unexpected GAV format. " + gav);
        }
        DependencyBuilder builder = Dependency.builder();
        if(parts.length < 6) {
            builder.groupId(parts[0]).artifactId(parts[1]).packaging(parts[2]).version(parts[3]);
            if(parts.length == 5) {
                builder.scope(parts[4]);
            }
        } else {
            builder.groupId(parts[0]).artifactId(parts[1]).packaging(parts[2]).classifier(parts[3]).version(parts[4]).scope(parts[5]);
        }
        return builder.build();
    }
}
