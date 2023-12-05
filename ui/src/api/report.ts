import { getSignUpLink } from "../utils/utils";

export interface AppData {
  providerPrivateData?: string[] | null;
  report: Report;
  ossIssueTemplate: string;
  snykIssueTemplate: string;
  snykSignup: string;
}

export interface Report {
  scanned: {
    direct: number;
    transitive: number;
    total: number;
  };
  providers: {
    [key: string]: {
      status: ProviderStatus;
      sources?: {
        [key: string]: SourceReport;
      };
    };
  };
}

export interface ProviderStatus {
  ok: boolean;
  name: string;
  code: number;
  message: string | null;
}

export interface Summary {
  direct: number;
  transitive: number;
  total: number;
  dependencies: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  remediations: number;
  recommendations: number;
}

export interface TransitiveDependency {
  ref: string;
  issues?: Vulnerability[];
  remediations?: {
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
  issues?: Vulnerability[];
  transitive?: TransitiveDependency[];
  highestVulnerability: Vulnerability | null;
}

export function getSources(report: Report): SourceItem[] {
  var result: SourceItem[] = [];
  Object.keys(report.providers).forEach((provider) => {
    const sources = report.providers[provider].sources;
    if (sources !== undefined && Object.keys(sources).length > 0) {
      Object.keys(sources).forEach((source) => {
        result.push({
          provider: provider,
          source: source,
          report: sources[source],
        } as SourceItem);
      });
    } else {
      result.push({
        provider: provider,
        source: provider,
        report: {} as SourceReport,
      } as SourceItem);
    }
  });
  return result.sort((a, b) => {
    if(Object.keys(a.report).length === 0 && Object.keys(b.report).length === 0) {
      if(getSignUpLink(a.provider) === '') {
        return getSignUpLink(b.provider) === '' ? 0 : -1;
      }
      return 1;
    }
    return Object.keys(b.report).length - Object.keys(a.report).length;
  });
}

export function getSourceName(item: SourceItem): string {
  if (item === undefined) {
    return 'unknown';
  }
  if (item.provider !== item.source) {
    return `$item.provider/$item.source`;
  }
  return item.provider;
}

export interface SourceItem {
  provider: string;
  source: string;
  report: SourceReport;
}

export interface SourceReport {
  summary: Summary;
  dependencies: Dependency[];
}

export interface VulnerabilityItem {
  id: string;
  dependencyRef: string;
  vulnerability: Vulnerability;
}

export interface Vulnerability {
  id: string;
  title: string;
  source: string;
  cvss?: Cvss;
  cvssScore: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cves?: string[];
  unique: boolean;
  remediation?: {
    fixedIn?: string[] | null;
    trustedContent?: {
      mavenPackage: string | null;
      productStatus: string | null;
    };
  };
}

export interface Cvss {
  attackVector?: string;
  attackComplexity?: string;
  privilegesRequired?: string;
  userInteraction?: string;
  scope?: string;
  confidentialityImpact?: string;
  integrityImpact?: string;
  availabilityImpact?: string;
  exploitCodeMaturity?: string;
  remediationLevel?: string;
  reportConfidence?: string;
  cvss: string;
}

export function hasRemediations(vulnerability: Vulnerability): boolean {
  if (
    vulnerability.remediation &&
    (vulnerability.remediation.fixedIn || vulnerability.remediation?.trustedContent)
  ) {
    return true;
  }
  return false;
}

export function buildVulnerabilityItems(
  transitiveDependencies: TransitiveDependency[],
): VulnerabilityItem[] {
  var rows: VulnerabilityItem[] = [];
  transitiveDependencies
    .map((transitive) => {
      return {
        dependencyRef: transitive.ref,
        vulnerabilities: transitive.issues || [],
      };
    })
    .forEach((item) => {
      item.vulnerabilities?.forEach((v) => {
        if (v.cves && v.cves.length > 0) {
          v.cves.forEach((cve) => {
            rows.push({
              id: cve,
              dependencyRef: item.dependencyRef,
              vulnerability: v,
            });
          });
        } else {
          rows.push({
            id: v.id,
            dependencyRef: item.dependencyRef,
            vulnerability: v,
          });
        }
      });
    });
  return rows.sort((a, b) => b.vulnerability.cvssScore - a.vulnerability.cvssScore);
}
