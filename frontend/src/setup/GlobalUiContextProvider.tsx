/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

// Context for defining the global scope: UI Settings
export const GlobalUiSelectionContext = React.createContext({
  current: true,
  graphFullView: false,
  toggleCurrent: () => undefined,
  toggleGraphFullView: () => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalUiContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ current: true, graphFullView: false });

  // Enable or disable current sensor/wheather data panels
  const toggleCurrent = (): void => {
    setState({ ...state, current: !state.current });
  };

  // Enable or disable large view for graphs
  const toggleGraphFullView = (): void => {
    setState({ ...state, graphFullView: !state.graphFullView });
  };

  return (
    <GlobalUiSelectionContext.Provider value={{ ...state, toggleCurrent, toggleGraphFullView }}>
      {state && children}
    </GlobalUiSelectionContext.Provider>
  );
};
