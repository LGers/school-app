import * as React from 'react';
import { useSelector } from 'react-redux';
import { Result } from 'antd';
import { RootState } from '../../redux/store';
import { MESSAGES } from './Student.dictionary';
import { ContentWrapper } from '../../components/ContentWrapper';

const { M1, M2 } = MESSAGES;

export function Student() {
  const { auth } = useSelector((state: RootState) => state);

  const { firstName, lastName } = auth.user;
  return (
    <ContentWrapper>
      <Result
        status="success"
        title={`${M1}, ${firstName} ${lastName}.`}
        subTitle={M2}
      />
    </ContentWrapper>
  );
}
