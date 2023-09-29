import React from 'react';
import { Bullseye, Card, CardBody, CardHeader, CardTitle, Divider } from '@patternfly/react-core';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import {Provider} from '../api/report';

export const ChartCard = ({ provider }: { provider: Provider }) => {
    const customColors = ['#800000', '#FF0000', '#FFA500', '#808000'];
    return (
    // <Card isFlat isFullHeight>
    //   <CardHeader>
    //     <CardTitle>{`${provider.summary.vulnerabilities.total} vulnerabilities in ${provider.dependencies.length} dependencies`}</CardTitle>
    //   </CardHeader>
    //   <Divider />
    //   <CardBody>
      <div>
          <span>{provider.dependencies.length} dependencies</span>
          <Bullseye>
          <div style={{ height: '230px', width: '350px' }}>
            <ChartDonut
              constrainToVisibleArea
              data={[
                  { x: 'Critical', y: provider.summary.vulnerabilities.critical },
                  { x: 'High', y: provider.summary.vulnerabilities.high },
                  { x: 'Medium', y: provider.summary.vulnerabilities.medium,},
                  { x: 'Low', y: provider.summary.vulnerabilities.low },
              ]}
              labels={({ datum }) => `${datum.x}: ${datum.y}%`}
              legendData={[
                  { name: `Critical: ${provider.summary.vulnerabilities.critical}` },
                  { name: `High: ${provider.summary.vulnerabilities.high}` },
                  {name: `Medium: ${provider.summary.vulnerabilities.medium}`},
                  { name: `Low: ${provider.summary.vulnerabilities.low}` },
              ]}
              legendOrientation="vertical"
              legendPosition="right"
              padding={{
                bottom: 20,
                left: 20,
                right: 140, // Adjusted to accommodate legend
                top: 20,
              }}
              subTitle="Vulnerabilities"
              title={`${provider.summary.vulnerabilities.total}`}
              width={350}
              colorScale={customColors}
            />
          </div>
        </Bullseye>
      </div>
    //   </CardBody>
    // </Card>
  );
};
