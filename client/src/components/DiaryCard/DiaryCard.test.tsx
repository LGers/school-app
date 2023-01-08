import { render, screen } from '@testing-library/react';
import React from 'react';
import { DiaryCard } from './DiaryCard';
import { TIME_SLOTS } from '../../pages/Student/Student.dictionary';

const daySubjects = [
  { id: 1, time: TIME_SLOTS[0], subject: 'Chemistry' },
  { id: 2, time: TIME_SLOTS[1], subject: 'Drawing' },
  { id: 3, time: TIME_SLOTS[2], subject: 'Biology' },
  { id: 4, time: TIME_SLOTS[3], subject: 'Geography' },
  { id: 5, time: TIME_SLOTS[4], subject: 'Mathematics' },
];

describe('<DiaryCard /> render', () => {
  it('Should render with content', async () => {
    render(<DiaryCard weekDay="Monday" subjects={daySubjects} />);

    expect(screen.getByText(/Chemistry/i)).toBeInTheDocument();
    expect(screen.getByText(/Drawing/i)).toBeInTheDocument();
    expect(screen.getByText(/Biology/i)).toBeInTheDocument();
    expect(screen.getByText(/Geography/i)).toBeInTheDocument();
    expect(screen.getByText(/Mathematics/i)).toBeInTheDocument();
  });
});
