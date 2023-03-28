package com.redhat.ecosystemappeng.model;

import lombok.Builder;

@Builder
public record PackageRef (String name, String version) {
 
}
