import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Switch, Route, Redirect, Link, withRouter,
} from 'react-router-dom';


import { Layout, Menu, Icon, Avatar, Popover } from 'antd';

import { connect } from 'react-redux';

import ProfileView from './ProfileView';
import Option1View from './Option1View';
import Option2View from './Option2View';
import HomeView from '../Home/HomeView';

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

      // dispatch($logout())
      //   .then(() => dispatch(Activity.$toast('success', 'Goodbye!')))
      //   .catch((error) => dispatch(Activity.$toast('failure', error.message)));
    },
  }),
);

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withRouter(withStore(C));

const drawerWidth = 300;

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const styles = {
  swipeableDrawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -24,
    marginRight: 16,
  },
};

// eslint-disable-next-line
class Session extends Component {
  state = {
    collapsed: false,
    swipeableDrawerCallapsed: false,
    navigationMenuItems: [
      {
        key: '1',
        title: 'Home',
        icon: 'home',
        route: '/home',
      },
      {
        key: '2',
        title: 'Profile',
        icon: 'user',
        route: '/profile',
      },
    ],
  };

  toggleDrawer = (open) => () => {
    this.setState({
      swipeableDrawerCallapsed: open,
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const text = <span>Title</span>;
    const content = (
      <Menu mode="horizontal">
        <Menu.Item onClick={() => logout()}>
          <Icon type="logout" />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );

    const { collapsed, navigationMenuItems } = this.state;
    const { user, logout } = this.props;
    return (
      <Layout>
       <Layout.Sider
         trigger={null}
         collapsible
         collapsed={collapsed}
       >
         <div className="logo" />
         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
           {navigationMenuItems.map((navigationMenuItem) => (
             <Menu.Item key={navigationMenuItem.key}>
              <Link to={navigationMenuItem.route}>
                <Icon type={navigationMenuItem.icon} />
                <span>{navigationMenuItem.title}</span>
               </Link>
             </Menu.Item>
           ))}
           <Menu.SubMenu title={<span><Icon type="setting" /><span>Navigation</span></span>}>
            <Menu.Item key="3">
              <Link to="option1">
                <span>Option 1</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="option2">
                <span>Option 2</span>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
         </Menu>
       </Layout.Sider>
       <Layout>
         <Layout.Header
           style={{
            background: '#fff',
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
           <Icon
             style={{
               paddingTop: 21,
               paddingLeft: 21,
               fontSize: 18,
               cursor: 'pointer',
             }}
             type={collapsed ? 'menu-unfold' : 'menu-fold'}
             onClick={this.toggle}
           />
           <div style={{ flex: 1 }} />
           <Avatar style={{ margin: 'auto', backgroundColor:'#00e8ba'}}>
            {user.name.substring(0,2).toUpperCase()}
           </Avatar>
           <Popover
              placement="bottomRight"
              content={content}
              trigger="click"
            >
              <Icon style={{paddingRight: 16, paddingLeft:16 ,paddingTop: 24, cursor: 'pointer'}} type="down" />
           </Popover>
         </Layout.Header>
         <Layout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
           <Switch>
             <Route exact path="/home" component={HomeView} />
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
