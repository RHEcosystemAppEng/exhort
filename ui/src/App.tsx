import { createContext, useContext } from 'react';
import { MOCK_REPORT } from './mocks/report.mock';
import { Report } from '@app/api/report';
import { Grid, GridItem, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { SummaryCard } from './components/SummaryCard';
import { DependenciesTable } from './components/DependenciesTable';

const data = (window as any)['report'] || MOCK_REPORT;

export const AppContext = createContext<Report>(data);
export const useAppContext = (): Report => useContext(AppContext);

function App() {
  return (
    <AppContext.Provider value={data}>
      <PageSection variant={PageSectionVariants.light}>
        <Grid hasGutter>
          <GridItem>
            <SummaryCard />
          </GridItem>
        </Grid>
      </PageSection>
      <PageSection variant={PageSectionVariants.default}>
        <DependenciesTable />
      </PageSection>
    </AppContext.Provider>
  );
}

export default App;
