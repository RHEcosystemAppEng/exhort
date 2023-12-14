import React from 'react';
import {Icon} from '@patternfly/react-core';

import {extractDependencyVersion, tcRemediationLink} from '../utils/utils';
import SecurityCheckIcon from '../images/security-check.svg';

interface RemediationLinkProps {
  packageName: string | '';
  cves: string[];
}

export const RemediationLink: React.FC<RemediationLinkProps> = ({ packageName, cves }) => {

  return (
    <>
      <Icon isInline status="success">
          <img src={SecurityCheckIcon} alt="Security Check Icon" />
      </Icon>&nbsp;
      <a href={tcRemediationLink(packageName)} target="_blank" rel="noreferrer">
        {extractDependencyVersion(packageName)}
      </a>
    </>
  );
};
