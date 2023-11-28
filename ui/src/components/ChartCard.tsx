import { Bullseye, CardBody, CardHeader, CardTitle, Divider } from '@patternfly/react-core';
import { ChartDonut } from '@patternfly/react-charts';
import { Summary } from '../api/report';

const customColors = ['#800000', '#FF0000', '#FFA500', '#5BA352'];

export const ChartCard = ({ summary }: { summary: Summary}) => {

  const legendData = [
    { name: `Critical: ${summary.critical}`,symbol: { type: 'square', fill: customColors[0] } },
    { name: `High: ${summary.high}`, symbol: { type: 'square', fill: customColors[1] } },
    { name: `Medium: ${summary.medium}`, symbol: { type: 'square', fill: customColors[2] } },
    { name: `Low: ${summary.low}`, symbol: { type: 'square', fill: customColors[3] } },
  ];

  return (
    <div>
      {/* CardHeader */}
      <CardHeader style={{paddingBlock: "5px"}}>
        <CardTitle>{`${summary.total} vulnerabilities in ${summary.dependencies} dependencies`}</CardTitle>
      </CardHeader>
      <Divider />

      {/* Chart */}
      <CardBody style={{paddingBottom: "inherit"}}>
        <Bullseye>
          <div style={{ height: '230px', width: '350px' }}>
            <ChartDonut
              constrainToVisibleArea
              data={[
                { x: 'Critical', y: summary.critical },
                { x: 'High', y: summary.high },
                { x: 'Medium', y: summary.medium },
                { x: 'Low', y: summary.low },
              ]}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
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
              title={`${summary.total}`}
              width={350}
              colorScale={customColors}
            />
          </div>
        </Bullseye>
      </CardBody>
    </div>
  );
};
