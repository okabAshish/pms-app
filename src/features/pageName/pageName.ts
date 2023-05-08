import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface PageData {
  pageName?: string;
}

const page = createSlice({
  name: 'page',
  initialState: {
    pageName: 'Dashboard' as PageData['pageName'],
  },
  reducers: {
    setPageName: (state, action: PayloadAction<any>) => {
      state.pageName = action.payload;
    },
  },
});

export const {setPageName} = page.actions;

export default page.reducer;
