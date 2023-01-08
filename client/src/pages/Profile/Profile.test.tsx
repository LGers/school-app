import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { Profile } from './Profile';

const component = <Profile />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<Profile /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/role/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /edit profile/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /change password/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /delete profile/i })).toHaveLength(1);
  });
});
