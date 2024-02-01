import { AppData } from '@app/api/report';

export const unauthorizedReport: AppData = {
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
          "name": 'oss-index',
          "code": 401,
          "message": 'Unauthorized: Verify the provided credentials are valid.'
        }
      },
      "snyk": {
        "status": {
          "ok": false,
          "name": 'snyk',
          "code": 401,
          "message": 'Unauthorized: Verify the provided credentials are valid.'
        }
      }
    },
  },
  ossIssueTemplate: 'http://ossindex.sonatype.org/vulnerability/__ISSUE_ID__',
  snykIssueTemplate: 'https://security.snyk.io/vuln/__ISSUE_ID__',
  nvdIssueTemplate: 'https://nvd.nist.gov/vuln/detail/__ISSUE_ID__',
  snykSignup: 'https://app.snyk.io/login',
};
