import {
  OwnerContract,
  OwnerPropertyDetailsData,
  OwnerPropertyDetailsDataFurnishingDetails,
  OwnerPropertyDetailsData_PropertyAmenities,
} from '../ownerTypes';
import {AuthUserDetais} from '../types';

export interface ContractState {
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

// Update Contract
export interface UpdateContractBodyData {
  params: string;
  body: AddContractBodyData;
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

export interface AddContractResponseData {
  success: boolean;
  data: number;
  message: string;
}

export interface ContractDetailsResponseData {
  success: boolean;
  data: ContractDetails;
  message: string;
}

export interface ContractDetailsParams {
  params: number;
}

export interface ContractPropertiesData extends OwnerPropertyDetailsData {
  contract_id: number;
  property_id: number;
  usage?: any;
  property_type: string;
  unit?: any;
  city: string;
  state: string;
  country: string;
  street?: any;
  building_no?: any;
  building_name?: any;
  floor_no?: any;
  area: number;
  furnishing_type?: any;
  parking_type: string;
  nof_parking: number;
  pet_allowed: number;
  nof_baths: number;
  nof_balconies: number;
  nof_bedrooms: number;
  total_no_floor: number;
  age_of_property: string;
  contact_phone_no?: any;
  property_descr?: any;

  notice_period?: any;
  property_facing?: any;
  wheel_chair_access: number;

  hoa: string;

  created_at: string;
  updated_at: string;
  contract_property_amenities: OwnerPropertyDetailsData_PropertyAmenities;
  contract_property_furnishings: OwnerPropertyDetailsDataFurnishingDetails;
}

export interface ContractTermsData extends ContractTermSingleData {
  contract_id: number;
  term_id: number;
  contract_title_id: number;
  term_text: string;
}

export interface ContractDetailsTerms extends Array<ContractTermsData> {}

export interface ContractTermTitleData extends ContractTermListSingleData {
  contract_id: number;
  title_id: number;
  title_text: string;
  created_at: string;
  updated_at: string;
  contract_terms: ContractDetailsTerms;
}

export interface ContractDetailsTermsTitle
  extends Array<ContractTermTitleData> {}

export interface ContractOwnerData extends AuthUserDetais {
  contract_id: number;
  owner_id: number;
  title: string;
}

export interface ContractPaymentDateAmountData extends AddContractSlabData {
  id: number;
  contract_id: number;

  is_bill_generated: number;
  created_at: string;
  updated_at: string;
}

export interface ContractPaymentDateAmountList
  extends Array<ContractPaymentDateAmountData> {}

export interface ContractDetails extends OwnerContract {
  tenant_lawyer_id: number;
  payment_frequency_data?: any;
  contract_properties_data: ContractPropertiesData;
  contract_term_titles: ContractDetailsTermsTitle;
  contract_owner_data: ContractOwnerData;
  contract_payment_date_amount_data: ContractPaymentDateAmountList;
}
