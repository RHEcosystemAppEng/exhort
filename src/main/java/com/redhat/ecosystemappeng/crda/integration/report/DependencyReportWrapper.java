package com.redhat.ecosystemappeng.crda.integration.report;

import com.redhat.ecosystemappeng.crda.model.DependencyReport;
import com.redhat.ecosystemappeng.crda.model.Issue;
import com.redhat.ecosystemappeng.crda.model.Recommendation;
import com.redhat.ecosystemappeng.crda.model.TransitiveDependencyReport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class DependencyReportWrapper {
    private static final Logger LOGGER = LoggerFactory.getLogger(DependencyReportWrapper.class);

    private DependencyReport dependencyReport;

    public DependencyReportWrapper(DependencyReport dependencyReport) {
        this.dependencyReport = dependencyReport;
    }

    public DependencyReport getDependencyReport() {
        return dependencyReport;
    }

    public int countDirectVulnerabilities() {
        if (dependencyReport.issues() != null) {
            return dependencyReport.issues().size();
        } else return 0;
    }

    public int countTransitiveVulnerabilities() {
        int transitive = 0;
        for (TransitiveDependencyReport transDep : dependencyReport.transitive()) {
            if (transDep.issues() != null) {
                transitive += transDep.issues().size();
            }
        }
        return transitive;
    }

    public String getHtmlName() {
        String htmlName = dependencyReport.ref().name().replace(".", "");
        htmlName = htmlName.replace(":", "");
        htmlName = htmlName.replace("-", "");

        return htmlName;
    }

    public Issue getHighestVulnerability() {
        Issue highestVulIssueData = new Issue();
        if (dependencyReport.issues() != null) {
            for (Issue item : dependencyReport.issues()) {
                if (highestVulIssueData.rawData() == null) {
                    highestVulIssueData = item;
                }
                if (item.rawData().get("cvssScore").asDouble() > highestVulIssueData.rawData().get("cvssScore").asDouble()) {
                    highestVulIssueData = item;
                }
            }
        }
        return highestVulIssueData;
    }

    public String getTransRecommendationName(String cveId) {
        for (TransitiveDependencyReport transDep : dependencyReport.transitive()) {
            Map<String, Recommendation> rhRecMap = transDep.securityRecommendations();
            if (!rhRecMap.isEmpty()) {
                for (Issue issue : transDep.issues()) {
                    if (issue.id().equals(cveId)) {
                        for (String cve : issue.cves()) {
                            if (rhRecMap.containsKey(cve)) {
                                Recommendation cveRec = rhRecMap.get(cve);
                                return cveRec.mavenPackage().version();
                            }
                        }
                    }
                }
            }
        }
        return "";
    }

    public String getDirectRecommendationName(String cveId) {
        Map<String, Recommendation> rhRecMap = dependencyReport.securityRecommendations();
        if (!rhRecMap.isEmpty()) {
            for (Issue issue : dependencyReport.issues()) {
                if (issue.id().equals(cveId)) {
                    for (String cve : issue.cves()) {
                        if (rhRecMap.containsKey(cve)) {
                            Recommendation cveRec = rhRecMap.get(cve);
                            return cveRec.mavenPackage().version();
                        }
                    }
                }
            }
        }
        return "";
    }

    public String getLink(String pkgName, String version) {
        String link = pkgName;
        link = link.replace(".", "/");
        link = link.replace(":", "/");
        link  = link + "/" + version;
        return link;
    }

    public boolean isRHRemediationAvail() {
        Map<String, Recommendation> rhRecDirectMap = dependencyReport.securityRecommendations();
        if (!rhRecDirectMap.isEmpty()) {
            return true;
        }
        for (TransitiveDependencyReport transDep : dependencyReport.transitive()) {
            Map<String, Recommendation> rhRecTransitiveMap = transDep.securityRecommendations();
            if (!rhRecTransitiveMap.isEmpty()) {
                return true;
            }
        }
        return false;
    }
}
