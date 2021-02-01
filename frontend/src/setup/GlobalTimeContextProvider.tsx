/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

// Context for defining the global scope: selected time frame

export const GlobalTimeSelectionContext = React.createContext({
  startAt: 0,
  endAt: 0,
  displayedRange: 0,
  setTimeRange: (_startDate: number, _endDate: number) => undefined,
  setDisplayedRange: ([_startAt, _endAt]: Array<number>) => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalTimeContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState(null);
  const setTimeRange = (startAt: number, endAt: number): void => {
    setState({
      ...state,
      startAt,
      endAt,
      displayedRange: [startAt, endAt]
    });
  };

  const setDisplayedRange = (range: Array<number>): void => {
    setState({ ...state, displayedRange: range });
  };

  const initState = useCallback(() => {
    const today = moment();
    return {
      startAt: today.startOf('day').unix(),
      endAt: today.endOf('day').unix(),
      displayedRange: [today.startOf('day').unix(), today.endOf('day').unix()]
    };
  }, []);

  useEffect(() => {
    setState(initState);
  }, [initState]);

  return (
    <GlobalTimeSelectionContext.Provider value={{ ...state, setTimeRange, setDisplayedRange }}>
      {state && children}
    </GlobalTimeSelectionContext.Provider>
  );
};
