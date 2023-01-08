import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { Classes } from './Classes';

const component = <Classes />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<Classes /> render', () => {
  it('Should render with add class button', async () => {
    renderComponent();

    expect(screen.getAllByRole('button', { name: /add class/i })).toHaveLength(1);
  });

  it('Should render with 2 tabs', async () => {
    renderComponent();

    expect(screen.getAllByRole('link', { name: /classes/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /teachers/i })).toHaveLength(1);
  });
});
