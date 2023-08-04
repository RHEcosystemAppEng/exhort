import React from 'react';
import { Bullseye, Card, CardBody, CardHeader, CardTitle, Divider } from '@patternfly/react-core';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import { useAppContext } from '../App';

export const ChartCard: React.FC = () => {
  const sbom = useAppContext();
  return (
    <Card isFlat isFullHeight>
      <CardHeader>
        <CardTitle>{`${sbom.report.summary.vulnerabilities.total} vulnerabilities in ${sbom.report.dependencies.length} dependencies`}</CardTitle>
      </CardHeader>
      <Divider />
      <CardBody>
        <Bullseye>
          <div style={{ height: '230px', width: '350px' }}>
            <ChartDonut
              constrainToVisibleArea
              data={[
                { x: 'High', y: sbom.report.summary.vulnerabilities.high },
                {
                  x: 'Medium',
                  y: sbom.report.summary.vulnerabilities.medium,
                },
                { x: 'Low', y: sbom.report.summary.vulnerabilities.low },
              ]}
              labels={({ datum }) => `${datum.x}: ${datum.y}%`}
              legendData={[
                { name: `High: ${sbom.report.summary.vulnerabilities.high}` },
                {
                  name: `Medium: ${sbom.report.summary.vulnerabilities.medium}`,
                },
                { name: `Low: ${sbom.report.summary.vulnerabilities.low}` },
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
              title={`${sbom.report.summary.vulnerabilities.total}`}
              width={350}
              themeColor={ChartThemeColor.orange}
            />
          </div>
        </Bullseye>
      </CardBody>
    </Card>
  );
};
