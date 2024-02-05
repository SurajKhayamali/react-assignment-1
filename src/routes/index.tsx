import { createBrowserRouter } from 'react-router-dom';

import ActivityLog from '../features/ActivityLog';
import Timer from '../features/Timer';
import Weather from '../features/Weather';

import Home from './Home';
import Root from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', index: true, element: <Home /> },
      { path: 'timer', element: <Timer /> },
      { path: 'weather', element: <Weather /> },
      { path: 'activityLog', element: <ActivityLog /> },
    ],
  },
]);

export default router;
