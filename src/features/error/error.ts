import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface ErrorData {
  error?: boolean;
  message?: string;
}

const error = createSlice({
  name: 'page',
  initialState: {
    error: false as ErrorData['error'],
    message: '' as ErrorData['message'],
  },
  reducers: {
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload.error;
      state.message = action.payload.message;
    },
  },
});

export const {setError} = error.actions;

export default error.reducer;
