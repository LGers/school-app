import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { UserWelcome } from './UserWelcome';

const component = <UserWelcome />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<UserWelcome /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getByText(/Account Successfully created/i)).toBeInTheDocument();
    expect(screen.getByText(/You will be added to the class soon/i)).toBeInTheDocument();
  });
});
