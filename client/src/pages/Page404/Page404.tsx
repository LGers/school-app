import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Result, Space,
} from 'antd';
import { ContentWrapper } from '../../components/ContentWrapper';
import { PAGE_404 } from './Page404.dictionary';

const { TITLE, MESSAGE, BACK } = PAGE_404;

export function Page404() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ContentWrapper>
      <Result
        status="404"
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
