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
import { SummaryCard } from './components/SummaryCard';
import { ChartCard } from './components/ChartCard';
import { Dependencies } from './components/Dependencies';
import { useAppContext } from './App';

export const TabbedLayout = () => {
  const sbom = useAppContext();
  const providers = Object.keys(sbom.report);

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(providers[0]);
  // Toggle currently active tab
  const handleTabClick = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number,
  ) => {
    setActiveTabKey(tabIndex);
  };

  const tabs = providers.map((name) => {
    const provider = sbom.report[name];
    return (
      <Tab
        eventKey={name}
        title={<TabTitleText>{name}</TabTitleText>}
        aria-label={`${name} provider`}
      >
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">{sbom.packagePath}</Text>
            <Text component="p">{sbom.sbomPath}</Text>
          </TextContent>
        </PageSection>
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
          <Dependencies name={name} provider={provider} />
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
