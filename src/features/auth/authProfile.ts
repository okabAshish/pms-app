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
    register:{
      account_type: null,
      title_id: null,
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      occupation: "",
      password: "",
      confirm_password: "",
      address: "",
      address_two: "",
      city: null,
      state: null,
      zip: "",
      countryId: null,
      company_website: "",
      contact_person: "",
      company_name: "",
      company_type_id: "",
      region_code: "",
      tin_or_ein: "",
      position_in_company: "",
    }
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
    setRegister:  (state, action: PayloadAction<any>) => {
      state.register = action.payload;
    },
  },
});

export const {setUser, setToken, setLoggedIn, logOut, setRegister} = authProfile.actions;

export default authProfile.reducer;
