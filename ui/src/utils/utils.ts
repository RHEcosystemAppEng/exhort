export const SYNK_SIGNUP_URL =
  'https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9';

const MAVEN_PREFIX = 'pkg:maven';
const MAVEN_URL = 'https://central.sonatype.com/artifact/';

const NPM_PREFIX = 'pkg:npm';
const NPM_URL = 'https://www.npmjs.com/package/';

const PYPI_PREFIX = 'pkg:pypi';
const PYPI_URL = 'https://pypi.org/project/';

const GOLANG_PREFIX = 'pkg:golang';
const GOLANG_URL = 'https://pkg.go.dev/';

const getPrefix = (name: string) => {
  if (name.startsWith(MAVEN_PREFIX)) {
    return MAVEN_PREFIX;
  }
  if (name.startsWith(NPM_PREFIX)) {
    return NPM_PREFIX;
  }
  if (name.startsWith(PYPI_PREFIX)) {
    return PYPI_PREFIX;
  }
  if (name.startsWith(GOLANG_PREFIX)) {
    return GOLANG_PREFIX;
  }
  return name;
}

const getBaseUrl = (prefix: string) => {
  switch (prefix) {
    case MAVEN_PREFIX:
      return MAVEN_URL;
    case NPM_PREFIX:
      return NPM_URL;
    case PYPI_PREFIX:
      return PYPI_URL;
    case GOLANG_PREFIX:
      return GOLANG_URL;
    default:
      return '';
  };
}

export const extractDependencyName = (name: string) => {
  return name.substring(0, name.lastIndexOf('@')) // Remove version
    .substring(getPrefix(name).length + 1, name.length) // Remove package prefix
    .replace(/\//g, ':');
};

export const extractDependencyUrl = (name: string) => {
  let prefix = getPrefix(name);
  switch(prefix) {
    case MAVEN_PREFIX:
    case PYPI_PREFIX:
      return (
        getBaseUrl(prefix) +
        name
          .replace(/@([^@]*)$/, '/$1') // Replace last '@' by '/'
          .substring(prefix.length + 1, name.length) // Remove package prefix
      );
    case NPM_PREFIX:
      return (
        getBaseUrl(prefix) +
        name
          .replace(/@([^@]*)$/, '/v/$1') // Replace last '@' by '/v/'
          .substring(prefix.length + 1, name.length + 2) // Remove package prefix
      );
    case GOLANG_PREFIX:
      return (getBaseUrl(prefix) +
        name
          .substring(prefix.length + 1, name.length) // Remove package prefix
      );
  }
  return name;
};

export const extractDependencyVersion = (name: string) => {
  return name.substring(name.lastIndexOf('@') + 1, name.length).replace(/\?.*/,'');
};

export const issueLink = (provider: 'snyk' | 'oss-index', issueId: string) => {
  switch (provider) {
    case 'snyk':
      return `https://security.snyk.io/vuln/${issueId}?utm_medium=Partner&utm_source=RedHat&utm_campaign=Code-Ready-Analytics-2020&utm_content=vuln/${issueId}`;
    case 'oss-index':
      return `http://ossindex.sonatype.org/vulnerability/${issueId}`;
  }
};

export const uppercaseFirstLetter = (val: string) => {
  return val.toLowerCase().replace(/./, (c) => c.toUpperCase());
};
