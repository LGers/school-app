import * as React from 'react';
import { useSelector } from 'react-redux';
import { Result } from 'antd';
import { RootState } from '../../redux/store';
import { MESSAGES } from './UserWelcome.dictionary';
import { ContentWrapper } from '../../components/ContentWrapper';

const { M0, M1, M2 } = MESSAGES;

export function UserWelcome() {
  const { auth } = useSelector((state: RootState) => state);

  const { firstName, lastName } = auth.user;
  return (
    <ContentWrapper>
      <Result
        status="success"
        title={`${M0}, ${firstName} ${lastName}. ${M1}`}
        subTitle={M2}
      />
    </ContentWrapper>
  );
}
