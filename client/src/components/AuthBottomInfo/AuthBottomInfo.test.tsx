import React from 'react';
import { screen } from '@testing-library/react';
import { AuthBottomInfo } from './AuthBottomInfo';
import { renderWithRouter } from '../../tests.ulils';

const component = <AuthBottomInfo path="/home" message="message" linkTitle="linkTitle" />;
const renderComponent = () => renderWithRouter(component);

describe('<AuthBottomInfo /> render', () => {
  it('Should render with button, link and message', async () => {
    renderComponent();

    expect(screen.queryAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/linkTitle/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
  });
});
