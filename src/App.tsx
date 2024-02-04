import React from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';

import './features/Counter/index.module.css';
import ActivityLog from './features/ActivityLog';
import Counter from './features/Counter/index';
import DocumentList from './features/DocumentList';
import Timer from './features/Timer';
import Weather from './features/Weather';
import { history, store } from './store';

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/doclist" element={<DocumentList />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/activityLog" element={<ActivityLog />} />
        </Routes>
      </HistoryRouter>
    </ReduxStoreProvider>
  );
};

export default App;
