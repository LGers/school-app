import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProvider } from '../../tests.ulils';
import { DashboardWrapper } from './DashboardWrapper';

const component = (
  <DashboardWrapper currentPage="classes">
    <div>test</div>
  </DashboardWrapper>
);

const renderComponent = () => renderWithProvider(component);

describe('<DashboardWrapper /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
