import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import s from './Profile.module.scss';
import { Header } from '../../components/Header';
import { PATH } from '../../constants/common.dictionary';
import { Wrapper } from '../../components/Wrapper';
import { RootState, store } from '../../redux/store';
import { Footer } from '../../components/Footer';
import { ProfileField } from '../../components/ProfileField';
import { ChangePasswordForm } from '../../components/ChangePasswordForm';
import { logout, resetErrorMessage } from '../../redux/auth/auth.slice';
import { EditProfileForm } from '../../components/EditProfileForm';
import { PROFILE } from './Profile.dictionary';
import {
  confirmModal, errorModal, successModal,
} from '../../components/Modal';
import { fetchDeleteUser } from '../../redux/auth/auth.thunk';

const { Title } = Typography;

const { PROFILE_FIELDS } = PROFILE;

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state: RootState) => state);
  const {
    firstName, lastName, email, role,
  } = auth.user;

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const handleDeleteProfile = async () => {
    if (auth.user.id) {
      const res = await store.dispatch(fetchDeleteUser({ id: auth.user.id }));

      if (res.meta.requestStatus === 'fulfilled') {
        successModal(PROFILE.SUCCESS_DELETE_MESSAGE, async () => {
          dispatch(logout());
          navigate(PATH.HOME);
        });
      }

      return;
    }

    dispatch(logout());
  };

  const handleChangePassword = () => {
    setIsChangePassword(!isChangePassword);
  };

  const handleEditProfile = async () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (auth.error.message) {
      errorModal(auth.error.message);
      dispatch(resetErrorMessage());
    }
  }, [auth.error.message, dispatch]);

  return (
    <Wrapper>
      <div className={s.profileContent}>
        <Header />
        <main className={s.profile}>
          <div className={s.profileTitle}>
            <Button className={s.profileBack} type="link" size="large" onClick={handleBack}>
              <LeftOutlined />
            </Button>
            <Title>{PROFILE.TITLE}</Title>
          </div>
          <div className={s.profileButtons}>
            <Button type="primary" onClick={handleEditProfile}>{PROFILE.EDIT_PROFILE}</Button>
            <Button type="default" onClick={handleChangePassword}>{PROFILE.CHANGE_PASSWORD}</Button>
          </div>
          <ProfileField title={PROFILE_FIELDS.FIRST_NAME} text={firstName} isEdit={isEditProfile} />
          <ProfileField title={PROFILE_FIELDS.LAST_NAME} text={lastName} isEdit={isEditProfile} />
          <ProfileField title={PROFILE_FIELDS.EMAIL} text={email} isEdit={isEditProfile} />
          <ProfileField title={PROFILE_FIELDS.ROLE} text={role} isEdit={isEditProfile} />
          <Button
            type="primary"
            danger
            onClick={() => confirmModal({
              title: PROFILE.DELETE_PROFILE_TITLE,
              okText: PROFILE.DELETE_PROFILE,
              cancelText: PROFILE.CANCEL,
              onOk: handleDeleteProfile,
            })}
          >
            {PROFILE.DELETE_PROFILE}
          </Button>
          <ChangePasswordForm
            isOpen={isChangePassword}
            setIsOpen={setIsChangePassword}
          />
          <EditProfileForm isOpen={isEditProfile} setIsOpen={setIsEditProfile} />
        </main>
        <Footer />
      </div>
    </Wrapper>
  );
}
