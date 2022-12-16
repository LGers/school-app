import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert, Button, Input, Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';
import { Wrapper } from '../../components/Wrapper';
import s from './Auth.module.scss';
import { SignInFormInputs } from './Auth.types';
import {
  SIGN_IN_FORM_FIELDS,
  SIGN_IN_MESSAGES,
  SIGN_IN_TITLE,
} from './Auth.dictionary';
import { signInValidationSchema } from './Auth.validation';
import { RootState, store } from '../../redux/store';
import { PATH } from '../../constants/common.dictionary';
import { fetchGetOneUser, fetchSignIn } from '../../redux/auth/auth.thunk';
import { logout, resetErrorMessage } from '../../redux/auth/auth.slice';
import { AuthBottomInfo } from '../../components/AuthBottomInfo';
import { AuthHeader } from '../../components/AuthHeader';
import { TokenData } from '../../redux/redux.types';

const { EMAIL, PASSWORD } = SIGN_IN_FORM_FIELDS;
const { Title } = Typography;

export function SignIn() {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control, handleSubmit, formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    const { email, password } = data;
    const res = await store.dispatch(fetchSignIn({ email, password }));

    if (res.meta.requestStatus === 'fulfilled') {
      const token = localStorage.getItem('authToken');
      try {
        const { id } = jwtDecode(token ?? '') as TokenData;
        store.dispatch(fetchGetOneUser({ id }));
      } catch (e) {
        dispatch(logout());
      }
    }
  };

  const handleResetErrorMessage = () => {
    dispatch(resetErrorMessage());
  };

  useEffect(() => {
    if (auth.isAuth) {
      navigate(PATH.HOME);
    }
  }, [auth.isAuth, navigate]);

  return (
    <Wrapper>
      <div className={s.content}>
        <AuthHeader />
        <div className={s.authWrapper}>
          <Title level={2}>{SIGN_IN_TITLE}</Title>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor={EMAIL.name}>
              {EMAIL.label}
              <Controller
                name={EMAIL.name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    placeholder={EMAIL.placeholder}
                    id={EMAIL.name}
                    status={errors[EMAIL.name] && 'error'}
                    onFocus={handleResetErrorMessage}
                    prefix={<UserOutlined />}
                    {...field}
                  />
                )}
              />
              <div className={s.error}>
                {errors[EMAIL.name] && <span>{errors[EMAIL.name]?.message}</span>}
              </div>
            </label>
            <label htmlFor={PASSWORD.name}>
              {PASSWORD.label}
              <Controller
                name={PASSWORD.name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input.Password
                    placeholder={PASSWORD.placeholder}
                    id={PASSWORD.name}
                    status={errors[PASSWORD.name] ? 'error' : ''}
                    onFocus={handleResetErrorMessage}
                    prefix={<LockOutlined />}
                    {...field}
                  />
                )}
              />
              <div className={s.error}>
                {errors[PASSWORD.name] && <span>{errors[PASSWORD.name]?.message}</span>}
              </div>
            </label>
            <Button
              type="primary"
              htmlType="submit"
              loading={auth.isFetching}
            >
              {SIGN_IN_TITLE}
            </Button>
          </form>
          {auth.error.message
          && (
            <Alert
              message={SIGN_IN_MESSAGES.ERROR_TITLE}
              description={auth.error.message}
              type="error"
              closable
              showIcon
              onClose={() => {
                setTimeout(() => {
                  handleResetErrorMessage();
                }, 1000);
              }}
            />
          )}
          <AuthBottomInfo
            path={PATH.SIGN_UP}
            message={SIGN_IN_MESSAGES.HAVE_ACCOUNT}
            linkTitle={SIGN_IN_MESSAGES.HAVE_ACCOUNT_LINK_TITLE}
          />
          <AuthBottomInfo
            path={PATH.RESTORE_PASSWORD}
            message={SIGN_IN_MESSAGES.RESTORE_PASSWORD}
            linkTitle={SIGN_IN_MESSAGES.RESTORE_PASSWORD_LINK_TITLE}
          />
        </div>
      </div>
    </Wrapper>
  );
}
