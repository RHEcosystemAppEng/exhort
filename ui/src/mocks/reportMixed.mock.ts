import { AppData } from '@app/api/report';

export const reportMixed: AppData = {
  providerPrivateData: null,
  report: {
    "scanned" : {
      "total" : 207,
      "direct" : 10,
      "transitive" : 197
    },
    "providers" : {
      "oss-index" : {
        "status" : {
          "ok" : false,
          "name" : "oss-index",
          "code" : 401,
          "message" : "Unauthenticated"
        }
      },
      "trusted-content" : {
        "status" : {
          "ok" : true,
          "name" : "trusted-content",
          "code" : 200,
          "message" : "OK"
        }
      },
      "snyk" : {
        "status" : {
          "ok" : true,
          "name" : "snyk",
          "code" : 200,
          "message" : "OK"
        },
        "sources" : {
          "snyk" : {
            "summary" : {
              "direct" : 3,
              "transitive" : 21,
              "total" : 24,
              "dependencies" : 8,
              "critical" : 0,
              "high" : 4,
              "medium" : 11,
              "low" : 9,
              "remediations" : 2,
              "recommendations" : 9
            },
            "dependencies" : [ {
              "ref" : "pkg:maven/io.quarkus/quarkus-resteasy@2.13.5.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IOQUARKUS-5905727",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore" : 8.1,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-4853" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.16.11.Final", "3.2.6.Final", "3.3.3" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }, {
                  "id" : "SNYK-JAVA-IOQUARKUS-5768473",
                  "title" : "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "High",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-2974" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.16.8.Final", "3.2.1.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }, {
                  "id" : "SNYK-JAVA-IOQUARKUS-3330765",
                  "title" : "Cross-site Scripting (XSS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore" : 5.4,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-0044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.13.7.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IOQUARKUS-5905727",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore" : 8.1,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-4853" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.16.11.Final", "3.2.6.Final", "3.3.3" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-3167776",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2022-41881" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.86.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-3167776",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2022-41881" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.86.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-handler@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/org.jboss.resteasy/resteasy-core@4.7.7.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                  "title" : "Creation of Temporary File With Insecure Permissions",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-0482" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.7.8.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                  "title" : "Creation of Temporary File With Insecure Permissions",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-0482" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.7.8.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.vertx/vertx-web@4.3.4?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-resteasy@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-IOQUARKUS-5905727",
                "title" : "Access Restriction Bypass",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "High",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore" : 8.1,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-4853" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "2.16.11.Final", "3.2.6.Final", "3.3.3" ],
                  "trustedContent" : {
                    "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status" : "Fixed",
                    "justification" : "NotProvided"
                  }
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-resteasy-jackson@2.13.5.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IOQUARKUS-5905727",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore" : 8.1,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-4853" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.16.11.Final", "3.2.6.Final", "3.3.3" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }, {
                  "id" : "SNYK-JAVA-IOQUARKUS-5768473",
                  "title" : "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "High",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-2974" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.16.8.Final", "3.2.1.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }, {
                  "id" : "SNYK-JAVA-IOQUARKUS-3330765",
                  "title" : "Cross-site Scripting (XSS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore" : 5.4,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-0044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.13.7.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IOQUARKUS-5905727",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore" : 8.1,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-4853" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "2.16.11.Final", "3.2.6.Final", "3.3.3" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-3167776",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2022-41881" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.86.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-3167776",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2022-41881" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.86.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-handler@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/org.jboss.resteasy/resteasy-core@4.7.7.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                  "title" : "Creation of Temporary File With Insecure Permissions",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-0482" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.7.8.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                  "title" : "Creation of Temporary File With Insecure Permissions",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-0482" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.7.8.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.vertx/vertx-web@4.3.4?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-resteasy-jackson@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-IOQUARKUS-5905727",
                "title" : "Access Restriction Bypass",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "High",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore" : 8.1,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-4853" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "2.16.11.Final", "3.2.6.Final", "3.3.3" ],
                  "trustedContent" : {
                    "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status" : "Fixed",
                    "justification" : "NotProvided"
                  }
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-hibernate-orm-deployment@2.0.2.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }
              }, {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-handler@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.vertx/vertx-web@4.3.4?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-hibernate-orm-deployment@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-IONETTY-5953332",
                "title" : "Denial of Service (DoS)",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "Low",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "None",
                  "integrityImpact" : "None",
                  "availabilityImpact" : "High",
                  "exploitCodeMaturity" : "High",
                  "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                },
                "cvssScore" : 7.5,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-44487" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "4.1.100.Final" ],
                  "trustedContent" : {
                    "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status" : "Fixed",
                    "justification" : "NotProvided"
                  }
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final?type=jar",
              "issues" : [ {
                "id" : "SNYK-JAVA-IOQUARKUS-5905727",
                "title" : "Access Restriction Bypass",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "High",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore" : 8.1,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-4853" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "2.16.11.Final", "3.2.6.Final", "3.3.3" ],
                  "trustedContent" : {
                    "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status" : "Fixed",
                    "justification" : "NotProvided"
                  }
                }
              }, {
                "id" : "SNYK-JAVA-IOQUARKUS-5768473",
                "title" : "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "Low",
                  "privilegesRequired" : "High",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "None",
                  "cvss" : "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore" : 6.5,
                "severity" : "MEDIUM",
                "cves" : [ "CVE-2023-2974" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "2.16.8.Final", "3.2.1.Final" ],
                  "trustedContent" : {
                    "ref" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status" : "Fixed",
                    "justification" : "NotProvided"
                  }
                }
              }, {
                "id" : "SNYK-JAVA-IOQUARKUS-3330765",
                "title" : "Cross-site Scripting (XSS)",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "Low",
                  "privilegesRequired" : "None",
                  "userInteraction" : "Required",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "Low",
                  "integrityImpact" : "Low",
                  "availabilityImpact" : "None",
                  "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N"
                },
                "cvssScore" : 5.4,
                "severity" : "MEDIUM",
                "cves" : [ "CVE-2023-0044" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "2.13.7.Final" ]
                }
              } ],
              "transitive" : [ {
                "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5953332",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "exploitCodeMaturity" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-44487" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.100.Final" ],
                    "trustedContent" : {
                      "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status" : "Fixed",
                      "justification" : "NotProvided"
                    }
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-3167776",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2022-41881" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.86.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-3167776",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 7.5,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2022-41881" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.86.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.netty/netty-handler@4.1.82.Final?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IONETTY-5725787",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 6.5,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-34462" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.1.94.Final" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/io.vertx/vertx-web@4.3.4?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-IOVERTX-3318108",
                  "title" : "Directory Traversal",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore" : 4.8,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-24815" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "4.3.8" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-IONETTY-5953332",
                "title" : "Denial of Service (DoS)",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "Low",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "None",
                  "integrityImpact" : "None",
                  "availabilityImpact" : "High",
                  "exploitCodeMaturity" : "High",
                  "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                },
                "cvssScore" : 7.5,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-44487" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "4.1.100.Final" ],
                  "trustedContent" : {
                    "ref" : "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status" : "Fixed",
                    "justification" : "NotProvided"
                  }
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                "title" : "Information Exposure",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "None",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore" : 7.4,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-21930" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-kubernetes-service-binding@2.13.5.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-kubernetes-service-binding@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                "title" : "Information Exposure",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "None",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore" : 7.4,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-21930" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-container-image-docker@2.13.5.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              } ],
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                "title" : "Information Exposure",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "None",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore" : 7.4,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-21930" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.5.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              }, {
                "ref" : "pkg:maven/org.postgresql/postgresql@42.5.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGPOSTGRESQL-3146847",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 4.7,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2022-41946" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "42.2.27", "42.3.8", "42.4.3", "42.5.1" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGPOSTGRESQL-3146847",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "Low",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 4.7,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2022-41946" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "42.2.27", "42.3.8", "42.4.3", "42.5.1" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                "title" : "Information Exposure",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "None",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore" : 7.4,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-21930" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                }
              }
            }, {
              "ref" : "pkg:maven/io.quarkus/quarkus-agroal@2.13.5.Final?type=jar",
              "transitive" : [ {
                "ref" : "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0?type=jar",
                "issues" : [ {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21954" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "High",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore" : 5.9,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21967" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-21939" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "Low",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 5.3,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22081" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title" : "Improper Access Control",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Local",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore" : 5.1,
                  "severity" : "MEDIUM",
                  "cves" : [ "CVE-2023-22041" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title" : "Improper Input Validation",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21968" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title" : "Improper Neutralization of Null Byte or NUL Character",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21937" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title" : "Remote Code Execution (RCE)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-21938" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title" : "Denial of Service (DoS)",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "Low",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22036" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22049" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22045" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "Low",
                    "integrityImpact" : "None",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22044" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "21.3.7", "22.3.3" ]
                  }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title" : "Buffer Overflow",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "exploitCodeMaturity" : "Proof of concept code",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore" : 3.7,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22025" ],
                  "unique" : false,
                  "remediation" : { }
                }, {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title" : "Access Restriction Bypass",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "Required",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "None",
                    "integrityImpact" : "Low",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore" : 3.1,
                  "severity" : "LOW",
                  "cves" : [ "CVE-2023-22006" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.11", "21.3.7", "22.3.3" ]
                  }
                } ],
                "highestVulnerability" : {
                  "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title" : "Information Exposure",
                  "source" : "snyk",
                  "cvss" : {
                    "attackVector" : "Network",
                    "attackComplexity" : "High",
                    "privilegesRequired" : "None",
                    "userInteraction" : "None",
                    "scope" : "Unchanged",
                    "confidentialityImpact" : "High",
                    "integrityImpact" : "High",
                    "availabilityImpact" : "None",
                    "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore" : 7.4,
                  "severity" : "HIGH",
                  "cves" : [ "CVE-2023-21930" ],
                  "unique" : false,
                  "remediation" : {
                    "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                  }
                }
              } ],
              "recommendation" : "pkg:maven/io.quarkus/quarkus-agroal@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability" : {
                "id" : "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                "title" : "Information Exposure",
                "source" : "snyk",
                "cvss" : {
                  "attackVector" : "Network",
                  "attackComplexity" : "High",
                  "privilegesRequired" : "None",
                  "userInteraction" : "None",
                  "scope" : "Unchanged",
                  "confidentialityImpact" : "High",
                  "integrityImpact" : "High",
                  "availabilityImpact" : "None",
                  "cvss" : "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore" : 7.4,
                "severity" : "HIGH",
                "cves" : [ "CVE-2023-21930" ],
                "unique" : false,
                "remediation" : {
                  "fixedIn" : [ "20.3.10", "21.3.6", "22.3.2" ]
                }
              }
            }, {
              "ref" : "pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2?type=jar",
              "recommendation" : "pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2.redhat-00005?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar"
            } ]
          }
        }
      }
    }
  },
  ossIssueTemplate: 'http://ossindex.sonatype.org/vulnerability/__ISSUE_ID__',
  snykIssueTemplate: 'https://security.snyk.io/vuln/__ISSUE_ID__',
  nvdIssueTemplate: 'https://nvd.nist.gov/vuln/detail/__ISSUE_ID__',
  snykSignup: 'https://app.snyk.io/login',
};
