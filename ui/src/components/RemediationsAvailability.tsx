import React from 'react';
import {Dependency, hasRemediations} from '../api/report';

interface RemediationsAvailabilityProps {
  dependency: Dependency;
}

export const RemediationsAvailability: React.FC<RemediationsAvailabilityProps> = ({dependency}) => {

  let directRemediationsAvailable = dependency.issues?.some((issue) => {
    return hasRemediations(issue);
  });

  let transitiveRemediationsAvailable = dependency.transitive?.some((transitiveDependency) =>
    transitiveDependency.issues?.some((issue) => hasRemediations(issue))
  ) || false;

  return (
    <>
      {(directRemediationsAvailable || transitiveRemediationsAvailable) ? ("Yes"
      ) : ("No")}

    </>
  );
};
