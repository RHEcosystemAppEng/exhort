import React from 'react';
import { Alert, AlertVariant } from '@patternfly/react-core';
import { uppercaseFirstLetter } from '../utils/utils';
import { useAppContext } from '../App';

export const ReportErrorAlert: React.FC = () => {
  const appContext = useAppContext();
  const errorReports = Object.entries(appContext.report.summary.providerStatuses)
    .map(([_, val]) => {
      return val;
    })
    .filter((e) => !e.ok);

  return (
    <>
      {errorReports.map((e, index) => (
        <Alert
          key={index}
          variant={
            e.status >= 500 ? AlertVariant.danger : e.status >= 400 ? AlertVariant.warning : undefined
          }
          title={`${uppercaseFirstLetter(e.provider)}: ${e.message}`}
        />
      ))}
    </>
  );
};
