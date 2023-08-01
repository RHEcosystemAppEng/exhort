import '@patternfly/react-core/dist/styles/base.css';
import { Button } from "@patternfly/react-core";
import { TableBasic } from './Table';

function App() {
  return (
    <>
      <Button onClick={() => alert('Test')}>Test</Button>
      <div>Woohoo!</div>
      <div>Total Vulnerabilities: $&#123;body.report.getSummary().getVulnerabilities().getTotal()&#125;</div>
      <TableBasic />
    </>
  );
}

export default App;
