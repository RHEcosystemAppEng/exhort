import React from 'react';
import {Grid, GridItem, PageSection, PageSectionVariants, Tab, Tabs, TabTitleText,} from '@patternfly/react-core';
import {SummaryCard} from '../components/SummaryCard';
import {TabbedLayout} from "../components/TabbedLayout";
import {ReportErrorAlert} from '../components/ReportErrorAlert';
import {ReportMap} from '../api/report';
import {extractDependencyName} from '../utils/utils';

export const DockerTabbedLayout = ({report}: { report: ReportMap }) => {

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(Object.keys(report)[0] || '');
  const [isTabsLightScheme] = React.useState<boolean>(true);

  // Toggle currently active tab
  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number,
  ) => {
    setActiveTabKey(tabIndex);
  };

  const tabs = Object.entries(report).map(([key, reportValue]) => {
    return (
      <Tab
        eventKey={key}
        title={<TabTitleText>{extractDependencyName(key, true)}</TabTitleText>} // Use the map key as title
        aria-label={`${key} source`}
      >
        <ReportErrorAlert report={reportValue} />
        <PageSection variant={PageSectionVariants.light}>
          <Grid hasGutter>
            <GridItem>
              <SummaryCard report={reportValue} />
            </GridItem>
          </Grid>
        </PageSection>
        <PageSection variant={PageSectionVariants.default}>
          <TabbedLayout report={reportValue} />
        </PageSection>
      </Tab>
    );
  });

  return (
    <div>
      <Tabs
        activeKey={activeTabKey}
        onSelect={handleTabClick}
        aria-label="Providers"
        role="region"
        variant={isTabsLightScheme ? 'light300' : 'default'}
        isBox>
        {tabs}
      </Tabs>
    </div>
  );
};