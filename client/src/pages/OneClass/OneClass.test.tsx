import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { OneClass } from './OneClass';

const component = <OneClass />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<OneClass /> render', () => {
  it('Should render with title', async () => {
    renderComponent();

    expect(screen.getByText('Class')).toBeInTheDocument();
  });

  it('Should render with 2 buttons', async () => {
    renderComponent();

    expect(screen.getAllByRole('button', { name: /move to class/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /delete from class/i })).toHaveLength(1);
  });

  it('Should render with 2 tabs', async () => {
    renderComponent();

    expect(screen.getByText(/class students/i)).toBeInTheDocument();
    expect(screen.getByText(/add students/i)).toBeInTheDocument();
  });
});
