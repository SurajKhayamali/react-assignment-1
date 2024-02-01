import React from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';

import './features/Counter/index.module.css';
import Counter from './features/Counter/index';
import DocumentList from './features/DocumentList';
import Timer from './features/Timer';
import Todo from './features/Todo';
import HooksDemo from './features/HooksDemo';
import ContextDemo from './features/ContextDemo';
import { NameContextProvider } from './contexts/NameContext';
import { history, store } from './store';

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <NameContextProvider>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<Counter />} />
            <Route path="/doclist" element={<DocumentList />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/hooks-demo" element={<HooksDemo />} />
            <Route path="/context-demo" element={<ContextDemo />} />
          </Routes>
        </HistoryRouter>
      </NameContextProvider>
    </ReduxStoreProvider>
  );
};

export default App;
