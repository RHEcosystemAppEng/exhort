import React, { useReducer } from 'react';
import { Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

import {Dependency, TransitiveDependency, Vulnerability} from '../api/report';
import {SYNK_SIGNUP_URL, uppercaseFirstLetter} from '../utils/utils';

import { ConditionalTableBody } from './TableControls/ConditionalTableBody';
import { DependencyLink } from './DependencyLink';
import { VulnerabilityScore } from './VulnerabilityScore';
import { VulnerabilityLink } from './VulnerabilityLink';
import { VulnerabilitySeverityLabel } from './VulnerabilitySeverityLabel';
import { RemediationLink } from './RemediationLink';
import {
  Card,
  CardBody,
  CardExpandableContent,
  CardHeader,
  CardTitle,
} from '@patternfly/react-core';

// interface TransitiveDependenciesTableProps {
//   providerName: 'snyk' | 'oss-index';
//   dependency: Dependency;
//   transitiveDependencies: TransitiveDependency[];
// }

export const TransitiveDependenciesTable = ({ providerName, dependency, transitiveDependencies }: { providerName: string; dependency: Dependency; transitiveDependencies: TransitiveDependency[] }) => {

// export const TransitiveDependenciesTable: React.FC<TransitiveDependenciesTableProps> = ({
//   providerName,
//   dependency,
//   transitiveDependencies,
// }) => {
//   const [isCardExpanded, toggleCard] = useReducer((val) => !val, false);
  return (
    // <Card isExpanded={isCardExpanded} isCompact isFlat>
    //   <CardHeader
    //     onExpand={toggleCard}
    //     toggleButtonProps={{
    //       'aria-expanded': isCardExpanded,
    //     }}
    //   >
    //     <CardTitle>Transitive dependencies with vulnerabilities</CardTitle>
    //   </CardHeader>
    //   <CardExpandableContent>
    //     <CardBody>
    //       <div
    //         style={{
    //           backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
    //         }}
    //       >
      <Card
          style={{
            backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
          }}
      >
            <Table variant={TableVariant.compact}>
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
                          {/*<Tr key={`${rowIndex}-${subRowIndex}`}>*/}
                              {vuln.cves?.map((cve, cveIndex) => (
                                  <Tr key={`${rowIndex}-${cveIndex}`}>
                                      <Td>
                                          <p>{cve}</p>
                                      </Td>
                              {/*<Td >*/}
                              {/*    {vuln.cves ? vuln.cves.map(i => <p>{i}</p>) : ''}*/}
                              {/*</Td>*/}

                        {/* skip dependency name     */}
                        {/*<Tr key={`${rowIndex}-${subRowIndex}`}>*/}
                        {/*  {subRowIndex === 0 && (*/}
                        {/*    <Td rowSpan={item.issues.length}>*/}
                        {/*      <DependencyLink name={item.ref} />*/}
                        {/*    </Td>*/}
                        {/*  )}*/}


                          {!vuln.unique ? (
                            <>
                                <Td>{vuln.title}</Td>
                              <Td noPadding>
                                <VulnerabilitySeverityLabel vulnerability={vuln} />
                                  {uppercaseFirstLetter(vuln.severity)}
                              </Td>
                            </>
                          ) : (
                            <>
                              <Td colSpan={3}>
                                <a href={SYNK_SIGNUP_URL} target="_blank" rel="noreferrer">
                                  Sign up for a free Snyk account
                                </a>{' '}
                                to learn about the vulnerabilities found
                              </Td>
                            </>
                          )}

                          <Td>
                            {/*{item.highestVulnerability && (*/}
                            {/*  <VulnerabilityScore vunerability={item.highestVulnerability} />*/}
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
                              <VulnerabilityLink providerName={providerName} vunerability={vuln} />
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
    //     </CardBody>
    //   </CardExpandableContent>
    // </Card>
  );
};
