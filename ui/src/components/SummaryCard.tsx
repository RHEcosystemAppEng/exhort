import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider, Grid, GridItem,
  Icon,
  List,
  ListItem, Title, TitleSizes,
} from '@patternfly/react-core';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import RedhatIcon from '@patternfly/react-icons/dist/esm/icons/redhat-icon';
import {useAppContext} from '../App';
import {ChartCard} from './ChartCard';
import SecurityCheckIcon from '../images/security-check.svg';
import { getSourceName, getSourceSummary, getSources } from '@app/api/report';


// export const SummaryCard = ({ provider }: { provider: Provider }) => {
export const SummaryCard = () => {
  const appContext = useAppContext();
  return (
    <Grid hasGutter>
      <Title headingLevel="h3" size={TitleSizes['2xl']} style={{paddingLeft: '15px'}}>
        <Icon isInline status="info">
          <ExclamationTriangleIcon style={{fill: "#f0ab00"}}/>
        </Icon>&nbsp;Red Hat Overview of security Issues
      </Title>
      <Divider />
      <GridItem md={6}>
        <Card isFlat isFullHeight>
          <CardHeader>
            <CardTitle>
              <DescriptionListTerm style={{fontSize: "large"}}>
                Below is a list of dependencies affected with CVE.
              </DescriptionListTerm>
            </CardTitle>
          </CardHeader>
          {/*<Divider/>*/}
          <CardBody>
            <DescriptionListGroup>
              <DescriptionListDescription>
                <DescriptionListTerm>
                  Below is a list of dependencies affected with CVE.
                </DescriptionListTerm>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionList isAutoFit>
              {
                getSources(appContext.report).map((source, index) => {
                  const summary = getSourceSummary(appContext.report, source);
                  return (
                    <DescriptionListGroup key={index}>
                      <DescriptionListTerm>{getSourceName(source)}</DescriptionListTerm>
                      <DescriptionListDescription>
                        <ChartCard summary={summary}/>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  )
                })
              }
            </DescriptionList>
          </CardBody>
          <Divider/>
        </Card>
      </GridItem>
      <GridItem md={6}>
        <Card isFlat>
          <DescriptionListGroup>
            <CardTitle component="h4">
              <DescriptionListTerm style={{fontSize: "large"}}>
                <Icon isInline status="info">
                  <RedhatIcon style={{fill: "#cc0000"}}/>
                </Icon>&nbsp;
                Red Hat Remediations
              </DescriptionListTerm>
            </CardTitle>
            <CardBody>
              <DescriptionListDescription>
                <List isPlain>
                  <ListItem>
                    <Icon isInline status="success">
                      <img src={SecurityCheckIcon} alt="Security Check Icon"/>
                    </Icon>&nbsp;
                    10+ vulnerable packages
                  </ListItem>
                </List>
              </DescriptionListDescription>
            </CardBody>
          </DescriptionListGroup>
        </Card>&nbsp;
        <Card isFlat>
          <DescriptionListGroup>
            <CardTitle component="h4">
              <DescriptionListTerm style={{fontSize: "large"}}>
                Subscribe to stay updated
              </DescriptionListTerm>
            </CardTitle>
            <CardBody>
              <DescriptionListDescription>
                <List isPlain>
                  <ListItem>
                    Do you want to subscribe for Red Hat Trusted Content Service to keep your
                    projects risk profile updated?
                  </ListItem>
                  <ListItem>
                    <Button variant="primary" size="sm">
                      Sign up
                    </Button>
                  </ListItem>
                </List>
              </DescriptionListDescription>
            </CardBody>
          </DescriptionListGroup>
        </Card>&nbsp;
        <Card isFlat>
          <DescriptionListGroup>
            <CardTitle component="h4">
              <DescriptionListTerm style={{fontSize: "large"}}>
                Licenses
              </DescriptionListTerm>
            </CardTitle>
            <CardBody>
              <DescriptionListDescription>
                <List isPlain>
                  <ListItem>
                    Some info here
                  </ListItem>
                </List>
              </DescriptionListDescription>
            </CardBody>
          </DescriptionListGroup>
        </Card>
      </GridItem>
    </Grid>
  );
};