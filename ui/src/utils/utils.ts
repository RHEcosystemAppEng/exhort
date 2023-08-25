export const SYNK_SIGNUP_URL =
  'https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9';

const MAVEN_PREFIX = 'pkg:maven';
const MAVEN_URL = 'https://central.sonatype.com/artifact/';

export const extractDependencyName = (name: string) => {
  if (name.startsWith(MAVEN_PREFIX)) {
    return name
      .substring(0, name.lastIndexOf('@')) // Remove version
      .substring(MAVEN_PREFIX.length + 1, name.length) // Remove package prefix
      .replaceAll('/', ':');
  } else {
    return name;
  }
};

export const extractDependencyUrl = (name: string) => {
  if (name.startsWith(MAVEN_PREFIX)) {
    return (
      MAVEN_URL +
      name
        .replace(/@([^@]*)$/, '/$1') // Replace last '@' by '/'
        .substring(MAVEN_PREFIX.length + 1, name.length) // Remove package prefix
    );
  } else {
    return name;
  }
};

export const extractDependencyVersion = (name: string) => {
  if (name.startsWith(MAVEN_PREFIX)) {
    return name.substring(name.lastIndexOf('@') + 1, name.length);
  } else {
    return name;
  }
};

export const issueLink = (provider: string, issueId: string) => {
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
