import { type PropsWithoutRef, useRef, useState, useEffect } from 'react';
import { Form, useActionData } from 'react-router-dom';

import Button from '../../compoments/Button';
import type {
  CurrentForecastResponseType,
  ForecastApiResponse,
} from '../../services/weather';

interface ICurrentForecastDisplayFormat {
  displayTitle: string;
  key: CurrentForecastResponseType;
  format?: (value: any) => any;
}

const currentForecastDisplayFormat: ICurrentForecastDisplayFormat[] = [
  {
    displayTitle: 'Temprature',
    key: 'temperature_2m',
  },
  {
    displayTitle: 'Cloud',
    key: 'cloud_cover',
  },
  {
    displayTitle: 'Rain',
    key: 'rain',
  },
  {
    displayTitle: 'Humidity',
    key: 'relative_humidity_2m',
  },
  {
    displayTitle: 'Snowfall',
    key: 'snowfall',
  },
  {
    displayTitle: 'Last Recorded Time',
    key: 'time',
    format: (value: number) => new Date(value * 1000).toLocaleString(),
  },
  {
    displayTitle: 'Wind Direction',
    key: 'wind_direction_10m',
  },
  {
    displayTitle: 'Wind Speed',
    key: 'wind_speed_10m',
  },
];

const WeatherDetails = ({
  data,
}: PropsWithoutRef<{ data: ForecastApiResponse }>) => {
  return (
    <>
      {currentForecastDisplayFormat.map(({ displayTitle, key, format }) => (
        <div key={key}>
          <span>{displayTitle}</span>:{' '}
          <span>
            {format ? format(data.current[key]) : data.current[key]}{' '}
            {!format && data.current_units[key]}
          </span>
        </div>
      ))}
    </>
  );
};

const Weather = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<ForecastApiResponse>();

  const dataFromAction = useActionData() as ForecastApiResponse;

  useEffect(() => {
    if (dataFromAction) setData(dataFromAction);
  }, [dataFromAction]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Form method="POST" className="prose">
        <h1>Weather App</h1>
        <input
          ref={inputRef}
          type="text"
          name="city"
          placeholder="Enter a city"
          className="input input-bordered"
        />
        <Button title="Submit" type="submit" />

        {data && <WeatherDetails data={data} />}
      </Form>
    </div>
  );
};

export default Weather;
