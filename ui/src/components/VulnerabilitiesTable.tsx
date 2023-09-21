import React from 'react';
import { Caption, Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import { Dependency, Vulnerability } from '../api/report';

import { ConditionalTableBody } from './TableControls/ConditionalTableBody';
import { VulnerabilityScore } from './VulnerabilityScore';
import { VulnerabilitySeverityLabel } from './VulnerabilitySeverityLabel';
import { VulnerabilityLink } from './VulnerabilityLink';
import { RemediationLink } from './RemediationLink';
import { Card } from '@patternfly/react-core';
import { uppercaseFirstLetter } from '../utils/utils';
import { DependencyLink } from './DependencyLink';

// interface VulnerabilitiesTableProps {
//   providerName: 'snyk' | 'oss-index';
//   dependency: Dependency;
//   vulnerabilities: Vulnerability[];
// }

export const VulnerabilitiesTable = ({ providerName, dependency, vulnerabilities }: { providerName: string; dependency: Dependency; vulnerabilities: Vulnerability[] }) => {

// export const VulnerabilitiesTable: React.FC<VulnerabilitiesTableProps> = ({
//   providerName,
//   dependency,
//   vulnerabilities,
// }) => {
  return (
    // <div
    //   style={{
    //     backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
    //   }}
    // >
      <Card
          style={{
            backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
          }}
      >
      <Table variant={TableVariant.compact}>
        {/*<Caption>Details of the dependency</Caption>*/}
        <Thead>
          <Tr>
            <Th>Vulnerability ID</Th>
            <Th>Description</Th>
            <Th>Severity</Th>
            <Th>CVSS Score</Th>
            <Th>Transitive Dependency</Th>
            <Th>Remediation</Th>
          </Tr>
        </Thead>
        <ConditionalTableBody isNoData={vulnerabilities.length === 0} numRenderedColumns={6}>
          {vulnerabilities?.map((vuln, rowIndex) => {
            const mavenPackagesRemediation = vuln.cves
              ?.map((cve) => dependency.remediations[cve])
              .filter((e) => e)
              .map((e) => e.mavenPackage);

            return (
              <Tbody key={rowIndex}>
                  {vuln.cves?.map((cve, cveIndex) => (
                  <Tr key={`${rowIndex}-${cveIndex}`}>
                      <Td>
                          <p>{cve}</p>
                      </Td>
                  <Td>{vuln.title}</Td>
                  <Td>
                      <VulnerabilitySeverityLabel vulnerability={vuln} />
                      {uppercaseFirstLetter(vuln.severity)}
                  </Td>
                  <Td>
                    <VulnerabilityScore vulnerability={vuln} />
                  </Td>
                  <Td> <DependencyLink name={dependency.ref} /></Td>
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
                  ))}
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </Table>
    </Card>
  );
};
