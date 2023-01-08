import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { Student } from './Student';

const component = <Student />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<Student /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getByText(/class/i)).toBeInTheDocument();
    expect(screen.getByText(/schedule/i)).toBeInTheDocument();
  });
});
