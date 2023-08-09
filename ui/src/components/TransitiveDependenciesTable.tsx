import React from 'react';
import { Caption, Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import { Dependency, TransitiveDependency } from '../api/report';
import { ConditionalTableBody } from './TableControls/ConditionalTableBody';
import { DependencyLink } from './DependencyLink';
import { VulnerabilityScore } from './VulnerabilityScore';
import { VulnerabilityLink } from './VulnerabilityLink';
import { VulnerabilitySeverityLabel } from './VulnerabilitySeverityLabel';
import { RemediationLink } from './RemediationLink';

interface TransitiveDependenciesTableProps {
  providerName: 'snyk' | 'oss-index';
  dependency: Dependency;
  transitiveDependencies: TransitiveDependency[];
}

export const TransitiveDependenciesTable: React.FC<TransitiveDependenciesTableProps> = ({
  providerName,
  dependency,
  transitiveDependencies,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
      }}
    >
      <Table variant={TableVariant.compact}>
        <Caption>Transitive dependencies with vulnerabilities</Caption>
        <Thead>
          <Tr>
            <Th>Dependency</Th>
            <Th>Severity</Th>
            <Th>Exploit Maturity</Th>
            <Th>Description</Th>
            <Th width={10}>CVSS</Th>
            <Th>CVE</Th>
            <Th>Remediation</Th>
          </Tr>
        </Thead>
        <ConditionalTableBody isNoData={transitiveDependencies.length === 0} numRenderedColumns={7}>
          <Tbody>
            {transitiveDependencies?.map((item, rowIndex) => {
              return item.issues.map((vuln, subRowIndex) => {
                const mavenPackagesRemediation = vuln.cves
                  ?.map((cve) => {
                    return dependency.transitive.map((e) => e.remediations[cve]).filter((e) => e);
                  })
                  .flatMap((e) => e)
                  .map((e) => e.mavenPackage);

                return (
                  <Tr key={`${rowIndex}-${subRowIndex}`}>
                    {subRowIndex === 0 && (
                      <Td rowSpan={item.issues.length}>
                        <DependencyLink name={item.ref} />
                      </Td>
                    )}
                    <Td noPadding>
                      <VulnerabilitySeverityLabel vulnerability={vuln} />
                    </Td>
                    <Td>{vuln.cvss.exploitCodeMaturity || 'No known exploit'}</Td>
                    <Td>{vuln.title}</Td>
                    <Td>
                      {item.highestVulnerability && (
                        <VulnerabilityScore vunerability={item.highestVulnerability} />
                      )}
                    </Td>
                    <Td>{vuln.cves}</Td>
                    <Td>
                      {mavenPackagesRemediation && mavenPackagesRemediation.length > 0 ? (
                        mavenPackagesRemediation.map((e, index) => (
                          <RemediationLink key={index} cves={vuln.cves || []} packageName={e} />
                        ))
                      ) : (
                        <VulnerabilityLink providerName={providerName} vunerability={vuln} />
                      )}
                    </Td>
                  </Tr>
                );
              });
            })}
          </Tbody>
        </ConditionalTableBody>
      </Table>
    </div>
  );
};
