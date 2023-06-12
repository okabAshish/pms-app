import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface PageData {
  pageName?: string;
  refreshKey?: string;
}

const page = createSlice({
  name: 'page',
  initialState: {
    pageName: 'Dashboard' as PageData['pageName'],
    refreshKey: 0,
  },
  reducers: {
    setPageName: (state, action: PayloadAction<any>) => {
      state.pageName = action.payload;
    },
    setRefreshKey: (state, action: PayloadAction<any>) => {
      state.refreshKey = action.payload;
    },
  },
});

export const {setPageName, setRefreshKey} = page.actions;

export default page.reducer;
