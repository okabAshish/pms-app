import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AddPropertyInputData} from '../ownerTypes';

interface PageData {
  pageName?: string;
}

const owner = createSlice({
  name: 'owner',
  initialState: {
    property_name: '',
    property_type_id: '',
    property_size: '',
    property_size_type: '',
    property_built_year: '',
    hoa_fee: '',
    hoa_fee_type: '',
  } as AddPropertyInputData,
  reducers: {
    setAddPropertyOne: (state, action: PayloadAction<AddPropertyInputData>) => {
      state.property_name = action.payload.property_name;
      state.property_type_id = action.payload.property_type_id;
      state.property_size = action.payload.property_size;
      state.property_size_type = action.payload.property_size_type;
      state.property_built_year = action.payload.property_built_year;
      state.hoa_fee = action.payload.hoa_fee;
      state.hoa_fee_type = action.payload.hoa_fee_type;
    },
  },
});

export const {setAddPropertyOne} = owner.actions;

export default owner.reducer;