import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ContractState} from './contractTypes';

interface PageData {
  pageName?: string;
}

const contract = createSlice({
  name: 'contract',
  initialState: {
    total_rental_amount: '9000',
    security_deposit: '1000',
    pending_rentail_amount: '9000',
    property_id: 0,
  } as ContractState,
  reducers: {
    setContractDetails: (state, action: PayloadAction<ContractState>) => {
      state.total_rental_amount = action.payload.total_rental_amount;
      state.pending_rentail_amount = action.payload.pending_rentail_amount;
      state.security_deposit;
    },
    setPropertyId: (state, action: PayloadAction<ContractState>) => {
      // console.log(action.payload, 'Action');
      state.property_id = action.payload.property_id;
    },
  },
});

export const {setContractDetails, setPropertyId} = contract.actions;

export default contract.reducer;
