export interface AppData {
  packagePath: string;
  remediationPath: string;
  providerPrivateData?: string[] | null;
  vexPath: string;
  report: Report;
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

export interface Report {
  scanned: {
    direct: number;
    transitive: number;
    total: number;
  }
  providers: {
    [key: string]: {
      status: {
        ok: boolean;
        name: string;
        code: number;
        message: string | null;
      },
      sources?: {
        [key: string]: SourceReport
      }
    }
  }
};

export interface Summary {
  direct: number,
  transitive: number,
  total: number,
  dependencies: number,
  critical: number,
  high: number,
  medium: number,
  low: number,
  remediations: number,
  recommendations: number
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
  transitive: TransitiveDependency[];
  highestVulnerability: Vulnerability | null;
}

export function getSources(report: Report): SourceItem[] {
  var result: SourceItem[] = [];
  Object.keys(report.providers).forEach(provider => {
    const sources = report.providers[provider].sources;
    if(sources !== undefined) {
      Object.keys(sources).forEach(source => {
        result.push(<SourceItem>{
          provider: provider,
          source: source,
          report: sources[source]
        })
      })
    }
  })
  return result;
}

export function getSourceName(item: SourceItem): string {
  if(item === undefined) {
    return "unknown";
  }
  if(item.provider !== item.source) {
    return `$item.provider/$item.source`
  }
  return item.provider;
}

export interface SourceItem {
  provider: string,
  source: string,
  report: SourceReport
}

export interface SourceReport {
  summary: Summary,
  dependencies: Dependency[]
}

export interface VulnerabilityItem {
  id: string,
  dependencyRef: string,
  vulnerability: Vulnerability
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
  }
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
  if(vulnerability.remediation 
      && (vulnerability.remediation.fixedIn || vulnerability.remediation?.trustedContent)) {
    return true;
  }
  return false;
}

export function buildVulnerabilityItems(transitiveDependencies: TransitiveDependency[]): VulnerabilityItem[] {
  var rows: VulnerabilityItem[] = [];
  transitiveDependencies.map(transitive => {
    return {
      dependencyRef: transitive.ref,
      vulnerabilities: transitive.issues || []
    
  }}).forEach(item => {
    item.vulnerabilities.forEach(v => {
      if(v.cves) {
        v.cves.forEach(cve => {
          rows.push({
            id: cve, 
            dependencyRef: item.dependencyRef,
            vulnerability: v
          });
        })
      } else {
        rows.push({
          id: v.id,
          dependencyRef: item.dependencyRef,
          vulnerability: v
        })
      }
    });
  });
  return rows.sort((a, b) => b.vulnerability.cvssScore - a.vulnerability.cvssScore);
}
