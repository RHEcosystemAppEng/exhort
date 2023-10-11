import React from 'react';
import {PageSection, PageSectionVariants, Tab, Tabs, TabTitleText,} from '@patternfly/react-core';
import {useAppContext} from '../App';
import {DepCompoundTable} from "./DepCompoundTable";

export const TabbedLayout = () => {
  const appContext = useAppContext();
  const providers = Object.keys(appContext.report.providers);

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(
    providers.length > 0
      ? `${providers[0]}/${Object.keys(appContext.report.providers[providers[0]].sources || {})[0]}`
      : ''
  );
  const [isTabsLightScheme, setIsTabsLightScheme] = React.useState<boolean>(true);

  // Toggle currently active tab
  const handleTabClick = (
      event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
      tabIndex: string | number,
  ) => {
    setActiveTabKey(tabIndex);
  };
  const toggleScheme = (checked: boolean) => {
    setIsTabsLightScheme(checked);
  };

  const tabs = providers?.map((provider, index) => {
    const sources = appContext.report.providers[provider]?.sources;
    if (sources !== undefined) {
      return [
        ...Object.keys(sources).map((sourceName, sourceIndex) => {
          const sourceData = sources[sourceName];
          const term = `${provider}/${sourceName}`;
          return (
            <Tab
              eventKey={term}
              title={<TabTitleText>{term}</TabTitleText>}
              aria-label={`${term} source`}
            >
              <PageSection variant={PageSectionVariants.default}>
                <DepCompoundTable name={sourceName} dependencies={sourceData.dependencies} />
              </PageSection>
            </Tab>
          );
        }),
      ];
    }
    return null; // Ensure there's a return value in case sources is undefined
  }).flat(); // Use the flat method to flatten the array

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