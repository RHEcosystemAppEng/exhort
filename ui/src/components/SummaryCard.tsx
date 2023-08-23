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
import { Provider } from '@app/api/report';

export const SummaryCard = ({ provider }: { provider: Provider }) => {
  return (
    <Card isFlat isFullHeight>
      <CardHeader>
        <CardTitle>Security Issues</CardTitle>
      </CardHeader>
      <Divider />
      <CardBody>
        <DescriptionList
          columnModifier={{
            default: '2Col',
          }}
        >
          <DescriptionListGroup>
            <DescriptionListDescription>
              <List isPlain>
                <ListItem>Below is a list of dependencies affected with CVE, as well as vulnerability only found using Snyk's vulnerability database.</ListItem>
              </List>
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm icon={<ShielVirusIcon />}>Dependencies with security issues in your stack.</DescriptionListTerm>
            <DescriptionListDescription>
              <List isPlain>
                <ListItem>Dependencies with high common vulnerabilities and exposures (CVE) score.</ListItem>
                <ListItem>
                  <p>
                  <svg width="16px" height="16px" viewBox="0 0 48 54" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title></title>
                    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Icons-/-4.-Size-xl-/-Status-/-pficon-security" fill="#2b9af3">
                        <path d="M45.4306641,0 L1.81933594,0 C0.812109375,0 0,0.754101563 0,1.6875 L0,23.8412109 C0,40.5 20.4451172,54 23.6513672,54 C26.8576172,54 47.25,40.5 47.25,23.8464844 L47.25,1.6875 C47.25,0.754101563 46.4378906,0 45.4306641,0 Z M25.8767578,40.5 L21.3732422,40.5 C20.7509766,40.4894531 20.2605469,39.9462891 20.25,39.2712891 L20.25,34.9787109 C20.2605469,34.3037109 20.75625,33.7658203 21.3732422,33.75 L25.8767578,33.75 C26.4990234,33.7605469 26.9894531,34.3037109 27,34.9787109 L27,39.2712891 L27.0052734,39.2712891 C26.9894531,39.9462891 26.49375,40.4894531 25.8767578,40.5 Z M28.6822266,8.57988281 L27.2742188,27.1265625 C27.2003906,27.9966797 26.4726563,28.6875 25.5919922,28.6875 L21.6527344,28.6875 C20.7773438,28.6875 20.0443359,28.0125 19.9705078,27.1423828 L18.5677734,8.59570312 C18.4833984,7.60957031 19.2638672,6.76582031 20.25,6.76582031 L27,6.75 C27.9861328,6.75 28.7613281,7.59375 28.6822266,8.57988281 Z" id="pficon-security"></path>
                      </g>
                    </g>
                  </svg>
                  <span>Total vulnerabilities: {provider.summary.vulnerabilities.total}</span>
                  </p>
                </ListItem>
                <ListItem>
                  <svg width="18px" height="18px" viewBox="0 0 48 54" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title></title>
                    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Icons-/-4.-Size-xl-/-Status-/-pficon-security" fill="#f0ab00">
                        <path d="M45.4306641,0 L1.81933594,0 C0.812109375,0 0,0.754101563 0,1.6875 L0,23.8412109 C0,40.5 20.4451172,54 23.6513672,54 C26.8576172,54 47.25,40.5 47.25,23.8464844 L47.25,1.6875 C47.25,0.754101563 46.4378906,0 45.4306641,0 Z M25.8767578,40.5 L21.3732422,40.5 C20.7509766,40.4894531 20.2605469,39.9462891 20.25,39.2712891 L20.25,34.9787109 C20.2605469,34.3037109 20.75625,33.7658203 21.3732422,33.75 L25.8767578,33.75 C26.4990234,33.7605469 26.9894531,34.3037109 27,34.9787109 L27,39.2712891 L27.0052734,39.2712891 C26.9894531,39.9462891 26.49375,40.4894531 25.8767578,40.5 Z M28.6822266,8.57988281 L27.2742188,27.1265625 C27.2003906,27.9966797 26.4726563,28.6875 25.5919922,28.6875 L21.6527344,28.6875 C20.7773438,28.6875 20.0443359,28.0125 19.9705078,27.1423828 L18.5677734,8.59570312 C18.4833984,7.60957031 19.2638672,6.76582031 20.25,6.76582031 L27,6.75 C27.9861328,6.75 28.7613281,7.59375 28.6822266,8.57988281 Z" id="pficon-security"></path>
                      </g>
                    </g>
                  </svg>
                  Direct dependencies: {provider.summary.vulnerabilities.direct}
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
                <ListItem>
                  {provider.status.name}{' '}
                  {provider.status.ok ? (
                    <OkIcon color={okColor.value} />
                  ) : (
                    <ErrorCircleIcon color={dangerColor.value} />
                  )}
                </ListItem>
              </List>
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </CardBody>
    </Card>
  );
};
