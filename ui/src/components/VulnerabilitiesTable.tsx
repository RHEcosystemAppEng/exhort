import React from 'react';
import { Caption, Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import { Dependency, Vulnerability } from '../api/report';

import { ConditionalTableBody } from './TableControls/ConditionalTableBody';
import { VulnerabilityScore } from './VulnerabilityScore';
import { VulnerabilitySeverityLabel } from './VulnerabilitySeverityLabel';
import { VulnerabilityLink } from './VulnerabilityLink';
import { RemediationLink } from './RemediationLink';

interface VulnerabilitiesTableProps {
  providerName: 'snyk' | 'oss-index';
  dependency: Dependency;
  vulnerabilities: Vulnerability[];
}

export const VulnerabilitiesTable: React.FC<VulnerabilitiesTableProps> = ({
  providerName,
  dependency,
  vulnerabilities,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
      }}
    >
      <Table variant={TableVariant.compact}>
        <Caption>Details of the dependency</Caption>
        <Thead>
          <Tr>
            <Th>Severity</Th>
            <Th>Exploit Maturity</Th>
            <Th>Description</Th>
            <Th>CVSS</Th>
            <Th>CVE</Th>
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
                <Tr>
                  <Td>
                    <VulnerabilitySeverityLabel vulnerability={vuln} />
                  </Td>
                  <Td>{vuln.cvss.exploitCodeMaturity || 'No known exploit'}</Td>
                  <Td>{vuln.title}</Td>
                  <Td>
                    <VulnerabilityScore vunerability={vuln} />
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
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </Table>
    </div>
  );
};
