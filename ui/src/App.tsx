import { createContext, useContext } from 'react';
import { MOCK_REPORT } from './mocks/report.mock';
import { Report } from '@app/api/report';
// import { TabbedLayout } from './TabbedLayout';
import {Grid, GridItem, PageSection, PageSectionVariants, TextContent, Text} from "@patternfly/react-core";
import { SummaryCard } from './components/SummaryCard';
import { ChartCard } from './components/ChartCard';
import { Dependencies } from './components/Dependencies';


const data = (window as any)['report'] || MOCK_REPORT;

export const AppContext = createContext<Report>(data);
export const useAppContext = (): Report => useContext(AppContext);
const providers = Object.keys(data.report);
const r = Object.keys(data.report);
const snykData = data.report['snyk'];

function App() {
  return (
    <AppContext.Provider value={data}>
        {/*<PageSection variant={PageSectionVariants.light}>	      */}
        {/*    <TextContent>*/}
        {/*        <Text component="h1">{data.packagePath}</Text>*/}
        {/*        <Text component="p">{data.sbomPath}</Text>*/}
        {/*        <Text component="p">{snykData.status.name}</Text>*/}
        {/*        <Text component="p">{snykData.summary.dependencies.transitive}</Text>*/}
        {/*    </TextContent>*/}
        {/*</PageSection>*/}
        <PageSection variant={PageSectionVariants.light}>
            <Grid hasGutter>
                <GridItem>
                    <SummaryCard  provider={data.report['snyk']}/>
                </GridItem>
                {/*<GridItem md={6}>*/}
                {/*    <ChartCard  provider={data.report['snyk']}/>*/}
                {/*</GridItem>*/}
            </Grid>
        </PageSection>
        <PageSection variant={PageSectionVariants.default}>
            <Dependencies  name={data.report['snyk'].status.name} provider={data.report['snyk']}/>
        </PageSection>
    </AppContext.Provider>
  );
}

export default App;
