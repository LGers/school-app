import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Main } from '../pages/Main';
import { Page404 } from '../pages/Page404';
import { PATH } from '../constants/common.dictionary';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<Main />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
