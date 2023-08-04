<svg version="1.1" style="display: none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <symbol viewBox="0 0 10.9793322 13" id="shield-icon">
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
[#function htmlRef package]
    [#local result = package.name()?replace(".", "")]
    [#local result = result?replace(":","")]
    [#local result = result?replace("-","")]
    [#return result]
[/#function]
[#function repoLink package]
    [#local result = package.name()?replace(".", "/")]
    [#local result = result?replace(":", "/")]
    [#local result = body.remediationPath + result + "/" + package.version()]
    [#return result]
[/#function]
[#function packageLink package]
    [#return body.packagePath + package.name()?replace(":", "/") + "/" + package.version()]
[/#function]
[#function issueLink issue]
    [#if issue.getSource()=="snyk"]
        [#return body.snykIssueLinkFormatter.format(issue.getId()) ]
    [#elseif issue.getSource()=="oss-index"]
        [#return body.ossIndexIssueLinkFormatter.format(issue.getId()) ]
    [/#if]
[/#function]
[#function vexLink cve]
    [#return body.vexPath + cve + "-Quarkus.json" ]
[/#function]
<!DOCTYPE html>
<html lang="en-us">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script>
        window["sbomb"]=[=body.reportJson];
    </script>
    <style>
        [#include "generated/vendor.css" parse="false"]
    </style>
    <style>
        [#include "generated/main.css" parse="false"]
    </style>
    <title>Dependency Analysis</title>
</head>

<body>
    <div id="root" class="pf-v5-u-h-100">
        <div
            class="pf-v5-u-display-flex pf-v5-u-flex-direction-column pf-v5-u-align-items-center pf-v5-u-justify-content-center pf-v5-u-h-100">
            <div>Loading...</div>
            <svg
                class="pf-v5-c-spinner"
                role="progressbar"
                viewBox="0 0 100 100"
                aria-label="Loading...">
                <circle
                    class="pf-v5-c-spinner__path"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none" />
            </svg>
        </div>
    </div>
    <script>
        [#include "generated/vendor.js" parse="false"]
    </script>
    <script>
        [#include "generated/main.js" parse="false"]
    </script>
</body>

</html>