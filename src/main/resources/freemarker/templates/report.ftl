<svg version="1.1" style="display: none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <symbol viewBox="0 0 10.9793322 13"id="shield-icon">
        <title>Combined Shape</title>
        <g id="New-dependencies-view" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Overview" transform="translate(-1207.172757, -938.000000)" fill="#3E8635">
                <g id="Details-of-dependency-com.github" transform="translate(427.000000, 764.000000)">
                    <g id="Dependency-1" transform="translate(0.000000, 144.000000)">
                        <g id="Group-9" transform="translate(780.172757, 24.000000)">
                            <g id="Group-4" transform="translate(0.000000, 3.200001)">
                                <g id="Icons/2.-Size-sm/Actions/check" transform="translate(0.000000, 2.799999)">
                                    <path d="M10.5565789,0 C10.7906249,0 10.9793322,0.181542969 10.9793322,0.40625 L10.9793322,5.74082031 C10.9793322,9.75 6.24081907,13 5.49579296,13 C4.75076684,13 0,9.75 0,5.73955078 L0,0.40625 C0,0.181542969 0.188707272,0 0.422753304,0 Z M8.54277883,3.11782667 L4.7912961,6.89087353 L3.03981338,5.1293244 C2.883609,4.97220683 2.63032812,4.97220683 2.47412375,5.1293244 L1.90844938,5.69826556 C1.75224501,5.85538312 1.75224501,6.11010449 1.90844938,6.26720671 L4.50845797,8.88215991 C4.66464708,9.03927747 4.9179127,9.03927747 5.07413233,8.88217525 L9.67414282,4.25570898 C9.8303472,4.09859141 9.8303472,3.84387004 9.67414282,3.68676782 L9.10846846,3.11782667 C8.95226408,2.96072444 8.6989832,2.96072444 8.54277883,3.11782667 Z" id="Combined-Shape"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </symbol>
</svg>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <#include "styles.ftl">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="fonts.css"/>
    <!-- Include latest PatternFly CSS via CDN -->
    <link
            rel="stylesheet"
            href="https://unpkg.com/@patternfly/patternfly/patternfly.css"
            crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
</head>
<body class="p-4 container-fluid">

<div class="card">
    <div class="card-header">
        <span class="pf-c-icon">
          <span class="pf-c-icon__content pf-m-warning">
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          </span>
        </span>
        <span style="font-size: larger">&nbsp; Security Issues</span>

    </div>
    <div class="card-body">
        <div class="row" >
            <div class="col-5">
                <p>Below is a list of dependencies affected with CVE, as well as vulnerability only found using Snyk's vulnerability database.</p>
            </div>
            <div class="col offset-1">
                <p style="font-size: larger">Dependencies with security issues in your stack.</p>
                <p>Dependencies with high common vulnerabilities and exposures (CVE) score.</p>
                <p class="ml-5">
                    <span class="pf-c-icon pf-m-sm">
                      <span class="pf-c-icon__content pf-m-info">
                          <i class="pf-icon pf-icon-security" aria-hidden="true"></i>
                      </span>
                    </span>
                    Total Vulnerabilities: ${body.totalVul}
                </p>
                <p class="ml-5">
                    <span class="pf-c-icon pf-m-sm">
                      <span class="pf-c-icon__content pf-m-warning">
                        <i class="pf-icon pf-icon-security" aria-hidden="true"></i>
                      </span>
                    </span>
                    Vulnerable Dependencies: ${body.vulnerableDeps}
                </p>
            </div>
        </div>
    </div>
</div>

<div class="ml-3 mt-4">
<#--    <h3 class="font-weight-light">Dependencies with security issues in your stack</h3>-->
<#--    <div class="pb-4">A list of the dependencies affected with common vulnerabilities and exposures (CVE).</div>-->
    <div class="d-inline p-2 bg-light">Commonly Known Vulnerabilities</div>
</div>
<div>
    <hr class="pf-c-divider mt-2"/>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-link" data-dismiss="modal">Vex</button>
                <button type="button" class="btn btn-link">SBOMS</button>
            </div>
        </div>
    </div>
</div>

