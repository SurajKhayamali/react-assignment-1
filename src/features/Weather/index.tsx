import { type PropsWithoutRef, useRef } from 'react';

import Button from '../../compoments/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type {
  CurrentForecastResponseType,
  ForecastApiResponse,
} from '../../services/weather';
import { handleEnterKeyPress } from '../../utils/handleKeyboardEvent';

import { fetchWeatherByCity } from './weatherSlice';

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

  const { data } = useAppSelector((state) => state.weather);

  const dispatch = useAppDispatch();

  const handleCityChange = async () => {
    const city = inputRef.current?.value;
    if (!city) return;

    dispatch(fetchWeatherByCity(city));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="prose">
        <h1>Weather App</h1>
        <input
          ref={inputRef}
          type="text"
          name="city"
          onKeyDown={handleEnterKeyPress(handleCityChange)}
          placeholder="Enter a city"
          className="input input-bordered"
        />
        <Button title="Submit" onClick={handleCityChange} />

        {data && <WeatherDetails data={data} />}
      </div>
    </div>
  );
};

export default Weather;
