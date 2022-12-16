import * as React from 'react';
import { Typography } from 'antd';
import s from './ProfileField.module.scss';
import { ProfileProps } from './ProfileField.types';

const { Text } = Typography;

export function ProfileField({ title, text }: ProfileProps) {
  return (
    <div className={s.profileField}>
      <Text className={s.profileTitle}>{title}</Text>
      <Text className={s.profileText}>{text}</Text>
    </div>
  );
}
