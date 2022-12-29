import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import { ProtectedRouteProps } from './AppRoutes.types';
import { PATH, Roles } from '../constants/common.dictionary';
import { RootState } from '../redux/store';

const {
  ADMIN, TEACHER, STUDENT, USER,
} = Roles;

export function StudentProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { auth } = useSelector((state: RootState) => state);
  const { role } = auth.user;

  switch (role) {
    case STUDENT:
      return children as JSX.Element;

    case TEACHER:
      return <Navigate to={PATH.CLASSES} replace />;

    case ADMIN:
      return <Navigate to={PATH.CLASSES} replace />;

    case USER:
      return <Navigate to={PATH.USER} replace />;

    default:
      return <Navigate to={PATH.HOME} replace />;
  }
}

export function UserProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { auth } = useSelector((state: RootState) => state);
  const { role } = auth.user;

  switch (role) {
    case STUDENT:
      return <Navigate to={PATH.STUDENT} replace />;

    case TEACHER:
      return <Navigate to={PATH.CLASSES} replace />;

    case ADMIN:
      return <Navigate to={PATH.CLASSES} replace />;

    case USER:
      return children as JSX.Element;

    default:
      return <Navigate to={PATH.HOME} replace />;
  }
}

export function TeacherProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { auth } = useSelector((state: RootState) => state);
  const { role } = auth.user;

  switch (role) {
    case STUDENT:
      return <Navigate to={PATH.STUDENT} replace />;

    case TEACHER:
      return children as JSX.Element;

    case ADMIN:
      return children as JSX.Element;

    case USER:
      return children as JSX.Element;

    default:
      return <Navigate to={PATH.HOME} replace />;
  }
}

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { auth } = useSelector((state: RootState) => state);

  if (!auth.isAuth) {
    return <Navigate to={PATH.SIGN_IN} replace />;
  }

  return children as JSX.Element;
}

export function PrivateRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { auth } = useSelector((state: RootState) => state);
  const { role } = auth.user;

  switch (role) {
    case USER:
      return <Navigate to={PATH.USER} replace />;

    case STUDENT:
      return <Navigate to={PATH.STUDENT} replace />;

    case ADMIN:
      return <Navigate to={PATH.CLASSES} replace />;

    case TEACHER:
      return <Navigate to={PATH.CLASSES} replace />;

    default:
      return children as JSX.Element;
  }
}
