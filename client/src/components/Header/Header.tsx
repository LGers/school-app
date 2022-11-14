import * as React from 'react';
import { Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PATH } from '../../constants/common.dictionary';
import { RootState } from '../../redux/store';
import s from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import { logout } from '../../redux/auth/auth.slice';
import { HEADER } from './Header.dictionary';

export function Header() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate(PATH.HOME);
  };

  return (
    <header className={s.header}>
      <div className={s.headerLeft}>
        <img className={s.headerLogoImg} src={logo} alt="Logo" />
        <p className={s.headerLogoTitle}>The Crawler</p>
        {auth.isAuth
        && (
          <Typography.Text className={s.headerName} type="secondary">
            {`${auth.user.firstName} ${auth.user.lastName}`}
          </Typography.Text>
        )}
      </div>
      {auth.isAuth
        ? (
          <div className={s.headerRight}>
            <Link to={PATH.ACCOUNT_PROFILE}>
              <Button type="default">{HEADER.EDIT_PROFILE}</Button>
            </Link>
            <Button type="primary" onClick={handleLogOut}>{HEADER.LOG_OUT}</Button>
          </div>
        )
        : (
          <div className={s.headerRight}>
            <Link to={PATH.SIGN_UP}>
              <Button type="link">{HEADER.SIGN_UP}</Button>
            </Link>
            <Link to={PATH.SIGN_IN}>
              <Button type="primary">{HEADER.SIGN_IN}</Button>
            </Link>
          </div>
        )}
    </header>
  );
}
