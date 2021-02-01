import { useContext } from 'react';
import { FirebaseDatabaseNode } from '@react-firebase/database';

import { GlobalTimeSelectionContext } from '../../setup/GlobalTimeContextProvider';
import Visualization from './Visualization';
import { isDemoInstance } from 'setup/settings';
import { generateDemoData } from './demoData';

// Get data from Firebase
const ConnectedDoubleYAxisGraph = ({ source }: { source: string }): JSX.Element => {
  const { startAt, endAt } = useContext(GlobalTimeSelectionContext);
  return (
    startAt &&
    endAt &&
    (isDemoInstance ? (
      <Visualization isLoading={false} source={source} data={generateDemoData(startAt, endAt)} />
    ) : (
      <FirebaseDatabaseNode path={`dht/${source}`} orderByChild="time" startAt={startAt} endAt={endAt}>
        {(d) => (
          <Visualization isLoading={typeof d.isLoading === 'boolean' ? d.isLoading : true} source={source} data={d} />
        )}
      </FirebaseDatabaseNode>
    ))
  );
};

export default ConnectedDoubleYAxisGraph;
