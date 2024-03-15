import React from 'react';
import {PageSection, PageSectionVariants, Tab, Tabs, TabTitleText,} from '@patternfly/react-core';
import {DepCompoundTable} from "./DepCompoundTable";
import {getSourceName, getSources, Report} from "../api/report";

export const TabbedLayout = ({report}: { report: Report }) => {
  const sources = getSources(report);

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(getSourceName(sources[0]));
  const [isTabsLightScheme] = React.useState<boolean>(true);

  // Toggle currently active tab
  const handleTabClick = (
      event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
      tabIndex: string | number,
  ) => {
    setActiveTabKey(tabIndex);
  };

  const tabs = sources.map((source) => {
    const srcName = getSourceName(source);
    const vulnDeps = source.report.dependencies?.filter((dep) => dep.highestVulnerability)
    return (
      <Tab
        eventKey={srcName}
        title={<TabTitleText>{srcName}</TabTitleText>}
        aria-label={`${srcName} source`}
      >
        <PageSection variant={PageSectionVariants.default}>
          <DepCompoundTable name={srcName} dependencies={vulnDeps} />
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