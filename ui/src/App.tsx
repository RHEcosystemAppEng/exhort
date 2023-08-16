import { createContext, useContext } from 'react';
import { Grid, GridItem, PageSection, PageSectionVariants } from '@patternfly/react-core';

import { Report } from './api/report';
import { SummaryCard } from './components/SummaryCard';
import { DependenciesTable } from './components/DependenciesTable';
import { ReportErrorAlert } from './components/ReportErrorAlert';

import { MOCK_REPORT } from './mocks/report.mock';

const data: Report =
  process.env.NODE_ENV === 'production' ? ((window as any)['report'] as Report) : MOCK_REPORT.mixed;

export const AppContext = createContext<Report>(data);
export const useAppContext = (): Report => useContext(AppContext);

function App() {
  return (
    <AppContext.Provider value={data}>
      <ReportErrorAlert />
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
