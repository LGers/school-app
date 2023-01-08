import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../../tests.ulils';
import { EditClassForm } from './EditClassForm';
import { EDIT_CLASS, EDIT_CLASS_FIELDS } from './EditClassForm.dictionary';

const { CLASS_NUMBER, CLASS_LETTER } = EDIT_CLASS_FIELDS;

const component = <EditClassForm classId={1} isOpen setIsOpen={() => false} />;
const renderComponent = () => renderWithProvider(component);

window.matchMedia = window.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

describe('<EditClassForm /> render', () => {
  it('Should render with title', async () => {
    renderComponent();

    expect(screen.getByText(EDIT_CLASS.TITLE)).toBeInTheDocument();
  });

  it('Should render with OK button, cancel button, close button', async () => {
    renderComponent();

    expect(screen.queryAllByRole('button')).toHaveLength(3);
    expect(screen.getByText(EDIT_CLASS.OK_TEXT)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it('Should render with 2 labels and 2 inputs', async () => {
    renderComponent();

    expect(screen.getByPlaceholderText(CLASS_NUMBER.placeholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(CLASS_LETTER.placeholder)).toBeInTheDocument();
    expect(screen.getByText(CLASS_NUMBER.label)).toBeInTheDocument();
    expect(screen.getByText(CLASS_LETTER.label)).toBeInTheDocument();
  });

  it('Should render with error messages', async () => {
    renderComponent();

    const field1 = screen.getByPlaceholderText(CLASS_NUMBER.placeholder);
    const field2 = screen.getByPlaceholderText(CLASS_LETTER.placeholder);
    const button = screen.getByText(EDIT_CLASS.OK_TEXT);

    await act(() => {
      userEvent.clear(field1);
      userEvent.clear(field2);
      userEvent.click(button);
    });

    expect(await screen.findAllByText(/Enter a valid class/i)).toHaveLength(2);
    expect(screen.queryByText(/Enter a valid class number/i)).toBeInTheDocument();
    expect(screen.queryByText(/Enter a valid class letter/i)).toBeInTheDocument();
  });

  it('Should render with no error messages', async () => {
    renderComponent();

    const field1 = screen.getByPlaceholderText(CLASS_NUMBER.placeholder);
    const field2 = screen.getByPlaceholderText(CLASS_LETTER.placeholder);
    const button = screen.getByText(EDIT_CLASS.OK_TEXT);

    await act(() => {
      userEvent.type(field1, '1');
      userEvent.type(field2, 'A');
      userEvent.click(button);
    });

    expect(screen.queryByText(/Enter a valid class number/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Enter a valid class letter/i)).not.toBeInTheDocument();
  });
});
