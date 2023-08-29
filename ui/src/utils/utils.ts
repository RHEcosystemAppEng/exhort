export const SYNK_SIGNUP_URL =
  'https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9';

const MAVEN_PREFIX = 'pkg:maven';
const MAVEN_URL = 'https://central.sonatype.com/artifact/';

const NPM_PREFIX = 'pkg:npm';
const NPM_URL = 'https://www.npmjs.com/package/';

export const extractDependencyName = (name: string) => {
  if (name.startsWith(MAVEN_PREFIX)) {
    return name
      .substring(0, name.lastIndexOf('@')) // Remove version
      .substring(MAVEN_PREFIX.length + 1, name.length) // Remove package prefix
      .replace(/\//g, ':');
  }
  if (name.startsWith(NPM_PREFIX)) {
    return name
    .substring(0, name.lastIndexOf('@')) // Remove version
    .substring(NPM_PREFIX.length + 1, name.length) // Remove package prefix
    .replace(/\//g, ':');
  }
  return name;
  
};

export const extractDependencyUrl = (name: string) => {
  if (name.startsWith(MAVEN_PREFIX)) {
    return (
      MAVEN_URL +
      name
        .replace(/@([^@]*)$/, '/$1') // Replace last '@' by '/'
        .substring(MAVEN_PREFIX.length + 1, name.length) // Remove package prefix
    );
  }
  if (name.startsWith(NPM_PREFIX)) {
    return (
      NPM_URL +
      name
        .replace(/@([^@]*)$/, '/v/$1') // Replace last '@' by '/v/'
        .substring(NPM_PREFIX.length + 1, name.length + 2) // Remove package prefix
    );
  }
  return name;
};

export const extractDependencyVersion = (name: string) => {
  if (name.startsWith(MAVEN_PREFIX) || name.startsWith(NPM_PREFIX)) {
    return name.substring(name.lastIndexOf('@') + 1, name.length);
  }
  return name;
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
