import React from 'react';
import {PageSection, PageSectionVariants, Tab, Tabs, TabTitleText,} from '@patternfly/react-core';
import {useAppContext} from '../App';
// import {DependenciesTable} from "./DependenciesTable";
import {DepCompoundTable} from "./DepCompoundTable";

export const TabbedLayout = () => {
  const appContext = useAppContext();
  const providers = Object.keys(appContext.report);

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(providers[0]);
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

  const tabs = providers.map((name) => {
    const provider = appContext.report[name];
    return (
        <Tab
            eventKey={name}
            title={<TabTitleText>{name}</TabTitleText>}
            aria-label={`${name} provider`}
        >
          <PageSection variant={PageSectionVariants.default}>
            <DepCompoundTable name={name} provider={provider} />
          </PageSection>
        </Tab>
    );
    });
  // ];

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