import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert, Button, Input, Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Wrapper } from '../../components/Wrapper';
import s from './Auth.module.scss';
import { SignUpFormInputs } from './Auth.types';
import {
  SIGN_UP_FORM_FIELDS, SIGN_UP_MESSAGES,
  SIGN_UP_TITLE,
} from './Auth.dictionary';
import { signUpValidationSchema } from './Auth.validation';
import { RootState, store } from '../../redux/store';
import { PATH } from '../../constants/common.dictionary';
import { fetchSignUp } from '../../redux/auth/auth.thunk';
import { resetErrorMessage } from '../../redux/auth/auth.slice';
import { AuthBottomInfo } from '../../components/AuthBottomInfo';
import { AuthHeader } from '../../components/AuthHeader';

const {
  EMAIL, PASSWORD, CONFIRM_PASSWORD, FIRST_NAME, LAST_NAME,
} = SIGN_UP_FORM_FIELDS;
const { Title } = Typography;

export function SignUp() {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control, handleSubmit, formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    const {
      firstName, lastName, email, password,
    } = data;
    store.dispatch(fetchSignUp({
      firstName, lastName, email, password,
    }));
  };

  const handleResetErrorMessage = () => {
    dispatch(resetErrorMessage());
  };

  useEffect(() => {
    if (auth.isAuth) {
      navigate(PATH.HOME);
    }
  }, [auth.isAuth, navigate]);

  useEffect(() => () => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  return (
    <Wrapper>
      <div className={s.content}>
        <AuthHeader />
        <div className={s.authWrapper}>
          <Title level={2}>{SIGN_UP_TITLE}</Title>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor={FIRST_NAME.name}>
              {FIRST_NAME.label}
              <Controller
                name={FIRST_NAME.name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    placeholder={FIRST_NAME.placeholder}
                    id={FIRST_NAME.name}
                    status={errors[FIRST_NAME.name] && 'error'}
                    onFocus={handleResetErrorMessage}
                    prefix={<UserOutlined />}
                    {...field}
                  />
                )}
              />
              <div className={s.error}>
                {errors[FIRST_NAME.name] && <span>{errors[FIRST_NAME.name]?.message}</span>}
              </div>
            </label>
            <label htmlFor={LAST_NAME.name}>
              {LAST_NAME.label}
              <Controller
                name={LAST_NAME.name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    placeholder={LAST_NAME.placeholder}
                    id={LAST_NAME.name}
                    status={errors[LAST_NAME.name] && 'error'}
                    onFocus={handleResetErrorMessage}
                    prefix={<UserOutlined />}
                    {...field}
                  />
                )}
              />
              <div className={s.error}>
                {errors[LAST_NAME.name] && <span>{errors[LAST_NAME.name]?.message}</span>}
              </div>
            </label>
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
                    prefix={<MailOutlined />}
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
            <label htmlFor={CONFIRM_PASSWORD.name}>
              {CONFIRM_PASSWORD.label}
              <Controller
                name={CONFIRM_PASSWORD.name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input.Password
                    placeholder={CONFIRM_PASSWORD.placeholder}
                    id={CONFIRM_PASSWORD.name}
                    status={errors[CONFIRM_PASSWORD.name] ? 'error' : ''}
                    onFocus={handleResetErrorMessage}
                    prefix={<LockOutlined />}
                    {...field}
                  />
                )}
              />
              <div className={s.error}>
                {errors[CONFIRM_PASSWORD.name]
                  && <span>{errors[CONFIRM_PASSWORD.name]?.message}</span>}
              </div>
            </label>
            <Button
              type="primary"
              htmlType="submit"
              loading={auth.isFetching}
            >
              {SIGN_UP_TITLE}
            </Button>
          </form>
          {auth.error.message
          && (
            <Alert
              message={SIGN_UP_MESSAGES.ERROR_TITLE}
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
            path={PATH.SIGN_IN}
            message={SIGN_UP_MESSAGES.HAVE_ACCOUNT}
            linkTitle={SIGN_UP_MESSAGES.HAVE_ACCOUNT_LINK_TITLE}
          />
        </div>
      </div>
    </Wrapper>
  );
}
