import { Table } from 'antd';
import moment from 'moment';
import { SENSOR_SETTINGS } from '../../../setup/settings';
import { DataItem } from '../utils';

const CustomTable = ({ data }: { data: DataItem[] }): JSX.Element => {
  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (time: number) => moment.unix(time).format('LLL')
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      key: 'temperature',
      render: (temperature: number) => `${temperature.toFixed(1)}${SENSOR_SETTINGS.temperature.unit}`
    },
    {
      title: 'Humidity',
      dataIndex: 'humidity',
      key: 'humidity',
      render: (humidity: number) => `${humidity.toFixed(1)}${SENSOR_SETTINGS.humidity.unit}`
    }
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default CustomTable;
