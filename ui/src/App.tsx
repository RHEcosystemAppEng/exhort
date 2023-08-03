import React, { createContext } from 'react';
import { PageSection, TextContent, Text } from '@patternfly/react-core';
import { Dashboard } from './Dashboard';
import { Command } from './Command';
import { MOCK_SBOM } from './mocks/sbom.mock';
import { Sbom } from '@app/api/sbom';

const sbom = (window as any)['sbomb'] || MOCK_SBOM;

export const AppContext = createContext<Sbom>(sbom);

function App() {
  return (
    <AppContext.Provider value={sbom}>
      <Dashboard>
        <PageSection variant="light">
          <TextContent>
            <Text component="h1">React.js + PatternFly 5</Text>
            <Text component="p">
              This is a demo to showcase that we can build out a regular CRA application with
              PatternFly 5, and consume it server-side in the freemarker template.
            </Text>
            <Text component="h2">Start mvn server</Text>
            <Command>
              mvn quarkus:dev -Dquarkus.http.port=8080 -Dapi.snyk.token=TOKEN
              -Dapi.trustedContent.vex.host=http://tc-vex-stub-trusted-content.apps.cn-lab2-eu.lue0.p1.openshiftapps.com
              -Dapi.trustedContent.gav.host=http://swio-trusted-content.apps.cn-lab2-eu.lue0.p1.openshiftapps.com
            </Command>
            <Text component="h2">Start UI in dev mode</Text>
            <Command>
              {`cd ui
# first time
yarn install
yarn start
`}
            </Command>
            <Text component="h2">Build UI and copy resources to freemarker dir</Text>
            <Command>yarn build</Command>
            <Text component="h2">Get a HTML report</Text>
            <Command>
              {`http :8080/api/v3/analysis Content-Type:"application/vnd.cyclonedx+json" Accept:"text/html" @'target/project-bom.json' ex-snyk-token:TOKEN ex-oss-index-user:user@redhat.com 'ex-oss-index-token:TOKEN' > report.html`}
            </Command>
            <Text component="h2">Access sbom data (example)</Text>
            <Command>
              {`const sbom = React.useContext(AppContext);
console.log(sbom.report.summary.vulnerabilities.total)`}
            </Command>
            <Text component="h3">Result:</Text>
            <div>Total Vulnerabilities: {sbom && sbom.report.summary.vulnerabilities.total}</div>
          </TextContent>
        </PageSection>
      </Dashboard>
    </AppContext.Provider>
  );
}

export default App;
