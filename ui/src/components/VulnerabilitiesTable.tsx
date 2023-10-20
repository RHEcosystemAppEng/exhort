import {Table, TableVariant, Tbody, Th, Thead, Tr} from '@patternfly/react-table';
import {Dependency, Vulnerability} from '../api/report';
import {ConditionalTableBody} from './TableControls/ConditionalTableBody';
import {Card} from '@patternfly/react-core';
import {usePrivateIssueHelper} from '../hooks/usePrivateDataHelper';
import {VulnerabilityRow} from "./VulnerabilityRow";

export const VulnerabilitiesTable = ({ providerName, dependency, vulnerabilities }: { providerName: string; dependency: Dependency; vulnerabilities: Vulnerability[] }) => {
  const privateIssueHelper = usePrivateIssueHelper();
  return (
      <Card
          style={{
            backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
          }}
      >
      <Table variant={TableVariant.compact}>
        <Thead>
          <Tr>
            <Th width={20}>Vulnerability ID</Th>
            <Th width={20}>Description</Th>
            <Th>Severity</Th>
            <Th width={20}>CVSS Score</Th>
            <Th width={20}>Transitive Dependency</Th>
            <Th>Remediation</Th>
          </Tr>
        </Thead>
        <ConditionalTableBody isNoData={vulnerabilities.length === 0} numRenderedColumns={6}>
          {vulnerabilities?.map((vuln, rowIndex) => {
            let ids = [];
            if(vuln.cves) {
              vuln.cves?.forEach(cve => ids.push(cve));
            } else if(vuln.unique) {
              ids.push(vuln.id);
            }
            return (
              <Tbody key={rowIndex}>
                  {ids.map((cve, cveIndex) => (
                    <VulnerabilityRow
                      key={`${rowIndex}-${cveIndex}`}
                      item={{
                        id: vuln.id,
                        dependencyRef: dependency.ref,
                        vulnerability: vuln,
                      }}
                      providerName={providerName}
                      rowIndex={rowIndex}
                    />
                  ))}
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </Table>
    </Card>
  );
};
