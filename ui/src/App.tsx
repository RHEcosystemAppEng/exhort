import React, { createContext } from "react";
import { CompoundExpandable } from "./Table";

export const AppContext = createContext(null);

function App() {
  const sbom = (window as any)["sbomb"];
  return (
    <AppContext.Provider value={sbom}>
      <CompoundExpandable />
    </AppContext.Provider>
  );
}

export default App;
