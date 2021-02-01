import { SENSOR_SETTINGS } from '../../setup/settings';

export interface DataItem {
  key: number;
  time: number;
  temperature: number;
  humidity: number;
}

export interface DataProps {
  value: DataItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGraphData = (d: DataProps, range: number): any => {
  const tempData = d.value
    ? Object.keys(d.value).map((e) => ({
        x: d.value[e].time,
        y: d.value[e].temperature
      }))
    : [];
  const humidityData = d.value
    ? Object.keys(d.value).map((e) => ({
        x: d.value[e].time,
        y: d.value[e].humidity
      }))
    : [];

  const temperature = {
    ...SENSOR_SETTINGS.temperature,
    data: tempData.filter((item) => item.x >= range[0] && item.x <= range[1])
  };

  const humidity = {
    ...SENSOR_SETTINGS.humidity,
    data: humidityData.filter((item) => item.x >= range[0] && item.x <= range[1])
  };

  return {
    data1: { ...temperature },
    data2: { ...humidity }
  };
};

const getTableData = (d: DataProps, range: number): DataItem[] => {
  const tableData = d.value
    ? Object.keys(d.value).map((e) => ({
        key: d.value[e].time,
        time: d.value[e].time,
        temperature: d.value[e].temperature,
        humidity: d.value[e].humidity
      }))
    : [];

  return tableData.filter((item) => item.time >= range[0] && item.time <= range[1]);
};

export { getTableData, getGraphData };
