import React from 'react';
import { extractDependencyName, extractDependencyUrl } from '../utils/utils';

interface DependencyProps {
  name: string;
}

export const DependencyLink: React.FC<DependencyProps> = ({ name }) => {
  return (
    <>
      <a href={extractDependencyUrl(name)} target="_blank" rel="noreferrer">
        {extractDependencyName(name)}
      </a>
    </>
  );
};
