import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import s from './AuthBottomInfo.module.scss';

type Props = {
  path: string,
  message: string,
  linkTitle: string
};

export function AuthBottomInfo({ path, message, linkTitle }: Props) {
  return (
    <div className={s.bottomMessage}>
      <div className={s.bottomMessageText}>{message}</div>
      <Link to={path}>
        <Button type="link">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
}
