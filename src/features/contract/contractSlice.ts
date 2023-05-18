import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AddContractBodyData, ContractState} from './contractTypes';

interface PageData {
  pageName?: string;
}

const contract = createSlice({
  name: 'contract',
  initialState: {
    total_rental_amount: '0',
    security_deposit: '0',
    pending_rentail_amount: '0',
    property_id: 0,
    tenant_id: 0,
    contract_type_id: 0,
    contract_period: '',
    grace_period: '',
    start_date: '',
    end_date: '',
    notice_period: '',
    monthly_rent: 0,
    monthly_service_charge: 0,
    other_charge: 0,
    discount: '',
    total_contract_amount: 0,
    late_fee_applicable: '',
    fine_type: '',
    late_fee_amount: '',
    late_fee_grace_period: '',
    payment_slab_data: '',
    title_term_data: '',
  } as AddContractBodyData & ContractState,
  reducers: {
    setContractDetails: (
      state,
      action: PayloadAction<ContractState & AddContractBodyData>,
    ) => {
      state.total_rental_amount = action.payload.total_rental_amount;
      state.pending_rentail_amount = action.payload.pending_rentail_amount;
      state.security_deposit = action.payload.security_deposit;
    },
    setPropertyId: (
      state,
      action: PayloadAction<ContractState & AddContractBodyData>,
    ) => {
      // console.log(action.payload, 'Action');
      state.property_id = action.payload.property_id;
    },
    setTenantId: (
      state,
      action: PayloadAction<ContractState & AddContractBodyData>,
    ) => {
      // console.log(action.payload, 'Action');
      state.tenant_id = action.payload.tenant_id;
    },
    setContractData: (
      state,
      action: PayloadAction<ContractState & AddContractBodyData>,
    ) => {
      // console.log(action.payload, 'Action');
      state.contract_type = action.payload.contract_type;
      state.contract_period = action.payload.contract_period;
      state.grace_period = action.payload.grace_period;
      state.start_date = action.payload.start_date;
      state.end_date = action.payload.end_date;
      state.notice_period = action.payload.notice_period;
      state.security_deposit = action.payload.security_deposit;
      state.monthly_rent = action.payload.monthly_rent;
      state.monthly_service_charge = action.payload.monthly_service_charge;
      state.other_charge = action.payload.other_charge;
      state.discount = action.payload.discount;
      state.total_rental_amount = action.payload.total_rental_amount;
      state.total_contract_amount = action.payload.total_contract_amount;
    },
    setContractSlabData: (
      state,
      action: PayloadAction<ContractState & AddContractBodyData>,
    ) => {
      // console.log(action.payload, 'Action');
      state.late_fee_applicable = action.payload.late_fee_applicable;
      state.fine_type = action.payload.fine_type;
      state.late_fee_amount = action.payload.late_fee_amount;
      state.late_fee_grace_period = action.payload.late_fee_grace_period;
      state.payment_slab_data = action.payload.payment_slab_data;
      state.title_term_data = action.payload.title_term_data;
    },
    setContractTermData: (
      state,
      action: PayloadAction<ContractState & AddContractBodyData>,
    ) => {
      // console.log(action.payload, 'Action');
      state.title_term_data = action.payload.title_term_data;
    },
  },
});

export const {
  setContractDetails,
  setPropertyId,
  setTenantId,
  setContractData,
  setContractSlabData,
  setContractTermData,
} = contract.actions;

export default contract.reducer;
