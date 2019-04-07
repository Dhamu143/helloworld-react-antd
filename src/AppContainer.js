import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';

import { LocaleProvider } from 'antd';
import AntdLocale from 'antd/lib/locale-provider/en_US';

import App from './App';

import { getStore } from './store';

const AppContainer = () => (
  <StateProvider store={getStore()}>
    <LocaleProvider locale={AntdLocale}>
      <Router>
        <App />
      </Router>
    </LocaleProvider>
  </StateProvider>
);

export default AppContainer;
