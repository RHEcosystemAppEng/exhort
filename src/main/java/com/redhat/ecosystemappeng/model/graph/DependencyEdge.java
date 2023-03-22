package com.redhat.ecosystemappeng.model.graph;

import org.jgrapht.graph.DefaultEdge;

import com.redhat.ecosystemappeng.model.Dependency;

public class DependencyEdge extends DefaultEdge {

    @Override
    public String toString() {
        return ((Dependency) getTarget()).getId();
    }
    
}
