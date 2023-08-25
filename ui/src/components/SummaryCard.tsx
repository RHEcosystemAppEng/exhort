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
  Icon,
  List,
  ListItem,
  Text,
  TextContent,
} from '@patternfly/react-core';
import ShieldAltIcon from '@patternfly/react-icons/dist/esm/icons/shield-alt-icon';
import { Provider } from '../api/report';


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
                <ListItem>
                  Below is a list of dependencies affected with CVE, as well as vulnerability only
                  found using Snyk's vulnerability database.
                </ListItem>
              </List>
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>
              Dependencies with security issues in your stack.
            </DescriptionListTerm>
            <DescriptionListDescription>
              <List isPlain>
                <ListItem>
                  Dependencies with high common vulnerabilities and exposures (CVE) score.
                </ListItem>
                <ListItem>
                  <TextContent>
                    <Text component="p">
                      <Icon isInline status="info">
                        <ShieldAltIcon />
                      </Icon>{' '}
                      Total vulnerabilities: {provider.summary.vulnerabilities.total}
                    </Text>
                  </TextContent>
                </ListItem>
                <ListItem>
                  <TextContent>
                    <Text component="p">
                      <Icon isInline status="warning">
                        <ShieldAltIcon />
                      </Icon>{' '}
                      Vulnerable dependencies: {provider.summary.vulnerabilities.direct}
                    </Text>
                  </TextContent>
                </ListItem>
              </List>
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </CardBody>
    </Card>
  );
};
