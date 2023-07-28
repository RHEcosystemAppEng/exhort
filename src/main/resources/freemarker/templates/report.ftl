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
<?xml version="1.0" encoding="UTF-8"?>
<#function htmlRef package>
    <#local result = package.name()?replace(".", "")>
    <#local result = result?replace(":","")>
    <#local result = result?replace("-","")>
    <#return result>
</#function>
<#function repoLink package>
    <#local result = package.name()?replace(".", "/")>
    <#local result = result?replace(":", "/")>
    <#local result = body.remediationPath + result + "/" + package.version()>
    <#return result>
</#function>
<#function packageLink package>
    <#return body.packagePath + package.name()?replace(":", "/") + "/" + package.version()>
</#function>
<#function issueLink issue>
    <#if issue.getSource()=="snyk">
        <#return body.snykIssueLinkFormatter.format(issue.getId()) >
    <#elseif issue.getSource()=="oss-index">
        <#return body.ossIndexIssueLinkFormatter.format(issue.getId()) >
    </#if>
</#function>
<#function vexLink cve>
    <#return body.vexPath + cve + "-Quarkus.json" >
</#function>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <#include "styles.ftl">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Include latest PatternFly CSS via CDN -->
    <link rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly@2/patternfly.css" crossorigin />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <title>Dependency Analysis</title>
</head>
<body class="p-2 container-fluid">

<div class="card">
    <div class="card-header">
        <svg width="31px" height="25px" viewBox="0 0 61 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="padding-bottom: 5px">
            <title></title>
            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Icons-/-4.-Size-xl-/-Status-/-exclamation-triangle" fill="#F0AB00">
                    <path d="M55.6811464,54.9998718 C59.5692673,54.9998718 62.0128612,50.7818528 60.0661228,47.4074788 L34.7600689,3.52969955 C32.8158025,0.159857423 27.9375754,0.153677628 25.9899101,3.52969955 L0.683135242,47.4074788 C-1.25979225,50.775364 1.17257499,54.9998718 5.06821466,54.9998718 L55.6811464,54.9998718 Z M32.9350725,36.437416 L27.8149065,36.437416 C27.1427508,36.437416 26.5878052,35.9119275 26.5512414,35.2408018 L25.7688794,20.897086 C25.7293287,20.172093 26.3064186,19.5624563 27.0324415,19.5624563 L33.7174345,19.5624563 C34.4434574,19.5624563 35.0206503,20.172093 34.9810996,20.897086 L34.1987376,35.2408018 C34.1621738,35.9119275 33.6072282,36.437416 32.9350725,36.437416 Z M30.3749895,48.0389509 C27.6955335,48.0389509 25.5234386,45.866856 25.5234386,43.1873999 C25.5234386,40.5079439 27.6955335,38.335849 30.3749895,38.335849 C33.0544455,38.335849 35.2265404,40.5079439 35.2265404,43.1873999 C35.2265404,45.866856 33.0544455,48.0389509 30.3749895,48.0389509 Z" id="exclamation-triangle"></path>
                </g>
            </g>
        </svg>
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
                    <svg width="18px" height="18px" viewBox="0 0 48 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title></title>
                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Icons-/-4.-Size-xl-/-Status-/-pficon-security" fill="#2b9af3">
                                <path d="M45.4306641,0 L1.81933594,0 C0.812109375,0 0,0.754101563 0,1.6875 L0,23.8412109 C0,40.5 20.4451172,54 23.6513672,54 C26.8576172,54 47.25,40.5 47.25,23.8464844 L47.25,1.6875 C47.25,0.754101563 46.4378906,0 45.4306641,0 Z M25.8767578,40.5 L21.3732422,40.5 C20.7509766,40.4894531 20.2605469,39.9462891 20.25,39.2712891 L20.25,34.9787109 C20.2605469,34.3037109 20.75625,33.7658203 21.3732422,33.75 L25.8767578,33.75 C26.4990234,33.7605469 26.9894531,34.3037109 27,34.9787109 L27,39.2712891 L27.0052734,39.2712891 C26.9894531,39.9462891 26.49375,40.4894531 25.8767578,40.5 Z M28.6822266,8.57988281 L27.2742188,27.1265625 C27.2003906,27.9966797 26.4726563,28.6875 25.5919922,28.6875 L21.6527344,28.6875 C20.7773438,28.6875 20.0443359,28.0125 19.9705078,27.1423828 L18.5677734,8.59570312 C18.4833984,7.60957031 19.2638672,6.76582031 20.25,6.76582031 L27,6.75 C27.9861328,6.75 28.7613281,7.59375 28.6822266,8.57988281 Z" id="pficon-security"></path>
                            </g>
                        </g>
                    </svg>
                    Total Vulnerabilities: ${body.report.getSummary().getVulnerabilities().getTotal()}
                </p>
                <p class="ml-5">
                    <svg width="18px" height="18px" viewBox="0 0 48 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title></title>
                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Icons-/-4.-Size-xl-/-Status-/-pficon-security" fill="#f0ab00">
                                <path d="M45.4306641,0 L1.81933594,0 C0.812109375,0 0,0.754101563 0,1.6875 L0,23.8412109 C0,40.5 20.4451172,54 23.6513672,54 C26.8576172,54 47.25,40.5 47.25,23.8464844 L47.25,1.6875 C47.25,0.754101563 46.4378906,0 45.4306641,0 Z M25.8767578,40.5 L21.3732422,40.5 C20.7509766,40.4894531 20.2605469,39.9462891 20.25,39.2712891 L20.25,34.9787109 C20.2605469,34.3037109 20.75625,33.7658203 21.3732422,33.75 L25.8767578,33.75 C26.4990234,33.7605469 26.9894531,34.3037109 27,34.9787109 L27,39.2712891 L27.0052734,39.2712891 C26.9894531,39.9462891 26.49375,40.4894531 25.8767578,40.5 Z M28.6822266,8.57988281 L27.2742188,27.1265625 C27.2003906,27.9966797 26.4726563,28.6875 25.5919922,28.6875 L21.6527344,28.6875 C20.7773438,28.6875 20.0443359,28.0125 19.9705078,27.1423828 L18.5677734,8.59570312 C18.4833984,7.60957031 19.2638672,6.76582031 20.25,6.76582031 L27,6.75 C27.9861328,6.75 28.7613281,7.59375 28.6822266,8.57988281 Z" id="pficon-security"></path>
                            </g>
                        </g>
                    </svg>
                    Vulnerable Dependencies: ${body.report.getSummary().getVulnerabilities().getDirect()}
                </p>
            </div>
        </div>
    </div>
