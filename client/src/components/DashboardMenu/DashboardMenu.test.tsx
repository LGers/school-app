import React from 'react';
import { screen } from '@testing-library/react';
import { DashboardMenu } from './DashboardMenu';
import { renderWithRouter } from '../../tests.ulils';

const component = <DashboardMenu currentPage="classes" />;
const renderComponent = () => renderWithRouter(component);

describe('<DashboardMenu /> render', () => {
  it('should renders with all components', async () => {
    renderComponent();

    expect(screen.getByText(/classes/i)).toBeInTheDocument();
    expect(screen.getByText(/teachers/i)).toBeInTheDocument();
  });
});
