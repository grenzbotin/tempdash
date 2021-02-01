import React, { useContext, useEffect, useState } from 'react';
import { DatePicker, Slider } from 'antd';
import moment, { Moment } from 'moment';

import { GlobalTimeSelectionContext } from '../../setup/GlobalTimeContextProvider';
import CustomCard from './CustomCard';

const formatter = (value: number): string => {
  return moment.unix(value * 1000).format('LLL');
};

const RangeSlider = (): React.ReactElement => {
  const { startAt, endAt, setDisplayedRange, setTimeRange } = useContext(
    GlobalTimeSelectionContext
  );

  const [range, setRange] = useState([startAt, endAt]);

  useEffect(() => {
    setRange([startAt, endAt]);
  }, [startAt, endAt]);

  const handleAfterChange = (e: Array<number>): void => {
    setDisplayedRange([e[0] * 1000, e[1] * 1000]);
  };

  const handleChange = (e: Array<number>): void => {
    setRange([e[0] * 1000, e[1] * 1000]);
  };

  const handleStartChange = (_value: Moment, dateString: string): void => {
    if (dateString) {
      const startDate = moment(dateString).startOf('day').unix();
      setTimeRange(startDate, endAt);
    }
  };

  const handleEndChange = (_value: Moment, dateString: string): void => {
    if (dateString) {
      const endDate = moment(dateString).endOf('day').unix();
      setTimeRange(startAt, endDate);
    }
  };

  return (
    <CustomCard loading={false}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            background: 'white',
            padding: '.2rem .3rem',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 4px -3px #ccc'
          }}
        >
          <DatePicker
            disabledDate={(current) => current && current > moment.unix(endAt).endOf('day')}
            value={moment.unix(range[0])}
            bordered={false}
            format={(value) => value.format('l HH:mm')}
            onChange={handleStartChange}
          />
        </div>
        <div
          style={{
            background: 'white',
            padding: '.2rem .3rem',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 4px -3px #ccc'
          }}
        >
          <DatePicker
            disabledDate={(current) => current && current < moment.unix(startAt).startOf('day')}
            value={moment.unix(range[1])}
            bordered={false}
            format={(value) => value.format('l HH:mm')}
            onChange={handleEndChange}
          />
        </div>
      </div>
      <Slider
        min={Math.round(startAt / 1000)}
        max={Math.round(endAt / 1000)}
        value={[range[0] / 1000, range[1] / 1000]}
        range={{ draggableTrack: true }}
        tipFormatter={formatter}
        onAfterChange={handleAfterChange}
        onChange={handleChange}
      />
    </CustomCard>
  );
};

export default RangeSlider;
