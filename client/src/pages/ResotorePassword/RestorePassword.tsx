import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Result, Space,
} from 'antd';
import { ContentWrapper } from '../../components/ContentWrapper';
import { RESTORE_PASSWORD } from './RestorePassword.dictionary';

const { TITLE, MESSAGE, BACK } = RESTORE_PASSWORD;

export function RestorePassword() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ContentWrapper>
      <Result
        status="warning"
        title={TITLE}
        subTitle={MESSAGE}
        extra={(
          <Space>
            <Button type="primary" onClick={handleBack}>
              {BACK}
            </Button>
          </Space>
        )}
      />
    </ContentWrapper>
  );
}
