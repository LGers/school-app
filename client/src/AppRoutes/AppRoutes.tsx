import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Main } from '../pages/Main';
import { Page404 } from '../pages/Page404';
import { PATH } from '../constants/common.dictionary';
import { SignUp } from '../pages/Auth/SignUp';
import { SignIn } from '../pages/Auth';
import { Profile } from '../pages/Profile';
import { logout } from '../redux/auth/auth.slice';
import { fetchGetOneUser } from '../redux/auth/auth.thunk';
import { store } from '../redux';
import { User } from '../redux/auth/auth.types';

export function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken') ?? '';
    let userId = 0;

    try {
      const { id } = jwtDecode(token) as User;
      userId = id;
    } catch (e) {
      dispatch(logout());
    }

    if (userId) {
      store.dispatch((fetchGetOneUser({ id: userId })));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<Main />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.SIGN_IN} element={<SignIn />} />
        <Route path={PATH.ACCOUNT_PROFILE} element={<Profile />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
