import { Report } from '@app/api/report';

export const reportMixed: Report = {
  packagePath: 'https://central.sonatype.com/artifact/',
  remediationPath: 'https://maven.repository.redhat.com/ga/',
  issueVisibilityHelper: {
    providerData: null,
  },
  vexPath: 'https://tc-storage-mvp.s3.amazonaws.com/vexes/',
  report: {
    "oss-index":{
      "status":{
        "ok":true,
        "name":"oss-index",
        "code":200,
        "message":"OK"
      },
      "summary":{
        "dependencies":{
          "scanned":2,
          "transitive":37
        },
        "vulnerabilities":{
          "direct":0,
          "total":29,
          "critical":4,
          "high":8,
          "medium":17,
          "low":0
        }
      },
      "dependencies":[
        {
          "ref":"pkg:maven/org.springframework.boot/spring-boot-starter@2.3.5.RELEASE",
          "issues":[

          ],
          "transitive":[
            {
              "ref":"pkg:maven/org.yaml/snakeyaml@1.26",
              "issues":[
                {
                  "id":"CVE-2022-1471",
                  "title":"[CVE-2022-1471] CWE-502: Deserialization of Untrusted Data",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":9.8,
                  "severity":"CRITICAL",
                  "cves":[
                    "CVE-2022-1471"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-25857",
                  "title":"[CVE-2022-25857] CWE-776: Improper Restriction of Recursive Entity References in DTDs ('XML Entity Expansion')",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2022-25857"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-38749",
                  "title":"[CVE-2022-38749] CWE-787: Out-of-bounds Write",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-38749"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-38751",
                  "title":"[CVE-2022-38751] CWE-787: Out-of-bounds Write",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-38751"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-38752",
                  "title":"[CVE-2022-38752] CWE-787: Out-of-bounds Write",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-38752"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-41854",
                  "title":"[CVE-2022-41854] CWE-787: Out-of-bounds Write",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"Required",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-41854"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-38750",
                  "title":"[CVE-2022-38750] CWE-787: Out-of-bounds Write",
                  "cvss":{
                    "attackVector":"Local",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"Required",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":5.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-38750"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2022-1471",
                "title":"[CVE-2022-1471] CWE-502: Deserialization of Untrusted Data",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore":9.8,
                "severity":"CRITICAL",
                "cves":[
                  "CVE-2022-1471"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-beans@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2022-22965",
                  "title":"[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":9.8,
                  "severity":"CRITICAL",
                  "cves":[
                    "CVE-2022-22965"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2022-22965",
                "title":"[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore":9.8,
                "severity":"CRITICAL",
                "cves":[
                  "CVE-2022-22965"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework.boot/spring-boot-autoconfigure@2.3.5.RELEASE",
              "issues":[
                {
                  "id":"CVE-2023-20883",
                  "title":"[CVE-2023-20883] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2023-20883"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2023-20883",
                "title":"[CVE-2023-20883] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":7.5,
                "severity":"HIGH",
                "cves":[
                  "CVE-2023-20883"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/ch.qos.logback/logback-core@1.2.3",
              "issues":[
                {
                  "id":"CVE-2021-42550",
                  "title":"[CVE-2021-42550] CWE-502: Deserialization of Untrusted Data",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"High",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":6.6,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-42550"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2021-42550",
                "title":"[CVE-2021-42550] CWE-502: Deserialization of Untrusted Data",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"High",
                  "privilegesRequired":"High",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore":6.6,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2021-42550"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/ch.qos.logback/logback-classic@1.2.3",
              "issues":[
                {
                  "id":"CVE-2021-42550",
                  "title":"[CVE-2021-42550] CWE-502: Deserialization of Untrusted Data",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"High",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":6.6,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-42550"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2021-42550",
                "title":"[CVE-2021-42550] CWE-502: Deserialization of Untrusted Data",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"High",
                  "privilegesRequired":"High",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore":6.6,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2021-42550"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-expression@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2022-22950",
                  "title":"[CVE-2022-22950] CWE-770: Allocation of Resources Without Limits or Throttling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22950"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2023-20861",
                  "title":"[CVE-2023-20861] CWE-noinfo",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20861"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2023-20863",
                  "title":"[CVE-2023-20863] CWE-917: Improper Neutralization of Special Elements used in an Expression Language Statement ('Expression Language Injection')",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20863"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2022-22950",
                "title":"[CVE-2022-22950] CWE-770: Allocation of Resources Without Limits or Throttling",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":6.5,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2022-22950"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-context@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2022-22968",
                  "title":"[CVE-2022-22968] CWE-178: Improper Handling of Case Sensitivity",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22968"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2022-22968",
                "title":"[CVE-2022-22968] CWE-178: Improper Handling of Case Sensitivity",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                },
                "cvssScore":5.3,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2022-22968"
                ],
                "unique":false
              }
            }
          ],
          "recommendation":null,
          "remediations":{

          },
          "highestVulnerability":{
            "id":"CVE-2022-1471",
            "title":"[CVE-2022-1471] CWE-502: Deserialization of Untrusted Data",
            "cvss":{
              "attackVector":"Network",
              "attackComplexity":"Low",
              "privilegesRequired":"None",
              "userInteraction":"None",
              "scope":"Unchanged",
              "confidentialityImpact":"High",
              "integrityImpact":"High",
              "availabilityImpact":"High",
              "exploitCodeMaturity":null,
              "remediationLevel":null,
              "reportConfidence":null,
              "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
            },
            "cvssScore":9.8,
            "severity":"CRITICAL",
            "cves":[
              "CVE-2022-1471"
            ],
            "unique":false
          }
        },
        {
          "ref":"pkg:maven/org.springframework.boot/spring-boot-starter-web@2.3.5.RELEASE",
          "issues":[

          ],
          "transitive":[
            {
              "ref":"pkg:maven/org.springframework/spring-beans@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2022-22965",
                  "title":"[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":9.8,
                  "severity":"CRITICAL",
                  "cves":[
                    "CVE-2022-22965"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2022-22965",
                "title":"[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore":9.8,
                "severity":"CRITICAL",
                "cves":[
                  "CVE-2022-22965"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-web@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2016-1000027",
                  "title":"[CVE-2016-1000027] CWE-502: Deserialization of Untrusted Data",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":9.8,
                  "severity":"CRITICAL",
                  "cves":[
                    "CVE-2016-1000027"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2021-22118",
                  "title":"[CVE-2021-22118] CWE-668: Exposure of Resource to Wrong Sphere",
                  "cvss":{
                    "attackVector":"Local",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":7.8,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2021-22118"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2021-22096",
                  "title":"[CVE-2021-22096] CWE-117: Improper Output Neutralization for Logs",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":4.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-22096"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2016-1000027",
                "title":"[CVE-2016-1000027] CWE-502: Deserialization of Untrusted Data",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore":9.8,
                "severity":"CRITICAL",
                "cves":[
                  "CVE-2016-1000027"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.11.3",
              "issues":[
                {
                  "id":"CVE-2020-36518",
                  "title":"[CVE-2020-36518] CWE-787: Out-of-bounds Write",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2020-36518"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-42003",
                  "title":"[CVE-2022-42003] CWE-502: Deserialization of Untrusted Data",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2022-42003"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2022-42004",
                  "title":"[CVE-2022-42004] CWE-502: Deserialization of Untrusted Data",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2022-42004"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2021-46877",
                  "title":"[CVE-2021-46877] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2021-46877"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2020-36518",
                "title":"[CVE-2020-36518] CWE-787: Out-of-bounds Write",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":7.5,
                "severity":"HIGH",
                "cves":[
                  "CVE-2020-36518"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.glassfish/jakarta.el@3.0.3",
              "issues":[
                {
                  "id":"CVE-2021-28170",
                  "title":"[CVE-2021-28170] CWE-20: Improper Input Validation",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"Required",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2021-28170"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2021-28170",
                "title":"[CVE-2021-28170] CWE-20: Improper Input Validation",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"High",
                  "privilegesRequired":"None",
                  "userInteraction":"Required",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:H/A:H"
                },
                "cvssScore":7.5,
                "severity":"HIGH",
                "cves":[
                  "CVE-2021-28170"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-expression@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2022-22950",
                  "title":"[CVE-2022-22950] CWE-770: Allocation of Resources Without Limits or Throttling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22950"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2023-20861",
                  "title":"[CVE-2023-20861] CWE-noinfo",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20861"
                  ],
                  "unique":false
                },
                {
                  "id":"CVE-2023-20863",
                  "title":"[CVE-2023-20863] CWE-917: Improper Neutralization of Special Elements used in an Expression Language Statement ('Expression Language Injection')",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20863"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2022-22950",
                "title":"[CVE-2022-22950] CWE-770: Allocation of Resources Without Limits or Throttling",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":6.5,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2022-22950"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-context@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2022-22968",
                  "title":"[CVE-2022-22968] CWE-178: Improper Handling of Case Sensitivity",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22968"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2022-22968",
                "title":"[CVE-2022-22968] CWE-178: Improper Handling of Case Sensitivity",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                },
                "cvssScore":5.3,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2022-22968"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-webmvc@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"CVE-2021-22060",
                  "title":"[CVE-2021-22060] CWE-117: Improper Output Neutralization for Logs",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":4.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-22060"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"CVE-2021-22060",
                "title":"[CVE-2021-22060] CWE-117: Improper Output Neutralization for Logs",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                },
                "cvssScore":4.3,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2021-22060"
                ],
                "unique":false
              }
            }
          ],
          "recommendation":null,
          "remediations":{

          },
          "highestVulnerability":{
            "id":"CVE-2022-22965",
            "title":"[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
            "cvss":{
              "attackVector":"Network",
              "attackComplexity":"Low",
              "privilegesRequired":"None",
              "userInteraction":"None",
              "scope":"Unchanged",
              "confidentialityImpact":"High",
              "integrityImpact":"High",
              "availabilityImpact":"High",
              "exploitCodeMaturity":null,
              "remediationLevel":null,
              "reportConfidence":null,
              "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
            },
            "cvssScore":9.8,
            "severity":"CRITICAL",
            "cves":[
              "CVE-2022-22965"
            ],
            "unique":false
          }
        }
      ]
    },
    "snyk":{
      "status":{
        "ok":true,
        "name":"snyk",
        "code":200,
        "message":"OK"
      },
      "summary":{
        "dependencies":{
          "scanned":2,
          "transitive":37
        },
        "vulnerabilities":{
          "direct":0,
          "total":43,
          "critical":2,
          "high":7,
          "medium":27,
          "low":7
        }
      },
      "dependencies":[
        {
          "ref":"pkg:maven/org.springframework.boot/spring-boot-starter@2.3.5.RELEASE",
          "issues":[

          ],
          "transitive":[
            {
              "ref":"pkg:maven/org.springframework/spring-beans@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
                  "title":"Remote Code Execution",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":"High",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
                  },
                  "cvssScore":9.8,
                  "severity":"CRITICAL",
                  "cves":[
                    "CVE-2022-22965"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2823313",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22970"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
                "title":"Remote Code Execution",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":"High",
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
                },
                "cvssScore":9.8,
                "severity":"CRITICAL",
                "cves":[
                  "CVE-2022-22965"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.yaml/snakeyaml@1.26",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGYAML-2806360",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2022-25857",
                    "CVE-2022-38749"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGYAML-3152153",
                  "title":"Arbitrary Code Execution",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"High",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H/E:P"
                  },
                  "cvssScore":6.6,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-1471"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGYAML-3016891",
                  "title":"Stack-based Buffer Overflow",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:L/E:P"
                  },
                  "cvssScore":4.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-38751"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGYAML-3016888",
                  "title":"Stack-based Buffer Overflow",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L/E:P"
                  },
                  "cvssScore":3.7,
                  "severity":"LOW",
                  "cves":[
                    "CVE-2022-38752"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGYAML-3016889",
                  "title":"Stack-based Buffer Overflow",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore":3.7,
                  "severity":"LOW",
                  "cves":[
                    "CVE-2022-38750"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGYAML-3113851",
                  "title":"Stack-based Buffer Overflow",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore":3.7,
                  "severity":"LOW",
                  "cves":[
                    "CVE-2022-41854"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGYAML-2806360",
                "title":"Denial of Service (DoS)",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":7.5,
                "severity":"HIGH",
                "cves":[
                  "CVE-2022-25857",
                  "CVE-2022-38749"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework.boot/spring-boot-autoconfigure@2.3.5.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORKBOOT-5564390",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2023-20883"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORKBOOT-5564390",
                "title":"Denial of Service (DoS)",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":7.5,
                "severity":"HIGH",
                "cves":[
                  "CVE-2023-20883"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-expression@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-5422217",
                  "title":"Allocation of Resources Without Limits or Throttling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20863"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2434828",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22950"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-3369749",
                  "title":"Allocation of Resources Without Limits or Throttling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20861"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-5422217",
                "title":"Allocation of Resources Without Limits or Throttling",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":6.5,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2023-20863"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/ch.qos.logback/logback-core@1.2.3",
              "issues":[
                {
                  "id":"SNYK-JAVA-CHQOSLOGBACK-1726923",
                  "title":"Insufficient Hostname Verification",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore":4.8,
                  "severity":"MEDIUM",
                  "cves":[

                  ],
                  "unique":true
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-CHQOSLOGBACK-1726923",
                "title":"Insufficient Hostname Verification",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"High",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"Low",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N"
                },
                "cvssScore":4.8,
                "severity":"MEDIUM",
                "cves":[

                ],
                "unique":true
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-core@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2329097",
                  "title":"Improper Output Neutralization for Logs",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":4.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-22096"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2330878",
                  "title":"Improper Input Validation",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":4.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-22060"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2329097",
                "title":"Improper Output Neutralization for Logs",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                },
                "cvssScore":4.3,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2021-22096"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-context@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2689634",
                  "title":"Improper Handling of Case Sensitivity",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore":3.7,
                  "severity":"LOW",
                  "cves":[
                    "CVE-2022-22968"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2689634",
                "title":"Improper Handling of Case Sensitivity",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"High",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":"Proof of concept code",
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                },
                "cvssScore":3.7,
                "severity":"LOW",
                "cves":[
                  "CVE-2022-22968"
                ],
                "unique":false
              }
            }
          ],
          "recommendation":null,
          "remediations":{

          },
          "highestVulnerability":{
            "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
            "title":"Remote Code Execution",
            "cvss":{
              "attackVector":"Network",
              "attackComplexity":"Low",
              "privilegesRequired":"None",
              "userInteraction":"None",
              "scope":"Unchanged",
              "confidentialityImpact":"High",
              "integrityImpact":"High",
              "availabilityImpact":"High",
              "exploitCodeMaturity":"High",
              "remediationLevel":null,
              "reportConfidence":null,
              "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
            },
            "cvssScore":9.8,
            "severity":"CRITICAL",
            "cves":[
              "CVE-2022-22965"
            ],
            "unique":false
          }
        },
        {
          "ref":"pkg:maven/org.springframework.boot/spring-boot-starter-web@2.3.5.RELEASE",
          "issues":[

          ],
          "transitive":[
            {
              "ref":"pkg:maven/org.springframework/spring-beans@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
                  "title":"Remote Code Execution",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":"High",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
                  },
                  "cvssScore":9.8,
                  "severity":"CRITICAL",
                  "cves":[
                    "CVE-2022-22965"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2823313",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22970"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
                "title":"Remote Code Execution",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"High",
                  "integrityImpact":"High",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":"High",
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
                },
                "cvssScore":9.8,
                "severity":"CRITICAL",
                "cves":[
                  "CVE-2022-22965"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.apache.tomcat.embed/tomcat-embed-core@9.0.39",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1728264",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2021-41079"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1080637",
                  "title":"Remote Code Execution (RCE)",
                  "cvss":{
                    "attackVector":"Local",
                    "attackComplexity":"High",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":7.0,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2021-25329"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-2414084",
                  "title":"Privilege Escalation",
                  "cvss":{
                    "attackVector":"Local",
                    "attackComplexity":"High",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"High",
                    "integrityImpact":"High",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore":7.0,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2022-23181"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-3326459",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-24998"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-5862028",
                  "title":"Access Restriction Bypass",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-41080"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1080638",
                  "title":"HTTP Request Smuggling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"Required",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"High",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:H/A:L"
                  },
                  "cvssScore":5.9,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-25122"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1048292",
                  "title":"Information Exposure",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"None",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N/E:P"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2020-17527"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1061939",
                  "title":"Information Disclosure",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"None",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-24122"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1728266",
                  "title":"HTTP Request Smuggling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-33037"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-3369687",
                  "title":"Unprotected Transport of Credentials",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"None",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-28708"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1728265",
                  "title":"Improper Input Validation",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore":4.8,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-30640"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-3035793",
                  "title":"Information Exposure",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"None",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore":3.7,
                  "severity":"LOW",
                  "cves":[
                    "CVE-2021-43980"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-3097829",
                  "title":"HTTP Request Smuggling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore":3.7,
                  "severity":"LOW",
                  "cves":[
                    "CVE-2022-42252"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGAPACHETOMCATEMBED-1728264",
                "title":"Denial of Service (DoS)",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":7.5,
                "severity":"HIGH",
                "cves":[
                  "CVE-2021-41079"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.11.3",
              "issues":[
                {
                  "id":"SNYK-JAVA-COMFASTERXMLJACKSONCORE-2421244",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":7.5,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2020-36518"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-COMFASTERXMLJACKSONCORE-2326698",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":5.9,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-46877"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-COMFASTERXMLJACKSONCORE-3038424",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                  },
                  "cvssScore":5.9,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-42004"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-COMFASTERXMLJACKSONCORE-3038426",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                  },
                  "cvssScore":5.9,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-42003"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-COMFASTERXMLJACKSONCORE-2421244",
                "title":"Denial of Service (DoS)",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":7.5,
                "severity":"HIGH",
                "cves":[
                  "CVE-2020-36518"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.glassfish/jakarta.el@3.0.3",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGGLASSFISH-1297098",
                  "title":"Improper Input Validation",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"Low",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore":7.3,
                  "severity":"HIGH",
                  "cves":[
                    "CVE-2021-28170"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGGLASSFISH-1297098",
                "title":"Improper Input Validation",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"Low",
                  "integrityImpact":"Low",
                  "availabilityImpact":"Low",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L"
                },
                "cvssScore":7.3,
                "severity":"HIGH",
                "cves":[
                  "CVE-2021-28170"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-expression@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-5422217",
                  "title":"Allocation of Resources Without Limits or Throttling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"High",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore":6.5,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20863"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2434828",
                  "title":"Denial of Service (DoS)",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2022-22950"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-3369749",
                  "title":"Allocation of Resources Without Limits or Throttling",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"None",
                    "availabilityImpact":"Low",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore":5.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2023-20861"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-5422217",
                "title":"Allocation of Resources Without Limits or Throttling",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"None",
                  "availabilityImpact":"High",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore":6.5,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2023-20863"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-web@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-1296829",
                  "title":"Privilege Escalation",
                  "cvss":{
                    "attackVector":"Local",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"Low",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore":4.4,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-22118"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-1296829",
                "title":"Privilege Escalation",
                "cvss":{
                  "attackVector":"Local",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"Low",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:N"
                },
                "cvssScore":4.4,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2021-22118"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-core@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2329097",
                  "title":"Improper Output Neutralization for Logs",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":4.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-22096"
                  ],
                  "unique":false
                },
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2330878",
                  "title":"Improper Input Validation",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"Low",
                    "privilegesRequired":"Low",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":null,
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore":4.3,
                  "severity":"MEDIUM",
                  "cves":[
                    "CVE-2021-22060"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2329097",
                "title":"Improper Output Neutralization for Logs",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"Low",
                  "privilegesRequired":"Low",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":null,
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                },
                "cvssScore":4.3,
                "severity":"MEDIUM",
                "cves":[
                  "CVE-2021-22096"
                ],
                "unique":false
              }
            },
            {
              "ref":"pkg:maven/org.springframework/spring-context@5.2.10.RELEASE",
              "issues":[
                {
                  "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2689634",
                  "title":"Improper Handling of Case Sensitivity",
                  "cvss":{
                    "attackVector":"Network",
                    "attackComplexity":"High",
                    "privilegesRequired":"None",
                    "userInteraction":"None",
                    "scope":"Unchanged",
                    "confidentialityImpact":"None",
                    "integrityImpact":"Low",
                    "availabilityImpact":"None",
                    "exploitCodeMaturity":"Proof of concept code",
                    "remediationLevel":null,
                    "reportConfidence":null,
                    "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore":3.7,
                  "severity":"LOW",
                  "cves":[
                    "CVE-2022-22968"
                  ],
                  "unique":false
                }
              ],
              "remediations":{

              },
              "highestVulnerability":{
                "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2689634",
                "title":"Improper Handling of Case Sensitivity",
                "cvss":{
                  "attackVector":"Network",
                  "attackComplexity":"High",
                  "privilegesRequired":"None",
                  "userInteraction":"None",
                  "scope":"Unchanged",
                  "confidentialityImpact":"None",
                  "integrityImpact":"Low",
                  "availabilityImpact":"None",
                  "exploitCodeMaturity":"Proof of concept code",
                  "remediationLevel":null,
                  "reportConfidence":null,
                  "cvss":"CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                },
                "cvssScore":3.7,
                "severity":"LOW",
                "cves":[
                  "CVE-2022-22968"
                ],
                "unique":false
              }
            }
          ],
          "recommendation":null,
          "remediations":{

          },
          "highestVulnerability":{
            "id":"SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
            "title":"Remote Code Execution",
            "cvss":{
              "attackVector":"Network",
              "attackComplexity":"Low",
              "privilegesRequired":"None",
              "userInteraction":"None",
              "scope":"Unchanged",
              "confidentialityImpact":"High",
              "integrityImpact":"High",
              "availabilityImpact":"High",
              "exploitCodeMaturity":"High",
              "remediationLevel":null,
              "reportConfidence":null,
              "cvss":"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
            },
            "cvssScore":9.8,
            "severity":"CRITICAL",
            "cves":[
              "CVE-2022-22965"
            ],
            "unique":false
          }
        }
      ]
    }
  },
  // report: {
  //   'oss-index': {
  //     status: {
  //       ok: true,
  //       name: 'oss-index',
  //       code: 200,
  //       message: 'OK',
  //     },
  //     summary: {
  //       dependencies: {
  //         scanned: 10,
  //         transitive: 301,
  //       },
  //       vulnerabilities: {
  //         direct: 2,
  //         total: 18,
  //         critical: 0,
  //         high: 5,
  //         medium: 10,
  //         low: 3,
  //       },
  //     },
  //     dependencies: [
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-resteasy@2.13.5.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-2974',
  //                 title: '[CVE-2023-2974] CWE-Other',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'High',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
  //                 },
  //                 cvssScore: 8.1,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2023-2974'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'CVE-2023-0044',
  //                 title:
  //                   "[CVE-2023-0044] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Changed',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
  //                 },
  //                 cvssScore: 6.1,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-0044'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {
  //               'CVE-2023-0044': {
  //                 issueRef: 'CVE-2023-0044',
  //                 mavenPackage: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003',
  //                 productStatus: 'fixed',
  //               },
  //             },
  //             highestVulnerability: {
  //               id: 'CVE-2023-2974',
  //               title: '[CVE-2023-2974] CWE-Other',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'High',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
  //               },
  //               cvssScore: 8.1,
  //               severity: 'HIGH',
  //               cves: ['CVE-2023-2974'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/org.jboss.resteasy/resteasy-core@4.7.7.Final',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-0482',
  //                 title: '[CVE-2023-0482] CWE-Other',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //                 },
  //                 cvssScore: 5.5,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-0482'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2023-0482',
  //               title: '[CVE-2023-0482] CWE-Other',
  //               cvss: {
  //                 attackVector: 'Local',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //               },
  //               cvssScore: 5.5,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-0482'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {},
  //         highestVulnerability: {
  //           id: 'CVE-2023-2974',
  //           title: '[CVE-2023-2974] CWE-Other',
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'Low',
  //             privilegesRequired: 'Low',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'High',
  //             integrityImpact: 'High',
  //             availabilityImpact: 'None',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
  //           },
  //           cvssScore: 8.1,
  //           severity: 'HIGH',
  //           cves: ['CVE-2023-2974'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-hibernate-orm-deployment@2.0.2.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/org.jsoup/jsoup@1.12.1',
  //             issues: [
  //               {
  //                 id: 'CVE-2021-37714',
  //                 title: '[CVE-2021-37714] CWE-248: Uncaught Exception',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 7.5,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2021-37714'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'CVE-2022-36033',
  //                 title:
  //                   "[CVE-2022-36033] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Changed',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
  //                 },
  //                 cvssScore: 6.1,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2022-36033'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2021-37714',
  //               title: '[CVE-2021-37714] CWE-248: Uncaught Exception',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'High',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //               },
  //               cvssScore: 7.5,
  //               severity: 'HIGH',
  //               cves: ['CVE-2021-37714'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/com.google.guava/guava@25.1-android',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-2976',
  //                 title:
  //                   '[CVE-2023-2976] CWE-552: Files or Directories Accessible to External Parties',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'High',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
  //                 },
  //                 cvssScore: 7.1,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2023-2976'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'CVE-2020-8908',
  //                 title:
  //                   '[CVE-2020-8908] CWE-379: Creation of Temporary File in Directory with Incorrect Permissions',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 3.3,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2020-8908'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2023-2976',
  //               title:
  //                 '[CVE-2023-2976] CWE-552: Files or Directories Accessible to External Parties',
  //               cvss: {
  //                 attackVector: 'Local',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'High',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
  //               },
  //               cvssScore: 7.1,
  //               severity: 'HIGH',
  //               cves: ['CVE-2023-2976'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/io.vertx/vertx-web@4.3.4',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-24815',
  //                 title:
  //                   "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 5.3,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-24815'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2023-24815',
  //               title:
  //                 "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //               },
  //               cvssScore: 5.3,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-24815'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/commons-io/commons-io@2.5',
  //             issues: [
  //               {
  //                 id: 'CVE-2021-29425',
  //                 title:
  //                   "[CVE-2021-29425] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 5.3,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2021-29425'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2021-29425',
  //               title:
  //                 "[CVE-2021-29425] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //               },
  //               cvssScore: 5.3,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2021-29425'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-22006',
  //                 title: '[CVE-2023-22006] CWE-noinfo',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.1,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22006'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2023-22006',
  //               title: '[CVE-2023-22006] CWE-noinfo',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'Required',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'Low',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N',
  //               },
  //               cvssScore: 3.1,
  //               severity: 'LOW',
  //               cves: ['CVE-2023-22006'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {},
  //         highestVulnerability: {
  //           id: 'CVE-2021-37714',
  //           title: '[CVE-2021-37714] CWE-248: Uncaught Exception',
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'Low',
  //             privilegesRequired: 'None',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'None',
  //             integrityImpact: 'None',
  //             availabilityImpact: 'High',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //           },
  //           cvssScore: 7.5,
  //           severity: 'HIGH',
  //           cves: ['CVE-2021-37714'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final',
  //         issues: [
  //           {
  //             id: 'CVE-2023-2974',
  //             title: '[CVE-2023-2974] CWE-Other',
  //             cvss: {
  //               attackVector: 'Network',
  //               attackComplexity: 'Low',
  //               privilegesRequired: 'Low',
  //               userInteraction: 'None',
  //               scope: 'Unchanged',
  //               confidentialityImpact: 'High',
  //               integrityImpact: 'High',
  //               availabilityImpact: 'None',
  //               exploitCodeMaturity: null,
  //               remediationLevel: null,
  //               reportConfidence: null,
  //               cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
  //             },
  //             cvssScore: 8.1,
  //             severity: 'HIGH',
  //             cves: ['CVE-2023-2974'],
  //             unique: false,
  //           },
  //           {
  //             id: 'CVE-2023-0044',
  //             title:
  //               "[CVE-2023-0044] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
  //             cvss: {
  //               attackVector: 'Network',
  //               attackComplexity: 'Low',
  //               privilegesRequired: 'None',
  //               userInteraction: 'Required',
  //               scope: 'Changed',
  //               confidentialityImpact: 'Low',
  //               integrityImpact: 'Low',
  //               availabilityImpact: 'None',
  //               exploitCodeMaturity: null,
  //               remediationLevel: null,
  //               reportConfidence: null,
  //               cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
  //             },
  //             cvssScore: 6.1,
  //             severity: 'MEDIUM',
  //             cves: ['CVE-2023-0044'],
  //             unique: false,
  //           },
  //         ],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final',
  //             issues: [
  //               {
  //                 id: 'CVE-2022-41881',
  //                 title: '[CVE-2022-41881] CWE-674: Uncontrolled Recursion',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 7.5,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2022-41881'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2022-41881',
  //               title: '[CVE-2022-41881] CWE-674: Uncontrolled Recursion',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'High',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //               },
  //               cvssScore: 7.5,
  //               severity: 'HIGH',
  //               cves: ['CVE-2022-41881'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/io.netty/netty-codec@4.1.82.Final',
  //             issues: [
  //               {
  //                 id: 'CVE-2022-41915',
  //                 title:
  //                   "[CVE-2022-41915] CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
  //                 },
  //                 cvssScore: 6.5,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2022-41915'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2022-41915',
  //               title:
  //                 "[CVE-2022-41915] CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting')",
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'Low',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
  //               },
  //               cvssScore: 6.5,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2022-41915'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/io.netty/netty-handler@4.1.78.Final',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-34462',
  //                 title:
  //                   "[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 6.5,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-34462'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2023-34462',
  //               title:
  //                 "[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'High',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
  //               },
  //               cvssScore: 6.5,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-34462'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/io.vertx/vertx-web@4.3.4',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-24815',
  //                 title:
  //                   "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 5.3,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-24815'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2023-24815',
  //               title:
  //                 "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //               },
  //               cvssScore: 5.3,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-24815'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {
  //           'CVE-2023-0044': {
  //             issueRef: 'CVE-2023-0044',
  //             mavenPackage: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003',
  //             productStatus: 'fixed',
  //           },
  //         },
  //         highestVulnerability: {
  //           id: 'CVE-2022-41881',
  //           title: '[CVE-2022-41881] CWE-674: Uncontrolled Recursion',
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'Low',
  //             privilegesRequired: 'None',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'None',
  //             integrityImpact: 'None',
  //             availabilityImpact: 'High',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //           },
  //           cvssScore: 7.5,
  //           severity: 'HIGH',
  //           cves: ['CVE-2022-41881'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.5.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/org.postgresql/postgresql@42.5.0',
  //             issues: [
  //               {
  //                 id: 'CVE-2022-41946',
  //                 title: '[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //                 },
  //                 cvssScore: 5.5,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2022-41946'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2022-41946',
  //               title: '[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere',
  //               cvss: {
  //                 attackVector: 'Local',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //               },
  //               cvssScore: 5.5,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2022-41946'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {
  //           'CVE-2022-41946': {
  //             issueRef: 'CVE-2022-41946',
  //             mavenPackage:
  //               'pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.7.Final-redhat-00003',
  //             productStatus: 'fixed',
  //           },
  //         },
  //         highestVulnerability: {
  //           id: 'CVE-2022-41946',
  //           title: '[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere',
  //           cvss: {
  //             attackVector: 'Local',
  //             attackComplexity: 'Low',
  //             privilegesRequired: 'Low',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'High',
  //             integrityImpact: 'None',
  //             availabilityImpact: 'None',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //           },
  //           cvssScore: 5.5,
  //           severity: 'MEDIUM',
  //           cves: ['CVE-2022-41946'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0',
  //             issues: [
  //               {
  //                 id: 'CVE-2023-22006',
  //                 title: '[CVE-2023-22006] CWE-noinfo',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.1,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22006'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'CVE-2023-22006',
  //               title: '[CVE-2023-22006] CWE-noinfo',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'Required',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'Low',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N',
  //               },
  //               cvssScore: 3.1,
  //               severity: 'LOW',
  //               cves: ['CVE-2023-22006'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {},
  //         highestVulnerability: {
  //           id: 'CVE-2023-22006',
  //           title: '[CVE-2023-22006] CWE-noinfo',
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'High',
  //             privilegesRequired: 'None',
  //             userInteraction: 'Required',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'None',
  //             integrityImpact: 'Low',
  //             availabilityImpact: 'None',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N',
  //           },
  //           cvssScore: 3.1,
  //           severity: 'LOW',
  //           cves: ['CVE-2023-22006'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2',
  //         issues: [],
  //         transitive: [],
  //         recommendation: 'pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2.redhat-00001',
  //         remediations: {},
  //         highestVulnerability: null,
  //       },
  //     ],
  //   },
  //   snyk: {
  //     status: {
  //       ok: true,
  //       name: 'snyk',
  //       code: 200,
  //       message: 'OK',
  //     },
  //     summary: {
  //       dependencies: {
  //         scanned: 10,
  //         transitive: 301,
  //       },
  //       vulnerabilities: {
  //         direct: 2,
  //         total: 44,
  //         critical: 1,
  //         high: 4,
  //         medium: 20,
  //         low: 19,
  //       },
  //     },
  //     dependencies: [
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-hibernate-orm-deployment@2.0.2.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/org.apache.maven.shared/maven-shared-utils@3.2.1',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-ORGAPACHEMAVENSHARED-570592',
  //                 title: 'Command Injection',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'High',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
  //                 },
  //                 cvssScore: 9.8,
  //                 severity: 'CRITICAL',
  //                 cves: ['CVE-2022-29599'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-ORGAPACHEMAVENSHARED-570592',
  //               title: 'Command Injection',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'High',
  //                 availabilityImpact: 'High',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
  //               },
  //               cvssScore: 9.8,
  //               severity: 'CRITICAL',
  //               cves: ['CVE-2022-29599'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/org.jsoup/jsoup@1.12.1',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-ORGJSOUP-1567345',
  //                 title: 'Denial of Service (DoS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 7.5,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2021-37714'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGJSOUP-2989728',
  //                 title: 'Cross-site Scripting (XSS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:N',
  //                 },
  //                 cvssScore: 4.2,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2022-36033'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-ORGJSOUP-1567345',
  //               title: 'Denial of Service (DoS)',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'High',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //               },
  //               cvssScore: 7.5,
  //               severity: 'HIGH',
  //               cves: ['CVE-2021-37714'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457933',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'High',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N',
  //                 },
  //                 cvssScore: 7.4,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2023-21930'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457927',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
  //                 },
  //                 cvssScore: 5.9,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-21954'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457929',
  //                 title: 'Denial of Service (DoS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 5.9,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-21967'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457925',
  //                 title: 'Improper Input Validation',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 5.3,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-21939'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781374',
  //                 title: 'Improper Access Control',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
  //                 },
  //                 cvssScore: 5.1,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-22041'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457921',
  //                 title: 'Improper Input Validation',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-21968'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457923',
  //                 title: 'Improper Neutralization of Null Byte or NUL Character',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-21937'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457931',
  //                 title: 'Remote Code Execution (RCE)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-21938'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781367',
  //                 title: 'Denial of Service (DoS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'Low',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22036'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781369',
  //                 title: 'Access Restriction Bypass',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22049'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781371',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22045'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781373',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22044'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781378',
  //                 title: 'Access Restriction Bypass',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.1,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22006'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-ORGGRAALVMSDK-5457933',
  //               title: 'Information Exposure',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'High',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N',
  //               },
  //               cvssScore: 7.4,
  //               severity: 'HIGH',
  //               cves: ['CVE-2023-21930'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/commons-io/commons-io@2.5',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-COMMONSIO-1277109',
  //                 title: 'Directory Traversal',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: 'Functional exploit exists',
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N/E:F',
  //                 },
  //                 cvssScore: 5.3,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2021-29425'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-COMMONSIO-1277109',
  //               title: 'Directory Traversal',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: 'Functional exploit exists',
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N/E:F',
  //               },
  //               cvssScore: 5.3,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2021-29425'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/io.vertx/vertx-web@4.3.4',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-IOVERTX-3318108',
  //                 title: 'Directory Traversal',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: 'Proof of concept code',
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P',
  //                 },
  //                 cvssScore: 4.8,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-24815'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-IOVERTX-3318108',
  //               title: 'Directory Traversal',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'Low',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: 'Proof of concept code',
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P',
  //               },
  //               cvssScore: 4.8,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-24815'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/commons-codec/commons-codec@1.11',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-COMMONSCODEC-561518',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: [],
  //                 unique: true,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-COMMONSCODEC-561518',
  //               title: 'Information Exposure',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //               },
  //               cvssScore: 3.7,
  //               severity: 'LOW',
  //               cves: [],
  //               unique: true,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/com.google.guava/guava@25.1-android',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-COMGOOGLEGUAVA-1015415',
  //                 title: 'Information Disclosure',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: 'Proof of concept code',
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N/E:P',
  //                 },
  //                 cvssScore: 3.3,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2020-8908'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-COMGOOGLEGUAVA-5710356',
  //                 title: 'Creation of Temporary File in Directory with Insecure Permissions',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 3.3,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-2976'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-COMGOOGLEGUAVA-1015415',
  //               title: 'Information Disclosure',
  //               cvss: {
  //                 attackVector: 'Local',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: 'Proof of concept code',
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N/E:P',
  //               },
  //               cvssScore: 3.3,
  //               severity: 'LOW',
  //               cves: ['CVE-2020-8908'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {},
  //         highestVulnerability: {
  //           id: 'SNYK-JAVA-ORGAPACHEMAVENSHARED-570592',
  //           title: 'Command Injection',
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'Low',
  //             privilegesRequired: 'None',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'High',
  //             integrityImpact: 'High',
  //             availabilityImpact: 'High',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
  //           },
  //           cvssScore: 9.8,
  //           severity: 'CRITICAL',
  //           cves: ['CVE-2022-29599'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final',
  //         issues: [
  //           {
  //             id: 'SNYK-JAVA-IOQUARKUS-5768473',
  //             title:
  //               "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
  //             cvss: {
  //               attackVector: 'Network',
  //               attackComplexity: 'Low',
  //               privilegesRequired: 'High',
  //               userInteraction: 'None',
  //               scope: 'Unchanged',
  //               confidentialityImpact: 'High',
  //               integrityImpact: 'High',
  //               availabilityImpact: 'None',
  //               exploitCodeMaturity: null,
  //               remediationLevel: null,
  //               reportConfidence: null,
  //               cvss: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N',
  //             },
  //             cvssScore: 6.5,
  //             severity: 'MEDIUM',
  //             cves: ['CVE-2023-2974'],
  //             unique: false,
  //           },
  //           {
  //             id: 'SNYK-JAVA-IOQUARKUS-3330765',
  //             title: 'Cross-site Scripting (XSS)',
  //             cvss: {
  //               attackVector: 'Network',
  //               attackComplexity: 'Low',
  //               privilegesRequired: 'None',
  //               userInteraction: 'Required',
  //               scope: 'Unchanged',
  //               confidentialityImpact: 'Low',
  //               integrityImpact: 'Low',
  //               availabilityImpact: 'None',
  //               exploitCodeMaturity: null,
  //               remediationLevel: null,
  //               reportConfidence: null,
  //               cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N',
  //             },
  //             cvssScore: 5.4,
  //             severity: 'MEDIUM',
  //             cves: ['CVE-2023-0044'],
  //             unique: false,
  //           },
  //         ],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-IONETTY-3167776',
  //                 title: 'Denial of Service (DoS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 7.5,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2022-41881'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-IONETTY-3167776',
  //               title: 'Denial of Service (DoS)',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'High',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //               },
  //               cvssScore: 7.5,
  //               severity: 'HIGH',
  //               cves: ['CVE-2022-41881'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/io.netty/netty-handler@4.1.78.Final',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-IONETTY-5725787',
  //                 title: 'Denial of Service (DoS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 6.5,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-34462'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-IONETTY-1042268',
  //                 title: 'Improper Certificate Validation',
  //                 cvss: {
  //                   attackVector: 'Adjacent Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'Required',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'Low',
  //                   exploitCodeMaturity: 'Unproven that exploit exists',
  //                   remediationLevel: 'Unavailable',
  //                   reportConfidence: 'Reasonable',
  //                   cvss: 'CVSS:3.1/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:L/A:L/E:U/RL:U/RC:R',
  //                 },
  //                 cvssScore: 5.6,
  //                 severity: 'MEDIUM',
  //                 cves: [],
  //                 unique: true,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-IONETTY-5725787',
  //               title: 'Denial of Service (DoS)',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'None',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'High',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
  //               },
  //               cvssScore: 6.5,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-34462'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/io.vertx/vertx-web@4.3.4',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-IOVERTX-3318108',
  //                 title: 'Directory Traversal',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: 'Proof of concept code',
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P',
  //                 },
  //                 cvssScore: 4.8,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-24815'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-IOVERTX-3318108',
  //               title: 'Directory Traversal',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'Low',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: 'Proof of concept code',
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P',
  //               },
  //               cvssScore: 4.8,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-24815'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {
  //           'CVE-2023-0044': {
  //             issueRef: 'CVE-2023-0044',
  //             mavenPackage: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003',
  //             productStatus: 'fixed',
  //           },
  //         },
  //         highestVulnerability: {
  //           id: 'SNYK-JAVA-IONETTY-3167776',
  //           title: 'Denial of Service (DoS)',
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'Low',
  //             privilegesRequired: 'None',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'None',
  //             integrityImpact: 'None',
  //             availabilityImpact: 'High',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //           },
  //           cvssScore: 7.5,
  //           severity: 'HIGH',
  //           cves: ['CVE-2022-41881'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457933',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'High',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N',
  //                 },
  //                 cvssScore: 7.4,
  //                 severity: 'HIGH',
  //                 cves: ['CVE-2023-21930'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457927',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
  //                 },
  //                 cvssScore: 5.9,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-21954'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457929',
  //                 title: 'Denial of Service (DoS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'High',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H',
  //                 },
  //                 cvssScore: 5.9,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-21967'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457925',
  //                 title: 'Improper Input Validation',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 5.3,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-21939'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781374',
  //                 title: 'Improper Access Control',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
  //                 },
  //                 cvssScore: 5.1,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-22041'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457921',
  //                 title: 'Improper Input Validation',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-21968'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457923',
  //                 title: 'Improper Neutralization of Null Byte or NUL Character',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-21937'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5457931',
  //                 title: 'Remote Code Execution (RCE)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-21938'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781367',
  //                 title: 'Denial of Service (DoS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'Low',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22036'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781369',
  //                 title: 'Access Restriction Bypass',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22049'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781371',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22045'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781373',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
  //                 },
  //                 cvssScore: 3.7,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22044'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-ORGGRAALVMSDK-5781378',
  //                 title: 'Access Restriction Bypass',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'None',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N',
  //                 },
  //                 cvssScore: 3.1,
  //                 severity: 'LOW',
  //                 cves: ['CVE-2023-22006'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-ORGGRAALVMSDK-5457933',
  //               title: 'Information Exposure',
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'None',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'High',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N',
  //               },
  //               cvssScore: 7.4,
  //               severity: 'HIGH',
  //               cves: ['CVE-2023-21930'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {},
  //         highestVulnerability: {
  //           id: 'SNYK-JAVA-ORGGRAALVMSDK-5457933',
  //           title: 'Information Exposure',
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'High',
  //             privilegesRequired: 'None',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'High',
  //             integrityImpact: 'High',
  //             availabilityImpact: 'None',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N',
  //           },
  //           cvssScore: 7.4,
  //           severity: 'HIGH',
  //           cves: ['CVE-2023-21930'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-resteasy@2.13.5.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-IOQUARKUS-5768473',
  //                 title:
  //                   "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'High',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'High',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N',
  //                 },
  //                 cvssScore: 6.5,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-2974'],
  //                 unique: false,
  //               },
  //               {
  //                 id: 'SNYK-JAVA-IOQUARKUS-3330765',
  //                 title: 'Cross-site Scripting (XSS)',
  //                 cvss: {
  //                   attackVector: 'Network',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'None',
  //                   userInteraction: 'Required',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N',
  //                 },
  //                 cvssScore: 5.4,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-0044'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {
  //               'CVE-2023-0044': {
  //                 issueRef: 'CVE-2023-0044',
  //                 mavenPackage: 'pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003',
  //                 productStatus: 'fixed',
  //               },
  //             },
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-IOQUARKUS-5768473',
  //               title:
  //                 "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
  //               cvss: {
  //                 attackVector: 'Network',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'High',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'High',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N',
  //               },
  //               cvssScore: 6.5,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-2974'],
  //               unique: false,
  //             },
  //           },
  //           {
  //             ref: 'pkg:maven/org.jboss.resteasy/resteasy-core@4.7.7.Final',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-ORGJBOSSRESTEASY-3338627',
  //                 title: 'Creation of Temporary File With Insecure Permissions',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'Low',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'Low',
  //                   integrityImpact: 'Low',
  //                   availabilityImpact: 'Low',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
  //                 },
  //                 cvssScore: 5.3,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2023-0482'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-ORGJBOSSRESTEASY-3338627',
  //               title: 'Creation of Temporary File With Insecure Permissions',
  //               cvss: {
  //                 attackVector: 'Local',
  //                 attackComplexity: 'Low',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'Low',
  //                 integrityImpact: 'Low',
  //                 availabilityImpact: 'Low',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
  //               },
  //               cvssScore: 5.3,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2023-0482'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {},
  //         highestVulnerability: {
  //           id: 'SNYK-JAVA-IOQUARKUS-5768473',
  //           title: "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
  //           cvss: {
  //             attackVector: 'Network',
  //             attackComplexity: 'Low',
  //             privilegesRequired: 'High',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'High',
  //             integrityImpact: 'High',
  //             availabilityImpact: 'None',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N',
  //           },
  //           cvssScore: 6.5,
  //           severity: 'MEDIUM',
  //           cves: ['CVE-2023-2974'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.5.Final',
  //         issues: [],
  //         transitive: [
  //           {
  //             ref: 'pkg:maven/org.postgresql/postgresql@42.5.0',
  //             issues: [
  //               {
  //                 id: 'SNYK-JAVA-ORGPOSTGRESQL-3146847',
  //                 title: 'Information Exposure',
  //                 cvss: {
  //                   attackVector: 'Local',
  //                   attackComplexity: 'High',
  //                   privilegesRequired: 'Low',
  //                   userInteraction: 'None',
  //                   scope: 'Unchanged',
  //                   confidentialityImpact: 'High',
  //                   integrityImpact: 'None',
  //                   availabilityImpact: 'None',
  //                   exploitCodeMaturity: null,
  //                   remediationLevel: null,
  //                   reportConfidence: null,
  //                   cvss: 'CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //                 },
  //                 cvssScore: 4.7,
  //                 severity: 'MEDIUM',
  //                 cves: ['CVE-2022-41946'],
  //                 unique: false,
  //               },
  //             ],
  //             remediations: {},
  //             highestVulnerability: {
  //               id: 'SNYK-JAVA-ORGPOSTGRESQL-3146847',
  //               title: 'Information Exposure',
  //               cvss: {
  //                 attackVector: 'Local',
  //                 attackComplexity: 'High',
  //                 privilegesRequired: 'Low',
  //                 userInteraction: 'None',
  //                 scope: 'Unchanged',
  //                 confidentialityImpact: 'High',
  //                 integrityImpact: 'None',
  //                 availabilityImpact: 'None',
  //                 exploitCodeMaturity: null,
  //                 remediationLevel: null,
  //                 reportConfidence: null,
  //                 cvss: 'CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //               },
  //               cvssScore: 4.7,
  //               severity: 'MEDIUM',
  //               cves: ['CVE-2022-41946'],
  //               unique: false,
  //             },
  //           },
  //         ],
  //         recommendation: null,
  //         remediations: {
  //           'CVE-2022-41946': {
  //             issueRef: 'CVE-2022-41946',
  //             mavenPackage:
  //               'pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.7.Final-redhat-00003',
  //             productStatus: 'fixed',
  //           },
  //         },
  //         highestVulnerability: {
  //           id: 'SNYK-JAVA-ORGPOSTGRESQL-3146847',
  //           title: 'Information Exposure',
  //           cvss: {
  //             attackVector: 'Local',
  //             attackComplexity: 'High',
  //             privilegesRequired: 'Low',
  //             userInteraction: 'None',
  //             scope: 'Unchanged',
  //             confidentialityImpact: 'High',
  //             integrityImpact: 'None',
  //             availabilityImpact: 'None',
  //             exploitCodeMaturity: null,
  //             remediationLevel: null,
  //             reportConfidence: null,
  //             cvss: 'CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N',
  //           },
  //           cvssScore: 4.7,
  //           severity: 'MEDIUM',
  //           cves: ['CVE-2022-41946'],
  //           unique: false,
  //         },
  //       },
  //       {
  //         ref: 'pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2',
  //         issues: [],
  //         transitive: [],
  //         recommendation: 'pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2.redhat-00001',
  //         remediations: {},
  //         highestVulnerability: null,
  //       },
  //     ],
  //   },
  // },
  ossIndexIssueLinkFormatter: {
    issuePathRegex: 'http://ossindex.sonatype.org/vulnerability/%s',
  },
  snykIssueLinkFormatter: {
    issuePathRegex:
      'https://security.snyk.io/vuln/%s?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/%s',
  },
  sbomPath: 'https://tc-storage-mvp.s3.amazonaws.com/sboms/sbom.json',
  snykSignup:
    'https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9',
  dependencyHelper: {},
};
