import fetchWrapper from '../utils/fetchWrapper';

interface GeocodingApiResponse {
  results: {
    name: string;
    latitude: string;
    longitude: string;
  }[];
  generationtime_ms: number;
}

export type CurrentForecastResponseType =
  | 'apparent_temperature'
  | 'cloud_cover'
  | 'interval'
  | 'is_day'
  | 'precipitation'
  | 'pressure_msl'
  | 'rain'
  | 'relative_humidity_2m'
  | 'showers'
  | 'snowfall'
  | 'surface_pressure'
  | 'temperature_2m'
  | 'time'
  | 'weather_code'
  | 'wind_direction_10m'
  | 'wind_gusts_10m'
  | 'wind_speed_10m';

export interface ForecastApiResponse {
  current: Record<CurrentForecastResponseType, number>;
  current_units: Record<CurrentForecastResponseType, string>;
}

export const searchCity = async (city: string) => {
  const response = await fetchWrapper<GeocodingApiResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
  );

  return response.results;
};

export const getWeather = async (latitude: string, longitude: string) => {
  const current =
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m';
  const response = await fetchWrapper<ForecastApiResponse>(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${current}&timeformat=unixtime&timezone=auto&forecast_days=1&format=json`,
  );

  return response;
};

export const getWeatherByCity = async (city: string) => {
  const cities = await searchCity(city);
  const firstCity = cities?.[0];
  if (!firstCity) return;

  const { latitude, longitude } = firstCity;

  return getWeather(latitude, longitude);
};
