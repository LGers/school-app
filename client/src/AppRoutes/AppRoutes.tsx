import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Main } from '../pages/Main';
import { Page404 } from '../pages/Page404';
import { PATH } from '../constants/common.dictionary';
import { SignUp } from '../pages/Auth/SignUp';
import { SignIn } from '../pages/Auth';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<Main />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.SIGN_IN} element={<SignIn />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
