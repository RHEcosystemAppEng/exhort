import React from 'react';
import { Bullseye, Card, CardBody, CardHeader, CardTitle, Divider } from '@patternfly/react-core';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import { useAppContext } from '../App';

export const ChartCard: React.FC = () => {
  const sbom = useAppContext();
  const firstProvider = Object.values(sbom.report)[0];
  return (
    <Card isFlat isFullHeight>
      <CardHeader>
        <CardTitle>{`${firstProvider.summary.vulnerabilities.total} vulnerabilities in ${firstProvider.dependencies.length} dependencies`}</CardTitle>
      </CardHeader>
      <Divider />
      <CardBody>
        <Bullseye>
          <div style={{ height: '230px', width: '350px' }}>
            <ChartDonut
              constrainToVisibleArea
              data={[
                { x: 'High', y: firstProvider.summary.vulnerabilities.high },
                {
                  x: 'Medium',
                  y: firstProvider.summary.vulnerabilities.medium,
                },
                { x: 'Low', y: firstProvider.summary.vulnerabilities.low },
              ]}
              labels={({ datum }) => `${datum.x}: ${datum.y}%`}
              legendData={[
                { name: `High: ${firstProvider.summary.vulnerabilities.high}` },
                {
                  name: `Medium: ${firstProvider.summary.vulnerabilities.medium}`,
                },
                { name: `Low: ${firstProvider.summary.vulnerabilities.low}` },
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
              title={`${firstProvider.summary.vulnerabilities.total}`}
              width={350}
              themeColor={ChartThemeColor.orange}
            />
          </div>
        </Bullseye>
      </CardBody>
    </Card>
  );
};
