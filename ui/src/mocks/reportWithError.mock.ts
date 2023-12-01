import { AppData } from '@app/api/report';

export const errorReport: AppData = {
  providerPrivateData: null ,
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
          "code": 500,
          "message": "Another serious error"
        }
      },
      "snyk": {
        "status": {
          "ok": false,
          "name": "snyk",
          "code": 500,
          "message": "Unexpected error"
        }
      }
    }
  },
  ossIssueTemplate: 'http://ossindex.sonatype.org/vulnerability/__ISSUE_ID__' ,
  snykIssueTemplate: 'https://security.snyk.io/vuln/__ISSUE_ID__',
  snykSignup: 'https://app.snyk.io/login',
};
