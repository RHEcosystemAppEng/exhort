import React from 'react';
import {Table, TableVariant, Tbody, Td, Th, Thead, Tr} from '@patternfly/react-table';

import {Dependency, TransitiveDependency} from '../api/report';
import {SYNK_SIGNUP_URL} from '../utils/utils';

import {ConditionalTableBody} from './TableControls/ConditionalTableBody';
import {DependencyLink} from './DependencyLink';
import {VulnerabilityScore} from './VulnerabilityScore';
import {VulnerabilityLink} from './VulnerabilityLink';
import {VulnerabilitySeverityLabel} from './VulnerabilitySeverityLabel';
import {RemediationLink} from './RemediationLink';
import {Card,} from '@patternfly/react-core';
import { usePrivateIssueHelper } from '../hooks/usePrivateDataHelper';

export const TransitiveDependenciesTable = ({ providerName, dependency, transitiveDependencies }: { providerName: string; dependency: Dependency; transitiveDependencies: TransitiveDependency[] }) => {
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
                  {transitiveDependencies?.map((item, rowIndex) => {
                      return item.issues.map((vuln, subRowIndex) => {
                          const mavenPackagesRemediation = vuln.cves
                              ?.map((cve) => {
                                  return dependency.transitive
                                      .map((e) => e.remediations[cve])
                                      .filter((e) => e);
                              })
                              .flatMap((e) => e)
                              .map((e) => e.mavenPackage);


                      return (
                          <Tbody key={`${rowIndex}-${subRowIndex}`}>
                              {vuln.cves?.map((cve, cveIndex) => (
                                  <Tr key={`${rowIndex}-${cveIndex}`}>
                                      <Td>
                                          <p>{cve}</p>
                                      </Td>
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
                                <Td>{vuln.title}</Td>
                              <Td noPadding>
                                <VulnerabilitySeverityLabel vulnerability={vuln} />
                              </Td>
                            </>
                          )}

                          <Td>
                            {/*{item.highestVulnerability && (*/}
                            {/*  <VulnerabilityScore vulnerability={item.highestVulnerability} />*/}
                            {/*)}*/}
                              <VulnerabilityScore vulnerability={vuln} />
                          </Td>
                          <Td>
                              <DependencyLink name={item.ref} />
                          </Td>
                          <Td>
                            {mavenPackagesRemediation && mavenPackagesRemediation.length > 0 ? (
                              mavenPackagesRemediation.map((e, index) => (
                                <RemediationLink
                                  key={index}
                                  cves={vuln.cves || []}
                                  packageName={e}
                                />
                              ))
                            ) : (
                              <VulnerabilityLink sourceName={providerName} vulnerability={vuln} />
                            )}
                          </Td>
                        </Tr>
                    ))}
                </Tbody>
                      );

                      });
                  })}
              </ConditionalTableBody>
            </Table>
          </Card>
  );
};
