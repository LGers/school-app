import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DIARY, MESSAGES } from './Student.dictionary';
import { ContentWrapper } from '../../components/ContentWrapper';
import { DiaryCard } from '../../components/DiaryCard';
import s from './Student.module.scss';

const { CLASS, SCHEDULE } = MESSAGES;

export function Student() {
  const { auth } = useSelector((state: RootState) => state);

  const diaryCards = DIARY.map((day) => (
    <DiaryCard key={day.weekDay} weekDay={day.weekDay} subjects={day.subjects} />
  ));

  const { className } = auth.user;

  return (
    <ContentWrapper>
      <h1>{`${CLASS} ${className} ${SCHEDULE}`}</h1>
      <div className={s.studentContent}>
        <div className={s.diaryContent}>
          {diaryCards}
        </div>
      </div>
    </ContentWrapper>
  );
}
