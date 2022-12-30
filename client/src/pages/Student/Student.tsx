import * as React from 'react';
import { useSelector } from 'react-redux';
import { UserWrapper } from '../../components/UserWrapper';
import { RootState } from '../../redux/store';
import s from './Student.module.scss';
import { MESSAGES } from './Student.dictionary';

export function Student() {
  const { auth } = useSelector((state: RootState) => state);

  const { firstName, lastName } = auth.user;
  return (
    <UserWrapper>
      <div className={s.userWrapperMessages}>
        <p>
          {`${MESSAGES.M1} ${firstName} ${lastName}.`}
        </p>
        <p>
          {MESSAGES.M2}
        </p>
      </div>
    </UserWrapper>
  );
}