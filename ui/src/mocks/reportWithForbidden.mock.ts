import { AppData } from '@app/api/report';

export const forbiddenReport: AppData = {
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
          "code": 403,
          "message": "Forbidden: The provided credentials don't have the required permissions."
        }
      },
      "snyk": {
        "status": {
          "ok": false,
          "name": "snyk",
          "code": 403,
          "message": "Forbidden: The provided credentials don't have the required permissions."
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
