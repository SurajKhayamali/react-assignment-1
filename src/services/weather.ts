import fetchWrapper from '../utils/fetchWrapper';

interface GeocodingApiResponse {
  results: {
    name: string;
    latitude: string;
    longitude: string;
  }[];
  generationtime_ms: number;
}

const CURRENT_FORECAST_RESPONSE_KEYS = [
  'apparent_temperature',
  'cloud_cover',
  'interval',
  'is_day',
  'precipitation',
  'pressure_msl',
  'rain',
  'relative_humidity_2m',
  'showers',
  'snowfall',
  'surface_pressure',
  'temperature_2m',
  'time',
  'weather_code',
  'wind_direction_10m',
  'wind_gusts_10m',
  'wind_speed_10m',
];

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
// interface ForecastApiResponse {
//   current?: {
//     apparent_temperature?: number;
//     cloud_cover?: number;
//     interval?: number;
//     is_day?: number;
//     precipitation?: number;
//     pressure_msl?: number;
//     rain?: number;
//     relative_humidity_2m?: number;
//     showers?: number;
//     snowfall?: number;
//     surface_pressure?: number;
//     temperature_2m?: number;
//     time?: number;
//     weather_code?: number;
//     wind_direction_10m?: number;
//     wind_gusts_10m?: number;
//     wind_speed_10m?: number;
//   }[];
//   current_units?: {
//     apparent_temperature?: string;
//     cloud_cover?: string;
//     interval?: string;
//     is_day?: string;
//     precipitation?: string;
//     pressure_msl?: string;
//     rain?: string;
//     relative_humidity_2m?: string;
//     showers?: string;
//     snowfall?: string;
//     surface_pressure?: string;
//     temperature_2m?: string;
//     time?: string;
//     weather_code?: string;
//     wind_direction_10m?: string;
//     wind_gusts_10m?: string;
//     wind_speed_10m?: string;
//   };
// }

export const searchCity = async (city: string) => {
  const response = await fetchWrapper<GeocodingApiResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
  );
  // console.log('cityResponse:', response);

  return response.results;
};

export const getWeather = async (
  latitude: string,
  longitude: string,
  // current: string = '',
) => {
  const current =
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m';
  const response = await fetchWrapper<ForecastApiResponse>(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${current}&timeformat=unixtime&timezone=auto&forecast_days=1&format=json`,
  );
  // console.log('weatherResponse:', response);

  return response;
};

export const getWeatherByCity = async (city: string) => {
  const cities = await searchCity(city);
  const firstCity = cities?.[0];
  if (!firstCity) return;

  const { latitude, longitude } = firstCity;
  // console.log(latitude, longitude);

  return getWeather(latitude, longitude);
};
