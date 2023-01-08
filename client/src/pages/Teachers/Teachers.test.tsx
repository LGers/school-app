import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { Teachers } from './Teachers';

const component = <Teachers />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<Teachers /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getAllByText('Teachers')).toHaveLength(3);
    expect(screen.getByText(/add teachers/i)).toBeInTheDocument();
  });

  it('Should render with 1 button', async () => {
    renderComponent();

    expect(screen.getAllByRole('button', { name: /delete teachers/i })).toHaveLength(1);
  });
});
