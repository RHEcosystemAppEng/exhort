/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.redhat.ecosystemappeng.crda.integration;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangeProperty;
import org.apache.camel.Header;
import org.cyclonedx.model.Bom;
import org.cyclonedx.model.Component;
import org.cyclonedx.model.Dependency;
import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.builder.GraphBuilder;
import org.jgrapht.graph.builder.GraphTypeBuilder;
import org.jgrapht.traverse.BreadthFirstIterator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.packageurl.MalformedPackageURLException;
import com.github.packageurl.PackageURL;
import com.redhat.ecosystemappeng.crda.config.ObjectMapperProducer;
import com.redhat.ecosystemappeng.crda.model.GraphRequest;
import com.redhat.ecosystemappeng.crda.model.PackageRef;

import io.quarkus.runtime.annotations.RegisterForReflection;

import jakarta.mail.internet.ContentType;
import jakarta.mail.internet.ParseException;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@RegisterForReflection
public class GraphUtils {

    public static final String DEFAULT_APP_NAME = "com.redhat.ecosystemappeng:default-app";
    public static final String DEFAULT_APP_VERSION = "0.0.1";
    public static final PackageRef DEFAULT_ROOT =
            new PackageRef(DEFAULT_APP_NAME, DEFAULT_APP_VERSION);
    public static final Graph<PackageRef, DefaultEdge> EMPTY_GRAPH =
            GraphTypeBuilder.directed()
                    .allowingSelfLoops(false)
                    .vertexClass(PackageRef.class)
                    .edgeSupplier(DefaultEdge::new)
                    .buildGraphBuilder()
                    .buildAsUnmodifiable();

    private static final ObjectMapper mapper = ObjectMapperProducer.newInstance();
    private static final Logger LOGGER = LoggerFactory.getLogger(GraphUtils.class);

    public GraphRequest fromPackages(
            @Body List<PackageRef> body,
            @ExchangeProperty(Constants.PROVIDERS_PARAM) List<String> providers,
            @Header(Constants.PKG_MANAGER_HEADER) String pkgManager) {
        GraphBuilder<PackageRef, DefaultEdge, Graph<PackageRef, DefaultEdge>> builder =
                GraphTypeBuilder.directed()
                        .allowingSelfLoops(false)
                        .vertexClass(PackageRef.class)
                        .edgeSupplier(DefaultEdge::new)
                        .buildGraphBuilder();
        builder.addVertex(DEFAULT_ROOT);
        body.forEach(d -> builder.addEdge(DEFAULT_ROOT, d));
        return new GraphRequest.Builder(pkgManager, providers)
                .graph(builder.buildAsUnmodifiable())
                .build();
    }

    public GraphRequest fromDepGraph(
            @Body InputStream file,
            @ExchangeProperty(Constants.PROVIDERS_PARAM) List<String> providers,
            @Header(Constants.PKG_MANAGER_HEADER) String pkgManager,
            @Header(Exchange.CONTENT_TYPE) String contentType) {
        GraphBuilder<PackageRef, DefaultEdge, Graph<PackageRef, DefaultEdge>> builder =
                GraphTypeBuilder.directed()
                        .allowingSelfLoops(false)
                        .vertexClass(PackageRef.class)
                        .edgeSupplier(DefaultEdge::new)
                        .buildGraphBuilder();
        boolean empty = true;
        ContentType ct;
        try {
            ct = new ContentType(contentType);
        } catch (ParseException e) {
            throw new ClientErrorException(Response.Status.UNSUPPORTED_MEDIA_TYPE, e);
        }
        switch (ct.getBaseType()) {
            case Constants.TEXT_VND_GRAPHVIZ:
                empty = fromDotFile(file, builder);
                break;
            case MediaType.APPLICATION_JSON:
                empty = fromSbom(file, builder, pkgManager);
                break;
            default:
                throw new ClientErrorException(
                        "Unsupported Content-Type header: " + contentType,
                        Response.Status.UNSUPPORTED_MEDIA_TYPE);
        }
        if (empty) {
            builder.addVertex(DEFAULT_ROOT);
        }
        return new GraphRequest.Builder(pkgManager, providers)
                .graph(builder.buildAsUnmodifiable())
                .build();
    }