</div>

<#list body.report.getSummary().getProviderStatuses() as providerStatus>
<#if (providerStatus.getStatus() >= 500)>
<div
  class="pf-c-alert pf-m-danger pf-m-inline"
  aria-label="Inline danger alert"
>
  <div class="pf-c-alert__icon">
    <i class="fas fa-fw fa-exclamation-circle" aria-hidden="true"></i>
  </div>
  <p class="pf-c-alert__title">
    <span class="pf-screen-reader">${providerStatus.getProvider()}:</span>
    ${providerStatus.getProvider()?cap_first}: ${providerStatus.getMessage()!"Unknown error"}
  </p>
</div>
<br />
<#elseif (providerStatus.getStatus() >= 400)>
<div
  class="pf-c-alert pf-m-warning pf-m-inline"
  aria-label="Inline warning alert"
>
  <div class="pf-c-alert__icon">
    <i class="fas fa-fw fa-exclamation-triangle" aria-hidden="true"></i>
  </div>
  <p class="pf-c-alert__title">
    <span class="pf-screen-reader">${providerStatus.getProvider()}:</span>
    ${providerStatus.getProvider()?cap_first}: ${providerStatus.getMessage()!"Unknown error"}
  </p>
</div>
<br />
</#if>
</#list>
<#if body.report.getDependencies()?size == 0>
<div class="pf-c-empty-state">
  <div class="pf-c-empty-state__content">
    <i class="fas fa-cubes pf-c-empty-state__icon" aria-hidden="true"></i>

    <h1 class="pf-c-title pf-m-lg">No vulnerabilities found</h1>
    <div
      class="pf-c-empty-state__body"
    >The vulnerability scan did not find any vulnerabilities in your project.</div>
  </div>
</div>
<#else>
<div class="ml-3 mt-4">
    <div class="d-inline p-2 bg-light">Commonly Known Vulnerabilities</div>
</div>
<div>
    <hr class="pf-c-divider mt-2"/>
</div>

