import { AppData, ProviderStatus } from "../api/report";

const MAVEN_TYPE = 'maven';
const MAVEN_URL = 'https://central.sonatype.com/artifact/';

const GOLANG_TYPE = 'golang';
const GOLANG_URL = 'https://pkg.go.dev/';

const NPM_TYPE = 'npm';
const NPM_URL = 'https://www.npmjs.com/package/'

const PYPI_TYPE = 'pypi';
const PYPI_URL = 'https://pypi.org/project/';

const ISSUE_PLACEHOLDER = '__ISSUE_ID__';

const PURL_PKG_PREFIX = 'pkg:';

const SIGN_UP_TAB_PROVIDERS = ['oss-index'];

const OSS_SIGN_UP_LINK = 'https://ossindex.sonatype.org/user/register';

export const getSignUpLink = (provider: string): string => {
  switch(provider) {
    case 'oss-index': return OSS_SIGN_UP_LINK;
  }
  return '';
}

export const hasSignUpTab = (provider: ProviderStatus): boolean => {
  if(!provider.ok && provider.code === 401) {
    return SIGN_UP_TAB_PROVIDERS.includes(provider.name);
  }
  return false;
}

const extractName = (pkgUrl: PackageURL): string => {
  let result = '';
  if(pkgUrl.namespace) {
    if(pkgUrl.type === MAVEN_TYPE) {
      result = `${pkgUrl.namespace}:`;
    } else {
      result = `${pkgUrl.namespace}/`;
    }
  }
  result += `${pkgUrl.name}`;
  return result;
}

export const extractDependencyName = (name: string, showVersion: boolean) => {
  const pkgUrl = PackageURL.fromString(name);
  let result = extractName(pkgUrl);
  if(showVersion) {
    return result + `@${pkgUrl.version}`;
  }
  return result;
};

export const extractDependencyUrl = (name: string) => {
  const pkgUrl = PackageURL.fromString(name);
  switch(pkgUrl.type) {
    case MAVEN_TYPE:
      return `${MAVEN_URL}${pkgUrl.namespace}/${pkgUrl.name}/${pkgUrl.version}`;
    case GOLANG_TYPE:
      const version = pkgUrl.version;
      if(version?.match(/v\d\.\d.\d-\d{14}-\w{12}/)) { //pseudo-version
        return `${GOLANG_URL}${pkgUrl.namespace}/${pkgUrl.name}`;
      } 
      return `${GOLANG_URL}${pkgUrl.namespace}/${pkgUrl.name}@${pkgUrl.version}`;
    case NPM_TYPE:
      if(pkgUrl.namespace) {
        return `${NPM_URL}${pkgUrl.namespace}/${pkgUrl.name}/v/${pkgUrl.version}`
      }
      return `${NPM_URL}${pkgUrl.name}/v/${pkgUrl.version}`
    case PYPI_TYPE:
      if(pkgUrl.namespace) {
        return `${PYPI_URL}${pkgUrl.namespace}/${pkgUrl.name}/${pkgUrl.version}`
      }
      return `${PYPI_URL}${pkgUrl.name}/${pkgUrl.version}`
    default: return pkgUrl.toString();
  }
};

export const extractDependencyVersion = (name: string): string => {
  const version = PackageURL.fromString(name).version;
  return version ? version : '';
};

export const issueLink = (provider: string, issueId: string, appData: AppData) => {
  switch (provider) {
    case 'snyk':
      return appData.snykIssueTemplate.replace(ISSUE_PLACEHOLDER, issueId);
    case 'oss-index':
      return appData.ossIssueTemplate.replace(ISSUE_PLACEHOLDER, issueId);
  }
};

export const uppercaseFirstLetter = (val: string) => {
  return val.toLowerCase().replace(/./, (c) => c.toUpperCase());
};

class PackageURL {

  readonly type: string;
  readonly namespace: string | undefined | null;
  readonly name: string;
  readonly version: string | undefined | null;

  constructor(type: string,
    namespace: string | undefined | null,
    name: string,
    version: string | undefined | null) {
      this.type = type;
      this.namespace = namespace;
      this.name = name;
      this.version = version;
    }

  toString(): string {
    let name = this.name;
    if(this.version) {
      name += `@${this.version}`;
    }
    if(this.namespace) {
      return `${PURL_PKG_PREFIX}${this.type}/${this.namespace}/${name}`;
    }
    return `${PURL_PKG_PREFIX}${this.type}/${name}`;
  }

  static fromString(purl: string): PackageURL {
    let value = purl.replace(PURL_PKG_PREFIX, '');
    const qualifiersIdx = value.indexOf('?');
      if(qualifiersIdx !== -1) {
        value = value.substring(0, qualifiersIdx);
      }
    const type = value.substring(0, value.indexOf('/'));
    const parts = value.split('/');
    let namespace;
    if(parts.length > 2) {
      namespace = parts.slice(1, parts.length - 1).join('/');
    }
    let version;
    if(value.indexOf('@') !== -1) {
      version = value.substring(value.indexOf('@') + 1);
    }
    let name = parts[parts.length - 1];
    if(version) {
      name = name.substring(0, name.indexOf('@'));
    }
    return new PackageURL(type, namespace, name, version);
  }

}