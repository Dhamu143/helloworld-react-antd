import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout, Card } from 'antd';

import LogoImage from '../assets/logo.png';

import LoginView from './LoginView';
import SignupView from './SignupView';
import PasswordResetView from './PasswordResetView';

class Entrance extends Component {
  state = {};

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
          <img src={LogoImage} alt="logo" style={{ margin: 16, width: 100 }} />
          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/signup" component={SignupView} />
            <Route exact path="/password-reset" component={PasswordResetView} />
            <Redirect exact from="/*" to="/login" />
          </Switch>
        </Card>
      </Layout>
    );
  }
}

export default Entrance;
