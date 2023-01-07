export const MESSAGES = {
  M1: 'Hello',
  M2: 'Wait for your diary, please.',
  CLASS: 'Class',
  SCHEDULE: 'schedule',
};

export const TIME_SLOTS = [
  '09:00 - 09:45',
  '10:00 - 10:45',
  '11:00 - 11:45',
  '12:00 - 12:45',
  '13:00 - 13:45',
  '14:00 - 14:45',
];

export const WEEK_DAYS = {
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
  SUN: 'Sunday',
};

const MON = {
  weekDay: WEEK_DAYS.MON,
  subjects: [
    { id: 1, time: TIME_SLOTS[0], subject: 'Mathematics' },
    {
      id: 2, time: TIME_SLOTS[1], subject: 'Literature', homework: 'p. 23, ex. 5', mark: undefined,
    },
    { id: 3, time: TIME_SLOTS[2], subject: 'History' },
    { id: 4, time: TIME_SLOTS[3], subject: 'Physics' },
    { id: 5, time: TIME_SLOTS[4], subject: 'Music' },
  ],
};

const TUE = {
  weekDay: WEEK_DAYS.TUE,
  subjects: [
    { id: 1, time: TIME_SLOTS[0], subject: 'Chemistry' },
    { id: 2, time: TIME_SLOTS[1], subject: 'Drawing' },
    { id: 3, time: TIME_SLOTS[2], subject: 'Biology' },
    { id: 4, time: TIME_SLOTS[3], subject: 'Geography' },
    { id: 5, time: TIME_SLOTS[4], subject: 'Mathematics' },
  ],
};

const WEN = {
  weekDay: WEEK_DAYS.WED,
  subjects: [
    { id: 1, time: TIME_SLOTS[0], subject: 'Literature' },
    { id: 2, time: TIME_SLOTS[1], subject: 'Computing' },
    { id: 3, time: TIME_SLOTS[2], subject: 'Chemistry' },
    { id: 4, time: TIME_SLOTS[3], subject: 'Physics' },
  ],
};

const THU = {
  weekDay: WEEK_DAYS.THU,
  subjects: [
    { id: 1, time: TIME_SLOTS[0], subject: 'Mathematics' },
    { id: 2, time: TIME_SLOTS[1], subject: 'Computing' },
    { id: 3, time: TIME_SLOTS[2], subject: 'Geography' },
    { id: 4, time: TIME_SLOTS[3], subject: 'Physical education' },
    { id: 5, time: TIME_SLOTS[4], subject: 'Maths' },
  ],
};

const FRI = {
  weekDay: WEEK_DAYS.FRI,
  subjects: [
    { id: 1, time: TIME_SLOTS[0], subject: 'History' },
    { id: 2, time: TIME_SLOTS[1], subject: 'Technology' },
    { id: 3, time: TIME_SLOTS[2], subject: 'Geography' },
    { id: 4, time: TIME_SLOTS[3], subject: 'Literature' },
    { id: 5, time: TIME_SLOTS[4], subject: 'Biology' },
  ],
};

const SAT = {
  weekDay: WEEK_DAYS.SAT,
  subjects: [
    { id: 1, time: TIME_SLOTS[0], subject: 'Physics' },
    { id: 2, time: TIME_SLOTS[1], subject: 'Drawing' },
    { id: 3, time: TIME_SLOTS[2], subject: 'Chemistry' },
    { id: 4, time: TIME_SLOTS[3], subject: 'Physical education' },
  ],
};

export const DIARY = [
  MON, TUE, WEN, THU, FRI, SAT,
];