    private boolean fromDotFile(
            InputStream file,
            GraphBuilder<PackageRef, DefaultEdge, Graph<PackageRef, DefaultEdge>> builder) {
        boolean empty = true;
        try (Scanner scanner = new Scanner(file)) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.startsWith("digraph") || line.contains("}")) {
                    // ignore
                } else {
                    String[] vertices = line.replace(";", "").replaceAll("\"", "").split("->");
                    try {
                        PackageRef source = PackageRef.parse(vertices[0].trim());
                        PackageRef target = PackageRef.parse(vertices[1].trim());
                        builder.addEdge(source, target);
                        empty = false;
                    } catch (IllegalArgumentException e) {
                        // ignore loops caused by classifiers
                    }
                }
            }
        }
        return empty;
    }

    private boolean fromSbom(
            InputStream file,
            GraphBuilder<PackageRef, DefaultEdge, Graph<PackageRef, DefaultEdge>> builder,
            String pkgManager) {
        try {
            Bom bom = mapper.readValue(file, Bom.class);
            if (bom.getDependencies().isEmpty()) {
                return true;
            }
            Map<String, PackageRef> componentPurls =
                    bom.getComponents().stream()
                            .collect(
                                    Collectors.toMap(
                                            Component::getBomRef,
                                            c ->
                                                    fromPurl(
                                                            c.getPurl(),
                                                            requiresDecoding(pkgManager))));
            Optional<Component> rootComponent =
                    Optional.ofNullable(bom.getMetadata().getComponent());
            final Optional<Dependency> rootDependency;
            if (rootComponent.isPresent()) {
                rootDependency =
                        bom.getDependencies().stream()
                                .filter(d -> d.getRef().equals(rootComponent.get().getBomRef()))
                                .findFirst();
                if (rootDependency.isEmpty()) {
                    throw new IllegalArgumentException(
                            "SBOM: Missing matching metadata.component in the dependencies."
                                    + rootComponent.get().getName());
                }
                PackageRef rootRef =
                        fromPurl(rootComponent.get().getPurl(), requiresDecoding(pkgManager));
                addDependency(
                        builder, rootRef, rootDependency.get().getDependencies(), componentPurls);
                bom.getDependencies().stream()
                        .filter(
                                d ->
                                        !d.getRef()
                                                .equals(
                                                        rootDependency
                                                                .orElse(
                                                                        new Dependency(
                                                                                DEFAULT_ROOT
                                                                                        .toGav()))
                                                                .getRef()))
                        .forEach(
                                d ->
                                        addDependency(
                                                builder,
                                                componentPurls.get(d.getRef()),
                                                d.getDependencies(),
                                                componentPurls));
            } else { // flat rootless SBOM
                rootDependency = Optional.of(new Dependency(DEFAULT_ROOT.toGav()));
                addDependency(builder, DEFAULT_ROOT, bom.getDependencies(), componentPurls);
                componentPurls
                        .values()
                        .forEach(
                                purl ->
                                        addDependency(
                                                builder,
                                                purl,
                                                Collections.emptyList(),
                                                componentPurls));
            }

            return false;
        } catch (IOException e) {
            LOGGER.error("Unable to parse the SBOM file", e);
            throw new ClientErrorException(
                    "Unable to parse received SBOM file", Response.Status.BAD_REQUEST);
        }
    }

    private boolean requiresDecoding(String pkgManager) {
        return Constants.PIP_PKG_MANAGER.equals(pkgManager);
    }

    private PackageRef fromPurl(String purl, boolean decode) {
        PackageURL packageUrl;
        try {
            if (decode) {
                packageUrl = new PackageURL(URLDecoder.decode(purl, StandardCharsets.UTF_8.name()));
            } else {
                packageUrl = new PackageURL(purl);
            }
            if (packageUrl.getNamespace() != null) {
                return new PackageRef(
                        packageUrl.getNamespace() + ":" + packageUrl.getName(),
                        packageUrl.getVersion());
            }
            return new PackageRef(packageUrl.getName(), packageUrl.getVersion());
        } catch (MalformedPackageURLException | UnsupportedEncodingException e) {
            LOGGER.warn("Unsupported PURL format {}", purl, e);
            throw new IllegalArgumentException("Unsupported PURL format: " + purl, e);
        }
    }

    private void addDependency(
            GraphBuilder<PackageRef, DefaultEdge, Graph<PackageRef, DefaultEdge>> builder,
            PackageRef source,
            List<Dependency> deps,
            Map<String, PackageRef> componentPurls) {
        if (deps != null) {
            deps.stream()
                    .map(d -> componentPurls.get(d.getRef()))
                    .forEach(target -> builder.addEdge(source, target));
        }
    }

    public static List<PackageRef> getFirstLevel(Graph<PackageRef, DefaultEdge> graph) {
        BreadthFirstIterator<PackageRef, DefaultEdge> i = new BreadthFirstIterator<>(graph);
        if (!i.hasNext()) {
            return Collections.emptyList();
        }
        PackageRef start = i.next();
        return getNextLevel(graph, start);
    }

    public static List<PackageRef> getNextLevel(
            Graph<PackageRef, DefaultEdge> graph, PackageRef ref) {
        List<PackageRef> firstLevel = new ArrayList<>();
        graph.outgoingEdgesOf(ref).stream()
                .map(e -> graph.getEdgeTarget(e))
                .forEach(firstLevel::add);
        return firstLevel;
    }

    public static Graph<PackageRef, DefaultEdge> emptyGraph() {
        return EMPTY_GRAPH;
    }
}
