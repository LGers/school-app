import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthHeader } from './AuthHeader';
import { AUTH_TITLE } from './AuthHeader.dictionary';

describe('<AuthHeader /> render', () => {
  it('Should render with title', async () => {
    render(<AuthHeader />);

    expect(screen.getByText(AUTH_TITLE)).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });
});
