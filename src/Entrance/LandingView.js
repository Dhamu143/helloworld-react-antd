import React from 'react';

import { Spin } from 'antd';

import LogoImage from '../assets/logo.png';

import styles from './LandingView.module.css';

function LandingView() {
  return (
    <div className={styles.container}>
      <img src={LogoImage} alt="logo" />

      <Spin size="large" />
    </div>
  );
}

export default LandingView;
