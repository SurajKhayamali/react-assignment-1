import ReactDOM from 'react-dom/client';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import './index.css';
// import App from './App';
import router from './routes';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// INFO: Uncomment the commented block below to use MSW to mock API
// if (process.env.NODE_ENV === 'development') {
//   // Prepare MSW in a Service Worker
//   import('../mocks/browser')
//     .then(({ worker }) => {
//       worker.start();
//     })
//     // Launched mock server, and then start client React app
//     .then(() => root.render(<App />));
// } else {
//   // Production
//   root.render(<App />);
// }

// root.render(<App />);

root.render(
  <ReduxStoreProvider store={store}>
    <RouterProvider router={router} />
  </ReduxStoreProvider>,
);
