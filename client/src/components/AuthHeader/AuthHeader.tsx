import * as React from 'react';
import s from './AuthHeader.module.scss';
import logo from '../../assets/img/logo.png';
import { AUTH_TITLE } from './AuthHeader.dictionary';

export function AuthHeader() {
  return (
    <div className={s.authHeader}>
      <img className={s.authHeaderLogo} src={logo} alt="Logo" />
      <div className={s.authHeaderTitle}>{AUTH_TITLE}</div>
    </div>
  );
}
