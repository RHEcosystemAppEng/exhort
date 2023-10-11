import React from 'react';
import {Icon} from '@patternfly/react-core';
import {Dependency} from '../api/report';
import RedhatIcon from "@patternfly/react-icons/dist/esm/icons/redhat-icon";

interface RemediationsCountProps {
  dependency: Dependency;
}

export const RemediationsCount: React.FC<RemediationsCountProps> = ({ dependency }) => {
  // const directRemediationsCount = dependency.remediations
  //   ? Object.keys(dependency.remediations).length
  //   : 0;
  // const transitiveRemediationsCount = dependency.transitive
  //   ? dependency.transitive
  //       .map((e) => Object.keys(e.remediations).length)
  //       .reduce((prev, current) => prev + current, 0)
  //   : 0;

  const directRemediationsCount = 0;
  const transitiveRemediationsCount = 2;

  return (
    <>
      {(directRemediationsCount > 0 || transitiveRemediationsCount > 0)? (
          <Icon isInline status="info">
            <RedhatIcon style={{fill: "#cc0000"}}/>
          </Icon>
      ) : ("N/A")}

    </>
  );
};
