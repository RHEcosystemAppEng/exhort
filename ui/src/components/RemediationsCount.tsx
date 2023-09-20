import React from 'react';
import { Icon, Split, SplitItem, Text, TextContent } from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import { Dependency } from '../api/report';
import RedhatIcon from "@patternfly/react-icons/dist/esm/icons/redhat-icon";
import {VulnerabilitiesTable} from "@app/components/VulnerabilitiesTable";
import {TransitiveDependenciesTable} from "@app/components/TransitiveDependenciesTable";

interface RemediationsCountProps {
  dependency: Dependency;
}

export const RemediationsCount: React.FC<RemediationsCountProps> = ({ dependency }) => {
  const directRemediationsCount = dependency.remediations
    ? Object.keys(dependency.remediations).length
    : 0;
  const transitiveRemediationsCount = dependency.transitive
    ? dependency.transitive
        .map((e) => Object.keys(e.remediations).length)
        .reduce((prev, current) => prev + current, 0)
    : 0;

  return (
    <>
      {/*<Split hasGutter>*/}
      {/*  {directRemediationsCount > 0 && (*/}
      {/*    <SplitItem>*/}
      {/*      <TextContent>*/}
      {/*        <Text component="p">*/}
      {/*          <Icon isInline status="success">*/}
      {/*            <CheckCircleIcon />*/}
      {/*          </Icon>{' '}*/}
      {/*          {Object.keys(dependency.remediations).length} Direct*/}
      {/*        </Text>*/}
      {/*      </TextContent>*/}
      {/*    </SplitItem>*/}
      {/*  )}*/}
      {/*  {transitiveRemediationsCount > 0 && (*/}
      {/*    <SplitItem>*/}
      {/*      <TextContent>*/}
      {/*        <Text component="p">*/}
      {/*          <Icon isInline status="success">*/}
      {/*            <CheckCircleIcon />*/}
      {/*          </Icon>{' '}*/}
      {/*          {transitiveRemediationsCount} Transitive*/}
      {/*        </Text>*/}
      {/*      </TextContent>*/}
      {/*    </SplitItem>*/}
      {/*  )}*/}
      {/*</Split>*/}

      {(directRemediationsCount > 0 || transitiveRemediationsCount > 0)? (
          <Icon isInline status="info">
            <RedhatIcon style={{fill: "#cc0000"}}/>
          </Icon>
      ) : ("N/A")}

    </>
  );
};
