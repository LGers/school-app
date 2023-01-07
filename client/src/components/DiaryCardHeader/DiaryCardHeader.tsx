import * as React from 'react';
import s from './DiaryCardHeader.module.scss';
import { HEADER } from './DiaryCardHeader.dictionary';

export function DiaryCardHeader() {
  return (
    <div className={s.cardHeader}>
      {HEADER.map((title) => <div key={title.id}>{title.title}</div>)}
    </div>
  );
}
