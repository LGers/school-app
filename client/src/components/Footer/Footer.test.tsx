import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('<Footer /> render', () => {
  it('Should render with title', async () => {
    render(<Footer />);

    expect(screen.getByText(/© The Crawler/i)).toBeInTheDocument();
  });
});

describe('<Footer /> render', () => {
  it('Should render with title and logo', async () => {
    render(<Footer />);

    expect(screen.getByText(/© The Crawler/i)).toBeInTheDocument();
    expect(screen.getByAltText(/syberry logo/i)).toBeInTheDocument();
  });
});
