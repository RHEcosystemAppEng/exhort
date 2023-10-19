import {Table, TableVariant, Tbody, Td, Th, Thead, Tr} from '@patternfly/react-table';

import {Dependency, TransitiveDependency, buildVulnerabilityItems, hasRemediations} from '../api/report';

import {ConditionalTableBody} from './TableControls/ConditionalTableBody';
import {Card,} from '@patternfly/react-core';
import { usePrivateIssueHelper } from '../hooks/usePrivateDataHelper';
import { SYNK_SIGNUP_URL } from '../utils/utils';
import { VulnerabilitySeverityLabel } from './VulnerabilitySeverityLabel';
import { VulnerabilityScore } from './VulnerabilityScore';
import { DependencyLink } from './DependencyLink';
import { RemediationLink } from './RemediationLink';
import { VulnerabilityLink } from './VulnerabilityLink';

export const TransitiveDependenciesTable = ({
                                              providerName,
                                              dependency,
                                              transitiveDependencies
                                            }: { providerName: string; dependency: Dependency; transitiveDependencies: TransitiveDependency[] }) => {
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
            <Th width={10}>Vulnerability ID</Th>
            <Th width={25}>Description</Th>
            <Th width={10}>Severity</Th>
            <Th width={15}>CVSS Score</Th>
            <Th width={20}>Transitive Dependency</Th>
            <Th>Remediation</Th>
          </Tr>
        </Thead>
        <ConditionalTableBody isNoData={transitiveDependencies.length === 0} numRenderedColumns={7}>
        {buildVulnerabilityItems(transitiveDependencies).map((item, rowIndex) => {
            return (
              <Tbody key={rowIndex}>
                  
                <Tr key={rowIndex}>
                  {privateIssueHelper.hideIssue(providerName, item.vulnerability.unique) ? (
                    <>
                      <Td colSpan={3}>
                        <a href={SYNK_SIGNUP_URL} target="_blank" rel="noreferrer">
                          Sign up for a Snyk account
                        </a>{' '}
                        to learn about the vulnerabilities found
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td>
                        <p>{item.id}</p>
                      </Td>
                      <Td>{item.vulnerability.title}</Td>
                      <Td noPadding>
                        <VulnerabilitySeverityLabel vulnerability={item.vulnerability}/>
                      </Td>
                    </>
                  )}
                  <Td>
                    <VulnerabilityScore vulnerability={item.vulnerability}/>
                  </Td>
                  <Td>
                    <DependencyLink name={item.dependencyRef}/>
                  </Td>
                  <Td>
                  {item.vulnerability.remediation?.trustedContent && 
                        <RemediationLink key={rowIndex} cves={item.vulnerability.cves || []} packageName={item.dependencyRef} />
                    }
                    {item.vulnerability.remediation?.fixedIn && 
                        <VulnerabilityLink sourceName={providerName} vulnerability={item.vulnerability} />
                    }
                    {!hasRemediations(item.vulnerability) && "N/A"}
                  </Td>
                </Tr>
              </Tbody>
            )
          })}
        </ConditionalTableBody>
      </Table>
    </Card>
  );
};
