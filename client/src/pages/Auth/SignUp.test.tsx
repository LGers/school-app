import { act, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../../tests.ulils';
import { SIGN_UP_TITLE } from './Auth.dictionary';
import { SignUp } from './SignUp';

const component = <SignUp />;
const renderComponent = () => renderWithProvider(component);

describe('<SignUp /> render', () => {
  it('Should render with title and button', async () => {
    renderComponent();

    expect(screen.getAllByText(SIGN_UP_TITLE)).toHaveLength(2);
  });

  it('Should render with all fields', async () => {
    renderComponent();

    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
  });

  it('Should render with all buttons', async () => {
    renderComponent();

    expect(screen.getAllByRole('button', { name: /sign in/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /sign up/i })).toHaveLength(1);
  });

  it('Should render with error messages', async () => {
    renderComponent();

    const field1 = screen.getByPlaceholderText(/enter your first name/i);
    const field2 = screen.getByPlaceholderText(/enter your last name/i);
    const field3 = screen.getByPlaceholderText('Enter email');
    const field4 = screen.getByPlaceholderText('Enter password');
    const field5 = screen.getByPlaceholderText('Confirm password');
    const button = screen.getByRole('button', { name: /sign up/i });

    await act(() => {
      userEvent.clear(field1);
      userEvent.clear(field2);
      userEvent.clear(field3);
      userEvent.clear(field4);
      userEvent.clear(field5);
      userEvent.click(button);
    });

    expect(await screen.findAllByText(/is required/i)).toHaveLength(5);
  });
});
