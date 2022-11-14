import * as React from 'react';
import { Typography } from 'antd';
import s from './Footer.module.scss';
import logo from '../../assets/img/syberry-logo.png';

const { Text } = Typography;

export function Footer() {
  return (
    <footer className={s.footer}>
      <a href="https://www.syberry.com/" target="_blank" rel="noreferrer">
        <img src={logo} alt="Syberry logo" />
      </a>
      <Text>&copy; The Crawler</Text>
    </footer>
  );
}
