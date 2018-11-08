import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { Button, TextField } from '@material-ui/core';

import { Form, Icon, Input, Button } from 'antd';

import * as $validate from '../common/validate';

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByTopic['Auth.$login'] || false,
}));

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withStore(C);

// eslint-disable-next-line
class LoginView extends Component {
  state = {
    username: process.env.NODE_ENV === 'development' ? 'test@example.com' : '',
    password: process.env.NODE_ENV === 'development' ? 'test' : '',
    error: {
      username: null,
      password: null,
    },
  };

  login() {
    const { username, password } = this.state;
    // eslint-disable-next-line
    return this.props.dispatch($login(username, password)).catch((error) => console.log('error.. ', error));
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleInputValidation(value, key, rules) {
    $validate.exec(value, rules, (error) => {
      const _error = {
        [key]: error,
      };

      this.setState({
        error: { ...this.state.error, ..._error },
      });
    });
  }

  render() {
    const { username, password, error } = this.state;
    const { processing } = this.props;

    return (
      <Form>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            value={username}
            onChange={(event) => this.handleInputChange(event)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password" placeholder="Password"
            value={password}
            onChange={(event) => this.handleInputChange(event)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.login()}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

LoginView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default Connector(LoginView);
