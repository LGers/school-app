import { screen } from '@testing-library/react';
import React from 'react';
import { DashboardTitle } from './DashboardTitle';
import { renderWithRouter } from '../../tests.ulils';

const component = <DashboardTitle title="title" />;
const renderComponent = () => renderWithRouter(component);

describe('<DashboardTitle /> render', () => {
  it('Should render with title', async () => {
    renderComponent();

    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  it('Should render with back button', async () => {
    renderComponent();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
