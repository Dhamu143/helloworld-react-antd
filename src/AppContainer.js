import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';

import { LocaleProvider } from 'antd';
import frFR from 'antd/lib/locale-provider/fr_FR';

import App from './App';

import { setupStore } from './store';

import bootstrap from './bootstrap';

const store = setupStore();

bootstrap();

const AppContainer = () => (
  <LocaleProvider locale={frFR}>
    <StateProvider store={store}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </LocaleProvider>
);

export default AppContainer;
