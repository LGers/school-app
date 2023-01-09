import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, DatePicker, DatePickerProps } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { RootState, store } from '../../redux/store';
import { MESSAGES } from './Student.dictionary';
import { ContentWrapper } from '../../components/ContentWrapper';
import { DiaryCard } from '../../components/DiaryCard';
import s from './Student.module.scss';
import { fetchGetOneClassWeekSchedule } from '../../redux/schedule/schedule.thunk';
import { ScheduleRecord } from '../../redux/schedule/schedule.types';
import { resetScheduleState } from '../../redux/schedule/schedule.slice';

const { CLASS, SCHEDULE } = MESSAGES;

export function Student() {
  const dispatch = useDispatch();

  const { auth, schedule } = useSelector((state: RootState) => state);

  const [currentDate, setCurrentDate] = useState(moment());

  const { className, classId } = auth.user;

  useEffect(() => {
    store.dispatch(fetchGetOneClassWeekSchedule({ classId, weekDay: currentDate.format('YYYY-MM-DD') }));

    return function cleanUp() {
      dispatch(resetScheduleState());
    };
  }, [dispatch, classId, currentDate]);

  const diaryCards = schedule.weekSchedule.map((day: ScheduleRecord) => (
    <DiaryCard
      key={day.weekDay}
      weekDay={day.weekDay}
      subjects={day.subjects.map((item) => {
        const hour = moment(item.date).format('HH');
        const time = `${hour}:00 - ${hour}:45`;

        return { ...item, time };
      })}
    />
  ));

  const onWeekChange: DatePickerProps['onChange'] = (date) => {
    setCurrentDate(moment(date));
  };

  const onWeekIncrease = () => {
    const selectedDate = moment(currentDate).add(1, 'week');
    setCurrentDate(selectedDate);
  };

  const onWeekDecrease = () => {
    const selectedDate = moment(currentDate).subtract(1, 'week');
    setCurrentDate(selectedDate);
  };

  return (
    <ContentWrapper>
      <h1>{`${CLASS} ${className} ${SCHEDULE}`}</h1>
      <div className={s.studentDate}>
        <Button type="link" icon={<LeftOutlined />} onClick={onWeekDecrease} />
        <DatePicker
          allowClear={false}
          onChange={onWeekChange}
          picker="week"
          value={currentDate}
        />
        <Button type="link" icon={<RightOutlined />} onClick={onWeekIncrease} />
      </div>
      <div className={s.studentDate}>
        {currentDate.startOf('week').format('Do MMM YYYY')}
        {' - '}
        {currentDate.endOf('week').format('Do MMM YYYY')}
      </div>
      <div className={s.studentContent}>
        <div className={s.diaryContent}>
          {diaryCards}
        </div>
      </div>
    </ContentWrapper>
  );
}
