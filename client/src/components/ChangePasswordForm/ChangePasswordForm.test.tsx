import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangePasswordForm } from './ChangePasswordForm';
import { CHANGE_PASSWORD, CHANGE_PASSWORD_FIELDS } from './ChangePasswordForm.dictionary';
import { renderWithProvider } from '../../tests.ulils';

const { PASSWORD, CONFIRM_PASSWORD } = CHANGE_PASSWORD_FIELDS;

const component = <ChangePasswordForm isOpen setIsOpen={() => false} />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<ChangePasswordForm /> render', () => {
  it('Should render with title', async () => {
    renderComponent();

    expect(screen.getByText(CHANGE_PASSWORD.TITLE)).toBeInTheDocument();
  });

  it('Should render with OK button, cancel button, close button', async () => {
    renderComponent();

    expect(screen.queryAllByRole('button')).toHaveLength(3);
    expect(screen.getByText(CHANGE_PASSWORD.OK_TEXT)).toBeInTheDocument();
    expect(screen.getByText(CHANGE_PASSWORD.CANCEL_TEXT)).toBeInTheDocument();
  });

  it('Should render with 2 labels and 2 inputs', async () => {
    renderComponent();

    expect(screen.getByPlaceholderText(PASSWORD.placeholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(CONFIRM_PASSWORD.placeholder)).toBeInTheDocument();
    expect(screen.getByText(PASSWORD.label)).toBeInTheDocument();
    expect(screen.getByText(CONFIRM_PASSWORD.label)).toBeInTheDocument();
  });

  it('Should render with error messages', async () => {
    renderComponent();

    const saveButton = screen.getByText(CHANGE_PASSWORD.OK_TEXT);
    const passwordField = screen.getByPlaceholderText(PASSWORD.placeholder);
    const confirmPasswordField = screen.getByPlaceholderText(CONFIRM_PASSWORD.placeholder);

    expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();

    userEvent.click(saveButton);
    expect(await screen.findAllByText(/Password is required/i)).toHaveLength(2);

    await act(() => {
      userEvent.type(passwordField, 'pass');
      userEvent.type(confirmPasswordField, 'pass');
    });

    expect(await screen.findAllByText(/Must be 6 characters or more/i)).toHaveLength(2);

    await act(() => {
      userEvent.type(passwordField, 'password');
      userEvent.type(confirmPasswordField, 'passwordS');
    });

    expect(await screen.findAllByText(/The two passwords that you entered do not match!/i)).toHaveLength(1);
  });

  it('Should render with match password error message', async () => {
    renderComponent();

    const passwordField = screen.getByPlaceholderText(PASSWORD.placeholder);
    const confirmPasswordField = screen.getByPlaceholderText(CONFIRM_PASSWORD.placeholder);

    await act(() => {
      userEvent.type(passwordField, 'password');
      userEvent.type(confirmPasswordField, 'PASSWORD');
    });

    expect(await screen.findAllByText(/The two passwords that you entered do not match!/i)).toHaveLength(1);
  });
});
