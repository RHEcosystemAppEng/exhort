import { Report } from '@app/api/report';

export let MOCK_REPORT: Report;
//   packagePath: 'https://central.sonatype.com/artifact/',
//   remediationPath: 'https://maven.repository.redhat.com/ga/',
//   issueVisibilityHelper: {
//     providerData: undefined,
//   },
//   vexPath: 'https://tc-storage-mvp.s3.amazonaws.com/vexes/',
//   report: {
//     summary: {
//       dependencies: {
//         scanned: 2,
//         transitive: 7,
//       },
//       vulnerabilities: {
//         direct: 2,
//         total: 7,
//         critical: 0,
//         high: 4,
//         medium: 3,
//         low: 0,
//       },
//       providerStatuses: [
//         {
//           ok: true,
//           provider: 'snyk',
//           status: 200,
//           message: 'OK',
//         },
//         {
//           ok: true,
//           provider: 'oss-index',
//           status: 200,
//           message: 'OK',
//         },
//       ],
//     },
//     dependencies: [
//       {
//         ref: 'pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final',
//         issues: [],
//         transitive: [
//           {
//             ref: 'pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.13.1',
//             issues: [
//               {
//                 id: 'SNYK-JAVA-COMFASTERXMLJACKSONCORE-2421244',
//                 title: 'Denial of Service (DoS)',
//                 source: 'snyk',
//                 cvss: {
//                   attackVector: 'Network',
//                   attackComplexity: 'Low',
//                   privilegesRequired: 'None',
//                   userInteraction: 'None',
//                   scope: 'Unchanged',
//                   confidentialityImpact: 'None',
//                   integrityImpact: 'None',
//                   availabilityImpact: 'High',
//                   exploitCodeMaturity: undefined,
//                   remediationLevel: undefined,
//                   reportConfidence: undefined,
//                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
//                 },
//                 cvssScore: 7.5,
//                 severity: 'HIGH',
//                 cves: ['CVE-2020-36518'],
//                 unique: false,
//               },
//               {
//                 id: 'CVE-2020-36518',
//                 title: '[CVE-2020-36518] CWE-787: Out-of-bounds Write',
//                 source: 'oss-index',
//                 cvss: {
//                   attackVector: 'Network',
//                   attackComplexity: 'Low',
//                   privilegesRequired: 'None',
//                   userInteraction: 'None',
//                   scope: 'Unchanged',
//                   confidentialityImpact: 'None',
//                   integrityImpact: 'None',
//                   availabilityImpact: 'High',
//                   exploitCodeMaturity: undefined,
//                   remediationLevel: undefined,
//                   reportConfidence: undefined,
//                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
//                 },
//                 cvssScore: 7.5,
//                 severity: 'HIGH',
//                 cves: ['CVE-2020-36518'],
//                 unique: false,
//               },
//               {
//                 id: 'CVE-2022-42003',
//                 title: '[CVE-2022-42003] CWE-502: Deserialization of Untrusted Data',
//                 source: 'oss-index',
//                 cvss: {
//                   attackVector: 'Network',
//                   attackComplexity: 'Low',
//                   privilegesRequired: 'None',
//                   userInteraction: 'None',
//                   scope: 'Unchanged',
//                   confidentialityImpact: 'None',
//                   integrityImpact: 'None',
//                   availabilityImpact: 'High',
//                   exploitCodeMaturity: undefined,
//                   remediationLevel: undefined,
//                   reportConfidence: undefined,
//                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
//                 },
//                 cvssScore: 7.5,
//                 severity: 'HIGH',
//                 cves: ['CVE-2022-42003'],
//                 unique: false,
//               },
//               {
//                 id: 'CVE-2022-42004',
//                 title: '[CVE-2022-42004] CWE-502: Deserialization of Untrusted Data',
//                 source: 'oss-index',
//                 cvss: {
//                   attackVector: 'Network',
//                   attackComplexity: 'Low',
//                   privilegesRequired: 'None',
//                   userInteraction: 'None',
//                   scope: 'Unchanged',
//                   confidentialityImpact: 'None',
//                   integrityImpact: 'None',
//                   availabilityImpact: 'High',
//                   exploitCodeMaturity: undefined,
//                   remediationLevel: undefined,
//                   reportConfidence: undefined,
//                   cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
//                 },
//                 cvssScore: 7.5,
//                 severity: 'HIGH',
//                 cves: ['CVE-2022-42004'],
//                 unique: false,
//               },
//               {
//                 id: 'SNYK-JAVA-COMFASTERXMLJACKSONCORE-3038424',
//                 title: 'Denial of Service (DoS)',
//                 source: 'snyk',
//                 cvss: {
//                   attackVector: 'Network',
//                   attackComplexity: 'High',
//                   privilegesRequired: 'None',
//                   userInteraction: 'None',
//                   scope: 'Unchanged',
//                   confidentialityImpact: 'None',
//                   integrityImpact: 'None',
//                   availabilityImpact: 'High',
//                   exploitCodeMaturity: 'Proof of concept code',
//                   remediationLevel: undefined,
//                   reportConfidence: undefined,
//                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P',
//                 },
//                 cvssScore: 5.9,
//                 severity: 'MEDIUM',
//                 cves: [],
//                 unique: true,
//               },
//               {
//                 id: 'SNYK-JAVA-COMFASTERXMLJACKSONCORE-3038426',
//                 title: 'Denial of Service (DoS)',
//                 source: 'snyk',
//                 cvss: {
//                   attackVector: 'Network',
//                   attackComplexity: 'High',
//                   privilegesRequired: 'None',
//                   userInteraction: 'None',
//                   scope: 'Unchanged',
//                   confidentialityImpact: 'None',
//                   integrityImpact: 'None',
//                   availabilityImpact: 'High',
//                   exploitCodeMaturity: 'Proof of concept code',
//                   remediationLevel: undefined,
//                   reportConfidence: undefined,
//                   cvss: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H/E:P',
//                 },
//                 cvssScore: 5.9,
//                 severity: 'MEDIUM',
//                 cves: ['CVE-2022-42003'],
//                 unique: false,
//               },
//             ],
//             remediations: {
//               'CVE-2020-36518': {
//                 issueRef: 'CVE-2020-36518',
//                 mavenPackage:
//                   'pkg:maven/com.fasterxml.jackson.core/jackson-databind@2.13.1.Final-redhat-00002',
//                 productStatus: 'known_affected',
//               },
//             },
//             highestVulnerability: {
//               id: 'SNYK-JAVA-COMFASTERXMLJACKSONCORE-2421244',
//               title: 'Denial of Service (DoS)',
//               source: 'snyk',
//               cvss: {
//                 attackVector: 'Network',
//                 attackComplexity: 'Low',
//                 privilegesRequired: 'None',
//                 userInteraction: 'None',
//                 scope: 'Unchanged',
//                 confidentialityImpact: 'None',
//                 integrityImpact: 'None',
//                 availabilityImpact: 'High',
//                 exploitCodeMaturity: undefined,
//                 remediationLevel: undefined,
//                 reportConfidence: undefined,
//                 cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
//               },
//               cvssScore: 7.5,
//               severity: 'HIGH',
//               cves: ['CVE-2020-36518'],
//               unique: false,
//             },
//           },
//         ],
//         recommendation: 'pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.redhat-00001',
//         remediations: {},
//         highestVulnerability: {
//           id: 'SNYK-JAVA-COMFASTERXMLJACKSONCORE-2421244',
//           title: 'Denial of Service (DoS)',
//           source: 'snyk',
//           cvss: {
//             attackVector: 'Network',
//             attackComplexity: 'Low',
//             privilegesRequired: 'None',
//             userInteraction: 'None',
//             scope: 'Unchanged',
//             confidentialityImpact: 'None',
//             integrityImpact: 'None',
//             availabilityImpact: 'High',
//             exploitCodeMaturity: undefined,
//             remediationLevel: undefined,
//             reportConfidence: undefined,
//             cvss: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
//           },
//           cvssScore: 7.5,
//           severity: 'HIGH',
//           cves: ['CVE-2020-36518'],
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
//                 source: 'snyk',
//                 cvss: {
//                   attackVector: 'Local',
//                   attackComplexity: 'High',
//                   privilegesRequired: 'Low',
//                   userInteraction: 'None',
//                   scope: 'Unchanged',
//                   confidentialityImpact: 'High',
//                   integrityImpact: 'None',
//                   availabilityImpact: 'None',
//                   exploitCodeMaturity: undefined,
//                   remediationLevel: undefined,
//                   reportConfidence: undefined,
//                   cvss: 'CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N',
//                 },
//                 cvssScore: 4.7,
//                 severity: 'MEDIUM',
//                 cves: ['CVE-2022-41946'],
//                 unique: false,
//               },
//             ],
//             remediations: {
//               'CVE-2022-41946': {
//                 issueRef: 'CVE-2022-41946',
//                 mavenPackage:
//                   'pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.7.Final-redhat-00003',
//                 productStatus: 'fixed',
//               },
//             },
//             highestVulnerability: {
//               id: 'SNYK-JAVA-ORGPOSTGRESQL-3146847',
//               title: 'Information Exposure',
//               source: 'snyk',
//               cvss: {
//                 attackVector: 'Local',
//                 attackComplexity: 'High',
//                 privilegesRequired: 'Low',
//                 userInteraction: 'None',
//                 scope: 'Unchanged',
//                 confidentialityImpact: 'High',
//                 integrityImpact: 'None',
//                 availabilityImpact: 'None',
//                 exploitCodeMaturity: undefined,
//                 remediationLevel: undefined,
//                 reportConfidence: undefined,
//                 cvss: 'CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N',
//               },
//               cvssScore: 4.7,
//               severity: 'MEDIUM',
//               cves: ['CVE-2022-41946'],
//               unique: false,
//             },
//           },
//         ],
//         recommendation: undefined,
//         remediations: {},
//         highestVulnerability: {
//           id: 'SNYK-JAVA-ORGPOSTGRESQL-3146847',
//           title: 'Information Exposure',
//           source: 'snyk',
//           cvss: {
//             attackVector: 'Local',
//             attackComplexity: 'High',
//             privilegesRequired: 'Low',
//             userInteraction: 'None',
//             scope: 'Unchanged',
//             confidentialityImpact: 'High',
//             integrityImpact: 'None',
//             availabilityImpact: 'None',
//             exploitCodeMaturity: undefined,
//             remediationLevel: undefined,
//             reportConfidence: undefined,
//             cvss: 'CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N',
//           },
//           cvssScore: 4.7,
//           severity: 'MEDIUM',
//           cves: ['CVE-2022-41946'],
//           unique: false,
//         },
//       },
//     ],
//   },
//   ossIndexIssueLinkFormatter: {
//     issuePathRegex: 'http://ossindex.sonatype.org/vulnerability/%s',
//   },
//   snykIssueLinkFormatter: {
//     issuePathRegex:
//       'https://security.snyk.io/vuln/%s?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/%s',
//   },
//   sbomPath: 'https://tc-storage-mvp.s3.amazonaws.com/sboms/sbom.json',
//   snykSignup:
//     'https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9',
//   dependencyHelper: {},
// };

