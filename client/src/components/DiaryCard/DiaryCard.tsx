import * as React from 'react';
import { Card, Empty } from 'antd';
import { Props } from './DiaryCard.types';
import s from './DiaryCard.module.scss';
import { DiaryCardHeader } from '../DiaryCardHeader';

export function DiaryCard({ weekDay, subjects }: Props) {
  return (
    <Card title={weekDay} size="small">
      <DiaryCardHeader />
      {!subjects.length
        && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No schedule"
          style={{ marginTop: '2rem' }}
        />
        )}
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
