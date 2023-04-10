package com.redhat.ecosystemappeng.routes.integration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public final class Constants {

    private Constants() {
    }

    public static final String PROVIDER_HEADER = "provider";
    public static final String PKG_MANAGER_HEADER = "pkgManager";
    public static final String SNYK_TOKEN_HEADER = "crda-snyk-token";
    public static final String TIDELIFT_TOKEN_HEADER = "crda-tidelift-token";

    public static final String TEXT_VND_GRAPHVIZ = "text/vnd.graphviz";

    public static final String SNYK_PROVIDER = "snyk";
    public static final String TIDELIFT_PROVIDER = "tidelift";
    public static final String REDHAT_PROVIDER = "redhat";

    public static final String MAVEN_PKG_MANAGER = "maven";
    public static final String REQUEST_CONTENT_PROPERTY = "requestContent";

    public static final String SNYK_DEP_GRAPH_API_PATH = "/api/v1/test/dep-graph";
    public static final String TIDELIFT_API_BASE_PATH = "/external-api/v1/packages";
    public static final String TIDELIFT_RELEASES_PATTERN = "/%s/%s/releases/%s";
    public static final String TRUSTED_CONTENT_PATH = "/api/policy/v1alpha1/trusted::gav";


    public static final List<String> PKG_MANAGERS = Collections.unmodifiableList(new ArrayList<>() {
        {
            add(MAVEN_PKG_MANAGER);
        }
    });

    public static final List<String> PROVIDERS = Collections.unmodifiableList(new ArrayList<>() {
        {
            add(SNYK_PROVIDER);
            add(TIDELIFT_PROVIDER);
            add(REDHAT_PROVIDER);
        }
    });

}
