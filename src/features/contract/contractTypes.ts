export interface ContractState {
  contract_type: string;
  contract_period: string;
  grace_period: string;
  start_date: string;
  end_date: string;
  notice_period: string;
  security_deposit: string;
  monthly_rent: string;
  monthly_service_charge: string;
  other_charge: string;
  discount?: string;
  total_rental_amount: string;
  total_contract_amount: string;
  late_fee?: string;
  fine_type?: string;
  late_fee_amount?: string;
  late_fee_grace_period?: string;
  pending_rentail_amount: string;
  amount: string;
  date?: string;
  property_id: number;
}

export interface ContractTermSingleData {
  id: number;
  title_id: number;
  term: string;
  type: number;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface ContractTerms extends Array<ContractTermSingleData> {}

export interface ContractTermListSingleData {
  id: number;
  title: string;
  type: number;
  created_by?: number;
  terms: ContractTerms;
}

export interface ContractTermList extends Array<ContractTermListSingleData> {}

export interface ContractTermListResponseData {
  success: boolean;
  data: ContractTermList;
  message: string;
}

export interface ContractTermAddTitle {
  title: string;
  type: number;
  created_by: number;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface ContractTermAddTitleResponseData {
  success: boolean;
  data: ContractTermAddTitle;
  message: string;
}

export interface ContractTermAddTitleBody {
  title: string;
}

export interface ContractTermAddTermData {
  title_id: string;
  term: string;
  type: number;
  created_by: number;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface ContractTermAddTermResponseData {
  success: boolean;
  data: ContractTermAddTermData;
  message: string;
}

export interface ContractTermAddTermBody {
  title_id: string;
  term: string;
}

export interface ContractTermTitleDeleteResponseData {
  success: boolean;
  message: string;
}

export interface ContractTermTitleDeleteParams {
  param: number;
}

export interface ContractTermUpdateBody {
  param: number;
  title: any;
}

export interface ContractTenantListRequest {
  property_id: number;
}

export interface ContractTenantListSingleData {
  id: number;
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
}

export interface ContractTenantList
  extends Array<ContractTenantListSingleData> {}

export interface ContractTenantListResponseData {
  success: boolean;
  data: ContractTenantList;
  message: string;
}

// Add Contract Types
export interface AddContractBodyData {
  property_id: number;
  tenant_id: number;
  contract_type_id: number;
  contract_period: string;
  grace_period: string;
  start_date: string;
  end_date: string;
  notice_period: string;
  security_deposit: string;
  monthly_rent: string;
  monthly_service_charge: string;
  other_charge: string;
  discount: string;
  total_rental_amount: string;
  total_contract_amount: string;
  late_fee_applicable: string;
  fine_type: string;
  late_fee_amount: string;
  late_fee_grace_period: string;
  payment_slab_data: string;
  title_term_data: string;
}

export interface AddContractSlabData {
  payment_date: string;
  payment_amount: string;
  is_deposite_included: string;
  fine_amount: string;
  grace_period: string;
}

export interface AddContractSlabList extends Array<AddContractSlabData> {}

export interface AddContractTermTitle {
  title_id: string;
  term_data: Array<string>;
}

export interface AddContractTermTitles extends Array<AddContractTermTitle> {}

// Contract type List
export interface ContractTypeListResponseData {
  success: boolean;
  message: string;
  data: ContractTypeList;
}

export interface ContractTypeListData {
  id: number;
  name: string;
}

export interface ContractTypeList extends Array<ContractTypeListData> {}
