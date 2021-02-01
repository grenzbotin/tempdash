import React, { useContext } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Button } from 'antd';
import moment from 'moment';
import { DashboardFilled } from '@ant-design/icons';

import { GlobalTimeSelectionContext } from '../../setup/GlobalTimeContextProvider';
import { ReactComponent as AppLogo } from '../../assets/diagram.svg';
import { GlobalUiSelectionContext } from '../../setup/GlobalUiContextProvider';
import { isDemoInstance } from 'setup/settings';

const CustomHeader = (): React.ReactElement => {
  const { setTimeRange } = useContext(GlobalTimeSelectionContext);
  const { current, toggleCurrent } = useContext(GlobalUiSelectionContext);

  const handleClick = (): void => {
    const today = moment();
    const startDate = today.startOf('day').unix();
    const endDate = today.endOf('day').unix();
    setTimeRange(startDate, endDate);
  };

  return (
    <Header
      style={{
        display: 'flex',
        color: '#fff',
        fontWeight: 700,
        justifyContent: 'space-between',
        padding: '0 1.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<AppLogo style={{ margin: '.3rem', fill: '#fff' }} />}
          onClick={handleClick}
          style={{ marginRight: '1rem' }}
        />
        TEMPDASH
      </div>
      {isDemoInstance && <div>Demo data</div>}
      <div>
        <Button
          shape="circle"
          icon={<DashboardFilled />}
          onClick={toggleCurrent}
          type={current ? 'primary' : 'default'}
        />
      </div>
    </Header>
  );
};

export default CustomHeader;
