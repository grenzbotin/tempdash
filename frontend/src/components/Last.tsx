import React from 'react';
import moment from 'moment';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import { Tooltip } from 'antd';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

import { getRoomName } from '../setup/rooms';
import CustomCard from './elements/CustomCard';
import { getThresholds, isDemoInstance } from '../setup/settings';
import { DataItem } from './visualization/utils';
import { getRandomNumber } from './utils';

const getWarning = (last: number, section: string, source: string): string | null => {
  if (last > getThresholds(source)[section].max) {
    return 'high';
  }

  if (last < getThresholds(source)[section].min) {
    return 'low';
  }

  return null;
};

const warningIconStyle = {
  fontSize: '.9rem',
  color: '#cf1322',
  background: '#fff1f0',
  border: '1px solid #ffa39e'
};

const getWarningIcon = (warningType: string, type: string): React.ReactNode | null => {
  const margin = type === 'humidity' ? '0 .5rem 0 0' : '0 0 0 .5rem';

  switch (warningType) {
    case 'high':
      return <CaretUpFilled style={{ ...warningIconStyle, margin }} />;
    case 'low':
      return <CaretDownFilled style={{ ...warningIconStyle, margin }} />;
    default:
      return null;
  }
};

interface DataProps {
  isLoading: boolean;
  value: DataItem[];
}

const LastDataCard = ({ source, d }: { source: string; d: DataProps }): React.ReactElement => {
  const isLoading = typeof d.isLoading === 'boolean' ? d.isLoading : true;
  const last = (d.value && d.value[Object.keys(d.value)[0]]) || null;

  const temperatureWarning = last ? getWarning(last.temperature, 'temperature', source) : null;
  const humidityWarning = last ? getWarning(last.humidity, 'humidity', source) : null;

  return (
    <CustomCard
      extra={last && <span style={{ color: 'rgba(0,0,0,.4)' }}>{moment.unix(last.time).format('lll')}</span>}
      loading={isLoading || !last}
      title={getRoomName(source)}
    >
      <>
        {!isLoading && last && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  color: '#65a88b',
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              >
                {last.temperature.toFixed(1)}
                °C
                {temperatureWarning && (
                  <Tooltip title={`${temperatureWarning} value`}>
                    {getWarningIcon(temperatureWarning, 'temperature')}
                  </Tooltip>
                )}
                <div style={{ fontSize: '.6rem' }}>Temperature</div>
              </div>
              <div style={{ color: '#5FAAFA', fontSize: '1.5rem', fontWeight: 600 }}>
                {humidityWarning && (
                  <Tooltip title={`${humidityWarning} value`}>{getWarningIcon(humidityWarning, 'humidity')}</Tooltip>
                )}
                {last.humidity.toFixed(1)}%<div style={{ fontSize: '.6rem', textAlign: 'right' }}>Humidity</div>
              </div>
            </div>
          </>
        )}
      </>
    </CustomCard>
  );
};

const Last = ({ source }: { source: string }): React.ReactElement => {
  return isDemoInstance ? (
    <LastDataCard
      source={source}
      d={{
        isLoading: false,
        value: [
          {
            key: 212,
            time: moment(new Date()).unix(),
            humidity: getRandomNumber(30, 80, 0.1),
            temperature: getRandomNumber(-20, 30, 0.1)
          }
        ]
      }}
    />
  ) : (
    <FirebaseDatabaseNode path={`dht/${source}`} limitToLast={1}>
      {(d) => <LastDataCard source={source} d={d} />}
    </FirebaseDatabaseNode>
  );
};

export default Last;
