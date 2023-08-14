import { createContext, useContext } from 'react';
import { MOCK_REPORT } from './mocks/report.mock';
import { Report } from '@app/api/report';
import { TabbedLayout } from './TabbedLayout';

const report = (window as any)['report'] || MOCK_REPORT;

export const AppContext = createContext<Report>(report);
export const useAppContext = (): Report => useContext(AppContext);

function App() {
  return (
    <AppContext.Provider value={report}>
      <TabbedLayout />
    </AppContext.Provider>
  );
}

export default App;
