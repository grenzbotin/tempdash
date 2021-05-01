import { getRandomNumber } from 'components/utils';
import moment from 'moment';
import { DataItem, DataProps } from './utils';

// File content only used for demo instance

const generateDataForEvery10Minutes = (startDate: number, endDate: number): DataItem[] => {
  const timestamps = [];
  const unix10Minutes = 10 * 60;
  for (let i = startDate; i <= endDate; i += unix10Minutes) {
    if (moment.unix(i) <= moment(new Date())) {
      timestamps.push({
        key: i,
        humidity: getRandomNumber(30, 70, 0.1),
        temperature: getRandomNumber(15, 30, 0.1),
        time: i
      });
    }
  }

  return timestamps;
};

export const generateDemoData = (startDate: number, endDate: number): DataProps => ({
  value: generateDataForEvery10Minutes(startDate, endDate)
});
