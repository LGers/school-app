import * as React from 'react';
import { Button, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import s from './DashboardTitle.module.scss';
import { Props } from './DashboardTitle.types';

const { Title } = Typography;

export function DashboardTitle({ title }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={s.dashboardTitle}>
      <Button className={s.dashboardBack} type="link" size="large" onClick={handleBack}>
        <LeftOutlined />
      </Button>
      <Title>{title}</Title>
    </div>
  );
}
