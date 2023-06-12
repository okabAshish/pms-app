import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {setupListeners} from '@reduxjs/toolkit/dist/query';

import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import {authApi} from './features/auth/auth';
import authProfile from './features/auth/authProfile';
import {ownerApi} from './features/auth/owner';
import {tenantApi} from './features/auth/tenant';
import {contractApi} from './features/contract/contract';
import contract from './features/contract/contractSlice';
import error from './features/error/error';
import owner from './features/owner/ownerSlice';
import pageName from './features/pageName/pageName';

export const store = configureStore({
  reducer: {
    auth: authProfile,
    page: pageName,
    error: error,
    owner: owner,
    contract: contract,
    [authApi.reducerPath]: authApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [ownerApi.reducerPath]: ownerApi.reducer,
    [tenantApi.reducerPath]: tenantApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      authApi.middleware,
      ownerApi.middleware,
      contractApi.middleware,
      tenantApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
export default store;

export type RootState = ReturnType<typeof store.getState>;
