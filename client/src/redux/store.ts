import {
  AnyAction, combineReducers, configureStore, Reducer,
} from '@reduxjs/toolkit';
import { authReducer } from './auth/auth.slice';
import { usersReducer } from './users/users.slice';

const combinedReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    return combinedReducer({} as RootState, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
