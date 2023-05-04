export interface Pokemon {
  name?: string;
}

export interface LoginBody {
  body: {
    username?: string;
    password?: string;
    role_id?: string;
  };
  token?: string;
}

export interface Auth {
  success?: boolean;
  data: {
    user_detail: {
      id: 5;
      user_id: string;
      title_id: string;
      first_name: string;
      middle_name: string;
      last_name: string;
      email: string;
      phone: string;
      address: string;
      city: number;
      state: number;
      zip: string;
      account_type: number;
      nationality: number;
      national_id: any;
      passport_number: number;
      passport_expiry: string;
      profile_photo: string;
      address_two: string;
      company_type_id: any;
      company_name: string;
      contact_person: string;
      company_website: string;
      created_at: string;
      updated_at: string;
      region_code: string;
      tin_or_ein: string;
      position_in_company: string;
      occupation: string;
      user_details: any;
      title_name: any;
      company_type_name: any;
      country_name: any;
      state_name: any;
      city_name: any;
    };
    token: string;
  };
}

// Tenant Dashboard Data

interface TenantContractPropertiesData {
  id: number;
  contract_id: number;
  property_id: number;
  usage?: any;
  property_type?: string;
  unit?: any;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  street?: any;
  building_no?: any;
  building_name?: string;
  floor_no?: string;
  area?: number;
  furnishing_type?: any;
  parking_type?: string;
  nof_parking: number;
  pet_allowed: number;
  nof_baths: number;
  nof_balconies: number;
  nof_bedrooms: number;
  total_no_floor: number;
  age_of_property?: string;
  contact_phone_no?: any;
  property_descr?: string;
  property_name?: string;
  notice_period?: any;
  property_facing?: any;
  wheel_chair_access?: number;
  address_one?: string;
  address_two?: string;
  hoa?: string;
  hoa_fee?: any;
  hoa_fee_type?: string;
  balcony_terrace?: string;
  created_at: string;
  updated_at: string;
}

interface TenantContractBillingExtraData {
  id: number;
  property_id: number;
  owner_id: number;
  tenant_id: number;
  contract_number: string;
  start_date: string;
  end_date: string;
  contract_period: string;
  security_deposit: number;
  monthly_rent: number;
  monthly_service_charge: number;
  monthly_other_charge: number;
  discount: string;
  total_monthly_amt: number;
  activation_date?: any;
  contract_status: number;
  contract_type_id: 1;
  contract_signed_date?: any;
  contract_authorised_id?: any;
  contract_authorised_by?: any;
  contract_authorised_date?: any;
  payment_frequency?: any;
  late_fee_applicable: number;
  late_fine_slab_type?: any;
  late_fee_type?: any;
  late_fee_amt?: any;
  grace_period?: any;
  sent_to_tenant_for_approval: number;
  is_approved_by_tenant: number;
  discard: number;
  contract_start_grace_period: string;
  contract_reject_reason: any;
  mark_as_vacant: number;
  notice_period: string;
  vacant_request_by_owner: number;
  vacant_request_by_tenant: number;
  vacant_request_approved: number;
  vacant_request_date: string;
  vacant_date: string;
  vacant_reason: string;
  created_at: string;
  updated_at: string;
  contract_properties_data: TenantContractPropertiesData;
}

interface TenantContractBillingData {
  id: number;
  bill_ref_number: string;
  contract_id: number;
  owner_id: number;
  tenant_id: number;
  contract_payment_date_amount_id: number;
  total_payable_amount: string;
  payment_date: string;
  bill_generation_date: string;
  is_paid: number;
  is_fine_applicable: number;
  grace_period?: any;
  fine_amount?: any;
  created_at: string;
  updated_at: string;
  billing_contract_data: TenantContractBillingExtraData;
}

interface TenantOwnerData {
  id: number;
  user_id: number;
  title_id: string;
  first_name?: string;
  middle_name?: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: number;
  state?: number;
  zip?: string;
  account_type: number;
  nationality?: number;
  national_id?: any;
  passport_number?: any;
  passport_expiry?: any;
  profile_photo?: any;
  address_two?: any;
  company_type_id?: any;
  company_name?: any;
  contact_person?: any;
  company_website?: any;
  created_at: string;
  updated_at: string;
  region_code?: string;
  tin_or_ein?: any;
  position_in_company?: any;
  occupation: string;
}

export interface TenantDashboardTransaction {
  id: number;
  transaction_number: string;
  contract_billing_id: number;
  tenant_id: number;
  owner_id: number;
  transaction_amount: number;
  transaction_status: number;
  created_at: string;
  updated_at: string;
  get_owners_data: TenantOwnerData;
  contract_billing_data: TenantContractBillingData;
}

