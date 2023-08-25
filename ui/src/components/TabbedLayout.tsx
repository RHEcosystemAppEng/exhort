import React from 'react';
import {
  Tabs,
  Tab,
  TabTitleText,
  PageSection,
  TextContent,
  Text,
  PageSectionVariants,
  Grid,
  GridItem,
} from '@patternfly/react-core';
import { SummaryCard } from './SummaryCard';
import { ChartCard } from './ChartCard';
import { useAppContext } from '../App';
import {DependenciesTable} from "./DependenciesTable";
import {DepCompoundTable} from "./DepCompoundTable";

export const TabbedLayout = () => {
  const appContext = useAppContext();
  const providers = Object.keys(appContext.report);

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(providers[0]);
  // Toggle currently active tab
  const handleTabClick = (
      event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
      tabIndex: string | number,
  ) => {
    setActiveTabKey(tabIndex);
  };

  const tabs = providers.map((name) => {
    const provider = appContext.report[name];
    return (
        <Tab
            eventKey={name}
            title={<TabTitleText>{name}</TabTitleText>}
            aria-label={`${name} provider`}
        >
          <PageSection variant={PageSectionVariants.light}>
            <Grid hasGutter>
              <GridItem md={6}>
                <SummaryCard provider={provider} />
              </GridItem>
              <GridItem md={6}>
                <ChartCard provider={provider} />
              </GridItem>
            </Grid>
          </PageSection>
          <PageSection variant={PageSectionVariants.default}>
            <DepCompoundTable name={name} provider={provider} />
          </PageSection>
        </Tab>
    );
  });

  return (
      <div>
        <Tabs activeKey={activeTabKey} onSelect={handleTabClick} aria-label="Providers" role="region">
          {tabs}
        </Tabs>
      </div>
  );
};