<#--Table-->
<div class="p-3">
    <table class="pf-c-table pf-m-expandable pf-m-compact pf-m-grid-md">
        <thead class="">
        <tr>
            <th scope="col"></th>
            <th scope="col">#</th>
            <th scope="col">Dependencies</th>
            <th scope="col"># Direct</th>
            <th scope="col"># Transitive</th>
            <th scope="col">Highest CVSS</th>
            <th scope="col">Highest Severity</th>
            <th scope="col">Red Hat remediation available</th>
        </tr>
        </thead>
        <tbody>
        <#assign numOfPkg = 0>
        <#list body.report.getDependencies() as dependency>
            <tr data-toggle="collapse" data-target="#${htmlRef(dependency.getRef())}" class="accordion-toggle" aria-expanded="false">
                <td role="cell">
                    <div class="pf-c-table__toggle-icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                        <i class="fas fa-angle-up" aria-hidden="true"></i>
                    </div>
                </td>
                <#assign numOfPkg++>
                <td>#${numOfPkg}</td>
                <td>
                    <a href="${packageLink(dependency.getRef())}"
                       target="_blank">
                        ${dependency.getRef().name()}
                    </a>
                </td>
                <td>${dependency.getIssues()?size}</td>
                <td>${body.dependencyHelper.transitiveIssuesCount(dependency)}</td>
                <#if dependency.getHighestVulnerability()?? >
                    <#assign barNum = dependency.getHighestVulnerability().getCvssScore() *10>
                    <#assign severity = dependency.getHighestVulnerability().getSeverity()?lower_case>
                    <td>
                        <#if severity == "critical" || severity == "high">
                        <div class="pf-c-progress pf-m-danger" id="progress-simple-example">
                            <#else>
                            <div class="pf-c-progress pf-m-warning" id="progress-simple-example">
                                </#if>
                                <div
                                        class="pf-c-progress__description"
                                        id="progress-simple-example-description"
                                >${dependency.getHighestVulnerability().getCvssScore()}/10</div>
                                <div
                                        class="pf-c-progress__bar"
                                        role="progressbar"
                                        aria-valuemin="0"
                                        aria-valuemax="10"
                                        aria-valuenow="${dependency.getHighestVulnerability().getCvssScore()}"
                                        aria-labelledby="progress-simple-example-description"
                                >
                                    <div class="pf-c-progress__indicator" style="width:${barNum}%;"></div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <#if body.issueVisibilityHelper.showIssue(dependency.getHighestVulnerability())>
                            <a href="${issueLink(dependency.getHighestVulnerability())}"
                            target="_blank">
                                ${dependency.getHighestVulnerability().getId()}
                            </a>
                        <#else>
                            <a href="${body.snykSignup}"
                                target="_blank">
                                Sign up for a free Snyk account
                            </a>to learn about the vulnerabilities found
                        </#if>
                        
                    </td>
                <#else>
                    <td>--</td>
                    <td>--</td>
                </#if>
                <td>
                    <#if body.dependencyHelper.hasRemediation(dependency)>
                        <#if dependency.getRemediations()?size != 0>
                            <div style="margin-bottom: 10px;">
                                <svg style="width: 10.9793322px; height: 13px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <use href="#shield-icon"/>
                                </svg> ${dependency.getRemediations()?size} Direct
                            </div>
                        </#if>
                         <#if body.dependencyHelper.transitiveRemediationCount(dependency) != 0>
                            <div>
                                <svg style="width: 10.9793322px; height: 13px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <use href="#shield-icon"/>
                                </svg> ${body.dependencyHelper.transitiveRemediationCount(dependency)} Transitive
                            </div>
                         </#if>
                    </#if>
                </td>
            </tr>
            <tr class="pf-c-table__expandable-row pf-m-expanded">
                <td colspan="8" class="hiddenRow">
                    <div class="accordion-body collapse p-4 bg-light" id="${htmlRef(dependency.getRef())}">
                        <p class="px-3">Details of the dependency:
                            <span class="font-weight-bold">${dependency.getRef().name()}</span>
                        </p>
                        <#if dependency.getIssues()??>
                            <#if dependency.getIssues()?size != 0>
                                <div class="p-3">
                                    <table class="pf-c-table pf-m-expandable pf-m-compact pf-m-grid-md">
                                        <thead>
                                        <tr>
                                            <th scope="col">Severity</th>
                                            <th scope="col" style="width: 18%">Exploit Maturity</th>
                                            <th scope="col">Description</th>
                                            <th scope="col" style="width: 13%">CVSS</th>
                                            <th scope="col">CVE</th>
                                            <th scope="col">Remediation</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <#list dependency.getIssues() as vulnerability>
                                            <tr>
                                                <#assign severity = vulnerability.getSeverity()>
                                                <#if body.issueVisibilityHelper.showIssue(vulnerability)>
                                                    <td>
                                                        <#if severity == "critical" || severity == "high">
                                                        <span class="pf-c-label pf-m-red">
                                                    <#elseif (severity == "medium") >
                                                        <span class="pf-c-label pf-m-orange">
                                                    <#elseif (severity == "low") >
                                                        <span class="pf-c-label pf-m-gold">
                                                    </#if>
                                                        <span class="pf-c-label__content">
                                                            ${vulnerability.getSeverity()}
                                                        </span>
                                                    </span>
                                                    </td>
                                                    <#if body.issueVisibilityHelper.showIssue(vulnerability)>
                                                        <td>${vulnerability.getCvss().getExploitCodeMaturity()!"No known exploit"}</td>
                                                    <#else>
                                                        <td><a href="${body.snykSignup}"
                                                            target="_blank">
                                                                Sign up for a free Snyk account
                                                            </a>to find out which vulnerabilities have a publicly known exploits
                                                        </td>
                                                    </#if>
                                                    <td>${vulnerability.getTitle()}</td>
                                                <#else>
                                                    <td colspan="3"><a href="${body.snykSignup}"
                                                            target="_blank">
                                                            Sign up for a free Snyk account
                                                        </a>to find out which vulnerabilities have a publicly known exploits
                                                    </td>
                                                </#if>
                                                <td>
                                                    <#assign barNum = vulnerability.getCvssScore() *10>
                                                    <#if severity == "critical" || severity == "high">
                                                    <div class="pf-c-progress pf-m-danger" id="progress-simple-example">
                                                        <#else>
                                                        <div class="pf-c-progress pf-m-warning" id="progress-simple-example">
                                                            </#if>
                                                            <div class="pf-c-progress__description" id="progress-simple-example-description"
                                                            >${vulnerability.getCvssScore()}/10</div>
                                                            <div
                                                                    class="pf-c-progress__bar"
                                                                    role="progressbar"
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="10"
                                                                    aria-valuenow="${dependency.getHighestVulnerability().getCvssScore()}"
                                                                    aria-labelledby="progress-simple-example-description"
                                                            >
                                                                <div class="pf-c-progress__indicator" style="width:${barNum}%;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <#if vulnerability.getCves()?size != 0>
                                                        <#list vulnerability.getCves() as cve>
                                                            ${cve}
                                                        </#list>
                                                    </#if>
                                                </td>
                                                <td>
                                                    <#assign remediation = body.dependencyHelper.findRemediationByIssue(dependency, vulnerability)!>
                                                    <#if remediation?has_content>
                                                        <svg style="width: 10.9793322px; height: 13px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <use href="#shield-icon"/>
                                                        </svg>
                                                        <button type="button" class="btn btn-link" data-toggle="modal" data-target="#modal" data-vex="${vexLink(vulnerability.getCves()[0])}" data-sbom="${body.sbomPath}" data-link="${repoLink(remediation)}" data-rhpkg="${remediation.version()}">
                                                            ${remediation.version()}
                                                        </button>
                                                    <#else>
                                                        <#if body.issueVisibilityHelper.showIssue(vulnerability)>
                                                            <a href="${issueLink(vulnerability)}"
                                                            target="_blank">
                                                                ${vulnerability.getId()}
                                                            </a>
                                                        <#else>
                                                            <a href="${body.snykSignup}"
                                                                target="_blank">
                                                                Sign up for a free Snyk account
                                                            </a>to learn about the vulnerabilities found
                                                        </#if>
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
                                href="#${htmlRef(dependency.getRef())}transTable" role="button" aria-expanded="false"
                                aria-controls="${htmlRef(dependency.getRef())}transTable">
                            Transitive Dependencies with vulnerabilites <i class="fa fa-angle-down"></i>
                        </button>
                        <div class="collapse" id="${htmlRef(dependency.getRef())}transTable">
                            <table class="pf-c-table pf-m-expandable pf-m-compact pf-m-grid-md">
                                <thead>
                                <tr>
                                    <th scope="col" style="width: 19%">Dependencies</th>
                                    <th scope="col">Severity</th>
                                    <th scope="col" >Exploit Maturity</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" style="width: 13%">CVSS</th>
                                    <th scope="col" style="width: 13%">CVE</th>
                                    <th scope="col" style="width: 26%">Remediation</th>
                                </tr>
                                </thead>
                                <tbody>
                                <#list dependency.getTransitive() as transDependency>
                                    <#if transDependency.getIssues()??>
                                        <#assign numOfVul = transDependency.getIssues()?size/>
                                        <#list transDependency.getIssues() as vulnerability>
                                            <#assign severity = vulnerability.getSeverity()?lower_case>
                                            <tr>
                                            <#if vulnerability?index == 0>
                                                <td rowspan="${numOfVul}">
                                                    <a href="${packageLink(transDependency.getRef())}"
                                                        target="_blank">
                                                        ${transDependency.getRef().name()}
                                                    </a>
                                                </td>
                                            </#if>
                                            <#if body.issueVisibilityHelper.showIssue(vulnerability)>
                                                <td style="padding-left: 0.5rem">
                                                    <#if severity == "critical" || severity == "high">
                                                    <span class="pf-c-label pf-m-red">
                                                        <#elseif severity == "medium" >
                                                            <span class="pf-c-label pf-m-orange">
                                                        <#elseif severity == "low" >
                                                            <span class="pf-c-label pf-m-gold">
                                                        </#if>
                                                            <span class="pf-c-label__content">
                                                                ${severity}
                                                            </span>
                                                        </span>
                                                </td>
                                                <td>${vulnerability.getCvss().getExploitCodeMaturity()!"No known exploit"}</td>
                                                <td>${vulnerability.getTitle()}</td>
                                            <#else>
                                                <td colspan="3"><a href="${body.snykSignup}"
                                                        target="_blank">
                                                        Sign up for a free Snyk account
                                                    </a>to find out which vulnerabilities have a publicly known exploits
                                                </td>
                                            </#if>
                                                <td>
                                                    <#assign barNum = vulnerability.getCvssScore() *10>
                                                    <#if severity == "critical" || severity == "high">
                                                    <div class="pf-c-progress pf-m-danger" id="progress-simple-example">
                                                        <#else>
                                                        <div class="pf-c-progress pf-m-warning" id="progress-simple-example">
                                                            </#if>
                                                            <div class="pf-c-progress__description" id="progress-simple-example-description"
                                                            >${vulnerability.getCvssScore()}/10</div>
                                                            <div
                                                                    class="pf-c-progress__bar"
                                                                    role="progressbar"
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="10"
                                                                    aria-valuenow="${vulnerability.getCvssScore()}"
                                                                    aria-labelledby="progress-simple-example-description"
                                                            >
                                                                <div class="pf-c-progress__indicator" style="width:${barNum}%;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <#if vulnerability.getCves()?has_content && vulnerability.getCves()?size != 0>
                                                        <#list vulnerability.getCves() as cve>
                                                            ${cve}
                                                        </#list>
                                                    </#if>
                                                </td>
                                                <td>
                                                    <#assign remediation = body.dependencyHelper.findTransitiveRemediationByIssue(dependency, vulnerability)!>
                                                    <#if remediation?has_content>
                                                        <svg style="width: 10.9793322px; height: 13px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <use href="#shield-icon"/>
                                                        </svg>
                                                        <button type="button" class="btn btn-link" data-toggle="modal" data-target="#modal" data-vex="${vexLink(vulnerability.getCves()[0])}" data-sbom="${body.sbomPath}" data-link="${repoLink(remediation)}" data-rhpkg="${remediation.version()}">
                                                            ${remediation.version()}
                                                        </button>
                                                    <#else>
                                                        <#if body.issueVisibilityHelper.showIssue(vulnerability)>
                                                            <a href="${issueLink(vulnerability)}"
                                                            target="_blank">
                                                                ${vulnerability.getId()}
                                                            </a>
                                                        <#else>
                                                            <a href="${body.snykSignup}"
                                                                target="_blank">
                                                                Sign up for a free Snyk account
                                                            </a>to learn about the vulnerabilities found
                                                        </#if>
                                                    </#if>
                                                </td>
                                            </tr>
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
</#if>

<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">
                    <a href="" target="_blank">
                        Modal title
                    </a>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Click either VEX or SBOM to download the corresponding file type. You can also click the package name to view more information in Red Hat's Maven repository.
            </div>
            <div class="modal-footer" style="justify-content: space-around">
                <span id="vex"><a href="" target="_blank">VEX</a></span>
                <span id="sbom"> <a href="" target="_blank">SBOMs</a></span>
            </div>
        </div>
    </div>
</div>

</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossorigin="anonymous"></script>
<script>
    $('#modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var link = button.data('link')// Extract info from data-* attributes
        var rhpkg = button.data('rhpkg')
        var vex = button.data('vex')
        var sbom = button.data('sbom')
        var modal = $(this)
        modal.find('.modal-title a').attr("href", link);
        modal.find('.modal-title a').text(rhpkg);
        modal.find('#vex a').attr("href", vex)
        modal.find('#sbom a').attr("href", sbom)
    })
</script>
</body>
</html>