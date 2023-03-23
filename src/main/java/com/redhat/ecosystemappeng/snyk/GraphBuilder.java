package com.redhat.ecosystemappeng.snyk;

import java.util.Set;

import org.jgrapht.Graph;
import org.jgrapht.traverse.BreadthFirstIterator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.redhat.ecosystemappeng.ObjectMapperProducer;
import com.redhat.ecosystemappeng.model.Dependency;
import com.redhat.ecosystemappeng.model.graph.DependencyEdge;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class GraphBuilder {

    private ObjectMapper mapper = ObjectMapperProducer.newInstance();

    public String depsToFlatGraph(String body) throws JsonMappingException, JsonProcessingException {
        ArrayNode deps = (ArrayNode) mapper.readTree(body).get("package_versions");
        ObjectNode graph = mapper.createObjectNode();
        ObjectNode depGraph = mapper.createObjectNode();
        depGraph.put("schemaVersion", "1.2.0");
        depGraph.set("pkgManager", mapper.createObjectNode().put("name", "maven"));

        depGraph.set("pkgs", buildPackages(deps));
        depGraph.set("graph", buildGraph(deps));

        graph.set("depGraph", depGraph);

        return mapper.writeValueAsString(graph);
    }

    private ArrayNode buildPackages(ArrayNode deps) {
        ArrayNode pkgs = mapper.createArrayNode();
        pkgs.add(mapper.createObjectNode()
                .put("id", "app@1.0.0")
                .set("info", mapper.createObjectNode()
                        .put("name", "app")
                        .put("version", "1.0.0")));
        deps.forEach(d -> {
            ObjectNode pkg = mapper.createObjectNode();
            String pkgName = d.get("package").asText();
            String version = d.get("version").asText();
            pkg.put("id", pkgName + "@" + version);
            pkg.set("info", mapper.createObjectNode().put("name", pkgName).put("version", version));
            pkgs.add(pkg);
        });
        return pkgs;
    }

    private ObjectNode buildGraph(ArrayNode deps) {
        ObjectNode graph = mapper.createObjectNode();
        graph.put("rootNodeId", "root-node");
        ArrayNode nodes = mapper.createArrayNode();
        ObjectNode rootNode = mapper.createObjectNode();
        rootNode.put("nodeId", "root-node");
        rootNode.put("pkgId", "app@1.0.0");
        ArrayNode rootDeps = mapper.createArrayNode();
        nodes.add(rootNode);
        deps.forEach(d -> {
            ObjectNode graphDep = mapper.createObjectNode();
            String pkgName = d.get("package").asText();
            String version = d.get("version").asText();
            String pkgId = pkgName + "@" + version;

            graphDep.put("nodeId", pkgId);
            graphDep.put("pkgId", pkgId);
            graphDep.set("deps", mapper.createArrayNode());
            nodes.add(graphDep);

            rootDeps.add(mapper.createObjectNode().put("nodeId", pkgId));
        });
        rootNode.set("deps", rootDeps);
        graph.set("nodes", nodes);
        return graph;
    }

    public String fromMavenDependencies(Graph<Dependency, DependencyEdge> graph) throws JsonProcessingException {
        ObjectNode depGraph = mapper.createObjectNode();
        depGraph.put("schemaVersion", "1.2.0");
        depGraph.set("pkgManager", mapper.createObjectNode().put("name", "maven"));

        depGraph.set("pkgs", addPackages(depGraph, graph));
        ObjectNode root = mapper.createObjectNode().set("depGraph", depGraph);
        return mapper.writeValueAsString(root);
    }

    private JsonNode addPackages(ObjectNode depGraph, Graph<Dependency, DependencyEdge> graph) {
        ArrayNode pkgs = mapper.createArrayNode();
        ArrayNode nodes = mapper.createArrayNode();
        Dependency root = null;
        BreadthFirstIterator<Dependency, DependencyEdge> iterator = new BreadthFirstIterator<>(graph);
        while (iterator.hasNext()) {
            Dependency dep = iterator.next();
            if (root == null) {
                root = dep;
            }
            nodes.add(createNode(dep, graph.outgoingEdgesOf(dep)));
            pkgs.add(mapper.createObjectNode()
                    .put("id", dep.getId())
                    .set("info", mapper.createObjectNode()
                            .put("name", dep.getName())
                            .put("version", dep.getVersion())));
        }
        depGraph.set("pkgs", pkgs);
        depGraph.set("graph", mapper.createObjectNode()
                .put("rootNodeId", root.getId())
                .set("nodes", nodes));
        return pkgs;
    }

    private ObjectNode createNode(Dependency dep, Set<DependencyEdge> edges) {
        ArrayNode depsNode = mapper.createArrayNode();
        edges.forEach(e -> depsNode.add(mapper.createObjectNode().put("nodeId", e.toString())));
        return mapper.createObjectNode()
                .put("nodeId", dep.getId())
                .put("pkgId", dep.getId())
                .set("deps", depsNode);
    }

}
