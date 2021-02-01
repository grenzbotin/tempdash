// Thresholds according to https://www.luftfeuchtigkeit-raumklima.de/tabelle.php
const THRESHOLDS = {
  living_room: {
    temperature: {
      max: 23,
      min: 20
    },
    humidity: {
      max: 60,
      min: 40
    }
  },
  core: {
    temperature: {
      max: 21,
      min: 18
    },
    humidity: {
      max: 60,
      min: 40
    }
  }
};

interface Thresholds {
  temperature: {
    min: number;
    max: number;
  };
  humidity: {
    min: number;
    max: number;
  };
}

const getThresholds = (room: string): Thresholds => {
  if (THRESHOLDS[room]) {
    return THRESHOLDS[room];
  }
  return {
    temperature: {
      max: 23,
      min: 20
    },
    humidity: {
      max: 60,
      min: 40
    }
  };
};

const SENSOR_SETTINGS = {
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    color: '#65a88b',
    yScaleMin: 0,
    yScaleMax: 50,
    unit: '°C'
  },
  humidity: {
    id: 'humidity',
    name: 'Humidity',
    color: '#5FAAFA',
    yScaleMin: 0,
    yScaleMax: 100,
    unit: '%'
  }
};

const CITIES = process.env.REACT_APP_OPEN_WEATHER_CITY_IDS
  ? process.env.REACT_APP_OPEN_WEATHER_CITY_IDS?.split(',')
  : [];
const isDemoInstance = process.env.REACT_APP_MODE === 'demo';

export { getThresholds, SENSOR_SETTINGS, CITIES, isDemoInstance };
