import * as React from 'react';
import s from './AuthHeader.module.scss';
import logo from '../../assets/img/logo.png';

export function AuthHeader() {
  return (
    <div className={s.authHeader}>
      <img className={s.authHeaderLogo} src={logo} alt="Logo" />
      <div className={s.authHeaderTitle}>The school</div>
    </div>
  );
}
