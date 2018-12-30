import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { LocaleProvider } from 'antd';
import frFR from 'antd/lib/locale-provider/fr_FR';

import App from './App';

import { setupStore } from './store';

const store = setupStore();

const AppContainer = () => (
  <LocaleProvider locale={frFR}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </LocaleProvider>
);

export default AppContainer;
