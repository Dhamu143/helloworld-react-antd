import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Form, Icon, Input, Button,
} from 'antd';

import * as Activity from '../Shared/Activity.service';

import * as $validate from '../common/validate';

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation['Auth.login'] || false,
}));

const Wrapper = (C) => withStore(C);

class LoginView extends Component {
  state = {
    username: '',
    password: '',
    error: {
      username: null,
      password: null,
    },
  };

  login() {
    const { dispatch } = this.props;

    dispatch($login(this.state.username, this.state.password)).catch((error) => Activity.toast('failure', error.message));
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleInputValidation(value, key, rules) {
    const error = $validate.exec(value, rules);

    this.setState({
      error: {
        ...this.state.error,
        [key]: error,
      },
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
            defaultValue={username}
            onChange={(event) => this.handleInputChange(event)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={(event) => this.handleInputChange(event)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={() => this.login()}>
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

export default Wrapper(LoginView);
