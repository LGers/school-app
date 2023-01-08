import { act, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../../tests.ulils';
import { SignIn } from './SignIn';
import { SIGN_IN_TITLE } from './Auth.dictionary';

const component = <SignIn />;
const renderComponent = () => renderWithProvider(component);

describe('<SignIn /> render', () => {
  it('Should render with title and button', async () => {
    renderComponent();

    expect(screen.getAllByText(SIGN_IN_TITLE)).toHaveLength(2);
  });

  it('Should render with all fields', async () => {
    renderComponent();

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
  });

  it('Should render with all buttons', async () => {
    renderComponent();

    expect(screen.getAllByRole('button', { name: /sign in/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /sign up/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /restore password/i })).toHaveLength(1);
  });

  it('Should render with error messages', async () => {
    renderComponent();

    const field1 = screen.getByPlaceholderText('Enter email');
    const field2 = screen.getByPlaceholderText('Enter password');
    const button = screen.getByRole('button', { name: /sign in/i });

    await act(() => {
      userEvent.clear(field1);
      userEvent.clear(field2);
      userEvent.click(button);
    });

    expect(await screen.findAllByText(/is required/i)).toHaveLength(2);
  });
});
