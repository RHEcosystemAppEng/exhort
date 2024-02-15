import { AppData } from '@app/api/report';

export const unauthenticatedReport: AppData = {
  providerPrivateData: null,
  report: {
    "scanned": {
      "total": 9,
      "direct": 2,
      "transitive": 7
    },
    "providers": {
      "oss-index": {
        "status": {
          "ok": false,
          "name": "oss-index",
          "code": 401,
          "message": "Unauthenticated"
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
              "direct": 0,
              "transitive": 4,
              "total": 4,
              "dependencies": 2,
              "critical": 0,
              "high": 1,
              "medium": 3,
              "low": 0,
              "remediations": 0,
              "recommendations": 0
            },
            "dependencies": [
              {
                "ref": "pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final",
                "transitive": [
                  {
                    "ref": "pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.13.1",
                    "issues": [
                      {
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
                        "cves": [
                          "CVE-2020-36518"
                        ],
                        "unique": false,
                        "remediation": {
                          "fixedIn": [
                            "2.12.6.1",
                            "2.13.2.1",
                            "2.14.0"
                          ]
                        }
                      },
                      {
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
                        "unique": true,
                        "remediation": {
                          "fixedIn": [
                            "2.13.4"
                          ]
                        }
                      },
                      {
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
                        "cves": [
                          "CVE-2022-42003"
                        ],
                        "unique": false,
                        "remediation": {
                          "fixedIn": [
                            "2.12.7.1",
                            "2.13.4.2"
                          ]
                        }
                      }
                    ],
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
                      "cves": [
                        "CVE-2020-36518"
                      ],
                      "unique": false,
                      "remediation": {
                        "fixedIn": [
                          "2.12.6.1",
                          "2.13.2.1",
                          "2.14.0"
                        ]
                      }
                    }
                  }
                ],
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
                  "cves": [
                    "CVE-2020-36518"
                  ],
                  "unique": false,
                  "remediation": {
                    "fixedIn": [
                      "2.12.6.1",
                      "2.13.2.1",
                      "2.14.0"
                    ]
                  }
                }
              },
              {
                "ref": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.5.Final",
                "transitive": [
                  {
                    "ref": "pkg:maven/org.postgresql/postgresql@42.5.0",
                    "issues": [
                      {
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
                        "cves": [
                          "CVE-2022-41946"
                        ],
                        "unique": false,
                        "remediation": {
                          "fixedIn": [
                            "42.2.27",
                            "42.3.8",
                            "42.4.3",
                            "42.5.1"
                          ]
                        }
                      }
                    ],
                    "highestVulnerability": {
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
                      "cves": [
                        "CVE-2022-41946"
                      ],
                      "unique": false,
                      "remediation": {
                        "fixedIn": [
                          "42.2.27",
                          "42.3.8",
                          "42.4.3",
                          "42.5.1"
                        ]
                      }
                    }
                  }
                ],
                "highestVulnerability": {
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
                  "cves": [
                    "CVE-2022-41946"
                  ],
                  "unique": false,
                  "remediation": {
                    "fixedIn": [
                      "42.2.27",
                      "42.3.8",
                      "42.4.3",
                      "42.5.1"
                    ]
                  }
                }
              }
            ]
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
