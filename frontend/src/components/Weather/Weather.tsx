/* eslint-disable camelcase */
import moment from 'moment';
import { Image } from 'antd';
import CustomCard from '../elements/CustomCard';

interface WeatherProps {
  description: string;
  icon?: string;
  main?: {
    temp?: number;
    feels_like?: number;
  };
}

interface WeatherData {
  name?: string;
  weather: WeatherProps[];
  main?: {
    temp?: number;
    feels_like?: number;
    humidity?: number;
  };
}

const Weather = ({
  isLoading,
  error,
  data
}: {
  isLoading: boolean;
  error: { error: boolean };
  data: WeatherData;
}): JSX.Element => (
  <CustomCard
    extra={<span style={{ color: 'rgba(0,0,0,.4)' }}>{moment(new Date()).format('lll')}</span>}
    loading={isLoading}
    title={data?.name ? data.name : 'Current weather'}
  >
    {!isLoading && (
      <>
        {error.error ? (
          'Error'
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image width={50} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} preview={false} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 700 }}>{data.weather[0].main ? data.weather[0].main : 'n/a'}</div>
                <div style={{ fontStyle: 'italic' }}>
                  {data.weather[0].description ? data.weather[0].description : 'n/a'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ color: '#65a88b', fontSize: '1.5rem', fontWeight: 600 }}>
                {data.main?.temp ? data.main.temp.toFixed(1) : 'n/a'}
                °C
                <span style={{ fontSize: '.8rem', marginLeft: '.2rem' }}>
                  ({data.main?.feels_like ? data.main.feels_like.toFixed(1) : 'n/a'}
                  °C)
                </span>
                <div style={{ fontSize: '.6rem' }}>Temperature</div>
              </div>
              <div style={{ color: '#5FAAFA', fontSize: '1.5rem', fontWeight: 600 }}>
                {data.main?.humidity ? data.main.humidity.toFixed(1) : 'n/a'}%
                <div style={{ fontSize: '.6rem', textAlign: 'right' }}>Humidity</div>
              </div>
            </div>
          </>
        )}
      </>
    )}
  </CustomCard>
);

export default Weather;