<#--Table-->
<div class="p-3">
    <table class="table" style="border-collapse:collapse; font-size: smaller;">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Dependencies</th>
            <th scope="col"># Direct</th>
            <th scope="col"># Transitive</th>
            <th scope="col">Highest CVSS</th>
            <th scope="col">Highest Severity</th>
            <th scope="col">Red Hat remediation available</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <#assign numOfPkg = 0>
        <#list body.directs as dependency>
            <tr data-toggle="collapse" data-target="#${dependency.getHtmlName()}" class="accordion-toggle">
                <#assign numOfPkg++>
                <td>#${numOfPkg}</td>
                <td>
                    <a href="https://security.snyk.io/package/maven/${dependency.dependencyReport.ref().name()}"
                       target="_blank">
                        ${dependency.dependencyReport.ref().name()}
                    </a>
                </td>
                <td>${dependency.countDirectVulnerabilities()}</td>
                <td>${dependency.countTransitiveVulnerabilities()}</td>
                <#if (dependency.countDirectVulnerabilities() != 0) >
                    <#assign barNum = dependency.getHighestVulnerability().rawData().get("cvssScore").asDouble() *10>
                    <#assign severity = dependency.getHighestVulnerability().rawData().get("severity").asText()>
                    <td>
                        <#if severity == "critical" || severity == "high">
                            <div class="pf-c-progress pf-m-danger" id="progress-simple-example">
                        <#else>
                            <div class="pf-c-progress pf-m-warning" id="progress-simple-example">
                        </#if>
                            <div
                                    class="pf-c-progress__description"
                                    id="progress-simple-example-description"
                            >${dependency.getHighestVulnerability().rawData().get("cvssScore")}/10</div>
                            <div
                                    class="pf-c-progress__bar"
                                    role="progressbar"
                                    aria-valuemin="0"
                                    aria-valuemax="10"
                                    aria-valuenow="${dependency.getHighestVulnerability().rawData().get("cvssScore")}"
                                    aria-labelledby="progress-simple-example-description"
                            >
                                <div class="pf-c-progress__indicator" style="width:${barNum}%;"></div>
                            </div>
                        </div>
                            </div>
                    </td>
                    <td>
                        <a href="https://security.snyk.io/vuln/${dependency.getHighestVulnerability().rawData().get("id").asText()}"
                           target="_blank">
                            ${dependency.getHighestVulnerability().rawData().get("id").asText()}
                        </a>
                    </td>
                <#else>
                    <td>--</td>
                    <td>--</td>
                </#if>
                <td>
                    <#assign rhRemediationAvail = dependency.isRHRemediationAvail()>
                    <#if rhRemediationAvail>
                        <svg style="width: 10.9793322px; height: 13px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use href="#shield-icon">
                        </svg>
                    </#if>
                </td>
                <td><i class="fa fa-angle-down"></i></td>
            </tr>
            <tr>
                <td colspan="8" class="hiddenRow">
                    <div class="accordian-body collapse p-4 bg-light" id="${dependency.getHtmlName()}">
                        <p class="px-3">Details of the dependency:
                            <span class="font-weight-bold">${dependency.dependencyReport.ref().name()}</span>
                        </p>
                        <#if dependency.dependencyReport.issues()??>
                            <#if dependency.dependencyReport.issues()?size != 0>
                            <div class="p-3">
                                <table class="table" style="border-collapse:collapse; font-size: small;">
                                    <thead>
                                    <tr>
                                        <th scope="col">Severity</th>
                                        <th scope="col">Description</th>
                                        <th scope="col" style="width: 15%">CVSS</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Remediation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <#list dependency.dependencyReport.issues() as vulnerability>
                                        <tr>
                                            <#assign severity = vulnerability.rawData().get("severity").asText()>
                                            <td>
                                                <#if severity == "critical" || severity == "high">
                                                    <span class="pf-c-label pf-m-red">
                                                <#elseif (vulnerability.rawData().get("severity").asText() == "medium") >
                                                    <span class="pf-c-label pf-m-orange">
                                                <#elseif (vulnerability.rawData().get("severity").asText() == "low") >
                                                    <span class="pf-c-label pf-m-gold">
                                                </#if>
                                                    <span class="pf-c-label__content">
                                                        ${vulnerability.rawData().get("severity").asText()}
                                                    </span>
                                                </span>
                                            </td>
                                            <td>${vulnerability.rawData().get("title").asText()}</td>
                                            <td>
                                                <#assign barNum = vulnerability.rawData().get("cvssScore").asDouble() *10>
                                                <#if severity == "critical" || severity == "high">
                                                    <div class="pf-c-progress pf-m-danger" id="progress-simple-example">
                                                <#else>
                                                    <div class="pf-c-progress pf-m-warning" id="progress-simple-example">
                                                </#if>
                                                    <div class="pf-c-progress__description" id="progress-simple-example-description"
                                                        >${vulnerability.rawData().get("cvssScore").asDouble()}/10</div>
                                                        <div
                                                                class="pf-c-progress__bar"
                                                                role="progressbar"
                                                                aria-valuemin="0"
                                                                aria-valuemax="10"
                                                                aria-valuenow="${dependency.getHighestVulnerability().rawData().get("cvssScore")}"
                                                                aria-labelledby="progress-simple-example-description"
                                                        >
                                                            <div class="pf-c-progress__indicator" style="width:${barNum}%;"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <#if vulnerability.cves()?size != 0>
                                                    <#list vulnerability.cves() as cve>
                                                        ${cve}
                                                    </#list>
                                                </#if>
                                            </td>
                                            <td>
                                                <#assign recommendation = dependency.getDirectRecommendationName(vulnerability.id())>
                                                <#if recommendation?has_content>
                                                    <#assign link = dependency.getLink(dependency.dependencyReport.ref().name(), recommendation)>
                                                    <svg style="width: 10.9793322px; height: 13px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <use href="#shield-icon">
                                                    </svg>
                                                    <a href="https://maven.repository.redhat.com/ga/${link}" target="_blank">
                                                        ${recommendation}
                                                    </a>
                                                <#else>
                                                    <a href="https://snyk.io/vuln/${vulnerability.id()}"
                                                       target="_blank">
                                                        ${vulnerability.id()}
                                                    </a>
                                                </#if>
                                            </td>
                                        </tr>
                                    </#list>
                                    </tbody>
                                </table>
                            </div>
                            </#if>
                        </#if>
                        <button type="button" class="btn btn-outline-secondary" data-toggle="collapse" style="font-size: small;"
                           href="#${dependency.getHtmlName()}transTable" role="button" aria-expanded="false"
                           aria-controls="${dependency.getHtmlName()}transTable">
                            Transitive Dependencies with vulnerabilites <i class="fa fa-angle-down"></i>
                        </button>
                        <div class="p-3 collapse" id="${dependency.getHtmlName()}transTable">
                            <table class="table" style="border-collapse:collapse; font-size: small;">
                                <thead>
                                <tr>
                                    <th scope="col" style="width: 20%">Dependencies</th>
                                    <th scope="col">Severity</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" style="width: 15%">CVSS</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Remediation</th>
                                </tr>
                                </thead>
                                <tbody>
                                <#list dependency.dependencyReport.transitive() as transDependency>
                                    <#if transDependency.issues()??>
                                        <#assign numOfVul = transDependency.issues()?size/>
                                        <#list transDependency.issues() as vulnerability>
                                            <#if vulnerability?index == 0>
                                                <tr>
                                                    <#assign severity = vulnerability.rawData().get("severity").asText()>
                                                    <td rowspan="${numOfVul}">
                                                        <a href="https://security.snyk.io/package/maven/${vulnerability.rawData().get("packageName").asText()}"
                                                           target="_blank">
                                                            ${vulnerability.rawData().get("packageName").asText()}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <#if severity == "critical" || severity == "high">
                                                            <span class="pf-c-label pf-m-red">
                                                        <#elseif (vulnerability.rawData().get("severity").asText() == "medium") >
                                                            <span class="pf-c-label pf-m-orange">
                                                        <#elseif (vulnerability.rawData().get("severity").asText() == "low") >
                                                            <span class="pf-c-label pf-m-gold">
                                                        </#if>
                                                                <span class="pf-c-label__content">
                                                                    ${vulnerability.rawData().get("severity").asText()}
                                                                </span>
                                                            </span>
                                                    </td>
                                                    <td>${vulnerability.rawData().get("title").asText()}</td>
                                                    <td>
                                                        <#assign barNum = vulnerability.rawData().get("cvssScore").asDouble() *10>
                                                        <#if severity == "critical" || severity == "high">
                                                            <div class="pf-c-progress pf-m-danger" id="progress-simple-example">
                                                        <#else>
                                                            <div class="pf-c-progress pf-m-warning" id="progress-simple-example">
                                                        </#if>
                                                                <div class="pf-c-progress__description" id="progress-simple-example-description"
                                                                >${vulnerability.rawData().get("cvssScore").asDouble()}/10</div>
                                                                <div
                                                                        class="pf-c-progress__bar"
                                                                        role="progressbar"
                                                                        aria-valuemin="0"
                                                                        aria-valuemax="10"
                                                                        aria-valuenow="${vulnerability.rawData().get("cvssScore").asDouble()}"
                                                                        aria-labelledby="progress-simple-example-description"
                                                                >
                                                                    <div class="pf-c-progress__indicator" style="width:${barNum}%;"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <#if vulnerability.cves()?size != 0>
                                                            <#list vulnerability.cves() as cve>
                                                                ${cve}
                                                            </#list>
                                                        </#if>
                                                    </td>
                                                    <td>
                                                        <#assign recommendation = dependency.getTransRecommendationName(vulnerability.id())!>
                                                        <#if recommendation?has_content>
                                                            <#assign link = dependency.getLink(recommendation.name(), recommendation.version())>
                                                            <svg width="10.9793322px" height="13px" viewBox="0 0 10.9793322 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <title>Combined Shape</title>
                                                                <g id="New-dependencies-view" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <g id="Overview" transform="translate(-1207.172757, -938.000000)" fill="#3E8635">
                                                                        <g id="Details-of-dependency-com.github" transform="translate(427.000000, 764.000000)">
                                                                            <g id="Dependency-1" transform="translate(0.000000, 144.000000)">
                                                                                <g id="Group-9" transform="translate(780.172757, 24.000000)">
                                                                                    <g id="Group-4" transform="translate(0.000000, 3.200001)">
                                                                                        <g id="Icons/2.-Size-sm/Actions/check" transform="translate(0.000000, 2.799999)">
                                                                                            <path d="M10.5565789,0 C10.7906249,0 10.9793322,0.181542969 10.9793322,0.40625 L10.9793322,5.74082031 C10.9793322,9.75 6.24081907,13 5.49579296,13 C4.75076684,13 0,9.75 0,5.73955078 L0,0.40625 C0,0.181542969 0.188707272,0 0.422753304,0 Z M8.54277883,3.11782667 L4.7912961,6.89087353 L3.03981338,5.1293244 C2.883609,4.97220683 2.63032812,4.97220683 2.47412375,5.1293244 L1.90844938,5.69826556 C1.75224501,5.85538312 1.75224501,6.11010449 1.90844938,6.26720671 L4.50845797,8.88215991 C4.66464708,9.03927747 4.9179127,9.03927747 5.07413233,8.88217525 L9.67414282,4.25570898 C9.8303472,4.09859141 9.8303472,3.84387004 9.67414282,3.68676782 L9.10846846,3.11782667 C8.95226408,2.96072444 8.6989832,2.96072444 8.54277883,3.11782667 Z" id="Combined-Shape"></path>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <a href="https://maven.repository.redhat.com/ga/${link}" target="_blank" style="font-size: 16px">
                                                                ${recommendation.version()}
                                                            </a>
                                                        <#else>
                                                            <a href="https://snyk.io/vuln/${vulnerability.id()}"
                                                               target="_blank">
                                                                ${vulnerability.id()}
                                                            </a>
                                                        </#if>
                                                    </td>
                                                </tr>
                                            <#else >
                                                <tr>
                                                    <#assign severity = vulnerability.rawData().get("severity").asText()>
                                                    <td>
                                                        <#if severity == "critical" || severity == "high">
                                                            <span class="pf-c-label pf-m-red">
                                                        <#elseif (vulnerability.rawData().get("severity").asText() == "medium") >
                                                            <span class="pf-c-label pf-m-orange">
                                                        <#elseif (vulnerability.rawData().get("severity").asText() == "low") >
                                                            <span class="pf-c-label pf-m-gold">
                                                        </#if>
                                                                <span class="pf-c-label__content">
                                                                    ${vulnerability.rawData().get("severity").asText()}
                                                                </span>
                                                            </span>
                                                    </td>
                                                    <td>${vulnerability.rawData().get("title").asText()}</td>
                                                    <td>
                                                        <#assign barNum = vulnerability.rawData().get("cvssScore").asDouble() *10>
                                                        <#if severity == "critical" || severity == "high">
                                                            <div class="pf-c-progress pf-m-danger" id="progress-simple-example">
                                                        <#else>
                                                            <div class="pf-c-progress pf-m-warning" id="progress-simple-example">
                                                        </#if>
                                                                <div class="pf-c-progress__description" id="progress-simple-example-description"
                                                                >${vulnerability.rawData().get("cvssScore").asDouble()}/10</div>
                                                                <div
                                                                        class="pf-c-progress__bar"
                                                                        role="progressbar"
                                                                        aria-valuemin="0"
                                                                        aria-valuemax="10"
                                                                        aria-valuenow="${vulnerability.rawData().get("cvssScore").asDouble()}"
                                                                        aria-labelledby="progress-simple-example-description"
                                                                >
                                                                    <div class="pf-c-progress__indicator" style="width:${barNum}%;"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <#if vulnerability.cves()?size != 0>
                                                            <#list vulnerability.cves() as cve>
                                                                ${cve}
                                                            </#list>
                                                        </#if>
                                                    </td>
                                                    <td>
                                                        <#assign recommendation = dependency.getTransRecommendationName(vulnerability.id())!>
                                                        <#if recommendation?has_content>
                                                            <#assign link = dependency.getLink(recommendation.name(), recommendation.version())>
                                                            <svg width="10.9793322px" height="13px" viewBox="0 0 10.9793322 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <title>Combined Shape</title>
                                                                <g id="New-dependencies-view" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <g id="Overview" transform="translate(-1207.172757, -938.000000)" fill="#3E8635">
                                                                        <g id="Details-of-dependency-com.github" transform="translate(427.000000, 764.000000)">
                                                                            <g id="Dependency-1" transform="translate(0.000000, 144.000000)">
                                                                                <g id="Group-9" transform="translate(780.172757, 24.000000)">
                                                                                    <g id="Group-4" transform="translate(0.000000, 3.200001)">
                                                                                        <g id="Icons/2.-Size-sm/Actions/check" transform="translate(0.000000, 2.799999)">
                                                                                            <path d="M10.5565789,0 C10.7906249,0 10.9793322,0.181542969 10.9793322,0.40625 L10.9793322,5.74082031 C10.9793322,9.75 6.24081907,13 5.49579296,13 C4.75076684,13 0,9.75 0,5.73955078 L0,0.40625 C0,0.181542969 0.188707272,0 0.422753304,0 Z M8.54277883,3.11782667 L4.7912961,6.89087353 L3.03981338,5.1293244 C2.883609,4.97220683 2.63032812,4.97220683 2.47412375,5.1293244 L1.90844938,5.69826556 C1.75224501,5.85538312 1.75224501,6.11010449 1.90844938,6.26720671 L4.50845797,8.88215991 C4.66464708,9.03927747 4.9179127,9.03927747 5.07413233,8.88217525 L9.67414282,4.25570898 C9.8303472,4.09859141 9.8303472,3.84387004 9.67414282,3.68676782 L9.10846846,3.11782667 C8.95226408,2.96072444 8.6989832,2.96072444 8.54277883,3.11782667 Z" id="Combined-Shape"></path>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <a href="https://maven.repository.redhat.com/ga/${link}" target="_blank" style="font-size: 16px">
                                                                ${recommendation.version()}
                                                            </a>
                                                        <#else>
                                                            <a href="https://snyk.io/vuln/${vulnerability.id()}"
                                                               target="_blank">
                                                                ${vulnerability.id()}
                                                            </a>
                                                        </#if>
                                                    </td>
                                                </tr>
                                            </#if>
                                        </#list>
                                    </#if>
                                </#list>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </td>
            </tr>
        </#list>
        </tbody>
    </table>
</div>


</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossorigin="anonymous"></script>
</body>
</html>