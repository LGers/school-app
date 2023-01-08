import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../../tests.ulils';
import { EditProfileForm } from './EditProfileForm';
import { EDIT_PROFILE, EDIT_PROFILE_FIELDS } from './EditProfileForm.dictionary';

const { TITLE, OK_TEXT } = EDIT_PROFILE;
const { FIRST_NAME, LAST_NAME, EMAIL } = EDIT_PROFILE_FIELDS;

const component = <EditProfileForm isOpen setIsOpen={() => {}} />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<EditProfileForm /> render', () => {
  it('Should render with title', async () => {
    renderComponent();

    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it('Should render with OK button, cancel button, close button', async () => {
    renderComponent();

    expect(screen.queryAllByRole('button')).toHaveLength(3);
    expect(screen.getByText(OK_TEXT)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it('Should render with 2 labels and 2 inputs', async () => {
    renderComponent();

    expect(screen.getByPlaceholderText(FIRST_NAME.placeholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(LAST_NAME.placeholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(EMAIL.placeholder)).toBeInTheDocument();
    expect(screen.getByText(FIRST_NAME.label)).toBeInTheDocument();
    expect(screen.getByText(LAST_NAME.label)).toBeInTheDocument();
    expect(screen.getByText(EMAIL.label)).toBeInTheDocument();
  });

  it('Should render with error messages', async () => {
    renderComponent();

    const field1 = screen.getByPlaceholderText(FIRST_NAME.placeholder);
    const field2 = screen.getByPlaceholderText(LAST_NAME.placeholder);
    const field3 = screen.getByPlaceholderText(EMAIL.placeholder);
    const button = screen.getByText(OK_TEXT);

    await act(() => {
      userEvent.clear(field1);
      userEvent.clear(field2);
      userEvent.clear(field3);
      userEvent.click(button);
    });

    expect(await screen.findAllByText(/required/i)).toHaveLength(2);
    expect(screen.queryByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/Last name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/Enter a valid email address/i)).toBeInTheDocument();
  });

  it('Should render with no error messages', async () => {
    renderComponent();

    const field1 = screen.getByPlaceholderText(FIRST_NAME.placeholder);
    const field2 = screen.getByPlaceholderText(LAST_NAME.placeholder);
    const field3 = screen.getByPlaceholderText(EMAIL.placeholder);
    const button = screen.getByText(OK_TEXT);

    await act(() => {
      userEvent.type(field1, 'First Name');
      userEvent.type(field2, 'Lastname');
      userEvent.type(field3, 'email@email.com');
      userEvent.click(button);
    });

    expect(await screen.queryByText(/First name is required/i)).not.toBeInTheDocument();
    expect(await screen.queryByText(/Last name is required/i)).not.toBeInTheDocument();
    expect(await screen.queryByText(/Enter a valid email address/i)).not.toBeInTheDocument();
  });
});
