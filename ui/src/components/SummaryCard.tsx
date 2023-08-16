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
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import { useAppContext } from '../App';

export const SummaryCard = () => {
  const appContext = useAppContext();
  const synkReport = appContext.report;

  return (
    <Card isFlat isFullHeight>
      <CardHeader>
        <CardTitle>
          <Icon isInline status="info">
            <ExclamationTriangleIcon style={{fill: "#f0ab00"}}/>
          </Icon>{' '}Security Issues
        </CardTitle>
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
                      Total vulnerabilities: {synkReport.summary.vulnerabilities.total}
                    </Text>
                  </TextContent>
                </ListItem>
                <ListItem>
                  <TextContent>
                    <Text component="p">
                      <Icon isInline status="warning">
                        <ShieldAltIcon />
                      </Icon>{' '}
                      Vulnerable dependencies: {synkReport.summary.vulnerabilities.direct}
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
