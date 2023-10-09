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

export interface ProviderSummary {
  status: {
    ok: boolean;
    name: string;
    code: number;
    message: string | null;
  };
  sources?: {
    [key: string]: SourceSummary;
  };
};

export function getSourceName(source: Source): string {
  if(source.origin === source.provider) {
    return source.provider;
  }
  return `$source.provider/$source.origin`;
}

export function getSources(report: Report): Source[] {
  var sources: Source[] = [];
  const providers = Object.keys(report.summary.providers);
  providers.map(provName => {
    const provider = report.summary.providers[provName];
    if(provider !== undefined && provider.sources !== undefined) {
      const origins = Object.keys(provider.sources);
      origins.map(origName => {
        sources.push(<Source>{
          provider: provName,
          origin: origName
        });
      })
    }
  });
  return sources;
}

export function getSourceSummary(report: Report, source: Source): SourceSummary {
  const provider = report.summary.providers[source.provider];
  if(provider === undefined || provider.sources === undefined) {
    return <SourceSummary>{};
  }
  return provider.sources[source.origin];
}

export interface SourceSummary {
  direct: number | null;
  transitive: number | null;
  total: number | null;
  dependencies: number | null;
  critical: number | null;
  high: number | null;
  medium: number | null;
  low: number | null;
  remediations: number | null;
  recommendations: number | null;
};

export interface Report {
  summary: {
    dependencies: {
      direct: number;
      transitive: number;
      total: number;
    };
    providers: {
      [key: string]: ProviderSummary;
    };
  };
  dependencies: Dependency[];
};

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

export interface Source {
  provider: string;
  origin: string;
}

export interface Vulnerability {
  id: string;
  title: string;
  source: Source;
  cvss: Cvss | null;
  cvssScore: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cves?: string[];
  unique: boolean;
  remediation?: {
    fixedIn: string[] | null;
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
