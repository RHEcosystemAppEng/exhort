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
  Divider,
  Grid,
  GridItem,
  Icon, List, ListItem,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import {useAppContext} from '../App';
import {ChartCard} from './ChartCard';
import {getSourceName, getSources} from '../api/report';
import RedhatIcon from "@patternfly/react-icons/dist/esm/icons/redhat-icon";
import SecurityCheckIcon from '../images/security-check.svg';

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
      <GridItem>
        <Card isFlat isFullHeight>
          <CardHeader>
            <CardTitle>
              <DescriptionListTerm style={{fontSize: "large"}}>
                Vendor Issues
              </DescriptionListTerm>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <DescriptionListGroup>
              <DescriptionListDescription>
                <DescriptionListTerm>
                  Below is a list of dependencies affected with CVE.
                </DescriptionListTerm>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionList isAutoFit style={{paddingTop: "10px"}}>
              {
                getSources(appContext.report).map((source, index) => {
                  if(Object.keys(source.report).length > 0){
                  return (
                    <DescriptionListGroup key={index}>
                      <DescriptionListTerm style={{fontSize: "large"}}>{getSourceName(source)}</DescriptionListTerm>
                      <DescriptionListDescription>
                        <ChartCard summary={source.report.summary}/>
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  )
                  }
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
                    There are no available Red Hat remediations for your SBOM at this time
                  </ListItem>
                </List>
              </DescriptionListDescription>
            </CardBody>
          </DescriptionListGroup>
        </Card>&nbsp;
      </GridItem>
        <GridItem md={6}>
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
                    Check out our new Trusted Profile Analyzer to get visibility and insight into your software risk profile, for instance by exploring vulnerabilites or analyzing SBOMs.
                  </ListItem>
                  <ListItem>
                    <a href="https://console.redhat.com/application-services/trusted-content" target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="sm">
                        Sign up
                      </Button>
                    </a>
                  </ListItem>
                </List>
              </DescriptionListDescription>
            </CardBody>
          </DescriptionListGroup>
        </Card>&nbsp;
      </GridItem>
    </Grid>
  );
};