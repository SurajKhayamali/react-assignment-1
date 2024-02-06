import { createBrowserRouter } from 'react-router-dom';

import ActivityLog from '../features/ActivityLog';
import Timer from '../features/Timer';
import Weather from '../features/Weather';
import { getWeatherByCity } from '../services/weather';

import Home from './Home';
import Root from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', index: true, element: <Home /> },
      { path: 'timer', element: <Timer /> },
      {
        path: 'weather',
        element: <Weather />,
        loader: async () => {
          return { message: 'OK' };
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const city = formData.get('city');
          if (!city) throw new Error('City is required');

          const data = await getWeatherByCity(city as string);
          return data;
        },
      },
      { path: 'activityLog', element: <ActivityLog /> },
    ],
  },
]);

export default router;
