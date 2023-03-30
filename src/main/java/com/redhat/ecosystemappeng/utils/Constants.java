package com.redhat.ecosystemappeng.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public final class Constants {
    
    private Constants() {}

    public static final String TEXT_VND_GRAPHVIZ = "text/vnd.graphviz";
    public static final String SNYK_PROVIDER = "snyk";
    public static final String REDHAT_PROVIDER = "redhat";

    public static final String MAVEN_PKG_MANAGER = "maven";

    public static final Collection<String> PKG_MANAGERS = Collections.unmodifiableCollection(new ArrayList<>() {{
        add(MAVEN_PKG_MANAGER);
    }});

    public static final Collection<String> PROVIDERS = Collections.unmodifiableCollection(new ArrayList<>() {{
        add(SNYK_PROVIDER);
        add(REDHAT_PROVIDER);
    }});

    
}
