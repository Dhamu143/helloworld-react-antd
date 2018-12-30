import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout, Card } from 'antd';

import LoginView from './LoginView';

import LOGO from '../assets/logo.png';

class Entrance extends Component {
  static = {};

  render() {
    return (
      <Layout
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card style={{ width: 300 }}>
          <img src={LOGO} alt="logo" style={{ margin: 16, width: 100 }} />
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Redirect exact from="/*" to="/login" />
          </Switch>
        </Card>
      </Layout>
    );
  }
}

export default Entrance;
