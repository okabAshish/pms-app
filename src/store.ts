import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import { pokemonApi } from './features/message';

export const store = configureStore({
  reducer: {
    message: pokemonApi.reducer,
    
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch);
export default store