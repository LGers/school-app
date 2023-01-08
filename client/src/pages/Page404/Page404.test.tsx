import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { Page404 } from './Page404';

const component = <Page404 />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<Page404 /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getByText(/404 error/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, the page you visited does not exist./i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /back/i })).toHaveLength(1);
  });
});
