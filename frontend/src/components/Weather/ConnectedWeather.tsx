import React, { useEffect, useState } from 'react';
import { isDemoInstance } from 'setup/settings';
import demoData from './demoData';

import Weather from './Weather';

// Get data from Open weather

// eslint-disable-next-line max-len
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&id=`;

interface WeatherPromise {
  error?: boolean;
  message?: string;
  name: string;
  weather: Array<Record<string, undefined>>;
}

const getCurrentWeather = (cityId: string): Promise<WeatherPromise> =>
  fetch(`${apiUrl}${cityId}`).then((response) => {
    if (response.status !== 200) {
      return { error: true, message: 'Oopps. Could not get wheather data.' };
    }
    return response.json();
  });

const ConnectedWeather = ({ cityId }: { cityId: string }): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState({ error: false });

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const result = await getCurrentWeather(cityId);
      setData(result);
    }
    if (isDemoInstance) {
      setData(demoData[cityId]);
    } else {
      fetchData();
    }
  }, [cityId]);

  useEffect(() => {
    if (data?.error) {
      setIsLoading(false);
      setError({ ...data });
    } else if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return <Weather data={data} error={error} isLoading={isLoading} />;
};

export default ConnectedWeather;
