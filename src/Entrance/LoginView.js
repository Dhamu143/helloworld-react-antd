import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Form, Icon, Input, Button,
} from 'antd';

import * as PropTypes from '../common/proptypes';

import * as Dialog from '../Shared/Dialog';

import * as $validate from '../common/validate';

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$login.OPERATION] || false,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
};

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

    dispatch($login(this.state.username, this.state.password)).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
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
            name="username"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            defaultValue={username}
            onChange={(e) => this.handleInputChange(e)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={(e) => this.handleInputChange(e)}
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

LoginView.propTypes = propTypes;

export default Wrapper(LoginView);
