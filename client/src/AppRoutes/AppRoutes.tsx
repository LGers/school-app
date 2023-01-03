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
import { Classes } from '../pages/Classes';
import { OneClass } from '../pages/OneClass';
import { UserWelcome } from '../pages/UserWelcome';
import { Student } from '../pages/Student';
import {
  PrivateRoute,
  ProtectedRoute,
  StudentProtectedRoute, TeacherProtectedRoute, UserProtectedRoute,
} from './ProtectedRoutes';
import { RestorePassword } from '../pages/ResotorePassword';
import { Teachers } from '../pages/Teachers';

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
        <Route
          path={PATH.HOME}
          element={(
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          )}
        />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.SIGN_IN} element={<SignIn />} />
        <Route path={PATH.RESTORE_PASSWORD} element={<RestorePassword />} />
        <Route
          path={PATH.ACCOUNT_PROFILE}
          element={(
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
        <Route
          path={PATH.CLASSES}
          element={(
            <TeacherProtectedRoute>
              <Classes />
            </TeacherProtectedRoute>
          )}
        />
        <Route
          path={PATH.TEACHERS}
          element={(
            <TeacherProtectedRoute>
              <Teachers />
            </TeacherProtectedRoute>
          )}
        />
        <Route
          path={`${PATH.CLASSES}/:id`}
          element={(
            <TeacherProtectedRoute>
              <OneClass />
            </TeacherProtectedRoute>
          )}
        />
        <Route
          path={PATH.USER}
          element={(
            <UserProtectedRoute>
              <UserWelcome />
            </UserProtectedRoute>
          )}
        />
        <Route
          path={PATH.STUDENT}
          element={(
            <StudentProtectedRoute>
              <Student />
            </StudentProtectedRoute>
          )}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
