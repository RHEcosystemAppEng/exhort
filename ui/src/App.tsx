import { createContext, useContext } from 'react';
import {
  PageSection,
  TextContent,
  Text,
  PageSectionVariants,
  Grid,
  GridItem,
} from '@patternfly/react-core';
import { MOCK_SBOM } from './mocks/sbom.mock';
import { Sbom } from '@app/api/sbom';
import { SummaryCard } from './components/SummaryCard';
import { ChartCard } from './components/ChartCard';
import { Dependencies } from './components/Dependencies';

const sbom = (window as any)['sbomb'] || MOCK_SBOM;

export const AppContext = createContext<Sbom>(sbom);
export const useAppContext = (): Sbom => useContext(AppContext);

function App() {
  return (
    <AppContext.Provider value={sbom}>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">{sbom.packagePath}</Text>
          <Text component="p">{sbom.sbomPath}</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Grid hasGutter>
          <GridItem md={6}>
            <SummaryCard />
          </GridItem>
          <GridItem md={6}>
            <ChartCard />
          </GridItem>
        </Grid>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}>
        <Dependencies />
      </PageSection>
    </AppContext.Provider>
  );
}

export default App;
