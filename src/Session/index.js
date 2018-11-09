import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Switch, Route, Redirect, Link, withRouter,
} from 'react-router-dom';

import {
  Layout, Menu, Icon, Avatar, Dropdown, Button, Col, Row,
} from 'antd';

import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import Option1View from './Option1View';
import Option2View from './Option2View';
import HomeRouter from '../Home';

import { $logout } from '../Auth/state';

const withStore = connect(
  (state) => ({
    ready: state.Activity.ready,
    authenticated: state.Auth.authenticated,
    user: state.Auth.user,
  }),
  (dispatch) => ({
    logout() {
      dispatch($logout())
        .then(() => console.info('Goodbye!'))
        .catch((error) => console.log('oops!', error.message));
    },
  }),
);

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withRouter(withStore(C));

const drawerWidth = 300;

// eslint-disable-next-line
class Session extends Component {
  state = {
    collapsed: false,
    swipeableDrawerCallapsed: false,
    selectedKey: 'home',
    navigationMenuItems: [
      {
        key: 'home',
        title: 'Home',
        icon: 'home',
        route: '/home',
      },
      {
        key: 'profile',
        title: 'Profile',
        icon: 'user',
        route: '/profile',
      },
    ],
  };

  handleClick = (e) => {
    this.setState({
      selectedKey: e.key,
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const text = <span>Title</span>;
    const content = (
      <Menu style={{ padding: 10, width: 160 }} onClick={this.handleClick}>
        <Menu.Item key="profile">
          <Link to="/profile">Mon profile</Link>
        </Menu.Item>

        <Menu.Item onClick={() => logout()}>
          <Icon type="export" />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );
    const { collapsed, navigationMenuItems } = this.state;
    const { user, logout } = this.props;
    return (
      <Layout>
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.selectedKey]}
            selectedKeys={[this.state.selectedKey]}
            onClick={this.handleClick}
          >
            {navigationMenuItems.map((navigationMenuItem) => (
              <Menu.Item key={navigationMenuItem.key}>
                <Link to={navigationMenuItem.route}>
                  <Icon type={navigationMenuItem.icon} />
                  <span>{navigationMenuItem.title}</span>
                </Link>
              </Menu.Item>
            ))}
            <Menu.SubMenu
              title={(
                <span>
                  <Icon type="setting" />
                  <span>Navigation</span>
                </span>
)}
            >
              <Menu.Item key="option1">
                <Link to="option1">
                  <span>Option 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="option2">
                <Link to="option2">
                  <span>Option 2</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#fff' }}>
            <Row>
              <Col xs={14} sm={14} md={14} lg={20} xl={20}>
                <Icon
                  style={{
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              <Col xs={10} sm={10} md={10} lg={4} xl={4}>
                <div style={{ position: 'absolute', right: '0' }}>
                  <Dropdown overlay={content} trigger={['click']}>
                    <Button size="large" style={{ border: 'none', overflow: 'none' }}>
                      <Avatar style={{ margin: 'auto', backgroundColor: '#00e8ba' }}>
                        {user.name.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Icon type="down" />
                    </Button>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Layout.Header>
          <Layout.Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/home" component={HomeRouter} />
              <Route exact path="/profile" component={ProfileView} />
              <Route exact path="/option1" component={Option1View} />
              <Route exact path="/option2" component={Option2View} />
              <Redirect exact from="/*" to="/home" />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

Session.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Connector(Session);
