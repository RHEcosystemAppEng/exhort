export interface Report {
  packagePath: string;
  remediationPath: string;
  issueVisibilityHelper: {
    providerData?: string[] | null;
  };
  vexPath: string;
  report: {
    [providerName: string]: Provider;
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

export interface Provider {
  status: {
    ok: boolean;
    name: string;
    code: number;
    message: string;
  };
  summary: {
    dependencies: {
      scanned: number | null;
      transitive: number | null;
    };
    vulnerabilities: {
      direct: number | null;
      total: number | null;
      critical: number | null;
      high: number | null;
      medium: number | null;
      low: number | null;
    };
  };
  dependencies: Dependency[];
}

export interface TransitiveDependency {
  ref: string;
  issues: Vulnerability[];
  remediations: {
    [key: string]: {
      issueRef: string;
      mavenPackage: string;
      productStatus: string;
    };
  };
  highestVulnerability: Vulnerability;
}

export interface Dependency {
  ref: string;
  issues: Vulnerability[] | null;
  transitive: TransitiveDependency[];
  recommendation: string | null;
  remediations: {
    [key: string]: {
      issueRef: string;
      mavenPackage: string;
      productStatus: string;
    };
  };
  highestVulnerability: Vulnerability | null;
}

export interface Vulnerability {
  id: string;
  title: string;
  cvss: Cvss | null;
  cvssScore: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cves: string[] | null;
  unique: boolean;
}

export interface Cvss {
  attackVector: string;
  attackComplexity: string;
  privilegesRequired: string;
  userInteraction: string;
  scope: string;
  confidentialityImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
  exploitCodeMaturity: string | null;
  remediationLevel: string | null;
  reportConfidence?: string | null;
  cvss: string;
}
