import React from 'react';
import 'antd/dist/antd.min.css';
import { Provider } from 'react-redux';
import { AppRoutes } from './AppRoutes';
import { store } from './redux';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
