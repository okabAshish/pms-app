import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {setupListeners} from '@reduxjs/toolkit/dist/query';

import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import {authApi} from './features/auth/auth';
import authProfile from './features/auth/authProfile';

export const store = configureStore({
  reducer: {
    auth: authProfile,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
export default store;
