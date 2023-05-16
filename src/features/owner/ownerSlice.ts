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
    no_of_bedrooms: '',
    no_of_bathroom: '',
    furnishing_type_id: '',
    property_furnishing_detail: [],
    property_amenities: [],
    balcony_terrace: false,
    parking_available: false,
    no_of_parking: 0,
    parking_type: '',
    country_id: 0,
    state_id: 0,
    city_id: 0,
    zip: '',
    address_one: '',
    address_two: '',
  } as unknown as AddPropertyInputData,
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
    setAddPropertyTwo: (state, action: PayloadAction<AddPropertyInputData>) => {
      state.no_of_bedrooms = action.payload.no_of_bedrooms;
      state.no_of_bathroom = action.payload.no_of_bathroom;
    },
    setAddPropertyThree: (
      state,
      action: PayloadAction<AddPropertyInputData>,
    ) => {
      state.furnishing_type_id = action.payload.furnishing_type_id;
      state.property_furnishing_detail =
        action.payload.property_furnishing_detail;
    },
    setAddPropertyFour: (
      state,
      action: PayloadAction<AddPropertyInputData>,
    ) => {
      state.property_amenities = action.payload.property_amenities;
    },
    setAddPropertyFive: (
      state,
      action: PayloadAction<AddPropertyInputData>,
    ) => {
      state.parking_available = action.payload.parking_available;
      state.balcony_terrace = action.payload.balcony_terrace;
      state.no_of_parking = action.payload.no_of_parking;
      state.parking_type = action.payload.parking_type;
    },
    setAddPropertySix: (state, action: PayloadAction<AddPropertyInputData>) => {
      state.country_id = action.payload.country_id;
      state.state_id = action.payload.state_id;
      state.city_id = action.payload.city_id;
      state.zip = action.payload.zip;
      state.address_one = action.payload.address_one;
      state.address_two = action.payload.address_two;
    },
    setAddPropertySeven: (
      state,
      action: PayloadAction<AddPropertyInputData>,
    ) => {
      state.image_count = action.payload.image_count;
    },
  },
});

export const {
  setAddPropertyOne,
  setAddPropertyTwo,
  setAddPropertyThree,
  setAddPropertyFour,
  setAddPropertyFive,
  setAddPropertySix,
} = owner.actions;

export default owner.reducer;
