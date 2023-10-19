import {Table, TableVariant, Tbody, Td, Th, Thead, Tr} from '@patternfly/react-table';

import {Dependency, Vulnerability, hasRemediations} from '../api/report';

import {ConditionalTableBody} from './TableControls/ConditionalTableBody';
import {Card} from '@patternfly/react-core';
import { usePrivateIssueHelper } from '../hooks/usePrivateDataHelper';
import { VulnerabilitySeverityLabel } from './VulnerabilitySeverityLabel';
import { VulnerabilityScore } from './VulnerabilityScore';
import { DependencyLink } from './DependencyLink';
import { RemediationLink } from './RemediationLink';
import { VulnerabilityLink } from './VulnerabilityLink';
import { SYNK_SIGNUP_URL } from '../utils/utils';

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
                  <Tr key={`${rowIndex}-${cveIndex}`}>
                  {privateIssueHelper.hideIssue(providerName, vuln.unique) ? (
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
                          <p>{cve}</p>
                        </Td>
                        <Td>{vuln.title}</Td>
                        <Td noPadding>
                          <VulnerabilitySeverityLabel vulnerability={vuln}/>
                        </Td>
                      </>
                    )}
                  <Td>
                    <VulnerabilityScore vulnerability={vuln} />
                  </Td>
                  <Td> <DependencyLink name={dependency.ref} /></Td>
                  <Td>
                      {vuln.remediation?.trustedContent && 
                          <RemediationLink key={cveIndex} cves={vuln.cves || []} packageName={dependency.ref} />
                      }
                      {vuln.remediation?.fixedIn && 
                          <VulnerabilityLink sourceName={providerName} vulnerability={vuln} />
                      }
                      {!hasRemediations(vuln) && "N/A"}
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
