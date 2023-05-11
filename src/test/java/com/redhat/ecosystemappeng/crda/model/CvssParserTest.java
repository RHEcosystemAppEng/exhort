package com.redhat.ecosystemappeng.crda.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.redhat.ecosystemappeng.crda.CvssParser;

public class CvssParserTest {

    private static final String[] INPUTS = {
            "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H",
            "CVSS:3.1/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:L/A:L/E:U/RL:U/RC:R"
    };

    private static final CvssVector[] EXPECTATIONS = {
        new CvssVector.Builder().attackVector("Network")
            .attackComplexity("High")
            .privilegesRequired("None")
            .userInteraction("None")
            .scope("Unchanged")
            .confidentialityImpact("None")
            .integrityImpact("None")
            .availabilityImpact("High")
            .cvss(INPUTS[0]).build(),
        new CvssVector.Builder().attackVector("Adjacent Network")
            .attackComplexity("High")
            .privilegesRequired("Low")
            .userInteraction("Required")
            .scope("Unchanged")
            .confidentialityImpact("High")
            .integrityImpact("Low")
            .availabilityImpact("Low")
            .exploitCodeMaturity("Unproven that exploit exists")
            .remediationLevel("Unavailable")
            .reportConfidence("Reasonable")
            .cvss(INPUTS[1]).build()
    };
    

    @Test
    void testVectors() {
        for(int i = 0; i < INPUTS.length; i++) {
            assertEquals(EXPECTATIONS[i], CvssParser.fromVectorString(INPUTS[i]), "Failed: " + INPUTS[i]);
        }
    }
}
