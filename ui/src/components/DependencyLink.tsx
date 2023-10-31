import React from 'react';
import { extractDependencyName, extractDependencyUrl } from '../utils/utils';

interface DependencyProps {
  name: string;
  showVersion?: boolean;
}

export const DependencyLink: React.FC<DependencyProps> = ({ name, showVersion = false }) => {
  return (
    <>
      <a href={extractDependencyUrl(name)} target="_blank" rel="noreferrer">
        {extractDependencyName(name, showVersion)}
      </a>
    </>
  );
};
