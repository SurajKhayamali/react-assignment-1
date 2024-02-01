import { http, HttpResponse } from 'msw';

import { sleep } from '../src/utils/sleep';

export const handlers = [
  http.get('http://localhost:4000/api/docs_list', async () => {
    const data = [
      { name: 'Vite', url: 'https://vitejs.dev/' },
      { name: 'Redux Style Guide', url: 'https://redux.js.org/style-guide/' },
      { name: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' },
      {
        name: 'RTK Query API Reference',
        url: 'https://redux-toolkit.js.org/rtk-query/api/createApi',
      },
      { name: 'Vitest', url: 'https://vitest.dev/' },
      { name: 'MSW', url: 'https://mswjs.io/' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
      {
        name: 'CSS Nesting',
        url: 'https://developer.chrome.com/articles/css-nesting/',
      },
      {
        name: 'CSS Modules',
        url: 'https://github.com/css-modules/css-modules',
      },
    ];
    await sleep(3000);

    return HttpResponse.json(data);
  }),

  http.get('https://geocoding-api.open-meteo.com/v1/search', async () => {
    const data = {
      results: [
        {
          id: 1283240,
          name: 'Kathmandu',
          latitude: 27.70169,
          longitude: 85.3206,
          elevation: 1317.0,
          feature_code: 'PPLC',
          country_code: 'NP',
          admin1_id: 12095449,
          admin2_id: 12095484,
          timezone: 'Asia/Kathmandu',
          population: 1442271,
          country_id: 1282988,
          country: 'Nepal',
          admin1: 'Bagmati Province',
          admin2: 'Kathmandu',
        },
      ],
      generationtime_ms: 0.46300888,
    };

    return HttpResponse.json(data);
  }),

  http.get('https://api.open-meteo.com/v1/forecast', async () => {
    const data = {
      latitude: 27.75,
      longitude: 85.5,
      generationtime_ms: 0.07796287536621094,
      utc_offset_seconds: 20700,
      timezone: 'Asia/Kathmandu',
      timezone_abbreviation: '+0545',
      elevation: 1293.0,
      current_units: {
        time: 'unixtime',
        interval: 'seconds',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        apparent_temperature: '°C',
        is_day: '',
        precipitation: 'mm',
        rain: 'mm',
        showers: 'mm',
        snowfall: 'cm',
        weather_code: 'wmo code',
        cloud_cover: '%',
        pressure_msl: 'hPa',
        surface_pressure: 'hPa',
        wind_speed_10m: 'km/h',
        wind_direction_10m: '°',
        wind_gusts_10m: 'km/h',
      },
      current: {
        time: 1706776200,
        interval: 900,
        temperature_2m: 15.3,
        relative_humidity_2m: 41,
        apparent_temperature: 12.6,
        is_day: 1,
        precipitation: 0.0,
        rain: 0.0,
        showers: 0.0,
        snowfall: 0.0,
        weather_code: 3,
        cloud_cover: 100,
        pressure_msl: 1015.5,
        surface_pressure: 873.2,
        wind_speed_10m: 6.3,
        wind_direction_10m: 294,
        wind_gusts_10m: 9.4,
      },
    };

    return HttpResponse.json(data);
  }),
];
