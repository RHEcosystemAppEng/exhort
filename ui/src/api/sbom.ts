export interface Sbom {
  packagePath: string;
  remediationPath: string;
  issueVisibilityHelper: {
    providerData?: string;
  };
  vexPath: string;
  report: {
    summary: {
      dependencies: {
        scanned: number;
        transitive: number;
      };
      vulnerabilities: {
        direct: number;
        total: number;
        critical: number;
        high: number;
        medium: number;
        low: number;
      };
      providerStatuses: [
        {
          ok: boolean;
          provider: string;
          status: number;
          message: string;
        },
        {
          ok: boolean;
          provider: string;
          status: number;
          message: string;
        },
      ];
    };
    dependencies: Dependency[];
  };
  ossIndexIssueLinkFormatter: {
    issuePathRegex: string;
  };
  snykIssueLinkFormatter: {
    issuePathRegex: string;
  };
  sbomPath: string;
  snykSignup: string;
  dependencyHelper: {};
}

export interface Dependency {
  ref: string;
  issues: string[];
  transitive: [
    {
      ref: string;
      issues: {
        id: string;
        title: string;
        source: string;
        cvss: {
          attackVector: string;
          attackComplexity: string;
          privilegesRequired: string;
          userInteraction: string;
          scope: string;
          confidentialityImpact: string;
          integrityImpact: string;
          availabilityImpact: string;
          exploitCodeMaturity?: string;
          remediationLevel?: string;
          reportConfidence?: string;
          cvss: string;
        };
        cvssScore: number;
        severity: string;
        cves: string[];
        unique: boolean;
      }[];
      remediations: {
        [key: string]: {
          issueRef: string;
          mavenPackage: string;
          productStatus: string;
        };
      };
      highestVulnerability: {
        id: string;
        title: string;
        source: string;
        cvss: {
          attackVector: string;
          attackComplexity: string;
          privilegesRequired: string;
          userInteraction: string;
          scope: string;
          confidentialityImpact: string;
          integrityImpact: string;
          availabilityImpact: string;
          exploitCodeMaturity?: string;
          remediationLevel?: string;
          reportConfidence?: string;
          cvss: string;
        };
        cvssScore: number;
        severity: string;
        cves: string[];
        unique: boolean;
      };
    },
  ];
  recommendation?: string;
  remediations: {};
  highestVulnerability: {
    id: string;
    title: string;
    source: string;
    cvss: {
      attackVector: string;
      attackComplexity: string;
      privilegesRequired: string;
      userInteraction: string;
      scope: string;
      confidentialityImpact: string;
      integrityImpact: string;
      availabilityImpact: string;
      exploitCodeMaturity?: string;
      remediationLevel?: string;
      reportConfidence?: string;
      cvss: string;
    };
    cvssScore: number;
    severity: string;
    cves: string[];
    unique: boolean;
  };
}