const report1: Report = {
  packagePath: 'https://central.sonatype.com/artifact/',
  remediationPath: 'https://maven.repository.redhat.com/ga/',
  issueVisibilityHelper: {
    providerData: null,
  },
  vexPath: 'https://tc-storage-mvp.s3.amazonaws.com/vexes/',
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
  //       ok: false,
  //       name: 'snyk',
  //       code: 403,
  //       message: "Forbidden: The provided credentials don't have the required permissions.",
  //     },
  //     summary: {
  //       dependencies: {
  //         scanned: null,
  //         transitive: null,
  //       },
  //       vulnerabilities: {
  //         direct: null,
  //         total: null,
  //         critical: null,
  //         high: null,
  //         medium: null,
  //         low: null,
  //       },
  //     },
  //     dependencies: [],
  //   },
  // },
  report: {
    "oss-index": {
      "status": {
        "ok": true,
        "name": "oss-index",
        "code": 200,
        "message": "OK"
      },
      "summary": {
        "dependencies": {
          "scanned": 10,
          "transitive": 301
        },
        "vulnerabilities": {
          "direct": 2,
          "total": 18,
          "critical": 0,
          "high": 5,
          "medium": 10,
          "low": 3
        }
      },
      "dependencies": [
        {
          "ref": "pkg:maven/io.quarkus/quarkus-resteasy@2.13.5.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
              "issues": [
                {
                  "id": "CVE-2023-2974",
                  "title": "[CVE-2023-2974] CWE-Other",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 8.1,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2023-2974"
                  ],
                  "unique": false
                },
                {
                  "id": "CVE-2023-0044",
                  "title": "[CVE-2023-0044] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Changed",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"
                  },
                  "cvssScore": 6.1,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-0044"
                  ],
                  "unique": false
                }
              ],
              "remediations": {
                "CVE-2023-0044": {
                  "issueRef": "CVE-2023-0044",
                  "mavenPackage": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003",
                  "productStatus": "fixed"
                }
              },
              "highestVulnerability": {
                "id": "CVE-2023-2974",
                "title": "[CVE-2023-2974] CWE-Other",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 8.1,
                "severity": "HIGH",
                "cves": [
                  "CVE-2023-2974"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/org.jboss.resteasy/resteasy-core@4.7.7.Final",
              "issues": [
                {
                  "id": "CVE-2023-0482",
                  "title": "[CVE-2023-0482] CWE-Other",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-0482"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2023-0482",
                "title": "[CVE-2023-0482] CWE-Other",
                "cvss": {
                  "attackVector": "Local",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                },
                "cvssScore": 5.5,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-0482"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {},
          "highestVulnerability": {
            "id": "CVE-2023-2974",
            "title": "[CVE-2023-2974] CWE-Other",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "Low",
              "privilegesRequired": "Low",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "High",
              "integrityImpact": "High",
              "availabilityImpact": "None",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
            },
            "cvssScore": 8.1,
            "severity": "HIGH",
            "cves": [
              "CVE-2023-2974"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-hibernate-orm-deployment@2.0.2.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/org.jsoup/jsoup@1.12.1",
              "issues": [
                {
                  "id": "CVE-2021-37714",
                  "title": "[CVE-2021-37714] CWE-248: Uncaught Exception",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2021-37714"
                  ],
                  "unique": false
                },
                {
                  "id": "CVE-2022-36033",
                  "title": "[CVE-2022-36033] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Changed",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"
                  },
                  "cvssScore": 6.1,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2022-36033"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2021-37714",
                "title": "[CVE-2021-37714] CWE-248: Uncaught Exception",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": [
                  "CVE-2021-37714"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/com.google.guava/guava@25.1-android",
              "issues": [
                {
                  "id": "CVE-2023-2976",
                  "title": "[CVE-2023-2976] CWE-552: Files or Directories Accessible to External Parties",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 7.1,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2023-2976"
                  ],
                  "unique": false
                },
                {
                  "id": "CVE-2020-8908",
                  "title": "[CVE-2020-8908] CWE-379: Creation of Temporary File in Directory with Incorrect Permissions",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.3,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2020-8908"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2023-2976",
                "title": "[CVE-2023-2976] CWE-552: Files or Directories Accessible to External Parties",
                "cvss": {
                  "attackVector": "Local",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 7.1,
                "severity": "HIGH",
                "cves": [
                  "CVE-2023-2976"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/io.vertx/vertx-web@4.3.4",
              "issues": [
                {
                  "id": "CVE-2023-24815",
                  "title": "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-24815"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2023-24815",
                "title": "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                },
                "cvssScore": 5.3,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-24815"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/commons-io/commons-io@2.5",
              "issues": [
                {
                  "id": "CVE-2021-29425",
                  "title": "[CVE-2021-29425] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2021-29425"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2021-29425",
                "title": "[CVE-2021-29425] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                },
                "cvssScore": 5.3,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2021-29425"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",
              "issues": [
                {
                  "id": "CVE-2023-22006",
                  "title": "[CVE-2023-22006] CWE-noinfo",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.1,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22006"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2023-22006",
                "title": "[CVE-2023-22006] CWE-noinfo",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "Required",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "Low",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                },
                "cvssScore": 3.1,
                "severity": "LOW",
                "cves": [
                  "CVE-2023-22006"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {},
          "highestVulnerability": {
            "id": "CVE-2021-37714",
            "title": "[CVE-2021-37714] CWE-248: Uncaught Exception",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "Low",
              "privilegesRequired": "None",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "None",
              "integrityImpact": "None",
              "availabilityImpact": "High",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
            },
            "cvssScore": 7.5,
            "severity": "HIGH",
            "cves": [
              "CVE-2021-37714"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
          "issues": [
            {
              "id": "CVE-2023-2974",
              "title": "[CVE-2023-2974] CWE-Other",
              "cvss": {
                "attackVector": "Network",
                "attackComplexity": "Low",
                "privilegesRequired": "Low",
                "userInteraction": "None",
                "scope": "Unchanged",
                "confidentialityImpact": "High",
                "integrityImpact": "High",
                "availabilityImpact": "None",
                "exploitCodeMaturity": null,
                "remediationLevel": null,
                "reportConfidence": null,
                "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N"
              },
              "cvssScore": 8.1,
              "severity": "HIGH",
              "cves": [
                "CVE-2023-2974"
              ],
              "unique": false
            },
            {
              "id": "CVE-2023-0044",
              "title": "[CVE-2023-0044] CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
              "cvss": {
                "attackVector": "Network",
                "attackComplexity": "Low",
                "privilegesRequired": "None",
                "userInteraction": "Required",
                "scope": "Changed",
                "confidentialityImpact": "Low",
                "integrityImpact": "Low",
                "availabilityImpact": "None",
                "exploitCodeMaturity": null,
                "remediationLevel": null,
                "reportConfidence": null,
                "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N"
              },
              "cvssScore": 6.1,
              "severity": "MEDIUM",
              "cves": [
                "CVE-2023-0044"
              ],
              "unique": false
            }
          ],
          "transitive": [
            {
              "ref": "pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final",
              "issues": [
                {
                  "id": "CVE-2022-41881",
                  "title": "[CVE-2022-41881] CWE-674: Uncontrolled Recursion",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2022-41881"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2022-41881",
                "title": "[CVE-2022-41881] CWE-674: Uncontrolled Recursion",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": [
                  "CVE-2022-41881"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/io.netty/netty-codec@4.1.82.Final",
              "issues": [
                {
                  "id": "CVE-2022-41915",
                  "title": "[CVE-2022-41915] CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2022-41915"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2022-41915",
                "title": "[CVE-2022-41915] CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers ('HTTP Response Splitting')",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "Low",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N"
                },
                "cvssScore": 6.5,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2022-41915"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/io.netty/netty-handler@4.1.78.Final",
              "issues": [
                {
                  "id": "CVE-2023-34462",
                  "title": "[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-34462"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2023-34462",
                "title": "[CVE-2023-34462] CWE-400: Uncontrolled Resource Consumption ('Resource Exhaustion')",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 6.5,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-34462"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/io.vertx/vertx-web@4.3.4",
              "issues": [
                {
                  "id": "CVE-2023-24815",
                  "title": "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-24815"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2023-24815",
                "title": "[CVE-2023-24815] CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N"
                },
                "cvssScore": 5.3,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-24815"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {
            "CVE-2023-0044": {
              "issueRef": "CVE-2023-0044",
              "mavenPackage": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003",
              "productStatus": "fixed"
            }
          },
          "highestVulnerability": {
            "id": "CVE-2022-41881",
            "title": "[CVE-2022-41881] CWE-674: Uncontrolled Recursion",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "Low",
              "privilegesRequired": "None",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "None",
              "integrityImpact": "None",
              "availabilityImpact": "High",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
            },
            "cvssScore": 7.5,
            "severity": "HIGH",
            "cves": [
              "CVE-2022-41881"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.5.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/org.postgresql/postgresql@42.5.0",
              "issues": [
                {
                  "id": "CVE-2022-41946",
                  "title": "[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.5,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2022-41946"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2022-41946",
                "title": "[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere",
                "cvss": {
                  "attackVector": "Local",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
                },
                "cvssScore": 5.5,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2022-41946"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {
            "CVE-2022-41946": {
              "issueRef": "CVE-2022-41946",
              "mavenPackage": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.7.Final-redhat-00003",
              "productStatus": "fixed"
            }
          },
          "highestVulnerability": {
            "id": "CVE-2022-41946",
            "title": "[CVE-2022-41946] CWE-668: Exposure of Resource to Wrong Sphere",
            "cvss": {
              "attackVector": "Local",
              "attackComplexity": "Low",
              "privilegesRequired": "Low",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "High",
              "integrityImpact": "None",
              "availabilityImpact": "None",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N"
            },
            "cvssScore": 5.5,
            "severity": "MEDIUM",
            "cves": [
              "CVE-2022-41946"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",
              "issues": [
                {
                  "id": "CVE-2023-22006",
                  "title": "[CVE-2023-22006] CWE-noinfo",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.1,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22006"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "CVE-2023-22006",
                "title": "[CVE-2023-22006] CWE-noinfo",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "Required",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "Low",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                },
                "cvssScore": 3.1,
                "severity": "LOW",
                "cves": [
                  "CVE-2023-22006"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {},
          "highestVulnerability": {
            "id": "CVE-2023-22006",
            "title": "[CVE-2023-22006] CWE-noinfo",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "High",
              "privilegesRequired": "None",
              "userInteraction": "Required",
              "scope": "Unchanged",
              "confidentialityImpact": "None",
              "integrityImpact": "Low",
              "availabilityImpact": "None",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
            },
            "cvssScore": 3.1,
            "severity": "LOW",
            "cves": [
              "CVE-2023-22006"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2",
          "issues": [],
          "transitive": [],
          "recommendation": "pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2.redhat-00001",
          "remediations": {},
          "highestVulnerability": null
        }
      ]
    },
    "snyk": {
      "status": {
        "ok": true,
        "name": "snyk",
        "code": 200,
        "message": "OK"
      },
      "summary": {
        "dependencies": {
          "scanned": 10,
          "transitive": 301
        },
        "vulnerabilities": {
          "direct": 2,
          "total": 44,
          "critical": 1,
          "high": 4,
          "medium": 20,
          "low": 19
        }
      },
      "dependencies": [
        {
          "ref": "pkg:maven/io.quarkus/quarkus-hibernate-orm-deployment@2.0.2.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/org.apache.maven.shared/maven-shared-utils@3.2.1",
              "issues": [
                {
                  "id": "SNYK-JAVA-ORGAPACHEMAVENSHARED-570592",
                  "title": "Command Injection",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                  },
                  "cvssScore": 9.8,
                  "severity": "CRITICAL",
                  "cves": [
                    "CVE-2022-29599"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGAPACHEMAVENSHARED-570592",
                "title": "Command Injection",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
                },
                "cvssScore": 9.8,
                "severity": "CRITICAL",
                "cves": [
                  "CVE-2022-29599"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/org.jsoup/jsoup@1.12.1",
              "issues": [
                {
                  "id": "SNYK-JAVA-ORGJSOUP-1567345",
                  "title": "Denial of Service (DoS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2021-37714"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGJSOUP-2989728",
                  "title": "Cross-site Scripting (XSS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 4.2,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2022-36033"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGJSOUP-1567345",
                "title": "Denial of Service (DoS)",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": [
                  "CVE-2021-37714"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",
              "issues": [
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 7.4,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2023-21930"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-21954"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title": "Denial of Service (DoS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-21967"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title": "Improper Input Validation",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-21939"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title": "Improper Access Control",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.1,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-22041"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title": "Improper Input Validation",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-21968"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title": "Improper Neutralization of Null Byte or NUL Character",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-21937"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title": "Remote Code Execution (RCE)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-21938"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title": "Denial of Service (DoS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22036"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title": "Access Restriction Bypass",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22049"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22045"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22044"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title": "Access Restriction Bypass",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.1,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22006"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                "title": "Information Exposure",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 7.4,
                "severity": "HIGH",
                "cves": [
                  "CVE-2023-21930"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/commons-io/commons-io@2.5",
              "issues": [
                {
                  "id": "SNYK-JAVA-COMMONSIO-1277109",
                  "title": "Directory Traversal",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Functional exploit exists",
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N/E:F"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2021-29425"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-COMMONSIO-1277109",
                "title": "Directory Traversal",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": "Functional exploit exists",
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N/E:F"
                },
                "cvssScore": 5.3,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2021-29425"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/io.vertx/vertx-web@4.3.4",
              "issues": [
                {
                  "id": "SNYK-JAVA-IOVERTX-3318108",
                  "title": "Directory Traversal",
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
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore": 4.8,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-24815"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-IOVERTX-3318108",
                "title": "Directory Traversal",
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
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                },
                "cvssScore": 4.8,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-24815"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/commons-codec/commons-codec@1.11",
              "issues": [
                {
                  "id": "SNYK-JAVA-COMMONSCODEC-561518",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [],
                  "unique": true
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-COMMONSCODEC-561518",
                "title": "Information Exposure",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                },
                "cvssScore": 3.7,
                "severity": "LOW",
                "cves": [],
                "unique": true
              }
            },
            {
              "ref": "pkg:maven/com.google.guava/guava@25.1-android",
              "issues": [
                {
                  "id": "SNYK-JAVA-COMGOOGLEGUAVA-1015415",
                  "title": "Information Disclosure",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": "Proof of concept code",
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N/E:P"
                  },
                  "cvssScore": 3.3,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2020-8908"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-COMGOOGLEGUAVA-5710356",
                  "title": "Creation of Temporary File in Directory with Insecure Permissions",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.3,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-2976"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-COMGOOGLEGUAVA-1015415",
                "title": "Information Disclosure",
                "cvss": {
                  "attackVector": "Local",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": "Proof of concept code",
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N/E:P"
                },
                "cvssScore": 3.3,
                "severity": "LOW",
                "cves": [
                  "CVE-2020-8908"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {},
          "highestVulnerability": {
            "id": "SNYK-JAVA-ORGAPACHEMAVENSHARED-570592",
            "title": "Command Injection",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "Low",
              "privilegesRequired": "None",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "High",
              "integrityImpact": "High",
              "availabilityImpact": "High",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
            },
            "cvssScore": 9.8,
            "severity": "CRITICAL",
            "cves": [
              "CVE-2022-29599"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
          "issues": [
            {
              "id": "SNYK-JAVA-IOQUARKUS-5768473",
              "title": "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
              "cvss": {
                "attackVector": "Network",
                "attackComplexity": "Low",
                "privilegesRequired": "High",
                "userInteraction": "None",
                "scope": "Unchanged",
                "confidentialityImpact": "High",
                "integrityImpact": "High",
                "availabilityImpact": "None",
                "exploitCodeMaturity": null,
                "remediationLevel": null,
                "reportConfidence": null,
                "cvss": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
              },
              "cvssScore": 6.5,
              "severity": "MEDIUM",
              "cves": [
                "CVE-2023-2974"
              ],
              "unique": false
            },
            {
              "id": "SNYK-JAVA-IOQUARKUS-3330765",
              "title": "Cross-site Scripting (XSS)",
              "cvss": {
                "attackVector": "Network",
                "attackComplexity": "Low",
                "privilegesRequired": "None",
                "userInteraction": "Required",
                "scope": "Unchanged",
                "confidentialityImpact": "Low",
                "integrityImpact": "Low",
                "availabilityImpact": "None",
                "exploitCodeMaturity": null,
                "remediationLevel": null,
                "reportConfidence": null,
                "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N"
              },
              "cvssScore": 5.4,
              "severity": "MEDIUM",
              "cves": [
                "CVE-2023-0044"
              ],
              "unique": false
            }
          ],
          "transitive": [
            {
              "ref": "pkg:maven/io.netty/netty-codec-haproxy@4.1.82.Final",
              "issues": [
                {
                  "id": "SNYK-JAVA-IONETTY-3167776",
                  "title": "Denial of Service (DoS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 7.5,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2022-41881"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-IONETTY-3167776",
                "title": "Denial of Service (DoS)",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 7.5,
                "severity": "HIGH",
                "cves": [
                  "CVE-2022-41881"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/io.netty/netty-handler@4.1.78.Final",
              "issues": [
                {
                  "id": "SNYK-JAVA-IONETTY-5725787",
                  "title": "Denial of Service (DoS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-34462"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-IONETTY-1042268",
                  "title": "Improper Certificate Validation",
                  "cvss": {
                    "attackVector": "Adjacent Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "Low",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": "Unproven that exploit exists",
                    "remediationLevel": "Unavailable",
                    "reportConfidence": "Reasonable",
                    "cvss": "CVSS:3.1/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:L/A:L/E:U/RL:U/RC:R"
                  },
                  "cvssScore": 5.6,
                  "severity": "MEDIUM",
                  "cves": [],
                  "unique": true
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-IONETTY-5725787",
                "title": "Denial of Service (DoS)",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "None",
                  "integrityImpact": "None",
                  "availabilityImpact": "High",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
                },
                "cvssScore": 6.5,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-34462"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/io.vertx/vertx-web@4.3.4",
              "issues": [
                {
                  "id": "SNYK-JAVA-IOVERTX-3318108",
                  "title": "Directory Traversal",
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
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                  },
                  "cvssScore": 4.8,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-24815"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-IOVERTX-3318108",
                "title": "Directory Traversal",
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
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N/E:P"
                },
                "cvssScore": 4.8,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-24815"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {
            "CVE-2023-0044": {
              "issueRef": "CVE-2023-0044",
              "mavenPackage": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003",
              "productStatus": "fixed"
            }
          },
          "highestVulnerability": {
            "id": "SNYK-JAVA-IONETTY-3167776",
            "title": "Denial of Service (DoS)",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "Low",
              "privilegesRequired": "None",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "None",
              "integrityImpact": "None",
              "availabilityImpact": "High",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H"
            },
            "cvssScore": 7.5,
            "severity": "HIGH",
            "cves": [
              "CVE-2022-41881"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-hibernate-orm@2.13.5.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/org.graalvm.sdk/graal-sdk@22.3.0",
              "issues": [
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 7.4,
                  "severity": "HIGH",
                  "cves": [
                    "CVE-2023-21930"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457927",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-21954"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457929",
                  "title": "Denial of Service (DoS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "High",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H"
                  },
                  "cvssScore": 5.9,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-21967"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457925",
                  "title": "Improper Input Validation",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-21939"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781374",
                  "title": "Improper Access Control",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 5.1,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-22041"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457921",
                  "title": "Improper Input Validation",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-21968"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457923",
                  "title": "Improper Neutralization of Null Byte or NUL Character",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-21937"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5457931",
                  "title": "Remote Code Execution (RCE)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-21938"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781367",
                  "title": "Denial of Service (DoS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "None",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22036"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781369",
                  "title": "Access Restriction Bypass",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22049"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781371",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22045"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781373",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N"
                  },
                  "cvssScore": 3.7,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22044"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-ORGGRAALVMSDK-5781378",
                  "title": "Access Restriction Bypass",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "High",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "None",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:L/A:N"
                  },
                  "cvssScore": 3.1,
                  "severity": "LOW",
                  "cves": [
                    "CVE-2023-22006"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGGRAALVMSDK-5457933",
                "title": "Information Exposure",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "High",
                  "privilegesRequired": "None",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 7.4,
                "severity": "HIGH",
                "cves": [
                  "CVE-2023-21930"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {},
          "highestVulnerability": {
            "id": "SNYK-JAVA-ORGGRAALVMSDK-5457933",
            "title": "Information Exposure",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "High",
              "privilegesRequired": "None",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "High",
              "integrityImpact": "High",
              "availabilityImpact": "None",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N"
            },
            "cvssScore": 7.4,
            "severity": "HIGH",
            "cves": [
              "CVE-2023-21930"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-resteasy@2.13.5.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.5.Final",
              "issues": [
                {
                  "id": "SNYK-JAVA-IOQUARKUS-5768473",
                  "title": "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "High",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "High",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
                  },
                  "cvssScore": 6.5,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-2974"
                  ],
                  "unique": false
                },
                {
                  "id": "SNYK-JAVA-IOQUARKUS-3330765",
                  "title": "Cross-site Scripting (XSS)",
                  "cvss": {
                    "attackVector": "Network",
                    "attackComplexity": "Low",
                    "privilegesRequired": "None",
                    "userInteraction": "Required",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N"
                  },
                  "cvssScore": 5.4,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-0044"
                  ],
                  "unique": false
                }
              ],
              "remediations": {
                "CVE-2023-0044": {
                  "issueRef": "CVE-2023-0044",
                  "mavenPackage": "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.7.Final-redhat-00003",
                  "productStatus": "fixed"
                }
              },
              "highestVulnerability": {
                "id": "SNYK-JAVA-IOQUARKUS-5768473",
                "title": "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
                "cvss": {
                  "attackVector": "Network",
                  "attackComplexity": "Low",
                  "privilegesRequired": "High",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "High",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
                },
                "cvssScore": 6.5,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-2974"
                ],
                "unique": false
              }
            },
            {
              "ref": "pkg:maven/org.jboss.resteasy/resteasy-core@4.7.7.Final",
              "issues": [
                {
                  "id": "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                  "title": "Creation of Temporary File With Insecure Permissions",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "Low",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "Low",
                    "integrityImpact": "Low",
                    "availabilityImpact": "Low",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                  },
                  "cvssScore": 5.3,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2023-0482"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGJBOSSRESTEASY-3338627",
                "title": "Creation of Temporary File With Insecure Permissions",
                "cvss": {
                  "attackVector": "Local",
                  "attackComplexity": "Low",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "Low",
                  "integrityImpact": "Low",
                  "availabilityImpact": "Low",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L"
                },
                "cvssScore": 5.3,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2023-0482"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {},
          "highestVulnerability": {
            "id": "SNYK-JAVA-IOQUARKUS-5768473",
            "title": "Selection of Less-Secure Algorithm During Negotiation ('Algorithm Downgrade')",
            "cvss": {
              "attackVector": "Network",
              "attackComplexity": "Low",
              "privilegesRequired": "High",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "High",
              "integrityImpact": "High",
              "availabilityImpact": "None",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N"
            },
            "cvssScore": 6.5,
            "severity": "MEDIUM",
            "cves": [
              "CVE-2023-2974"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.5.Final",
          "issues": [],
          "transitive": [
            {
              "ref": "pkg:maven/org.postgresql/postgresql@42.5.0",
              "issues": [
                {
                  "id": "SNYK-JAVA-ORGPOSTGRESQL-3146847",
                  "title": "Information Exposure",
                  "cvss": {
                    "attackVector": "Local",
                    "attackComplexity": "High",
                    "privilegesRequired": "Low",
                    "userInteraction": "None",
                    "scope": "Unchanged",
                    "confidentialityImpact": "High",
                    "integrityImpact": "None",
                    "availabilityImpact": "None",
                    "exploitCodeMaturity": null,
                    "remediationLevel": null,
                    "reportConfidence": null,
                    "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N"
                  },
                  "cvssScore": 4.7,
                  "severity": "MEDIUM",
                  "cves": [
                    "CVE-2022-41946"
                  ],
                  "unique": false
                }
              ],
              "remediations": {},
              "highestVulnerability": {
                "id": "SNYK-JAVA-ORGPOSTGRESQL-3146847",
                "title": "Information Exposure",
                "cvss": {
                  "attackVector": "Local",
                  "attackComplexity": "High",
                  "privilegesRequired": "Low",
                  "userInteraction": "None",
                  "scope": "Unchanged",
                  "confidentialityImpact": "High",
                  "integrityImpact": "None",
                  "availabilityImpact": "None",
                  "exploitCodeMaturity": null,
                  "remediationLevel": null,
                  "reportConfidence": null,
                  "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N"
                },
                "cvssScore": 4.7,
                "severity": "MEDIUM",
                "cves": [
                  "CVE-2022-41946"
                ],
                "unique": false
              }
            }
          ],
          "recommendation": null,
          "remediations": {
            "CVE-2022-41946": {
              "issueRef": "CVE-2022-41946",
              "mavenPackage": "pkg:maven/io.quarkus/quarkus-jdbc-postgresql@2.13.7.Final-redhat-00003",
              "productStatus": "fixed"
            }
          },
          "highestVulnerability": {
            "id": "SNYK-JAVA-ORGPOSTGRESQL-3146847",
            "title": "Information Exposure",
            "cvss": {
              "attackVector": "Local",
              "attackComplexity": "High",
              "privilegesRequired": "Low",
              "userInteraction": "None",
              "scope": "Unchanged",
              "confidentialityImpact": "High",
              "integrityImpact": "None",
              "availabilityImpact": "None",
              "exploitCodeMaturity": null,
              "remediationLevel": null,
              "reportConfidence": null,
              "cvss": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N"
            },
            "cvssScore": 4.7,
            "severity": "MEDIUM",
            "cves": [
              "CVE-2022-41946"
            ],
            "unique": false
          }
        },
        {
          "ref": "pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2",
          "issues": [],
          "transitive": [],
          "recommendation": "pkg:maven/jakarta.validation/jakarta.validation-api@2.0.2.redhat-00001",
          "remediations": {},
          "highestVulnerability": null
        }
      ]
    }
  },
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

MOCK_REPORT = report1;
