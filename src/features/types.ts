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

export interface AuthUserDetais {
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
}

export interface Auth {
  success?: boolean;
  data: {
    user_detail: AuthUserDetais;
    token: string;
    message?: string;
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

// Owner Property List

export interface ListParams {
  limit: number;
  page: number;
}
export interface OwnerPropertListResponseData {
  success: boolean;
  data: OwnerPropertListLimitData;
  message: string;
}

export interface OwnerPropertListLimitData {
  data: OwnerPropertyListData;
  meta: {
    from: number;
    to: number;
    total: number;
    count: number;
    per_page: string;
    current_page: number;
    last_page: number;
  };
  links: {
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string;
    prev_page_url?: string;
  };
}

interface OwnerPropertyDataPropertyOwnerDetails {
  id: number;
  user_id: number;
  title_id: string;
  first_name?: string;
  middle_name?: any;
  last_name?: string;
  email?: any;
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

interface OwnerPropertRunningContractData {
  id: number;
  property_id: number;
  owner_id: number;
  tenant_id: number;
  contract_number?: string;
  start_date?: string;
  end_date?: string;
  contract_period?: string;
  security_deposit?: number;
  monthly_rent?: number;
  monthly_service_charge?: number;
  monthly_other_charge?: number;
  discount?: string;
  total_monthly_amt?: number;
  activation_date?: any;
  contract_status?: number;
  contract_type_id?: number;
  contract_signed_date?: any;
  contract_authorised_id?: any;
  contract_authorised_by?: any;
  contract_authorised_date?: any;
  payment_frequency?: any;
  late_fee_applicable?: number;
  late_fine_slab_type?: any;
  late_fee_type?: any;
  late_fee_amt?: any;
  grace_period?: any;
  sent_to_tenant_for_approval?: number;
  is_approved_by_tenant?: number;
  discard?: number;
  contract_start_grace_period?: string;
  contract_reject_reason?: any;
  mark_as_vacant?: number;
  notice_period?: string;
  vacant_request_by_owner?: number;
  vacant_request_by_tenant?: number;
  vacant_request_approved?: number;
  vacant_request_date?: string;
  vacant_date?: string;
  vacant_reason?: string;
  created_at: string;
  updated_at: string;
}

interface OwnerPropertRunningContracts
  extends Array<OwnerPropertRunningContractData> {}

interface OwnerPropertyImage {
  id?: number;
  property_id?: number;
  image_cat_id?: number;
  image_caption?: any;
  image?: any;
  created_at: string;
  updated_at: string;
  photo_url: string;
  media?: [
    {
      id?: number;
      model_id?: number;
      uuid?: string;
      collection_name?: string;
      name?: string;
      file_name?: string;
      mime_type?: string;
      disk?: string;
      conversions_disk?: string;
      size?: number;
      order_column?: number;
      created_at?: string;
      updated_at?: string;
      original_url?: string;
      preview_url?: string;
    },
  ];
}

interface OwnerPropertyImages extends Array<OwnerPropertyImage> {}

export interface OwnerPropertyData {
  id: number;
  owner_id: number;
  usage_id?: number;
  property_type_id?: number;
  unit_id?: number;
  city_id?: number;
  state_id?: number;
  zip?: string;
  country_id: number;
  street?: any;
  building_no?: any;
  building_name?: string;
  floor_no?: string;
  area?: number;
  rented: number;
  status?: any;
  monthly_rent_amt?: any;
  security_deposit?: any;
  furnishing_type_id: number;
  parking_type: number;
  nof_parking?: number;
  pet_allowed?: number;
  nof_baths?: number;
  nof_balconies?: number;
  nof_bedrooms?: number;
  availability_date?: any;
  total_no_floor?: any;
  age_of_property?: string;
  contact_phone_no?: string;
  property_descr?: string;
  property_name?: string;
  available_for?: any;
  notice_period?: any;
  facing_id?: any;
  wheel_chair_access?: number;
  lease_duration?: any;
  property_latitude?: any;
  property_longitude?: any;
  hoa?: number;
  hoa_fee: string;
  hoa_fee_type: string;
  balcony_terrace: number;
  address_1: string;
  address_2: string;
  parking_available: number;
  property_size_type: number;
  created_at: string;
  updated_at: string;
  property_owner: OwnerPropertyDataPropertyOwnerDetails;
  property_type: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  usage_type?: any;
  city_name: {
    id: number;
    name?: string;
    state_id?: number;
    state_code?: string;
    state_name?: string;
    country_id?: number;
    country_code?: string;
    country_name?: string;
    latitude?: number;
    longitude?: number;
    wikiDataId?: number;
  };
  state_name: {
    id: number;
    name?: string;
    country_id?: number;
    country_code?: string;
    country_name?: string;
    state_code?: string;
    type?: string;
    latitude?: string;
    longitude?: string;
  };
  property_available_for?: any;
  property_in_running_contract: OwnerPropertRunningContracts;
  property_images: OwnerPropertyImages;
}

export interface OwnerPropertyListData extends Array<OwnerPropertyData> {}

// Owner Tenant List

export interface OwnerTenantListResponseData {
  success: boolean;
  data: OwnerTenantListDataWithList;
  message: string;
}

export interface OwnerTenantListDataWithList {
  data: OwnerTenantListData;
  meta: {
    from: number;
    to: number;
    total: number;
    count: number;
    per_page: string;
    current_page: number;
    last_page: number;
  };
  links: {
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string;
    prev_page_url?: string;
  };
}

// Owner Invitation List

export interface OwnerInvitationListParams {
  limit: number;
  page: number;
}
export interface OwnerInvitationListResponseData {
  success: boolean;
  data: OwnerInvitationListLimitData;
  message: string;
}
export interface OwnerInvitationListLimitData {
  data: OwnerInvitationListData;
  meta: {
    from: number;
    to: number;
    total: number;
    count: number;
    per_page: string;
    current_page: number;
    last_page: number;
  };
  links: {
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string;
    prev_page_url?: string;
  };
}

export interface OwnerTenantListData extends Array<OwnerTenantData> {}

interface OwnerTenantReferenceData {
  id: number;
  tenant_id: number;
  previous_property_owner_name?: string;
  previous_property_owner_phone_no?: string;
  created_at: string;
  updated_at: string;
}

interface OwnerTenantReferences extends Array<OwnerTenantReferenceData> {}

export interface OwnerTenantData {
  id: number;
  user_id: number;
  title_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city_id?: number;
  state_id?: number;
  zip?: string;
  account_type?: number;
  nationality?: number;
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
  contact_number_region_code?: string;
  company_website?: any;
  company_tin_ein_number?: any;
  property_id?: any;
  occupation?: any;
  region_code?: string;
  annual_income?: string;
  is_employed?: number;
  tenant_company_name?: any;
  tenant_company_ph_number?: any;
  tenant_company_address_one?: any;
  tenant_company_address_two?: any;
  tenant_company_state_id?: any;
  tenant_company_city_id?: any;
  tenant_job_title?: any;
  tenant_source_of_income?: string;
  is_previously_rented?: number;
  reason_of_leaving_previous_property?: any;
  created_at: string;
  updated_at: string;
  user_data: {
    id: number;
    name?: any;
    email?: string;
    role_id: number;
  };
  title_name: {
    id: number;
    name: string;
    description: string;
    status: number;
    created_at?: any;
    updated_at?: any;
  };
  company_type?: any;
  country_name: {
    id: number;
    name: string;
    iso3: string;
    code: string;
    numeric_code: string;
    phonecode: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    subregion: string;
    timezones: string;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
  };
  state_name: {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    state_code: string;
    type: string;
    latitude: string;
    longitude: string;
  };
  city_name: {
    id: number;
    name: string;
    state_id: number;
    state_code: string;
    state_name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    latitude: string;
    longitude: string;
    wikiDataId: string;
  };
  tenant_occupant_data: Array<[]>;
  tenant_reference_data: OwnerTenantReferences;
  company_city_name?: any;
  company_state_name?: any;
}
export interface OwnerInvitationData {
  id: number;
  created_by_user_id?: number;
  created_by_user_name?: string;
  inserted_user_id?: number;
  email?: string;
  country_code?: string;
  country_flag?: string;
  phone?: string;
  url_key?: string;
  is_tenant_inserted?: number;
  already_invited?: number;
  already_registered?: number;
  property_id?: number;
  is_approved_by_tenant?: number;
  otp?: string;
  created_at?: string;
  updated_at?: string;
  invited_property_data: {
    id: number;
    owner_id: number;
    usage_id?: number;
    property_type_id?: number;
    unit_id?: number;
    city_id?: number;
    state_id?: number;
    zip?: string;
    country_id?: number;
    street?: any;
    building_no?: any;
    building_name?: string;
    floor_no?: string;
    area?: any;
    rented?: number;
    status?: any;
    monthly_rent_amt?: any;
    security_deposit?: any;
    furnishing_type_id?: number;
    parking_type?: number;
    nof_parking?: number;
    pet_allowed?: number;
    nof_baths?: number;
    nof_balconies?: number;
    nof_bedrooms?: number;
    availability_date?: string;
    total_no_floor?: string;
    age_of_property?: string;
    contact_phone_no?: string;
    property_descr?: string;
    property_name?: string;
    available_for?: any;
    notice_period?: any;
    facing_id?: any;
    wheel_chair_access?: number;
    lease_duration?: any;
    property_latitude?: any;
    property_longitude?: any;
    hoa?: number;
    hoa_fee?: string;
    hoa_fee_type?: string;
    balcony_terrace?: number;
    address_1?: string;
    address_2?: string;
    parking_available?: number;
    property_size_type?: number;
    created_at?: string;
    updated_at?: string;
  };
  invited_tenant_data: {
    id: number;
    user_id: number;
    title_id?: number;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: any;
    phone?: string;
    address1?: string;
    address2?: string;
    city_id?: number;
    state_id?: number;
    zip?: string;
    account_type?: number;
    nationality?: number;
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
    is_employed?: number;
    tenant_company_name?: string;
    tenant_company_ph_number?: string;
    tenant_company_address_one?: string;
    tenant_company_address_two?: any;
    tenant_company_state_id?: string;
    tenant_company_city_id?: string;
    tenant_job_title?: any;
    tenant_source_of_income?: any;
    is_previously_rented?: number;
    reason_of_leaving_previous_property?: any;
    created_at?: string;
    updated_at?: string;
  };
}

export interface OwnerInvitationListData extends Array<OwnerInvitationData> {}

// Country List
export interface CountryListResponseData {
  success: boolean;
  data: CountryList;
  message: string;
}

export interface CountryListData {
  id: number;
  name: string;
  phonecode: string;
  code: string;
  currency_symbol: string;
}

export interface CountryList extends Array<CountryListData> {}

// State List

export interface StateOfCountryListResponseData {
  success: boolean;
  data: StateOfCountryList;
  message: string;
}

export interface StateOfCountryListData {
  id: number;
  name: string;
  state_code: string;
  country_code: string;
  country_id: number;
}

export interface StateOfCountryList extends Array<StateOfCountryListData> {}

export interface StateOfCountryListParams {
  param: string;
}

// City List

export interface CityOfStateListResponseData {
  success: boolean;
  data: CityOfStateList;
  message: string;
}

export interface CityOfStateListData {
  id: number;
  name: string;
  state_id: number;
  country_id: number;
  country_code: string;
}

export interface CityOfStateList extends Array<CityOfStateListData> {}

export interface CityOfStateListParams {
  param: string;
}

// Image Category List

export interface ImageCategoryListResponseData {
  success: boolean;
  data: ImageCategoryList;
  message: string;
}

export interface ImageCategoryListData {
  id: number;
  name: string;
  description: string;
}

export interface ImageCategoryList extends Array<ImageCategoryListData> {}
