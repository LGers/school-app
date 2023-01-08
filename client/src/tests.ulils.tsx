import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { store } from './redux';

export const renderWithProvider = (children: JSX.Element) => render(
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>,
);

export const renderWithRouter = (children: JSX.Element) => render(
  <BrowserRouter>
    {children}
  </BrowserRouter>,
);
