import { screen } from '@testing-library/react';
import React from 'react';
import { ContentWrapper } from './ContentWrapper';
import { renderWithProvider } from '../../tests.ulils';

const component = (
  <ContentWrapper>
    <div>test</div>
  </ContentWrapper>
);

const renderComponent = () => renderWithProvider(component);

describe('<ContentWrapper /> render', () => {
  it('Should render with content', async () => {
    renderComponent();

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
