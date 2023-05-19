import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Auth {
  token?: string;
  isLoggedIn: boolean;
  user: UserData;
}

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}
const authProfile = createSlice({
  name: 'auth',
  initialState: {
    user: {} as Auth['user'],
    loading: false,
    isLoggedIn: false as Auth['isLoggedIn'],
    token: '' as Auth['token'],
  },
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = action.payload;
    },
    logOut: state => {
      state.token = '';
      state.isLoggedIn = false;
      state.user = {} as Auth['user'];
    },
  },
});

export const {setUser, setToken, setLoggedIn, logOut} = authProfile.actions;

export default authProfile.reducer;
