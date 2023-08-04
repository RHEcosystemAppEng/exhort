import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  List,
  ListItem,
} from '@patternfly/react-core';
import {
  global_palette_green_400 as okColor,
  global_danger_color_100 as dangerColor,
} from '@patternfly/react-tokens';
import CubeIcon from '@patternfly/react-icons/dist/esm/icons/cube-icon';
import ErrorCircleIcon from '@patternfly/react-icons/dist/esm/icons/error-circle-o-icon';
import FileAltIcon from '@patternfly/react-icons/dist/esm/icons/file-alt-icon';
import OkIcon from '@patternfly/react-icons/dist/esm/icons/ok-icon';
import ShielVirusIcon from '@patternfly/react-icons/dist/esm/icons/shield-virus-icon';
import { useAppContext } from '../App';

export const SummaryCard: React.FC = () => {
  const sbom = useAppContext();
  return (
    <Card isFlat isFullHeight>
      <CardHeader>
        <CardTitle>Summary of the stack</CardTitle>
      </CardHeader>
      <Divider />
      <CardBody>
        <DescriptionList
          columnModifier={{
            default: '2Col',
          }}
        >
          <DescriptionListGroup>
            <DescriptionListTerm icon={<CubeIcon />}>Dependency details</DescriptionListTerm>
            <DescriptionListDescription>
              <List isPlain>
                <ListItem>
                  Analyzed dependencies: {sbom.report.summary.dependencies.scanned}
                </ListItem>
                <ListItem>
                  Transitive dependencies: {sbom.report.summary.dependencies.transitive}
                </ListItem>
              </List>
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm icon={<ShielVirusIcon />}>Security issues</DescriptionListTerm>
            <DescriptionListDescription>
              <List isPlain>
                <ListItem>
                  Total vulnerabilities: {sbom.report.summary.vulnerabilities.total}
                </ListItem>
                <ListItem>
                  Direct dependencies: {sbom.report.summary.vulnerabilities.direct}
                </ListItem>
              </List>
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </CardBody>
      <Divider />
      <CardBody>
        <DescriptionList
          columnModifier={{
            default: '2Col',
          }}
        >
          <DescriptionListGroup>
            <DescriptionListTerm icon={<FileAltIcon />}>Provider status</DescriptionListTerm>
            <DescriptionListDescription>
              <List>
                {sbom.report.summary.providerStatuses.map((elem, index) => (
                  <ListItem key={index}>
                    {elem.provider}{' '}
                    {elem.ok ? (
                      <OkIcon color={okColor.value} />
                    ) : (
                      <ErrorCircleIcon color={dangerColor.value} />
                    )}
                  </ListItem>
                ))}
              </List>
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </CardBody>
    </Card>
  );
};
