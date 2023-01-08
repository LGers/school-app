import React from 'react';
import { screen } from '@testing-library/react';
import { ProfileField } from './ProfileField';
import { renderWithProvider } from '../../tests.ulils';

const component = <ProfileField title="title" text="text" isEdit />;
const renderComponent = () => renderWithProvider(component);

describe('<ProfileField /> render', () => {
  it('Should render with title and text', async () => {
    renderComponent();

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
