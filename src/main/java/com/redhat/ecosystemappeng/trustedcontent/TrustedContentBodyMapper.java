package com.redhat.ecosystemappeng.trustedcontent;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class TrustedContentBodyMapper {

    private final ObjectMapper mapper = new ObjectMapper();

    public String parse(String body) throws JsonMappingException, JsonProcessingException {
        ObjectNode node = (ObjectNode) mapper.readTree(body);
        ArrayNode packages = (ArrayNode) node.get("package_versions");
        StringBuilder builder = new StringBuilder("[");
        for (int i = 0; i < packages.size(); i++) {
            JsonNode p = packages.get(i);
            String pkg = getText(p, "package");
            String version = getText(p, "version");
            if(pkg != null && version != null) {
                builder.append("\"").append(pkg)
                        .append(":")
                        .append(version)
                        .append("\"");
                if (i < packages.size() - 1) {
                    builder.append(",");
                }
            }
        }
        return builder.append("]").toString();
    }

    private String getText(JsonNode n, String field) {
        if(n == null) {
            return null;
        }
        JsonNode target = n.get(field);
        if(target == null) {
            return null;
        }
        return target.asText();
    }
}
