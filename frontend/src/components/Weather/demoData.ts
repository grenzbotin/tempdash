import { getRandomNumber } from 'components/utils';

// File content only used for demo instance

const weather = [
  { main: 'Clouds', icon: '04d', description: 'Light thunderstorm' },
  { main: 'Drizzle', icon: '09d', description: 'Drizzle Rain' },
  { main: 'Rain', icon: '10d', description: 'Light rain' },
  { main: 'Snow', icon: '13d', description: 'Heavy Snow' },
  { main: 'Mist', icon: '50d', description: 'Mist' },
  { main: 'Clear', icon: '01d', description: 'Clear sky' },
  { main: 'Thunderstorm', description: 'Thunderstorm', icon: '11d' }
];

export default {
  2885657: {
    coord: { lon: 8.6667, lat: 49 },
    weather: [{ id: 804, ...weather[getRandomNumber(0, weather.length - 1, 1)] }],
    base: 'stations',
    main: {
      temp: getRandomNumber(-10, 30, 0.1),
      feels_like: getRandomNumber(-10, 30, 0.1),
      temp_min: 8.33,
      temp_max: 10.56,
      pressure: 1009,
      humidity: getRandomNumber(20, 80, 0.1)
    },
    visibility: 10000,
    wind: { speed: 0.8, deg: 186, gust: 1.15 },
    clouds: { all: 100 },
    dt: 1619802288,
    sys: { type: 3, id: 2036078, country: 'DE', sunrise: 1619755559, sunset: 1619807933 },
    timezone: 7200,
    id: 3214104,
    name: 'Karlsruhe Region',
    cod: 200
  },
  3214104: {
    coord: { lon: 13.5823, lat: 52.4425 },
    weather: [{ id: 803, ...weather[getRandomNumber(0, weather.length - 1, 1)] }],
    base: 'stations',
    main: {
      temp: getRandomNumber(-10, 30, 0.1),
      feels_like: getRandomNumber(-10, 30, 0.1),
      temp_min: 8.33,
      temp_max: 10.56,
      pressure: 1009,
      humidity: getRandomNumber(20, 80, 0.1)
    },
    visibility: 10000,
    wind: { speed: 2.57, deg: 360 },
    clouds: { all: 75 },
    dt: 1619802376,
    sys: { type: 1, id: 1262, country: 'DE', sunrise: 1619753772, sunset: 1619807360 },
    timezone: 7200,
    id: 2885657,
    name: 'Berlin Köpenick',
    cod: 200
  }
};
