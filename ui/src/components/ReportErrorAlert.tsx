import React from 'react';
import { Alert, AlertVariant } from '@patternfly/react-core';
import { uppercaseFirstLetter } from '../utils/utils';
import { useAppContext } from '../App';

export const ReportErrorAlert: React.FC = () => {
  const appContext = useAppContext();
  const errorReports = Object.entries(appContext.report)
    .map(([_, val]) => {
      return val.status;
    })
    .filter((e) => !e.ok);

  return (
    <>
      {errorReports.map((e, index) => (
        <Alert
          key={index}
          variant={
            e.code >= 500 ? AlertVariant.danger : e.code >= 400 ? AlertVariant.warning : undefined
          }
          title={`${uppercaseFirstLetter(e.name)}: ${e.message}`}
        />
      ))}
    </>
  );
};
