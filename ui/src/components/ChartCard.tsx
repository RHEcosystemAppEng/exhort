import React from 'react';
import { Bullseye, Card, CardBody, CardHeader, CardTitle, Divider } from '@patternfly/react-core';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import { Provider } from '../api/report';

const customColors = ['#800000', '#FF0000', '#FFA500', '#808000'];

export const ChartCard = ({ provider }: { provider: Provider }) => {

  const legendData = [
    { name: `Critical: ${provider.summary.vulnerabilities.critical}`,symbol: { type: 'square', fill: customColors[0] } },
    { name: `High: ${provider.summary.vulnerabilities.high}`, symbol: { type: 'square', fill: customColors[1] } },
    { name: `Medium: ${provider.summary.vulnerabilities.medium}`, symbol: { type: 'square', fill: customColors[2] } },
    { name: `Low: ${provider.summary.vulnerabilities.low}`, symbol: { type: 'square', fill: customColors[3] } },
  ];

  return (
    <div>
      {/* CardHeader */}
      <CardHeader>
        <CardTitle>{`${provider.summary.vulnerabilities.total} vulnerabilities in ${provider.dependencies.length} dependencies`}</CardTitle>
      </CardHeader>
      <Divider />

      {/* Chart */}
      <CardBody style={{paddingBottom: "inherit"}}>
        <Bullseye>
          <div style={{ height: '230px', width: '350px' }}>
            <ChartDonut
              constrainToVisibleArea
              data={[
                { x: 'Critical', y: provider.summary.vulnerabilities.critical },
                { x: 'High', y: provider.summary.vulnerabilities.high },
                { x: 'Medium', y: provider.summary.vulnerabilities.medium },
                { x: 'Low', y: provider.summary.vulnerabilities.low },
              ]}
              labels={({ datum }) => `${datum.x}: ${datum.y}%`}
              legendData={legendData}
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
      </CardBody>
    </div>
  );
};
