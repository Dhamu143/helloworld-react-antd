import React, { Component, StyleSheet } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Layout, Card } from 'antd';

import LogoImage from '../assets/logo.png';

import LoginView from './LoginView';
import SignupView from './SignupView';
import PasswordResetView from './PasswordResetView';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 300,
  },
  logo: {
    margin: 16,
    width: 100,
  },
};

class Entrance extends Component {
  state = {};

  render() {
    return (
      <Layout style={styles.container}>
        <Card style={styles.content}>
          <img src={LogoImage} alt="logo" style={styles.logo} />
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
