import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ExpandableRowContent,
} from "@patternfly/react-table";
import { Progress } from "@patternfly/react-core";

export const Test = () => (
  <div className="pf-v5-u-p-xl">
    <Table variant="compact">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>#</Th>
          <Th>Dependencies</Th>
          <Th># Direct</Th>
          <Th># Transitive</Th>
          <Th>Highest CVSS</Th>
          <Th>Highest Severity</Th>
          <Th>Red Hat remediation available</Th>
        </Tr>
      </Thead>
      <Tbody isExpanded>
        [#assign numOfPkg = 0]
        [#list body.report.getDependencies() as dependency]
        <Tr data-target="#[=htmlRef(dependency.getRef())]">
          <Td
            expand={{
              rowIndex: 0,
              isExpanded: true,
            }}
          />
          [#assign numOfPkg++]
          <Td>#[=numOfPkg]</Td>
          <Td>
            <a href="[=packageLink(dependency.getRef())]" target="_blank">
              [=dependency.getRef().name()]
            </a>
          </Td>
          <Td>[=dependency.getIssues()?size]</Td>
          <Td>[=body.dependencyHelper.transitiveIssuesCount(dependency)]</Td>
          [#if dependency.getHighestVulnerability()?? ]
            [#assign barNum = dependency.getHighestVulnerability().getCvssScore() *10]
            [#assign severity = dependency.getHighestVulnerability().getSeverity()?lower_case]
            <Td>
                [#if severity == 'critical' || severity == 'high']
                    <Progress variant="danger" measureLocation="none" title="[=dependency.getHighestVulnerability().getCvssScore()]/10" min={0} max={10} value={parseInt('[=dependency.getHighestVulnerability().getCvssScore()]')} />
                [#else]
                    <Progress variant="warning" measureLocation="none" title="[=dependency.getHighestVulnerability().getCvssScore()]/10" min={0} max={10} value={parseInt('[=dependency.getHighestVulnerability().getCvssScore()]')} />
                [/#if]
            </Td>
            <Td>
              [#if body.issueVisibilityHelper.showIssue(dependency.getHighestVulnerability())]
                  <a href="[=issueLink(dependency.getHighestVulnerability())]"
                  target="_blank">
                      [=dependency.getHighestVulnerability().getId()]
                  </a>
              [#else]
                  <a href="[=body.snykSignup]"
                      target="_blank">
                      Sign up for a free Snyk account
                  </a>to learn about the vulnerabilities found
              [/#if]
            </Td>
          [#else]
            <Td>--</Td>
            <Td>--</Td>
          [/#if]
        </Tr>
        <Tr isExpanded>
          <Td />
          <Td>
            <ExpandableRowContent>Expanded content</ExpandableRowContent>
          </Td>
        </Tr>
        [/#list]
      </Tbody>
    </Table>
  </div>
);
