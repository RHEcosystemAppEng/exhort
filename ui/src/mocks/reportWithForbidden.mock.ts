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
  ossIssueTemplate: 'http://ossindex.sonatype.org/vulnerability/%s',
  snykIssueTemplate: 'https://security.snyk.io/vuln/%s?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/%s',
  snykSignup: 'https://app.snyk.io/login',
};