export interface TenantDashboardTransactions
  extends Array<TenantDashboardTransaction> {}

export interface TenantDashboardActivity {
  id: string;

  notifiable_id: number;
  read_at: string;
  created_at: string;
  updated_at: string;
  notification_message: string;
}

export interface TenantDashboardRecentActivity
  extends Array<TenantDashboardActivity> {}

export interface TenantDashBoardTaskSummary {
  work_in_progress: number;
  new: number;
  completed: number;
}

interface TenantDashboardSummaryReport {
  monthly: {
    paid: number;
    due: number;
  };
  yearly: {
    paid: number;
    due: number;
  };
}

export interface TenantDashboardData {
  rented_property: number;
  total_invitations: number;
  total_contracts: number;
  recent_transaction: TenantDashboardTransactions;
  recent_activity: TenantDashboardRecentActivity;
  task_summary: TenantDashBoardTaskSummary;
  rent_summary_report: TenantDashboardSummaryReport;
  role_id: number;
}

export interface TenantDashboardResponseData {
  success: boolean;
  data?: TenantDashboardData;
  message?: string;
}

// Owner Dashboard Data

export interface OwnerDashboardTransActions
  extends Array<OwnerDashboardTransAction> {}

export interface OwnerDashBoardData {
  total_rented: number;
  total_properties: number;
  total_invitation_sent: number;
  total_revenue: number;
  total_due_revenue: number;
  recent_transaction: OwnerDashboardTransActions;
  recent_activity: TenantDashboardRecentActivity;
  task_summary: TenantDashBoardTaskSummary;
  role_id: number;
}

export interface OwnerDashboardTransActionContractBillingDataPropertyDetails {
  id: number;
  contract_id: number;
  property_id: number;
  usage?: any;
  property_type: string;
  unit?: any;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  street?: any;
  building_no?: any;
  building_name?: string;
  floor_no?: string;
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
  property_descr: string;
  property_name: string;
  notice_period?: any;
  property_facing?: any;
  wheel_chair_access: number;
  address_one: string;
  address_two: string;
  hoa: string;
  hoa_fee?: any;
  hoa_fee_type: string;
  balcony_terrace: string;
  created_at: string;
  updated_at: string;
}
export interface OwnerDashboardTransActionContractBillingData {
  id: number;
  bill_ref_number: string;
  contract_id: number;
  owner_id: number;
  tenant_id: number;
  contract_payment_date_amount_id: number;
  total_payable_amount: string;
  payment_date: string;
  bill_generation_date: string;
  is_paid: number;
  is_fine_applicable: number;
  grace_period?: any;
  fine_amount?: any;
  created_at: string;
  updated_at: string;
  contract_properties_data: OwnerDashboardTransActionContractBillingDataPropertyDetails;
}

export interface OwnerDashboardTransActionTanentData {
  id: number;
  user_id: number;
  title_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email?: any;
  phone: string;
  address1: string;
  address2: string;
  city_id: number;
  state_id: number;
  zip: string;
  account_type: number;
  nationality: number;
  national_id?: any;
  passport_number?: any;
  passport_expiry?: any;
  visa_number?: any;
  visa_expiry?: any;
  profile_photo?: any;
  company_type_id?: any;
  company_name?: any;
  contact_person?: any;
  contact_person_position_in_company?: any;
  contact_number?: any;
  contact_number_region_code?: any;
  company_website?: any;
  company_tin_ein_number?: any;
  property_id?: any;
  occupation?: any;
  region_code?: string;
  annual_income?: string;
  is_employed: number;
  tenant_company_name?: any;
  tenant_company_ph_number?: any;
  tenant_company_address_one?: any;
  tenant_company_address_two?: any;
  tenant_company_state_id?: any;
  tenant_company_city_id?: any;
  tenant_job_title?: any;
  tenant_source_of_income: string;
  is_previously_rented: number;
  reason_of_leaving_previous_property: string;
  created_at: string;
  updated_at: string;
}

export interface OwnerDashboardTransAction {
  contract_billing_data: OwnerDashboardTransActionContractBillingData;
  contract_billing_id: number;
  created_at: string;
  get_tanent: OwnerDashboardTransActionTanentData;
  id: number;
  owner_id: number;
  tenant_id: number;
  transaction_amount: number;
  transaction_number: string;
  transaction_status: number;
  updated_at: string;
}

export interface OwnerDashboardResponseData {
  success: boolean;
  data?: OwnerDashBoardData;
  message?: string;
}
