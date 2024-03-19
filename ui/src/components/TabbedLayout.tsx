import {PageSection, PageSectionVariants, Tab, Tabs, TabTitleText,} from '@patternfly/react-core';
import {DepCompoundTable} from "./DepCompoundTable";
import {getSourceName, getSources, Report} from "../api/report";
import { AnalyticsBrowser } from '@segment/analytics-next'
import React, {useEffect, useRef} from 'react';
import {useAppContext} from '../App';

export const TabbedLayout = ({report}: { report: Report }) => {
  const appContext = useAppContext();
  const sources = getSources(report);
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(getSourceName(sources[0]));
  const [isTabsLightScheme] = React.useState<boolean>(true);
  const analytics = AnalyticsBrowser.load({ writeKey: appContext.writeKey })
  const previousUserId = useRef<string | null>(null);
  const previousActiveTabKey = useRef<string | number>('');

  useEffect(() => {
    if (appContext.userId == null) {
      if (appContext.anonymousId != null) {
        analytics.setAnonymousId(appContext.anonymousId);
      }
    } else {
      if (appContext.userId !== previousUserId.current) {
        analytics.identify(appContext.userId);
        previousUserId.current = appContext.userId;
      }
    }
    const handleActiveTabKeyUpdate = async (newActiveTabKey: string | number) => {
      if (newActiveTabKey !== previousActiveTabKey.current) {
        analytics.track("rhda.exhort.tab", {
          tabName: newActiveTabKey,
        });
        previousActiveTabKey.current = newActiveTabKey;
      }
    }
    // Call the function to handle asynchronous activeTabKey update
    handleActiveTabKeyUpdate(activeTabKey);
  }, [activeTabKey, appContext.userId, appContext.anonymousId, analytics]);

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