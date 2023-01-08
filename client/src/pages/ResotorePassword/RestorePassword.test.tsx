import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { RestorePassword } from './RestorePassword';

const component = <RestorePassword />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<RestorePassword /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getByText(/Restore password is not available now./i)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, restore password will come later.../i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /back/i })).toHaveLength(1);
  });
});
