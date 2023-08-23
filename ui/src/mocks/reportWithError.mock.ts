import { Report } from '@app/api/report';

export const errorReport: Report = {
  packagePath: 'https://central.sonatype.com/artifact/',
  remediationPath: 'https://maven.repository.redhat.com/ga/',
  issueVisibilityHelper: { providerData: null },
  vexPath: 'https://tc-storage-mvp.s3.amazonaws.com/vexes/',
  report: {
      summary: {
        dependencies: { scanned: null, transitive: null },
        vulnerabilities: {
          direct: null,
          total: null,
          critical: null,
          high: null,
          medium: null,
          low: null,
        },
        providerStatuses:[{
          ok: false,
          provider: 'snyk',
          status: 500,
          message:'Server Error'

        }]
      },
      dependencies: [],
    },
  ossIndexIssueLinkFormatter: { issuePathRegex: 'http://ossindex.sonatype.org/vulnerability/%s' },
  snykIssueLinkFormatter: {
    issuePathRegex:
      'https://security.snyk.io/vuln/%s?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/%s',
  },
  sbomPath: 'https://tc-storage-mvp.s3.amazonaws.com/sboms/sbom.json',
  snykSignup:
    'https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9',
  dependencyHelper: {},
};
