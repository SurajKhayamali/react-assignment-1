import { PropsWithoutRef, useRef, useState } from 'react';
import { handleEnterKeyPress } from '../../utils/handleKeyboardEvent';
import {
  CurrentForecastResponseType,
  ForecastApiResponse,
  getWeatherByCity,
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

  const handleCityChange = async () => {
    const city = inputRef.current?.value;
    if (!city) return;

    const data = await getWeatherByCity(city);
    data && setData(data);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="prose">
        <h1>Weather App</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a city"
          onKeyDown={handleEnterKeyPress(handleCityChange)}
          className="input input-bordered"
        />

        {data && <WeatherDetails data={data} />}
      </div>
    </div>
  );
};

export default Weather;
