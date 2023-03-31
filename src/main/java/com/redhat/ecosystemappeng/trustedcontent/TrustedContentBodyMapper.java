package com.redhat.ecosystemappeng.trustedcontent;

import org.jgrapht.traverse.BreadthFirstIterator;

import com.redhat.ecosystemappeng.model.GraphRequest;
import com.redhat.ecosystemappeng.model.PackageRef;
import com.redhat.ecosystemappeng.model.graph.DependencyEdge;
import com.redhat.ecosystemappeng.utils.GraphUtils;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class TrustedContentBodyMapper {

    public String toPackages(GraphRequest req) {
        BreadthFirstIterator<PackageRef, DependencyEdge> iterator = new BreadthFirstIterator<>(req.graph());
        StringBuilder builder = new StringBuilder("[");
        while (iterator.hasNext()) {
            PackageRef dep = iterator.next();
            if (!GraphUtils.DEFAULT_ROOT.equals(dep)) {
                builder.append("\"").append(dep.name()).append(":").append(dep.version()).append("\"");
                if (iterator.hasNext()) {
                    builder.append(",");
                }
            }
        }
        return builder.append("]").toString();
    }

}
