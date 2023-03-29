package com.redhat.ecosystemappeng.model.graph;

import org.jgrapht.graph.DefaultEdge;

import com.redhat.ecosystemappeng.model.PackageRef;

public class DependencyEdge extends DefaultEdge {

    @Override
    public String toString() {
        return ((PackageRef) getTarget()).getId();
    }
    
}
