import * as React from 'react';
import { Card } from 'antd';
import { Props } from '../../pages/Student/Student.types';
import s from './DiaryCard.module.scss';
import { DiaryCardHeader } from '../DiaryCardHeader';

export function DiaryCard({ weekDay, subjects }: Props) {
  return (
    <Card title={weekDay} size="small">
      <DiaryCardHeader />
      {subjects.map((item) => (
        <div className={s.cardRow} key={item.id}>
          <div className={s.cardCell}>
            {item.time}
          </div>
          <div className={s.cardCell}>
            {item.subject}
          </div>
          <div className={s.cardCell}>
            {item.homework}
          </div>
          <div className={s.cardCell}>
            {item.mark}
          </div>
        </div>
      ))}
    </Card>
  );
}
