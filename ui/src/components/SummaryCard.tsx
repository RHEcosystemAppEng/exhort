import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
} from '@patternfly/react-core';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import RedhatIcon from '@patternfly/react-icons/dist/esm/icons/redhat-icon';
import {useAppContext} from '../App';
import {ChartCard} from './ChartCard';
import SecurityCheckIcon from '../images/security-check.svg';
import React from "react";


// export const SummaryCard = ({ provider }: { provider: Provider }) => {
export const SummaryCard = () => {
  const appContext = useAppContext();
  const providers = Object.keys(appContext.report);
    return (
        <Card isFlat isFullHeight>
          <CardHeader>
            <CardTitle>
              <Icon isInline status="info">
                <ExclamationTriangleIcon style={{fill: "#f0ab00"}}/>
              </Icon>&nbsp;Red Hat Overview of security Issues</CardTitle>
          </CardHeader>
          <Divider />
          <CardBody>
            <DescriptionListGroup>
              <DescriptionListDescription>
                <DescriptionListTerm>
                    Below is a list of dependencies affected with CVE.
                  </DescriptionListTerm>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionList isAutoFit>
              {providers?.map((name, index) => {
                const provider = appContext.report[name];
                return (
                    <DescriptionListGroup key={index}>
                      <DescriptionListTerm>{name}</DescriptionListTerm>
                      <DescriptionListDescription>
                        <ChartCard provider={provider} />
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                )
              })
              }
            </DescriptionList>
          </CardBody>
            <Divider/>
            <CardFooter>
              <DescriptionList
                  columnModifier={{
                    default: '2Col',
                  }}
              >
                <DescriptionListGroup>
                  <DescriptionListTerm style={{fontSize: "large"}}>
                    <Icon isInline status="info">
                      <RedhatIcon style={{fill: "#cc0000"}}/>
                    </Icon>&nbsp;
                    Red Hat Remediations
                  </DescriptionListTerm>
                  <DescriptionListDescription>
                    <List isPlain>
                      <ListItem>
                        <Icon isInline status="success">
                          <img src={SecurityCheckIcon} alt="Security Check Icon" />
                        </Icon>&nbsp;
                        10+ vulnerable packages
                      </ListItem>
                    </List>
                  </DescriptionListDescription>
                </DescriptionListGroup>

                <DescriptionListGroup>
                  <DescriptionListTerm style={{fontSize: "large"}}>
                    Subscribe to stay updated
                  </DescriptionListTerm>
                  <DescriptionListDescription>
                    <List isPlain>
                      <ListItem>
                        Do you want to subscribe for Red Hat Trusted Content Service to keep your projects risk profile updated?
                      </ListItem>
                      <ListItem>
                        <Button variant="primary" size="sm">
                          Sign up
                        </Button>
                      </ListItem>
                    </List>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              </DescriptionList>
          </CardFooter>
        </Card>
    );
  };
