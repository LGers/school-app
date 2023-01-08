import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { store } from '../../redux';
import { User } from '../../redux/auth/auth.types';
import { setAuth, updateUser } from '../../redux/auth/auth.slice';

const user: User = {
  id: 1,
  firstName: 'firstName',
  lastName: 'lastName',
  role: 'USER',
  email: 'email@example.com',
  className: '',
  classId: undefined,
};

const renderWithProvider = () => render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </Provider>,
);

describe('<Header /> render', () => {
  it('Should render with header title and buttons', async () => {
    renderWithProvider();

    expect(screen.getByText('The Crawler')).toBeInTheDocument();
    expect(screen.queryByText(/firstName/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/lastName/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(2);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('Should render with header title, user name and buttons', async () => {
    await store.dispatch(setAuth(true));
    await store.dispatch(updateUser(user));
    renderWithProvider();

    expect(screen.getByText(/The Crawler/i)).toBeInTheDocument();
    expect(screen.getByText(/firstName/i)).toBeInTheDocument();
    expect(screen.queryByText(/lastName/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(2);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
  });

  it('Should render with header title after log out', async () => {
    await store.dispatch(setAuth(true));
    await store.dispatch(updateUser(user));
    renderWithProvider();

    const logOutButton = screen.getByText(/log out/i);

    expect(logOutButton).toBeInTheDocument();
    fireEvent.click(logOutButton);
    expect(logOutButton).not.toBeInTheDocument();
    expect(screen.queryByText(/firstName/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/lastName/i)).not.toBeInTheDocument();
  });
});
