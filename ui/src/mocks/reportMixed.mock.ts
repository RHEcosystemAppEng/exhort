import { AppData } from '@app/api/report';

export const reportMixed: AppData = {
  providerPrivateData: null,
  report: {
    "scanned": {
      "total": 155,
      "direct": 7,
      "transitive": 148
    },
    "providers": {
      "oss-index": {
        "status": {
          "ok": true,
          "name": "oss-index",
          "code": 200,
          "message": "OK"
        },
        "sources": {
          "oss-index": {
            "summary": {
              "direct": 5,
              "transitive": 52,
              "total": 57,
              "dependencies": 26,
              "critical": 5,
              "high": 19,
              "medium": 32,
              "low": 1,
              "remediations": 2,
              "recommendations": 3
            },
            "dependencies": [{
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter-web@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/org.springframework/spring-beans@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2022-22965",
                  "title": "[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-22965",
                  "title": "[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-web@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2016-1000027",
                  "title": "[CVE-2016-1000027] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2016-1000027"],
                  "unique": false
                }, {
                  "id": "CVE-2021-22118",
                  "title": "[CVE-2021-22118] CWE-668: Exposure of Resource to Wrong Sphere",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.8,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-22118"],
                  "unique": false
                }, {
                  "id": "CVE-2021-22096",
                  "title": "[CVE-2021-22096] CWE-117: Improper Output Neutralization for Logs",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22096"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2016-1000027",
                  "title": "[CVE-2016-1000027] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2016-1000027"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.11.3",
                "issues": [{
                  "id": "CVE-2020-36518",
                  "title": "[CVE-2020-36518] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2020-36518"],
                  "unique": false
                }, {
                  "id": "CVE-2022-42003",
                  "title": "[CVE-2022-42003] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-42003"],
                  "unique": false
                }, {
                  "id": "CVE-2022-42004",
                  "title": "[CVE-2022-42004] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-42004"],
                  "unique": false
                }, {
                  "id": "CVE-2021-46877",
                  "title": "[CVE-2021-46877] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-46877"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2020-36518",
                  "title": "[CVE-2020-36518] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2020-36518"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/org.glassfish/jakarta.el@3.0.3",
                "issues": [{
                  "id": "CVE-2021-28170",
                  "title": "[CVE-2021-28170] CWE-20: Improper Input Validation",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-28170"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-28170",
                  "title": "[CVE-2021-28170] CWE-20: Improper Input Validation",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-28170"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-expression@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2022-22950",
                  "title": "[CVE-2022-22950] CWE-770: Allocation of Resources Without Limits or Throttling",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22950"],
                  "unique": false
                }, {
                  "id": "CVE-2023-20861",
                  "title": "[CVE-2023-20861] CWE-noinfo",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-20861"],
                  "unique": false
                }, {
                  "id": "CVE-2023-20863",
                  "title": "[CVE-2023-20863] CWE-917: Improper Neutralization of Special Elements used in an Expression Language Statement ('Expression Language Injection')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-20863"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-22950",
                  "title": "[CVE-2022-22950] CWE-770: Allocation of Resources Without Limits or Throttling",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22950"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-webmvc@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2021-22060",
                  "title": "[CVE-2021-22060] CWE-117: Improper Output Neutralization for Logs",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22060"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-22060",
                  "title": "[CVE-2021-22060] CWE-117: Improper Output Neutralization for Logs",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22060"],
                  "unique": false
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2022-22965",
                "title": "[CVE-2022-22965] CWE-94: Improper Control of Generation of Code ('Code Injection')",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-22965"],
                "unique": false
              }
            }, {
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/org.yaml/snakeyaml@1.26",
                "issues": [{
                  "id": "CVE-2022-1471",
                  "title": "[CVE-2022-1471] CWE-20: Improper Input Validation",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-1471"],
                  "unique": false
                }, {
                  "id": "CVE-2022-25857",
                  "title": "[CVE-2022-25857] CWE-776: Improper Restriction of Recursive Entity References in DTDs ('XML Entity Expansion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-25857"],
                  "unique": false
                }, {
                  "id": "CVE-2022-38749",
                  "title": "[CVE-2022-38749] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38749"],
                  "unique": false
                }, {
                  "id": "CVE-2022-38751",
                  "title": "[CVE-2022-38751] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38751"],
                  "unique": false
                }, {
                  "id": "CVE-2022-38752",
                  "title": "[CVE-2022-38752] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38752"],
                  "unique": false
                }, {
                  "id": "CVE-2022-41854",
                  "title": "[CVE-2022-41854] CWE-121: Stack-based Buffer Overflow",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-41854"],
                  "unique": false
                }, {
                  "id": "CVE-2022-38750",
                  "title": "[CVE-2022-38750] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38750"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-1471",
                  "title": "[CVE-2022-1471] CWE-20: Improper Input Validation",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-1471"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/ch.qos.logback/logback-core@1.2.3",
                "issues": [{
                  "id": "CVE-2023-6378",
                  "title": "[CVE-2023-6378] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false
                }, {
                  "id": "CVE-2021-42550",
                  "title": "[CVE-2021-42550] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "High",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 6.6,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-42550"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-6378",
                  "title": "[CVE-2023-6378] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/ch.qos.logback/logback-classic@1.2.3",
                "issues": [{
                  "id": "CVE-2023-6378",
                  "title": "[CVE-2023-6378] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false
                }, {
                  "id": "CVE-2021-42550",
                  "title": "[CVE-2021-42550] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "High",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 6.6,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-42550"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-6378",
                  "title": "[CVE-2023-6378] CWE-502: Deserialization of Untrusted Data",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/org.springframework.boot/spring-boot-autoconfigure@2.3.5.RELEASE",
                "issues": [{
                  "id": "CVE-2023-20883",
                  "title": "[CVE-2023-20883] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-20883"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-20883",
                  "title": "[CVE-2023-20883] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-20883"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-context@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2022-22968",
                  "title": "[CVE-2022-22968] CWE-178: Improper Handling of Case Sensitivity",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22968"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-22968",
                  "title": "[CVE-2022-22968] CWE-178: Improper Handling of Case Sensitivity",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22968"],
                  "unique": false
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2022-1471",
                "title": "[CVE-2022-1471] CWE-20: Improper Input Validation",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-1471"],
                "unique": false
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.6.Final",
              "transitive": [{
                "ref": "pkg:maven/org.postgresql/postgresql@42.2.18",
                "issues": [{
                  "id": "CVE-2022-21724",
                  "title": "[CVE-2022-21724] CWE-665: Improper Initialization",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-21724"],
                  "unique": false
                }, {
                  "id": "CVE-2022-26520",
                  "title": "[CVE-2022-26520] CWE-noinfo",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-26520"],
                  "unique": false
                }, {
                  "id": "CVE-2022-31197",
                  "title": "[CVE-2022-31197] CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:L/UI:R/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-31197"],
                  "unique": false
                }, {
                  "id": "CVE-2022-41946",
                  "title": "[CVE-2022-41946] CWE-200: Information Exposure",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-41946"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-21724",
                  "title": "[CVE-2022-21724] CWE-665: Improper Initialization",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-21724"],
                  "unique": false
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "CVE-2022-21724",
                "title": "[CVE-2022-21724] CWE-665: Improper Initialization",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-21724"],
                "unique": false
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
              "issues": [{
                "id": "CVE-2023-2974",
                "title": "[CVE-2023-2974] CWE-757: Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2023-2974"],
                "unique": false,
                "remediation": {
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }, {
                "id": "CVE-2023-4853",
                "title": "[CVE-2023-4853] CWE-148: Improper Neutralization of Input Leaders",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2023-4853"],
                "unique": false,
                "remediation": {
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }, {
                "id": "CVE-2023-0044",
                "title": "[CVE-2023-0044] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "Required",
                  "scope": "Changed",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "Low",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"
                },
                "cvssScore": 6.1,
                "severity": "MEDIUM",
                "cves": ["CVE-2023-0044"],
                "unique": false
              }],
              "transitive": [{
                "ref": "pkg:maven/io.netty/netty-codec-haproxy@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2022-41881",
                  "title": "[CVE-2022-41881] CWE-674: Uncontrolled Recursion",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-41881"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-41881",
                  "title": "[CVE-2022-41881] CWE-674: Uncontrolled Recursion",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-41881"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2021-37136",
                  "title": "[CVE-2021-37136] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37136"],
                  "unique": false
                }, {
                  "id": "CVE-2021-37137",
                  "title": "[CVE-2021-37137] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37137"],
                  "unique": false
                }, {
                  "id": "CVE-2022-41915",
                  "title": "[CVE-2022-41915] CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-41915"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-37136",
                  "title": "[CVE-2021-37136] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37136"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-handler@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2023-34462",
                  "title": "[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34462"],
                  "unique": false
                }, {
                  "id": "CVE-2021-21290",
                  "title": "[CVE-2021-21290] CWE-378: Creation of Temporary File With Insecure Permissions",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-34462",
                  "title": "[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34462"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec-http@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2021-43797",
                  "title": "[CVE-2021-43797] CWE-444: Inconsistent Interpretation of HTTP Requests ('HTTP Request Smuggling')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-43797"],
                  "unique": false
                }, {
                  "id": "CVE-2021-21295",
                  "title": "[CVE-2021-21295] CWE-444: Inconsistent Interpretation of HTTP Requests ('HTTP Request Smuggling')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21295"],
                  "unique": false
                }, {
                  "id": "CVE-2021-21290",
                  "title": "[CVE-2021-21290] CWE-378: Creation of Temporary File With Insecure Permissions",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-43797",
                  "title": "[CVE-2021-43797] CWE-444: Inconsistent Interpretation of HTTP Requests ('HTTP Request Smuggling')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-43797"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec-http2@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2021-21295",
                  "title": "[CVE-2021-21295] CWE-444: Inconsistent Interpretation of HTTP Requests ('HTTP Request Smuggling')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21295"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-21295",
                  "title": "[CVE-2021-21295] CWE-444: Inconsistent Interpretation of HTTP Requests ('HTTP Request Smuggling')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21295"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-common@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2021-21290",
                  "title": "[CVE-2021-21290] CWE-378: Creation of Temporary File With Insecure Permissions",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-21290",
                  "title": "[CVE-2021-21290] CWE-378: Creation of Temporary File With Insecure Permissions",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/io.vertx/vertx-web@4.3.4",
                "issues": [{
                  "id": "CVE-2023-24815",
                  "title": "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-24815"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-24815",
                  "title": "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-24815"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",
                "issues": [{
                  "id": "CVE-2023-22006",
                  "title": "[CVE-2023-22006] CWE-noinfo",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.1,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22006"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-22006",
                  "title": "[CVE-2023-22006] CWE-noinfo",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.1,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22006"],
                  "unique": false
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "CVE-2023-2974",
                "title": "[CVE-2023-2974] CWE-757: Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2023-2974"],
                "unique": false,
                "remediation": {
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }
            }, {
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter-test@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/net.minidev/json-smart@2.3",
                "issues": [{
                  "id": "CVE-2021-31684",
                  "title": "[CVE-2021-31684] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-31684"],
                  "unique": false
                }, {
                  "id": "CVE-2023-1370",
                  "title": "[CVE-2023-1370] CWE-674: Uncontrolled Recursion",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-1370"],
                  "unique": false
                }, {
                  "id": "CVE-2021-27568",
                  "title": "[CVE-2021-27568] CWE-754: Improper Check for Unusual or Exceptional Conditions",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-27568"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-31684",
                  "title": "[CVE-2021-31684] CWE-787: Out-of-bounds Write",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-31684"],
                  "unique": false
                }
              }, {
                "ref": "pkg:maven/com.jayway.jsonpath/json-path@2.4.0",
                "issues": [{
                  "id": "CVE-2023-51074",
                  "title": "[CVE-2023-51074] CWE-Other",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-51074"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-51074",
                  "title": "[CVE-2023-51074] CWE-Other",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-51074"],
                  "unique": false
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2021-31684",
                "title": "[CVE-2021-31684] CWE-787: Out-of-bounds Write",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2021-31684"],
                "unique": false
              }
            }, {
              "ref": "pkg:maven/org.keycloak/keycloak-saml-core@1.8.1.Final",
              "issues": [{
                "id": "CVE-2017-2646",
                "title": "[CVE-2017-2646] CWE-835: Loop with Unreachable Exit Condition ('Infinite Loop')",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2017-2646"],
                "unique": false
              }, {
                "id": "CVE-2017-2582",
                "title": "[CVE-2017-2582] CWE-200: Information Exposure",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                },
                "cvssScore": 6.5,
                "severity": "MEDIUM",
                "cves": ["CVE-2017-2582"],
                "unique": false
              }],
              "transitive": [{
                "ref": "pkg:maven/org.apache.santuario/xmlsec@1.5.1",
                "issues": [{
                  "id": "CVE-2023-44483",
                  "title": "[CVE-2023-44483] CWE-532: Information Exposure Through Log Files",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-44483"],
                  "unique": false
                }, {
                  "id": "CVE-2013-5823",
                  "title": "[CVE-2013-5823] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "AV:N/AC:L/Au:N/C:N/I:N/A:P"
                  },
                  "cvssScore": 5.0,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-5823"],
                  "unique": false
                }, {
                  "id": "CVE-2013-2172",
                  "title": "[CVE-2013-2172] CWE-310",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "privilegesRequired": "None",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "AV:N/AC:M/Au:N/C:N/I:P/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-2172"],
                  "unique": false
                }, {
                  "id": "CVE-2013-4517",
                  "title": "[CVE-2013-4517] CWE-399",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "privilegesRequired": "None",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "AV:N/AC:M/Au:N/C:N/I:N/A:P"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-4517"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-44483",
                  "title": "[CVE-2023-44483] CWE-532: Information Exposure Through Log Files",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-44483"],
                  "unique": false
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2017-2646",
                "title": "[CVE-2017-2646] CWE-835: Loop with Unreachable Exit Condition ('Infinite Loop')",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2017-2646"],
                "unique": false
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-resteasy@2.7.7.Final",
              "transitive": [{
                "ref": "pkg:maven/org.jboss.resteasy/resteasy-core@4.7.5.Final",
                "issues": [{
                  "id": "CVE-2023-0482",
                  "title": "[CVE-2023-0482] CWE-Other",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-0482"],
                  "unique": false
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-0482",
                  "title": "[CVE-2023-0482] CWE-Other",
                  "source": "oss-index",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-0482"],
                  "unique": false
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-resteasy@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "CVE-2023-0482",
                "title": "[CVE-2023-0482] CWE-Other",
                "source": "oss-index",
                "cvss": {
                  "attackVector": "Local",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                },
                "cvssScore": 5.5,
                "severity": "MEDIUM",
                "cves": ["CVE-2023-0482"],
                "unique": false
              }
            }]
          }
        }
      },
      "trusted-content": {
        "status": {
          "ok": true,
          "name": "trusted-content",
          "code": 200,
          "message": "OK"
        }
      },
      "osv-nvd": {
        "status": {
          "ok": true,
          "name": "osv-nvd",
          "code": 200,
          "message": "OK"
        },
        "sources": {
          "osv-nvd": {
            "summary": {
              "direct": 4,
              "transitive": 57,
              "total": 61,
              "dependencies": 27,
              "critical": 7,
              "high": 22,
              "medium": 32,
              "low": 0,
              "remediations": 3,
              "recommendations": 3
            },
            "dependencies": [{
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter-web@2.3.5.RELEASE",
              "issues": [{
                "id": "CVE-2022-22965",
                "title": "A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-22965"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["707a24c48b21fc35e8be715afc80f020a24a9714"]
                }
              }],
              "transitive": [{
                "ref": "pkg:maven/org.springframework/spring-webmvc@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2022-22965",
                  "title": "A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["707a24c48b21fc35e8be715afc80f020a24a9714"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-22965",
                  "title": "A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["707a24c48b21fc35e8be715afc80f020a24a9714"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-beans@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2022-22965",
                  "title": "A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["707a24c48b21fc35e8be715afc80f020a24a9714"]
                  }
                }, {
                  "id": "CVE-2022-22970",
                  "title": "In spring framework versions prior to 5.3.20+ , 5.2.22+ and old unsupported versions, applications that handle file uploads are vulnerable to DoS attack if they rely on data binding to set a MultipartFile or javax.servlet.Part to a field in a model object.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22970"],
                  "unique": false,
                  "remediation": {}
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-22965",
                  "title": "A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["707a24c48b21fc35e8be715afc80f020a24a9714"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-web@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2016-1000027",
                  "title": "Pivotal Spring Framework through 5.3.16 suffers from a potential remote code execution (RCE) issue if used for Java deserialization of untrusted data. Depending on how the library is implemented within a product, this issue may or not occur, and authentication may be required. NOTE: the vendor's position is that untrusted data is not an intended use case. The product's behavior will not be changed because some users rely on deserialization of trusted data.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2016-1000027"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5a30a43b753a971ac8bf4005a8ccddeaff439d7e"]
                  }
                }, {
                  "id": "CVE-2021-22118",
                  "title": "In Spring Framework, versions 5.2.x prior to 5.2.15 and versions 5.3.x prior to 5.3.7, a WebFlux application is vulnerable to a privilege escalation: by (re)creating the temporary storage directory, a locally authenticated malicious user can read or modify files that have been uploaded to the WebFlux application, or overwrite arbitrary files with multipart request data.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.8,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-22118"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["b1280ffeaaa3d666606fbe92f34219303fa5bbd7"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2016-1000027",
                  "title": "Pivotal Spring Framework through 5.3.16 suffers from a potential remote code execution (RCE) issue if used for Java deserialization of untrusted data. Depending on how the library is implemented within a product, this issue may or not occur, and authentication may be required. NOTE: the vendor's position is that untrusted data is not an intended use case. The product's behavior will not be changed because some users rely on deserialization of trusted data.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2016-1000027"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5a30a43b753a971ac8bf4005a8ccddeaff439d7e"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.apache.tomcat.embed/tomcat-embed-core@9.0.39",
                "issues": [{
                  "id": "CVE-2023-46589",
                  "title": "Improper Input Validation vulnerability in Apache Tomcat.Tomcat from 11.0.0-M1 through 11.0.0-M10, from 10.1.0-M1 through 10.1.15, from 9.0.0-M1 through 9.0.82 and from 8.5.0 through 8.5.95 did not correctly parse HTTP trailer headers. A trailer header that exceeded the header size limit could cause Tomcat to treat a single \nrequest as multiple requests leading to the possibility of request \nsmuggling when behind a reverse proxy.\n\nUsers are recommended to upgrade to version 11.0.0-M11 onwards, 10.1.16 onwards, 9.0.83 onwards or 8.5.96 onwards, which fix the issue.\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-46589"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["e9630c1fad9a72e7394872a2aeeb73627f821b6c"]
                  }
                }, {
                  "id": "CVE-2021-25122",
                  "title": "Exposure of Sensitive Information to an Unauthorized Actor in Apache Tomcat",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-25122"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.2", "9.0.43", "8.5.63"]
                  }
                }, {
                  "id": "CVE-2023-44487",
                  "title": "The HTTP/2 protocol allows a denial of service (server resource consumption) because request cancellation can reset many streams quickly, as exploited in the wild in August through October 2023.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-44487"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.51.0-r2", "1.57.0-r0"]
                  }
                }, {
                  "id": "CVE-2021-25329",
                  "title": "Potential remote code execution in Apache Tomcat",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.0,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-25329"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.2", "9.0.41", "8.5.61", "7.0.108"]
                  }
                }, {
                  "id": "CVE-2023-41080",
                  "title": "URL Redirection to Untrusted Site ('Open Redirect') vulnerability in FORM authentication feature Apache Tomcat.This issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.0-M10, from 10.1.0-M1 through 10.0.12, from 9.0.0-M1 through 9.0.79 and from 8.5.0 through 8.5.92.\n\nThe vulnerability is limited to the ROOT (default) web application.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Changed",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"
                  },
                  "cvssScore": 6.1,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-41080"],
                  "unique": false,
                  "remediation": {}
                }, {
                  "id": "CVE-2021-24122",
                  "title": "When serving resources from a network location using the NTFS file system, Apache Tomcat versions 10.0.0-M1 to 10.0.0-M9, 9.0.0.M1 to 9.0.39, 8.5.0 to 8.5.59 and 7.0.0 to 7.0.106 were susceptible to JSP source code disclosure in some configurations. The root cause was the unexpected behaviour of the JRE API File.getCanonicalPath() which in turn was caused by the inconsistent behaviour of the Windows API (FindFirstFileW) in some circumstances.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-24122"],
                  "unique": false,
                  "remediation": {}
                }, {
                  "id": "CVE-2023-42795",
                  "title": "Incomplete Cleanup vulnerability in Apache Tomcat.When recycling various internal objects in Apache Tomcat from 11.0.0-M1 through 11.0.0-M11, from 10.1.0-M1 through 10.1.13, from 9.0.0-M1 through 9.0.80 and from 8.5.0 through 8.5.93, an error could \ncause Tomcat to skip some parts of the recycling process leading to \ninformation leaking from the current request/response to the next.\n\nUsers are recommended to upgrade to version 11.0.0-M12 onwards, 10.1.14 onwards, 9.0.81 onwards or 8.5.94 onwards, which fixes the issue.\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-42795"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5feba31fa86b38bd645bf9cc1ddee883ad7bc6a4"]
                  }
                }, {
                  "id": "CVE-2023-45648",
                  "title": "Improper Input Validation vulnerability in Apache Tomcat.Tomcat from 11.0.0-M1 through 11.0.0-M11, from 10.1.0-M1 through 10.1.13, from 9.0.0-M1 through 9.0.81 and from 8.5.0 through 8.5.93 did not correctly parse HTTP trailer headers. A specially \ncrafted, invalid trailer header could cause Tomcat to treat a single \nrequest as multiple requests leading to the possibility of request \nsmuggling when behind a reverse proxy.\n\nUsers are recommended to upgrade to version 11.0.0-M12 onwards, 10.1.14 onwards, 9.0.81 onwards or 8.5.94 onwards, which fix the issue.\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-45648"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5feba31fa86b38bd645bf9cc1ddee883ad7bc6a4"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-46589",
                  "title": "Improper Input Validation vulnerability in Apache Tomcat.Tomcat from 11.0.0-M1 through 11.0.0-M10, from 10.1.0-M1 through 10.1.15, from 9.0.0-M1 through 9.0.82 and from 8.5.0 through 8.5.95 did not correctly parse HTTP trailer headers. A trailer header that exceeded the header size limit could cause Tomcat to treat a single \nrequest as multiple requests leading to the possibility of request \nsmuggling when behind a reverse proxy.\n\nUsers are recommended to upgrade to version 11.0.0-M11 onwards, 10.1.16 onwards, 9.0.83 onwards or 8.5.96 onwards, which fix the issue.\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-46589"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["e9630c1fad9a72e7394872a2aeeb73627f821b6c"]
                  }
                }
              }, {
                "ref": "pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.11.3",
                "issues": [{
                  "id": "CVE-2021-46877",
                  "title": "jackson-databind 2.10.x through 2.12.x before 2.12.6 and 2.13.x before 2.13.1 allows attackers to cause a denial of service (2 GB transient heap usage per read) in uncommon situations involving JsonNode JDK serialization.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-46877"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["917d1a9c3b57b2a38b2e94a9982c70465730021b"]
                  }
                }, {
                  "id": "CVE-2020-36518",
                  "title": "jackson-databind before 2.13.0 allows a Java StackOverflow exception and denial of service via a large depth of nested objects.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2020-36518"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["f758e50f0ecb7c24d91f66beda42d259a1e2c4a4"]
                  }
                }, {
                  "id": "CVE-2022-42003",
                  "title": "In FasterXML jackson-databind before versions 2.13.4.1 and 2.12.17.1, resource exhaustion can occur because of a lack of a check in primitive value deserializers to avoid deep wrapper array nesting, when the UNWRAP_SINGLE_VALUE_ARRAYS feature is enabled.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-42003"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["d78d00ee7b5245b93103fef3187f70543d67ca33", "ea6f3d4b05dde564a1a5013dd34467d676072afa", "8bd0e96a4f1d24691e4bf6a9987fcfab3757ae63"]
                  }
                }, {
                  "id": "CVE-2022-42004",
                  "title": "In FasterXML jackson-databind before 2.13.4, resource exhaustion can occur because of a lack of a check in BeanDeserializer._deserializeFromArray to prevent use of deeply nested arrays. An application is vulnerable only with certain customized choices for deserialization.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-42004"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["063183589218fec19a9293ed2f17ec53ea80ba88", "ea6f3d4b05dde564a1a5013dd34467d676072afa", "8cf9bdc360d16d44b060f8e4d85c1759acb5853c"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-46877",
                  "title": "jackson-databind 2.10.x through 2.12.x before 2.12.6 and 2.13.x before 2.13.1 allows attackers to cause a denial of service (2 GB transient heap usage per read) in uncommon situations involving JsonNode JDK serialization.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-46877"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["917d1a9c3b57b2a38b2e94a9982c70465730021b"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-expression@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2022-22950",
                  "title": "n Spring Framework versions 5.3.0 - 5.3.16 and older unsupported versions, it is possible for a user to provide a specially crafted SpEL expression that may cause a denial of service condition.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22950"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["cfa701b8726f06528e9d408b1b94f333f70da45f"]
                  }
                }, {
                  "id": "CVE-2023-20861",
                  "title": "In Spring Framework versions 6.0.0 - 6.0.6, 5.3.0 - 5.3.25, 5.2.0.RELEASE - 5.2.22.RELEASE, and older unsupported versions, it is possible for a user to provide a specially crafted SpEL expression that may cause a denial-of-service (DoS) condition.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-20861"],
                  "unique": false,
                  "remediation": {}
                }, {
                  "id": "CVE-2023-20863",
                  "title": "In spring framework versions prior to 5.2.24 release+ ,5.3.27+ and 6.0.8+ , it is possible for a user to provide a specially crafted SpEL expression that may cause a denial-of-service (DoS) condition.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-20863"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["3bea4682b769b933129fc01cbfc2fe2839786254"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-22950",
                  "title": "n Spring Framework versions 5.3.0 - 5.3.16 and older unsupported versions, it is possible for a user to provide a specially crafted SpEL expression that may cause a denial of service condition.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22950"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["cfa701b8726f06528e9d408b1b94f333f70da45f"]
                  }
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2022-22965",
                "title": "A Spring MVC or Spring WebFlux application running on JDK 9+ may be vulnerable to remote code execution (RCE) via data binding. The specific exploit requires the application to run on Tomcat as a WAR deployment. If the application is deployed as a Spring Boot executable jar, i.e. the default, it is not vulnerable to the exploit. However, the nature of the vulnerability is more general, and there may be other ways to exploit it.",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-22965"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["707a24c48b21fc35e8be715afc80f020a24a9714"]
                }
              }
            }, {
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/org.yaml/snakeyaml@1.26",
                "issues": [{
                  "id": "CVE-2022-1471",
                  "title": "SnakeYaml's Constructor() class does not restrict types which can be instantiated during deserialization. Deserializing yaml content provided by an attacker can lead to remote code execution. We recommend using SnakeYaml's SafeConsturctor when parsing untrusted content to restrict deserialization. We recommend upgrading to version 2.0 and beyond.\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-1471"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["59ddbb3304bb8e22e2004d74cddaf9ed4086632e"]
                  }
                }, {
                  "id": "CVE-2022-25857",
                  "title": "The package org.yaml:snakeyaml from 0 and before 1.31 are vulnerable to Denial of Service (DoS) due missing to nested depth limitation for collections.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-25857"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["fc300780da21f4bb92c148bc90257201220cf174", "fc300780da21f4bb92c148bc90257201220cf174"]
                  }
                }, {
                  "id": "CVE-2022-38751",
                  "title": "Using snakeYAML to parse untrusted YAML files may be vulnerable to Denial of Service attacks (DOS). If the parser is running on user supplied input, an attacker may supply content that causes the parser to crash by stackoverflow.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38751"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["04401a88fa9b36f555cdc91f72ca1e724090c031"]
                  }
                }, {
                  "id": "CVE-2022-38752",
                  "title": "Using snakeYAML to parse untrusted YAML files may be vulnerable to Denial of Service attacks (DOS). If the parser is running on user supplied input, an attacker may supply content that causes the parser to crash by stack-overflow.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38752"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["49e794037c6be07053ce930f71f9c31b09180920"]
                  }
                }, {
                  "id": "CVE-2022-38749",
                  "title": "Using snakeYAML to parse untrusted YAML files may be vulnerable to Denial of Service attacks (DOS). If the parser is running on user supplied input, an attacker may supply content that causes the parser to crash by stackoverflow.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38749"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["04401a88fa9b36f555cdc91f72ca1e724090c031"]
                  }
                }, {
                  "id": "CVE-2022-41854",
                  "title": "Those using Snakeyaml to parse untrusted YAML files may be vulnerable to Denial of Service attacks (DOS). If the parser is running on user supplied input, an attacker may supply content that causes the parser to crash by stack overflow. This effect may support a denial of service attack.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-41854"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["49e794037c6be07053ce930f71f9c31b09180920"]
                  }
                }, {
                  "id": "CVE-2022-38750",
                  "title": "Using snakeYAML to parse untrusted YAML files may be vulnerable to Denial of Service attacks (DOS). If the parser is running on user supplied input, an attacker may supply content that causes the parser to crash by stackoverflow.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38750"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["04401a88fa9b36f555cdc91f72ca1e724090c031"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-1471",
                  "title": "SnakeYaml's Constructor() class does not restrict types which can be instantiated during deserialization. Deserializing yaml content provided by an attacker can lead to remote code execution. We recommend using SnakeYaml's SafeConsturctor when parsing untrusted content to restrict deserialization. We recommend upgrading to version 2.0 and beyond.\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-1471"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["59ddbb3304bb8e22e2004d74cddaf9ed4086632e"]
                  }
                }
              }, {
                "ref": "pkg:maven/ch.qos.logback/logback-core@1.2.3",
                "issues": [{
                  "id": "CVE-2023-6378",
                  "title": "logback serialization vulnerability",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.3.12", "1.4.12", "1.3.12", "1.4.12", "1.2.13", "1.2.13"]
                  }
                }, {
                  "id": "CVE-2021-42550",
                  "title": "In logback version 1.2.7 and prior versions, an attacker with the required privileges to edit configurations files could craft a malicious configuration allowing to execute arbitrary code loaded from LDAP servers.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "High",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 6.6,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-42550"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["791680229b8644535b7b6e9b1aa8dc5ad1e17e0c"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-6378",
                  "title": "logback serialization vulnerability",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.3.12", "1.4.12", "1.3.12", "1.4.12", "1.2.13", "1.2.13"]
                  }
                }
              }, {
                "ref": "pkg:maven/ch.qos.logback/logback-classic@1.2.3",
                "issues": [{
                  "id": "CVE-2023-6378",
                  "title": "logback serialization vulnerability",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.3.12", "1.4.12", "1.3.12", "1.4.12", "1.2.13", "1.2.13"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-6378",
                  "title": "logback serialization vulnerability",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.3.12", "1.4.12", "1.3.12", "1.4.12", "1.2.13", "1.2.13"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework.boot/spring-boot-autoconfigure@2.3.5.RELEASE",
                "issues": [{
                  "id": "CVE-2023-20883",
                  "title": "In Spring Boot versions 3.0.0 - 3.0.6, 2.7.0 - 2.7.11, 2.6.0 - 2.6.14, 2.5.0 - 2.5.14 and older unsupported versions, there is potential for a denial-of-service (DoS) attack if Spring MVC is used together with a reverse proxy cache.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-20883"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["93b52f7e11f3d9bf2a4a4922ba31fdb9a0b48d74"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-20883",
                  "title": "In Spring Boot versions 3.0.0 - 3.0.6, 2.7.0 - 2.7.11, 2.6.0 - 2.6.14, 2.5.0 - 2.5.14 and older unsupported versions, there is potential for a denial-of-service (DoS) attack if Spring MVC is used together with a reverse proxy cache.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-20883"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["93b52f7e11f3d9bf2a4a4922ba31fdb9a0b48d74"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework.boot/spring-boot@2.3.5.RELEASE",
                "issues": [{
                  "id": "CVE-2023-34055",
                  "title": "In Spring Boot versions 2.7.0 - 2.7.17, 3.0.0-3.0.12 and 3.1.0-3.1.5, it is possible for a user to provide specially crafted HTTP requests that may cause a denial-of-service (DoS) condition.\n\nSpecifically, an application is vulnerable when all of the following are true:\n\n  *  the application uses Spring MVC or Spring WebFlux\n  *  org.springframework.boot:spring-boot-actuator is on the classpath\n\n\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34055"],
                  "unique": false,
                  "remediation": {}
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-34055",
                  "title": "In Spring Boot versions 2.7.0 - 2.7.17, 3.0.0-3.0.12 and 3.1.0-3.1.5, it is possible for a user to provide specially crafted HTTP requests that may cause a denial-of-service (DoS) condition.\n\nSpecifically, an application is vulnerable when all of the following are true:\n\n  *  the application uses Spring MVC or Spring WebFlux\n  *  org.springframework.boot:spring-boot-actuator is on the classpath\n\n\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34055"],
                  "unique": false,
                  "remediation": {}
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-context@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2022-22968",
                  "title": "In Spring Framework versions 5.3.0 - 5.3.18, 5.2.0 - 5.2.20, and older unsupported versions, the patterns for disallowedFields on a DataBinder are case sensitive which means a field is not effectively protected unless it is listed with both upper and lower case for the first character of the field, including upper and lower case for the first character of all nested fields within the property path.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22968"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["927b8c15ef20eaaa4002d4b2170cc536a6d6aa35"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-22968",
                  "title": "In Spring Framework versions 5.3.0 - 5.3.18, 5.2.0 - 5.2.20, and older unsupported versions, the patterns for disallowedFields on a DataBinder are case sensitive which means a field is not effectively protected unless it is listed with both upper and lower case for the first character of the field, including upper and lower case for the first character of all nested fields within the property path.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22968"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["927b8c15ef20eaaa4002d4b2170cc536a6d6aa35"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-core@5.2.10.RELEASE",
                "issues": [{
                  "id": "CVE-2021-22060",
                  "title": "In Spring Framework versions 5.3.0 - 5.3.13, 5.2.0 - 5.2.18, and older unsupported versions, it is possible for a user to provide malicious input to cause the insertion of additional log entries. This is a follow-up to CVE-2021-22096 that protects against additional types of input and in more places of the Spring Framework codebase.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22060"],
                  "unique": false,
                  "remediation": {}
                }, {
                  "id": "CVE-2021-22096",
                  "title": "In Spring Framework versions 5.3.0 - 5.3.10, 5.2.0 - 5.2.17, and older unsupported versions, it is possible for a user to provide malicious input to cause the insertion of additional log entries.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22096"],
                  "unique": false,
                  "remediation": {}
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-22060",
                  "title": "In Spring Framework versions 5.3.0 - 5.3.13, 5.2.0 - 5.2.18, and older unsupported versions, it is possible for a user to provide malicious input to cause the insertion of additional log entries. This is a follow-up to CVE-2021-22096 that protects against additional types of input and in more places of the Spring Framework codebase.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22060"],
                  "unique": false,
                  "remediation": {}
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2022-1471",
                "title": "SnakeYaml's Constructor() class does not restrict types which can be instantiated during deserialization. Deserializing yaml content provided by an attacker can lead to remote code execution. We recommend using SnakeYaml's SafeConsturctor when parsing untrusted content to restrict deserialization. We recommend upgrading to version 2.0 and beyond.\n",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-1471"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["59ddbb3304bb8e22e2004d74cddaf9ed4086632e"]
                }
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.6.Final",
              "transitive": [{
                "ref": "pkg:maven/org.postgresql/postgresql@42.2.18",
                "issues": [{
                  "id": "CVE-2022-26520",
                  "title": "In pgjdbc before 42.3.3, an attacker (who controls the jdbc URL or properties) can call java.util.logging.FileHandler to write to arbitrary files through the loggerFile and loggerLevel connection properties. An example situation is that an attacker could create an executable JSP file under a Tomcat web root. NOTE: the vendor's position is that there is no pgjdbc vulnerability; instead, it is a vulnerability for any application to use the pgjdbc driver with untrusted connection properties",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-26520"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["9effea487dca529dc5cb0e71600a8c6509819c56"]
                  }
                }, {
                  "id": "CVE-2022-21724",
                  "title": "pgjdbc is the offical PostgreSQL JDBC Driver. A security hole was found in the jdbc driver for postgresql database while doing security research. The system using the postgresql library will be attacked when attacker control the jdbc url or properties. pgjdbc instantiates plugin instances based on class names provided via `authenticationPluginClassName`, `sslhostnameverifier`, `socketFactory`, `sslfactory`, `sslpasswordcallback` connection properties. However, the driver did not verify if the class implements the expected interface before instantiating the class. This can lead to code execution loaded via arbitrary classes. Users using plugins are advised to upgrade. There are no known workarounds for this issue.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-21724"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["f4d0ed69c0b3aae8531d83d6af4c57f22312c813", "c7555123aaef705d6e35693da4c0daa3db2e9cd7"]
                  }
                }, {
                  "id": "CVE-2022-31197",
                  "title": "PostgreSQL JDBC Driver (PgJDBC for short) allows Java programs to connect to a PostgreSQL database using standard, database independent Java code. The PGJDBC implementation of the `java.sql.ResultRow.refreshRow()` method is not performing escaping of column names so a malicious column name that contains a statement terminator, e.g. `;`, could lead to SQL injection. This could lead to executing additional SQL commands as the application's JDBC user. User applications that do not invoke the `ResultSet.refreshRow()` method are not impacted. User application that do invoke that method are impacted if the underlying database that they are querying via their JDBC application may be under the control of an attacker. The attack requires the attacker to trick the user into executing SQL against a table name who's column names would contain the malicious SQL and subsequently invoke the `refreshRow()` method on the ResultSet. Note that the application's JDBC user and the schema owner need not be the same. A JDBC application that executes as a privileged user querying database schemas owned by potentially malicious less-privileged users would be vulnerable. In that situation it may be possible for the malicious user to craft a schema that causes the application to execute commands as the privileged user. Patched versions will be released as `42.2.26` and `42.4.1`. Users are advised to upgrade. There are no known workarounds for this issue.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 8.0,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-31197"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["739e599d52ad80f8dcd6efedc6157859b1a9d637"]
                  }
                }, {
                  "id": "CVE-2022-41946",
                  "title": "pgjdbc is an open source postgresql JDBC Driver. In affected versions a prepared statement using either `PreparedStatement.setText(int, InputStream)` or `PreparedStatemet.setBytea(int, InputStream)` will create a temporary file if the InputStream is larger than 2k. This will create a temporary file which is readable by other users on Unix like systems, but not MacOS. On Unix like systems, the system's temporary directory is shared between all users on that system. Because of this, when files and directories are written into this directory they are, by default, readable by other users on that same system. This vulnerability does not allow other users to overwrite the contents of these directories or files. This is purely an information disclosure vulnerability. Because certain JDK file system APIs were only added in JDK 1.7, this this fix is dependent upon the version of the JDK you are using. Java 1.7 and higher users: this vulnerability is fixed in 4.5.0. Java 1.6 and lower users: no patch is available. If you are unable to patch, or are stuck running on Java 1.6, specifying the java.io.tmpdir system environment variable to a directory that is exclusively owned by the executing user will mitigate this vulnerability.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-41946"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["9008dc9aade6dbfe4efafcd6872ebc55f4699cf5"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-26520",
                  "title": "In pgjdbc before 42.3.3, an attacker (who controls the jdbc URL or properties) can call java.util.logging.FileHandler to write to arbitrary files through the loggerFile and loggerLevel connection properties. An example situation is that an attacker could create an executable JSP file under a Tomcat web root. NOTE: the vendor's position is that there is no pgjdbc vulnerability; instead, it is a vulnerability for any application to use the pgjdbc driver with untrusted connection properties",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-26520"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["9effea487dca529dc5cb0e71600a8c6509819c56"]
                  }
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "CVE-2022-26520",
                "title": "In pgjdbc before 42.3.3, an attacker (who controls the jdbc URL or properties) can call java.util.logging.FileHandler to write to arbitrary files through the loggerFile and loggerLevel connection properties. An example situation is that an attacker could create an executable JSP file under a Tomcat web root. NOTE: the vendor's position is that there is no pgjdbc vulnerability; instead, it is a vulnerability for any application to use the pgjdbc driver with untrusted connection properties",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-26520"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["9effea487dca529dc5cb0e71600a8c6509819c56"]
                }
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
              "issues": [{
                "id": "CVE-2023-4853",
                "title": "A flaw was found in Quarkus where HTTP security policies are not sanitizing certain character permutations correctly when accepting requests, resulting in incorrect evaluation of permissions. This issue could allow an attacker to bypass the security policy altogether, resulting in unauthorized endpoint access and possibly a denial of service.",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2023-4853"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["1944de146a5e62dcf6d2cf631dd732bd5fbed069"],
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }, {
                "id": "CVE-2023-0044",
                "title": "If the Quarkus Form Authentication session cookie Path attribute is set to `/` then a cross-site attack may be initiated which might lead to the Information Disclosure. This attack can be prevented with the Quarkus CSRF Prevention feature.",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "Required",
                  "scope": "Changed",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "Low",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"
                },
                "cvssScore": 6.1,
                "severity": "MEDIUM",
                "cves": ["CVE-2023-0044"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["126bda3a30c9bd38ceb8e530ed261701a224ba1b"]
                }
              }],
              "transitive": [{
                "ref": "pkg:maven/io.quarkus/quarkus-core@2.13.5.Final",
                "issues": [{
                  "id": "CVE-2023-2974",
                  "title": "quarkus-core vulnerable to client driven TLS cipher downgrading",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 8.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-2974"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.16.8.Final"],
                    "trustedContent": {
                      "ref": "pkg:maven/io.quarkus/quarkus-core@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status": "NotAffected",
                      "justification": "VulnerableCodeNotPresent"
                    }
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-2974",
                  "title": "quarkus-core vulnerable to client driven TLS cipher downgrading",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 8.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-2974"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.16.8.Final"],
                    "trustedContent": {
                      "ref": "pkg:maven/io.quarkus/quarkus-core@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status": "NotAffected",
                      "justification": "VulnerableCodeNotPresent"
                    }
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec-haproxy@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2022-41881",
                  "title": "Netty project is an event-driven asynchronous network application framework. In versions prior to 4.1.86.Final, a StackOverflowError can be raised when parsing a malformed crafted message due to an infinite recursion. This issue is patched in version 4.1.86.Final. There is no workaround, except using a custom HaProxyMessageDecoder.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-41881"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["cde0e2d0508013c57612f7241a6660010fa7116c"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2022-41881",
                  "title": "Netty project is an event-driven asynchronous network application framework. In versions prior to 4.1.86.Final, a StackOverflowError can be raised when parsing a malformed crafted message due to an infinite recursion. This issue is patched in version 4.1.86.Final. There is no workaround, except using a custom HaProxyMessageDecoder.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-41881"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["cde0e2d0508013c57612f7241a6660010fa7116c"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2021-37137",
                  "title": "The Snappy frame decoder function doesn't restrict the chunk length which may lead to excessive memory usage. Beside this it also may buffer reserved skippable chunks until the whole chunk was received which may lead to excessive memory usage as well. This vulnerability can be triggered by supplying malicious input that decompresses to a very big size (via a network stream or a file) or by sending a huge skippable chunk.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37137"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["7d34282f9d2ffdd64c91cb4780b09902d9779b92", "d0ffa05fe8b8fb258d6c177ff0427dd71d7d5210"]
                  }
                }, {
                  "id": "CVE-2021-37136",
                  "title": "The Bzip2 decompression decoder function doesn't allow setting size restrictions on the decompressed output data (which affects the allocation size used during decompression). All users of Bzip2Decoder are affected. The malicious input can trigger an OOME and so a DoS attack",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37136"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["7d34282f9d2ffdd64c91cb4780b09902d9779b92", "d0ffa05fe8b8fb258d6c177ff0427dd71d7d5210"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-37137",
                  "title": "The Snappy frame decoder function doesn't restrict the chunk length which may lead to excessive memory usage. Beside this it also may buffer reserved skippable chunks until the whole chunk was received which may lead to excessive memory usage as well. This vulnerability can be triggered by supplying malicious input that decompresses to a very big size (via a network stream or a file) or by sending a huge skippable chunk.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37137"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["7d34282f9d2ffdd64c91cb4780b09902d9779b92", "d0ffa05fe8b8fb258d6c177ff0427dd71d7d5210"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec-http2@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2023-44487",
                  "title": "The HTTP/2 protocol allows a denial of service (server resource consumption) because request cancellation can reset many streams quickly, as exploited in the wild in August through October 2023.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-44487"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.51.0-r2", "1.57.0-r0"],
                    "trustedContent": {
                      "ref": "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status": "Fixed",
                      "justification": "NotProvided"
                    }
                  }
                }, {
                  "id": "CVE-2021-21409",
                  "title": "Netty is an open-source, asynchronous event-driven network application framework for rapid development of maintainable high performance protocol servers & clients. In Netty (io.netty:netty-codec-http2) before version 4.1.61.Final there is a vulnerability that enables request smuggling. The content-length header is not correctly validated if the request only uses a single Http2HeaderFrame with the endStream set to to true. This could lead to request smuggling if the request is proxied to a remote peer and translated to HTTP/1.1. This is a followup of GHSA-wm47-8v5p-wjpj/CVE-2021-21295 which did miss to fix this one case. This was fixed as part of 4.1.61.Final.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21409"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["b0fa4d5aab4215f3c22ce6123dd8dd5f38dc0432"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-44487",
                  "title": "The HTTP/2 protocol allows a denial of service (server resource consumption) because request cancellation can reset many streams quickly, as exploited in the wild in August through October 2023.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-44487"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.51.0-r2", "1.57.0-r0"],
                    "trustedContent": {
                      "ref": "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status": "Fixed",
                      "justification": "NotProvided"
                    }
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-handler@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2023-34462",
                  "title": "Netty is an asynchronous event-driven network application framework for rapid development of maintainable high performance protocol servers & clients. The `SniHandler` can allocate up to 16MB of heap for each channel during the TLS handshake. When the handler or the channel does not have an idle timeout, it can be used to make a TCP server using the `SniHandler` to allocate 16MB of heap. The `SniHandler` class is a handler that waits for the TLS handshake to configure a `SslHandler` according to the indicated server name by the `ClientHello` record. For this matter it allocates a `ByteBuf` using the value defined in the `ClientHello` record. Normally the value of the packet should be smaller than the handshake packet but there are not checks done here and the way the code is written, it is possible to craft a packet that makes the `SslClientHelloHandler`. This vulnerability has been fixed in version 4.1.94.Final.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34462"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["535da17e45201ae4278c0479e6162bb4127d4c32"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-34462",
                  "title": "Netty is an asynchronous event-driven network application framework for rapid development of maintainable high performance protocol servers & clients. The `SniHandler` can allocate up to 16MB of heap for each channel during the TLS handshake. When the handler or the channel does not have an idle timeout, it can be used to make a TCP server using the `SniHandler` to allocate 16MB of heap. The `SniHandler` class is a handler that waits for the TLS handshake to configure a `SslHandler` according to the indicated server name by the `ClientHello` record. For this matter it allocates a `ByteBuf` using the value defined in the `ClientHello` record. Normally the value of the packet should be smaller than the handshake packet but there are not checks done here and the way the code is written, it is possible to craft a packet that makes the `SslClientHelloHandler`. This vulnerability has been fixed in version 4.1.94.Final.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34462"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["535da17e45201ae4278c0479e6162bb4127d4c32"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec-http@4.1.53.Final",
                "issues": [{
                  "id": "CVE-2021-43797",
                  "title": "Netty is an asynchronous event-driven network application framework for rapid development of maintainable high performance protocol servers & clients. Netty prior to version 4.1.71.Final skips control chars when they are present at the beginning / end of the header name. It should instead fail fast as these are not allowed by the spec and could lead to HTTP request smuggling. Failing to do the validation might cause netty to \"sanitize\" header names before it forward these to another remote system when used as proxy. This remote system can't see the invalid usage anymore, and therefore does not do the validation itself. Users should upgrade to version 4.1.71.Final.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-43797"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["07aa6b5938a8b6ed7a6586e066400e2643897323", "4a757131019b969d91a6eeeda9da2e4063e0e107", "6d6e2d99804875e216fb4a5caca01e5e901a9a07"]
                  }
                }, {
                  "id": "CVE-2022-24823",
                  "title": "Netty is an open-source, asynchronous event-driven network application framework. The package `io.netty:netty-codec-http` prior to version 4.1.77.Final contains an insufficient fix for CVE-2021-21290. When Netty's multipart decoders are used local information disclosure can occur via the local system temporary directory if temporary storing uploads on the disk is enabled. This only impacts applications running on Java version 6 and lower. Additionally, this vulnerability impacts code running on Unix-like systems, and very old versions of Mac OSX and Windows as they all share the system temporary directory between all users. Version 4.1.77.Final contains a patch for this vulnerability. As a workaround, specify one's own `java.io.tmpdir` when starting the JVM or use DefaultHttpDataFactory.setBaseDir(...) to set the directory to something that is only readable by the current user.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-24823"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["185f8b2756a36aaa4f973f1a2a025e7d981823f1"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-43797",
                  "title": "Netty is an asynchronous event-driven network application framework for rapid development of maintainable high performance protocol servers & clients. Netty prior to version 4.1.71.Final skips control chars when they are present at the beginning / end of the header name. It should instead fail fast as these are not allowed by the spec and could lead to HTTP request smuggling. Failing to do the validation might cause netty to \"sanitize\" header names before it forward these to another remote system when used as proxy. This remote system can't see the invalid usage anymore, and therefore does not do the validation itself. Users should upgrade to version 4.1.71.Final.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-43797"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["07aa6b5938a8b6ed7a6586e066400e2643897323", "4a757131019b969d91a6eeeda9da2e4063e0e107", "6d6e2d99804875e216fb4a5caca01e5e901a9a07"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.vertx/vertx-web@4.3.4",
                "issues": [{
                  "id": "CVE-2023-24815",
                  "title": "Vert.x-Web is a set of building blocks for building web applications in the java programming language. When running vertx web applications that serve files using `StaticHandler` on Windows Operating Systems and Windows File Systems, if the mount point is a wildcard (`*`) then an attacker can exfiltrate any class path resource. When computing the relative path to locate the resource, in case of wildcards, the code: `return \"/\" + rest;` from `Utils.java` returns the user input (without validation) as the segment to lookup. Even though checks are performed to avoid escaping the sandbox, given that the input was not sanitized `\\` are not properly handled and an attacker can build a path that is valid within the classpath. This issue only affects users deploying in windows environments and upgrading is the advised remediation path. There are no known workarounds for this vulnerability.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-24815"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["9e3a783b1d1a731055e9049078b1b1494ece9c15"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-24815",
                  "title": "Vert.x-Web is a set of building blocks for building web applications in the java programming language. When running vertx web applications that serve files using `StaticHandler` on Windows Operating Systems and Windows File Systems, if the mount point is a wildcard (`*`) then an attacker can exfiltrate any class path resource. When computing the relative path to locate the resource, in case of wildcards, the code: `return \"/\" + rest;` from `Utils.java` returns the user input (without validation) as the segment to lookup. Even though checks are performed to avoid escaping the sandbox, given that the input was not sanitized `\\` are not properly handled and an attacker can build a path that is valid within the classpath. This issue only affects users deploying in windows environments and upgrading is the advised remediation path. There are no known workarounds for this vulnerability.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-24815"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["9e3a783b1d1a731055e9049078b1b1494ece9c15"]
                  }
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "CVE-2023-4853",
                "title": "A flaw was found in Quarkus where HTTP security policies are not sanitizing certain character permutations correctly when accepting requests, resulting in incorrect evaluation of permissions. This issue could allow an attacker to bypass the security policy altogether, resulting in unauthorized endpoint access and possibly a denial of service.",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2023-4853"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["1944de146a5e62dcf6d2cf631dd732bd5fbed069"],
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }
            }, {
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter-test@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/net.minidev/json-smart@2.3",
                "issues": [{
                  "id": "CVE-2023-1370",
                  "title": "[Json-smart](https://netplex.github.io/json-smart/) is a performance focused, JSON processor lib.\n\nWhen reaching a ‘[‘ or ‘{‘ character in the JSON input, the code parses an array or an object respectively.\n\nIt was discovered that the code does not have any limit to the nesting of such arrays or objects. Since the parsing of nested arrays and objects is done recursively, nesting too many of them can cause a stack exhaustion (stack overflow) and crash the software.\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-1370"],
                  "unique": false,
                  "remediation": {}
                }, {
                  "id": "CVE-2021-27568",
                  "title": "An issue was discovered in netplex json-smart-v1 through 2015-10-23 and json-smart-v2 through 2.4. An exception is thrown from a function, but it is not caught, as demonstrated by NumberFormatException. When it is not caught, it may cause programs using the library to crash or expose sensitive information.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-27568"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4e6596fca7ffb7d9008684f3d0de179c733df158", "309223e3a7ee27ba5c0fe5e102967f2961547c62"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-1370",
                  "title": "[Json-smart](https://netplex.github.io/json-smart/) is a performance focused, JSON processor lib.\n\nWhen reaching a ‘[‘ or ‘{‘ character in the JSON input, the code parses an array or an object respectively.\n\nIt was discovered that the code does not have any limit to the nesting of such arrays or objects. Since the parsing of nested arrays and objects is done recursively, nesting too many of them can cause a stack exhaustion (stack overflow) and crash the software.\n\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-1370"],
                  "unique": false,
                  "remediation": {}
                }
              }, {
                "ref": "pkg:maven/com.jayway.jsonpath/json-path@2.4.0",
                "issues": [{
                  "id": "CVE-2023-51074",
                  "title": "json-path v2.8.0 was discovered to contain a stack overflow via the Criteria.parse() method.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-51074"],
                  "unique": false,
                  "remediation": {}
                }],
                "highestVulnerability": {
                  "id": "CVE-2023-51074",
                  "title": "json-path v2.8.0 was discovered to contain a stack overflow via the Criteria.parse() method.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-51074"],
                  "unique": false,
                  "remediation": {}
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2023-1370",
                "title": "[Json-smart](https://netplex.github.io/json-smart/) is a performance focused, JSON processor lib.\n\nWhen reaching a ‘[‘ or ‘{‘ character in the JSON input, the code parses an array or an object respectively.\n\nIt was discovered that the code does not have any limit to the nesting of such arrays or objects. Since the parsing of nested arrays and objects is done recursively, nesting too many of them can cause a stack exhaustion (stack overflow) and crash the software.\n\n",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2023-1370"],
                "unique": false,
                "remediation": {}
              }
            }, {
              "ref": "pkg:maven/org.keycloak/keycloak-saml-core@1.8.1.Final",
              "issues": [{
                "id": "CVE-2021-3827",
                "title": "A flaw was found in keycloak, where the default ECP binding flow allows other authentication flows to be bypassed. By exploiting this behavior, an attacker can bypass the MFA authentication by sending a SOAP request with an AuthnRequest and Authorization header with the user's credentials. The highest threat from this vulnerability is to confidentiality and integrity.",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 6.8,
                "severity": "MEDIUM",
                "cves": ["CVE-2021-3827"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["44000caaf5051d7f218d1ad79573bd3d175cad0d"]
                }
              }],
              "transitive": [{
                "ref": "pkg:maven/org.apache.santuario/xmlsec@1.5.1",
                "issues": [{
                  "id": "CVE-2021-40690",
                  "title": "All versions of Apache Santuario - XML Security for Java prior to 2.2.3 and 2.1.7 are vulnerable to an issue where the \"secureValidation\" property is not passed correctly when creating a KeyInfo from a KeyInfoReference element. This allows an attacker to abuse an XPath Transform to extract any local .xml files in a RetrievalMethod element.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-40690"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["3e2217ba0f83edeea22854ba8a90d01a56aeec2a", "b9cc7320000478690287c5e154b728af34934b99", "4c8a616a6f3154e4500d66f0fb323549c71d0966"]
                  }
                }, {
                  "id": "CVE-2023-44483",
                  "title": "All versions of Apache Santuario - XML Security for Java prior to 2.2.6, 2.3.4, and 3.0.3, when using the JSR 105 API, are vulnerable to an issue where a private key may be disclosed in log files when generating an XML Signature and logging with debug level is enabled. Users are recommended to upgrade to version 2.2.6, 2.3.4, or 3.0.3, which fixes this issue.\n",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-44483"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["35dd89216450f35a4bb6b91a0984901a6907b1af"]
                  }
                }, {
                  "id": "CVE-2013-5823",
                  "title": "Apache XML Security For Java vulnerable to Infinite Loop",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "AV:N/AC:L/Au:N/C:N/I:N/A:P"
                  },
                  "cvssScore": 5.0,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-5823"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.4.8", "1.5.3"]
                  }
                }, {
                  "id": "CVE-2013-4517",
                  "title": "Improper Input Validation in Apache Santuario XML Security",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "privilegesRequired": "None",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "AV:N/AC:M/Au:N/C:N/I:N/A:P"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-4517"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.5.6"]
                  }
                }, {
                  "id": "CVE-2013-2172",
                  "title": "Inefficient Algorithmic Complexity in Apache Santuario XML Security",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "privilegesRequired": "None",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "AV:N/AC:M/Au:N/C:N/I:P/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-2172"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.4.8", "1.5.5"]
                  }
                }],
                "highestVulnerability": {
                  "id": "CVE-2021-40690",
                  "title": "All versions of Apache Santuario - XML Security for Java prior to 2.2.3 and 2.1.7 are vulnerable to an issue where the \"secureValidation\" property is not passed correctly when creating a KeyInfo from a KeyInfoReference element. This allows an attacker to abuse an XPath Transform to extract any local .xml files in a RetrievalMethod element.",
                  "source": "osv-nvd",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-40690"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["3e2217ba0f83edeea22854ba8a90d01a56aeec2a", "b9cc7320000478690287c5e154b728af34934b99", "4c8a616a6f3154e4500d66f0fb323549c71d0966"]
                  }
                }
              }],
              "highestVulnerability": {
                "id": "CVE-2021-40690",
                "title": "All versions of Apache Santuario - XML Security for Java prior to 2.2.3 and 2.1.7 are vulnerable to an issue where the \"secureValidation\" property is not passed correctly when creating a KeyInfo from a KeyInfoReference element. This allows an attacker to abuse an XPath Transform to extract any local .xml files in a RetrievalMethod element.",
                "source": "osv-nvd",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2021-40690"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["3e2217ba0f83edeea22854ba8a90d01a56aeec2a", "b9cc7320000478690287c5e154b728af34934b99", "4c8a616a6f3154e4500d66f0fb323549c71d0966"]
                }
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-resteasy@2.7.7.Final",
              "recommendation": "pkg:maven/io.quarkus/quarkus-resteasy@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar"
            }]
          }
        }
      },
      "snyk": {
        "status": {
          "ok": true,
          "name": "snyk",
          "code": 200,
          "message": "OK"
        },
        "sources": {
          "snyk": {
            "summary": {
              "direct": 8,
              "transitive": 96,
              "total": 104,
              "dependencies": 29,
              "critical": 1,
              "high": 30,
              "medium": 57,
              "low": 16,
              "remediations": 3,
              "recommendations": 3
            },
            "dependencies": [{
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter-web@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/org.springframework/spring-beans@5.2.10.RELEASE",
                "issues": [{
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
                  "title": "Remote Code Execution",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.20", "5.3.18"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2823313",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22970"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.22.RELEASE", "5.3.20"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
                  "title": "Remote Code Execution",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": ["CVE-2022-22965"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.20", "5.3.18"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.apache.tomcat.embed/tomcat-embed-core@9.0.39",
                "issues": [{
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-6092281",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:H"
                  },
                  "cvssScore": 8.6,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-46589"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.96", "9.0.83", "10.1.16", "11.0.0-M10"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-1728264",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-41079"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.4", "8.5.64", "9.0.44"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-5953331",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-44487"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.94", "9.0.81", "10.1.14", "11.0.0-M12"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-1080637",
                  "title": "Remote Code Execution (RCE)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.0,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-25329"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.2", "9.0.43", "8.5.63", "7.0.108"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-2414084",
                  "title": "Privilege Escalation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 7.0,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-23181"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.75", "9.0.58", "10.0.16", "10.1.0-M10"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-3326459",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-24998"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.85", "9.0.71", "10.1.5", "11.0.0-M3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-5862028",
                  "title": "Access Restriction Bypass",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-41080"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.93", "9.0.80", "10.1.13", "11.0.0-M11"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-1080638",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:H/A:L"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-25122"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.2", "9.0.43", "8.5.63"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-1048292",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N/E:P"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2020-17527"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.60", "9.0.40", "10.0.0-M10"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-1061939",
                  "title": "Information Disclosure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-24122"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.0-M10", "9.0.40", "8.5.60", "7.0.107"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-1728266",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-33037"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.7", "9.0.48", "8.5.68"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-3369687",
                  "title": "Unprotected Transport of Credentials",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-28708"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.86", "9.0.72", "10.1.6", "11.0.0-M3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-5959654",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-45648"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.94", "9.0.81", "10.1.14", "11.0.0-M12"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-5959972",
                  "title": "Incomplete Cleanup",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-42795"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.94", "9.0.81", "10.1.14", "11.0.0-M12"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-6183062",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2024-21733"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.64", "9.0.44", "10.0.4"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-1728265",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 4.8,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-30640"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["10.0.6", "9.0.46", "8.5.66", "7.0.109"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-3035793",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2021-43980"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.78", "9.0.62", "10.0.20", "10.1.0-M14"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-3097829",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2022-42252"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.53", "9.0.68", "10.0.27", "10.1.1"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGAPACHETOMCATEMBED-6092281",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:H"
                  },
                  "cvssScore": 8.6,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-46589"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["8.5.96", "9.0.83", "10.1.16", "11.0.0-M10"]
                  }
                }
              }, {
                "ref": "pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.11.3",
                "issues": [{
                  "id": "SNYK-JAVA-COMFASTERXMLJACKSONCORE-2421244",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2020-36518"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.12.6.1", "2.13.2.1"]
                  }
                }, {
                  "id": "SNYK-JAVA-COMFASTERXMLJACKSONCORE-2326698",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-46877"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.13.1", "2.12.6"]
                  }
                }, {
                  "id": "SNYK-JAVA-COMFASTERXMLJACKSONCORE-3038424",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-42004"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.12.7.1", "2.13.4"]
                  }
                }, {
                  "id": "SNYK-JAVA-COMFASTERXMLJACKSONCORE-3038426",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-42003"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.12.7.1", "2.13.4.1"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-COMFASTERXMLJACKSONCORE-2421244",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2020-36518"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.12.6.1", "2.13.2.1"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.glassfish/jakarta.el@3.0.3",
                "issues": [{
                  "id": "SNYK-JAVA-ORGGLASSFISH-1297098",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore": 7.3,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-28170"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["3.0.4"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGGLASSFISH-1297098",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore": 7.3,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-28170"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["3.0.4"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-expression@5.2.10.RELEASE",
                "issues": [{
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-5422217",
                  "title": "Allocation of Resources Without Limits or Throttling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-20863"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.24.RELEASE", "5.3.27", "6.0.8"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2434828",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-22950"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.20.RELEASE", "5.3.17"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-3369749",
                  "title": "Allocation of Resources Without Limits or Throttling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-20861"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.23.RELEASE", "5.3.26", "6.0.7"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-5422217",
                  "title": "Allocation of Resources Without Limits or Throttling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-20863"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.24.RELEASE", "5.3.27", "6.0.8"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-web@5.2.10.RELEASE",
                "issues": [{
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-1296829",
                  "title": "Privilege Escalation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 4.4,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22118"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.3.7", "5.2.15.RELEASE"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-1296829",
                  "title": "Privilege Escalation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 4.4,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22118"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.3.7", "5.2.15.RELEASE"]
                  }
                }
              }],
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2436751",
                "title": "Remote Code Execution",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": ["CVE-2022-22965"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["5.2.20", "5.3.18"]
                }
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-resteasy@2.7.7.Final",
              "issues": [{
                "id": "SNYK-JAVA-IOQUARKUS-6239478",
                "title": "Improper Authentication",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "Low",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:H"
                },
                "cvssScore": 8.6,
                "severity": "HIGH",
                "cves": ["CVE-2023-6267"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["3.2.10.Final"]
                }
              }],
              "transitive": [{
                "ref": "pkg:maven/org.jboss.resteasy/resteasy-core@4.7.5.Final",
                "issues": [{
                  "id": "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                  "title": "Creation of Temporary File With Insecure Permissions",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-0482"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.7.8.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                  "title": "Creation of Temporary File With Insecure Permissions",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-0482"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.7.8.Final"]
                  }
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-resteasy@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "SNYK-JAVA-IOQUARKUS-6239478",
                "title": "Improper Authentication",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "Low",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:H"
                },
                "cvssScore": 8.6,
                "severity": "HIGH",
                "cves": ["CVE-2023-6267"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["3.2.10.Final"]
                }
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
              "issues": [{
                "id": "SNYK-JAVA-IOQUARKUS-5905727",
                "title": "Access Restriction Bypass",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2023-4853"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.16.11.Final", "3.2.6.Final", "3.3.3"],
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }, {
                "id": "SNYK-JAVA-IOQUARKUS-5768473",
                "title": "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "High",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 6.5,
                "severity": "MEDIUM",
                "cves": ["CVE-2023-2974"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.16.8.Final", "3.2.1.Final"],
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }, {
                "id": "SNYK-JAVA-IOQUARKUS-3330765",
                "title": "Cross-site Scripting (XSS)",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "Required",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "Low",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N"
                },
                "cvssScore": 5.4,
                "severity": "MEDIUM",
                "cves": ["CVE-2023-0044"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.13.7.Final"]
                }
              }],
              "transitive": [{
                "ref": "pkg:maven/io.netty/netty-codec-haproxy@4.1.53.Final",
                "issues": [{
                  "id": "SNYK-JAVA-IONETTY-3167776",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-41881"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.86.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IONETTY-3167776",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-41881"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.86.Final"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec@4.1.53.Final",
                "issues": [{
                  "id": "SNYK-JAVA-IONETTY-1584063",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37137"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.68.Final"]
                  }
                }, {
                  "id": "SNYK-JAVA-IONETTY-1584064",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37136"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.68.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IONETTY-1584063",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2021-37137"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.68.Final"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",
                "issues": [{
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6163607",
                  "title": "Improper Privilege Management",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2024-20932"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["21.3.9", "22.3.5"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 7.4,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-21930"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.10", "21.3.6", "22.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6162757",
                  "title": "Incorrect Permission Assignment for Critical Resource",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 7.4,
                  "severity": "HIGH",
                  "cves": ["CVE-2024-20952"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.13", "21.3.9", "23.0.0"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6164703",
                  "title": "Improper Privilege Management",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 7.4,
                  "severity": "HIGH",
                  "cves": ["CVE-2024-20918"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.13", "21.3.9", "22.3.5"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-21954"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.10", "21.3.6", "22.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-21967"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.10", "21.3.6", "22.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6164695",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2024-20926"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.13", "21.3.9", "22.3.5"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6164698",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2024-20921"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.13", "21.3.9", "23.0.0"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6164710",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2024-20919"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.13", "21.3.9", "23.0.0"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-21939"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.10", "21.3.6", "22.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6026490",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-22081"],
                  "unique": false,
                  "remediation": {}
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title": "Improper Access Control",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.1,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-22041"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.11", "21.3.7", "22.3.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6164701",
                  "title": "Insertion of Sensitive Information into Log File",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 4.7,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2024-20945"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.13", "21.3.9", "23.0.0"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-21968"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.10", "21.3.6", "22.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title": "Improper Neutralization of Null Byte or NUL Character",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-21937"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.10", "21.3.6", "22.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title": "Remote Code Execution (RCE)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-21938"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.10", "21.3.6", "22.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22036"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.11", "21.3.7", "22.3.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title": "Access Restriction Bypass",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22049"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.11", "21.3.7", "22.3.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22045"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.11", "21.3.7", "22.3.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22044"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["21.3.7", "22.3.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6026508",
                  "title": "Buffer Overflow",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22025"],
                  "unique": false,
                  "remediation": {}
                }, {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title": "Access Restriction Bypass",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.1,
                  "severity": "LOW",
                  "cves": ["CVE-2023-22006"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["20.3.11", "21.3.7", "22.3.3"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-6163607",
                  "title": "Improper Privilege Management",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2024-20932"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["21.3.9", "22.3.5"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec-http2@4.1.53.Final",
                "issues": [{
                  "id": "SNYK-JAVA-IONETTY-5953332",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-44487"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.100.Final"],
                    "trustedContent": {
                      "ref": "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status": "Fixed",
                      "justification": "NotProvided"
                    }
                  }
                }, {
                  "id": "SNYK-JAVA-IONETTY-1083991",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N/E:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21295"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.60.Final"]
                  }
                }, {
                  "id": "SNYK-JAVA-IONETTY-1089809",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21409"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.61.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IONETTY-5953332",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-44487"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.100.Final"],
                    "trustedContent": {
                      "ref": "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00010?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                      "status": "Fixed",
                      "justification": "NotProvided"
                    }
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-handler@4.1.53.Final",
                "issues": [{
                  "id": "SNYK-JAVA-IONETTY-5725787",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34462"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.94.Final"]
                  }
                }, {
                  "id": "SNYK-JAVA-IONETTY-1082235",
                  "title": "Information Disclosure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.2,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.59.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IONETTY-5725787",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-34462"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.94.Final"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-codec-http@4.1.53.Final",
                "issues": [{
                  "id": "SNYK-JAVA-IONETTY-2314893",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-43797"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.71.Final"]
                  }
                }, {
                  "id": "SNYK-JAVA-IONETTY-1070799",
                  "title": "Information Disclosure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.2,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.59.Final"]
                  }
                }, {
                  "id": "SNYK-JAVA-IONETTY-1317097",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:H/A:N/E:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21295"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.60.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IONETTY-2314893",
                  "title": "HTTP Request Smuggling",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-43797"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.71.Final"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-common@4.1.53.Final",
                "issues": [{
                  "id": "SNYK-JAVA-IONETTY-1082234",
                  "title": "Information Disclosure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.2,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.59.Final"]
                  }
                }, {
                  "id": "SNYK-JAVA-IONETTY-2812456",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-24823"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.77.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IONETTY-1082234",
                  "title": "Information Disclosure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.2,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.59.Final"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.netty/netty-transport@4.1.53.Final",
                "issues": [{
                  "id": "SNYK-JAVA-IONETTY-1082236",
                  "title": "Information Disclosure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.2,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.59.Final"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IONETTY-1082236",
                  "title": "Information Disclosure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.2,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-21290"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.1.59.Final"]
                  }
                }
              }, {
                "ref": "pkg:maven/io.vertx/vertx-web@4.3.4",
                "issues": [{
                  "id": "SNYK-JAVA-IOVERTX-3318108",
                  "title": "Directory Traversal",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore": 4.8,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-24815"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.3.8"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-IOVERTX-3318108",
                  "title": "Directory Traversal",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore": 4.8,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-24815"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["4.3.8"]
                  }
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "SNYK-JAVA-IOQUARKUS-5905727",
                "title": "Access Restriction Bypass",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2023-4853"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.16.11.Final", "3.2.6.Final", "3.3.3"],
                  "trustedContent": {
                    "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
                    "status": "Fixed",
                    "justification": "NotProvided"
                  }
                }
              }
            }, {
              "ref": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.6.Final",
              "transitive": [{
                "ref": "pkg:maven/org.postgresql/postgresql@42.2.18",
                "issues": [{
                  "id": "SNYK-JAVA-ORGPOSTGRESQL-2401816",
                  "title": "Arbitrary Code Injection",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 8.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-26520"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["42.3.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGPOSTGRESQL-2390459",
                  "title": "Remote Code Execution (RCE)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H/E:P"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-21724"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["42.2.25", "42.3.2"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGPOSTGRESQL-2970521",
                  "title": "SQL Injection",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:L/UI:R/S:U/C:H/I:H/A:H/E:P"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-31197"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["42.2.26", "42.3.7", "42.4.1"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGPOSTGRESQL-3146847",
                  "title": "Information Exposure",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 4.7,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-41946"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["42.2.27", "42.3.8", "42.4.3", "42.5.1"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGPOSTGRESQL-2401816",
                  "title": "Arbitrary Code Injection",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 8.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-26520"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["42.3.3"]
                  }
                }
              }],
              "recommendation": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.8.Final-redhat-00006?repository_url=https%3A%2F%2Fmaven.repository.redhat.com%2Fga%2F&type=jar",
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGPOSTGRESQL-2401816",
                "title": "Arbitrary Code Injection",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": ["CVE-2022-26520"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["42.3.3"]
                }
              }
            }, {
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter-test@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/net.minidev/json-smart@2.3",
                "issues": [{
                  "id": "SNYK-JAVA-NETMINIDEV-3369748",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-1370"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.4.9"]
                  }
                }, {
                  "id": "SNYK-JAVA-NETMINIDEV-1078499",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-27568"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.3.2", "2.3.1", "2.4.1"]
                  }
                }, {
                  "id": "SNYK-JAVA-NETMINIDEV-1298655",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-31684"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.3.3", "2.4.5"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-NETMINIDEV-3369748",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-1370"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.4.9"]
                  }
                }
              }, {
                "ref": "pkg:maven/com.jayway.jsonpath/json-path@2.4.0",
                "issues": [{
                  "id": "SNYK-JAVA-COMJAYWAYJSONPATH-6140361",
                  "title": "Buffer Overflow",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L/E:P"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-51074"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.9.0"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-COMJAYWAYJSONPATH-6140361",
                  "title": "Buffer Overflow",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L/E:P"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2023-51074"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.9.0"]
                  }
                }
              }],
              "highestVulnerability": {
                "id": "SNYK-JAVA-NETMINIDEV-3369748",
                "title": "Denial of Service (DoS)",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": "Proof of concept code",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2023-1370"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.4.9"]
                }
              }
            }, {
              "ref": "pkg:maven/org.springframework.boot/spring-boot-starter@2.3.5.RELEASE",
              "transitive": [{
                "ref": "pkg:maven/org.yaml/snakeyaml@1.26",
                "issues": [{
                  "id": "SNYK-JAVA-ORGYAML-2806360",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-25857"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.31"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGYAML-6056527",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-38749"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.31"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGYAML-3152153",
                  "title": "Arbitrary Code Execution",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "High",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H/E:P"
                  },
                  "cvssScore": 6.6,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-1471"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.0"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGYAML-3016891",
                  "title": "Stack-based Buffer Overflow",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:L/E:P"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2022-38751"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.31"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGYAML-3016888",
                  "title": "Stack-based Buffer Overflow",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L/E:P"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2022-38752"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.32"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGYAML-3016889",
                  "title": "Stack-based Buffer Overflow",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2022-38750"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.31"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGYAML-3113851",
                  "title": "Stack-based Buffer Overflow",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2022-41854"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.32"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGYAML-2806360",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2022-25857"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.31"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework.boot/spring-boot-autoconfigure@2.3.5.RELEASE",
                "issues": [{
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORKBOOT-5564390",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-20883"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.5.15", "2.6.15", "2.7.12", "3.0.7"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORKBOOT-5564390",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-20883"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.5.15", "2.6.15", "2.7.12", "3.0.7"]
                  }
                }
              }, {
                "ref": "pkg:maven/ch.qos.logback/logback-core@1.2.3",
                "issues": [{
                  "id": "SNYK-JAVA-CHQOSLOGBACK-6094943",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Changed",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.2.13", "1.3.12", "1.4.12"]
                  }
                }, {
                  "id": "SNYK-JAVA-CHQOSLOGBACK-6097493",
                  "title": "Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Changed",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6481"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.2.13", "1.3.14", "1.4.14"]
                  }
                }, {
                  "id": "SNYK-PRIVATE-VULNERABILITY",
                  "title": "Sign up for a Snyk account to learn about the vulnerabilities found",
                  "source": "snyk",
                  "cvssScore": 4.8,
                  "severity": "MEDIUM",
                  "unique": true,
                  "remediation": {
                    "fixedIn": ["1.2.7"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-CHQOSLOGBACK-6094943",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Changed",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.2.13", "1.3.12", "1.4.12"]
                  }
                }
              }, {
                "ref": "pkg:maven/ch.qos.logback/logback-classic@1.2.3",
                "issues": [{
                  "id": "SNYK-JAVA-CHQOSLOGBACK-6094942",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Changed",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.2.13", "1.3.12", "1.4.12"]
                  }
                }, {
                  "id": "SNYK-JAVA-CHQOSLOGBACK-6097492",
                  "title": "Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Changed",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6481"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.2.13", "1.3.14", "1.4.14"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-CHQOSLOGBACK-6094942",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Changed",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": ["CVE-2023-6378"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.2.13", "1.3.12", "1.4.12"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-core@5.2.10.RELEASE",
                "issues": [{
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2329097",
                  "title": "Improper Output Neutralization for Logs",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22096"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.3.12", "5.2.18"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2330878",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22060"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.19.RELEASE", "5.3.14"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2329097",
                  "title": "Improper Output Neutralization for Logs",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-22096"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.3.12", "5.2.18"]
                  }
                }
              }, {
                "ref": "pkg:maven/org.springframework/spring-context@5.2.10.RELEASE",
                "issues": [{
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2689634",
                  "title": "Improper Handling of Case Sensitivity",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2022-22968"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.21", "5.3.19"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGSPRINGFRAMEWORK-2689634",
                  "title": "Improper Handling of Case Sensitivity",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Proof of concept code",
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N/E:P"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": ["CVE-2022-22968"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["5.2.21", "5.3.19"]
                  }
                }
              }],
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGYAML-2806360",
                "title": "Denial of Service (DoS)",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2022-25857"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["1.31"]
                }
              }
            }, {
              "ref": "pkg:maven/org.keycloak/keycloak-saml-core@1.8.1.Final",
              "issues": [{
                "id": "SNYK-JAVA-ORGKEYCLOAK-31398",
                "title": "Denial of Service (DoS)",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2017-2646"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.5.5.Final"]
                }
              }, {
                "id": "SNYK-JAVA-ORGKEYCLOAK-2987457",
                "title": "Arbitrary Code Execution",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "High",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 7.2,
                "severity": "HIGH",
                "cves": ["CVE-2022-2668"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["19.0.2"]
                }
              }, {
                "id": "SNYK-JAVA-ORGKEYCLOAK-72428",
                "title": "Information Exposure",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                },
                "cvssScore": 6.5,
                "severity": "MEDIUM",
                "cves": ["CVE-2017-2582"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.5.1.Final"]
                }
              }, {
                "id": "SNYK-JAVA-ORGKEYCLOAK-31579",
                "title": "Information Exposure",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "Low",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:L"
                },
                "cvssScore": 4.3,
                "severity": "MEDIUM",
                "cves": ["CVE-2015-2582"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.5.1.Final"]
                }
              }],
              "transitive": [{
                "ref": "pkg:maven/org.apache.santuario/xmlsec@1.5.1",
                "issues": [{
                  "id": "SNYK-JAVA-ORGAPACHESANTUARIO-6017551",
                  "title": "Insertion of Sensitive Information into Log File",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-44483"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.2.6", "2.3.4", "3.0.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHESANTUARIO-1655558",
                  "title": "Improper Input Validation",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2021-40690"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.2.3", "2.1.7"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHESANTUARIO-30031",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-5823"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.4.8", "1.5.3"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHESANTUARIO-30029",
                  "title": "XML signature spoofing",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-2172"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.4.8", "1.5.5"]
                  }
                }, {
                  "id": "SNYK-JAVA-ORGAPACHESANTUARIO-30030",
                  "title": "Denial of Service (DoS)",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 4.3,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2013-4517"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["1.5.6"]
                  }
                }],
                "highestVulnerability": {
                  "id": "SNYK-JAVA-ORGAPACHESANTUARIO-6017551",
                  "title": "Insertion of Sensitive Information into Log File",
                  "source": "snyk",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": ["CVE-2023-44483"],
                  "unique": false,
                  "remediation": {
                    "fixedIn": ["2.2.6", "2.3.4", "3.0.3"]
                  }
                }
              }],
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGKEYCLOAK-31398",
                "title": "Denial of Service (DoS)",
                "source": "snyk",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": ["CVE-2017-2646"],
                "unique": false,
                "remediation": {
                  "fixedIn": ["2.5.5.Final"]
                }
              }
            }]
          }
        }
      }
    }
  },
  ossIssueTemplate: 'http://ossindex.sonatype.org/vulnerability/__ISSUE_ID__',
  snykIssueTemplate: 'https://security.snyk.io/vuln/__ISSUE_ID__',
  nvdIssueTemplate: 'https://nvd.nist.gov/vuln/detail/__ISSUE_ID__',
  snykSignup: 'https://app.snyk.io/login',
  cveIssueTemplate: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=__ISSUE_ID__'
};
