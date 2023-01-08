import { render, screen } from '@testing-library/react';
import React from 'react';
import { DiaryCardHeader } from './DiaryCardHeader';
import { HEADER } from './DiaryCardHeader.dictionary';

describe('<DiaryCard /> render', () => {
  it('Should render with content', async () => {
    render(<DiaryCardHeader />);

    expect(screen.getByText(HEADER[0].title)).toBeInTheDocument();
    expect(screen.getByText(HEADER[1].title)).toBeInTheDocument();
    expect(screen.getByText(HEADER[2].title)).toBeInTheDocument();
    expect(screen.getByText(HEADER[3].title)).toBeInTheDocument();
  });
});
