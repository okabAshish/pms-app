// Resend invitation api
export interface resendInvitationParam {
  id: number;
}

export interface resendInvitationResponseData {
  success: boolean;
  data: {
    url: string;
    created_by_user: string;
  };
  message: string;
}

export interface PropertyTypeResponseData {
  success: boolean;
  data: PropertyTypeListData;
  message?: string;
}

export interface PropertyTypeData {
  id: number;
  name?: string;
  description?: string;
}

export interface PropertyTypeListData extends Array<PropertyTypeData> {}

export interface OwnerContractListParam {
  limit: number;
  page: number;
}

export interface OwnerContractListResponseData {
  success: boolean;
  data: OwnerContractListLimitData;
  message: string;
}

export interface OwnerContractListLimitData {
  data: OwnerContractList;
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

export interface OwnerContractList extends Array<OwnerContract> {}

export interface OwnerContract {
  id: number;
  property_id: number;
  owner_id: number;
  tenant_id: number;
  lawyer_id?: number;
  contract_number: string;
  start_date: string;
  end_date: string;
  contract_period: string;
  security_deposit: number;
  monthly_rent: number;
  monthly_service_charge: number;
  monthly_other_charge: number;
  discount: string;
  total_monthly_amt: string;
  activation_date?: string;
  contract_status: number;
  contract_type_id: number;
  contract_signed_date?: string;
  contract_authorised_id?: string;
  contract_authorised_by?: string;
  contract_authorised_date?: string;
  payment_frequency?: string;
  late_fee_applicable: number;
  late_fine_slab_type: string;
  late_fee_type?: any;
  late_fee_amt?: any;
  grace_period?: any;
  sent_to_tenant_for_approval: number;
  is_approved_by_tenant: number;
  discard: number;
  contract_start_grace_period: string;
  contract_reject_reason?: any;
  mark_as_vacant: number;
  notice_period?: any;
  vacant_request_by_owner: number;
  vacant_request_by_tenant: number;
  vacant_request_approved: number;
  vacant_request_date: string;
  vacant_date: string;
  vacant_reason?: any;
  created_at: string;
  updated_at: string;
  contract_tenant_data: {
    id: number;
    contract_id: number;
    tenant_id: number;
    title?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    account_type?: string;
    nationality?: string;
    national_id?: any;
    passport_number?: any;
    passport_expiry?: any;
    visa_number?: any;
    visa_expiry?: any;
    company_type?: string;
    company_name?: any;
    contact_person?: any;
    contact_number?: any;
    company_website?: any;
    created_at: string;
    updated_at: string;
  };
  contract_type_name: {
    id: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
  };
  contract_status_name: {
    id: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
  };
  lawyer_contract_data?: any;
}

export interface AddPropertyInputData {
  property_name: string;
  property_type_id: string;
  property_size: string;
  property_size_type: number;
  property_built_year: string;
  hoa_fee: string;
  hoa_fee_type: string;
  no_of_bedrooms: string;
  no_of_bathroom: string;
  furnishing_type_id: string;
  property_furnishing_detail: any;
  property_amenities: string;
  balcony_terrace: number;
  parking_available: number;
  no_of_parking: number;
  parking_type: string;
  country_id: number;
  state_id: number;
  city_id: number;
  zip: string;
  address_one: string;
  address_two: string;
  image_count: number;

  property_images: OwnerPropertyDetailsData_PropertyImages;
}

export interface EditPropertyInputData {
  params: string;
  body: AddPropertyInputData;
}

export interface AddPropertyResponseData {}

export interface ParkingTypeListData {
  id: string;
  name: string;
}

export interface ParkingTypeList extends Array<ParkingTypeListData> {}

export interface ParkingTypeListResponseData {
  success: boolean;
  message: string;
  data: ParkingTypeList;
}

export interface FurnishingTypeResponseData {
  success: boolean;
  data: FurnishingTypeList;
  message: string;
}

export interface FurnishingTypeList extends Array<FurnishingType> {}

export interface FurnishingType {
  id: number;
  name: string;
}

export interface FurnishingListResponseData {
  success: boolean;
  data: FurnishingListData;
  message: string;
}

export interface FurnishingListData extends Array<FurnishingList> {}

export interface FurnishingList {
  id: number;
  furnish_name: string;
  icon: string;
}

export interface OwnerPropertyData {
  id: number;
  owner_id: number;
  property_name: string;
}

export interface OwnerPropertyList extends Array<OwnerPropertyData> {}

export interface OwnerPropertyListResponseData {
  success: boolean;
  data: OwnerPropertyList;
  message: string;
}

// Owner Properties Detail Data

export interface OwnerPropertyDetailsResponseData {
  success: boolean;
  data: OwnerPropertyDetailsData;
  message: string;
}

export interface OwnerPropertyDetailsDataFurnishingDetail {
  icon: any;
  name: any;
  id: number;
  property_id: number;
  furnishing_id: number;
  created_at: string;
  updated_at: string;
}

export interface OwnerPropertyDetailsDataFurnishingDetails
  extends Array<OwnerPropertyDetailsDataFurnishingDetail> {}

export interface OwnerPropertyDetailsData_PropertyAmenitie {
  icon: any;
  name: any;
  id: number;
  property_id: number;
  amenity_id: number;
  created_at: string;
  updated_at: string;
}

export interface OwnerPropertyDetailsData_PropertyAmenities
  extends Array<OwnerPropertyDetailsData_PropertyAmenitie> {}

export interface OwnerPropertyDetailsData_PropertyImage_MediaData {
  id: number;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface OwnerPropertyDetailsData_PropertyImage_Medias
  extends Array<OwnerPropertyDetailsData_PropertyImage_MediaData> {}

export interface OwnerPropertyDetailsData_PropertyImage {
  id: number;
  property_id: number;
  image_cat_id: number;
  image_caption?: any;
  image: string;
  created_at: string;
  updated_at: string;
  photo_url: string;
  image_category: {
    id: number;
    name: string;
    description?: any;
    created_at: string;
    updated_at: string;
  };
  media: OwnerPropertyDetailsData_PropertyImage_Medias;
}

export interface OwnerPropertyDetailsData_PropertyImages
  extends Array<OwnerPropertyDetailsData_PropertyImage> {}
export interface OwnerPropertyDetailsData {
  id: number;
  property_type_id: number;
  property_type_name: string;
  property_name: string;
  property_size: number;
  property_size_type: number;
  property_built_year: string;
  hoa_fee: string;
  hoa_fee_type: string;
  no_of_bedrooms: number;
  no_of_bathroom: number;
  furnishing_type_id: number;
  furnishing_type_name: string;
  furnishing_details: OwnerPropertyDetailsDataFurnishingDetails;
  parking_type_id: number;
  parking_type_name: string;
  no_of_parking: number;
  parking_available: number;
  balcony_terrace: number;
  city_id: number;
  city_name: string;
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
  zip: string;
  address_one: string;
  address_two: string;
  property_amenities: OwnerPropertyDetailsData_PropertyAmenities;
  property_images: OwnerPropertyDetailsData_PropertyImages;
  rented: number;
}

// Request For Owner Property Details

export interface OwnerPropertyDetailsRequest {
  param: number;
}

// Amenities List

export interface OwnerPropertyAmenitiesData {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface OwnerPropertyAmenitiesList
  extends Array<OwnerPropertyAmenitiesData> {}

export interface OwnerPropertyAmenitiesResponseData {
  success: boolean;
  data: OwnerPropertyAmenitiesList;
  message: string;
}

export interface TenantInvitationDropDownResponseData {
  success: boolean;
  message: string;
  data: {
    property_list: TenantInvitationDropDownPropertyList;
    tenant_list: TenantInvitationDropDownTenantList;
  };
}

export interface TenantInvitationDropDownPropertyListData {
  id: number;
  owner_id: number;
  property_name: string;
}

export interface TenantInvitationDropDownPropertyList
  extends Array<TenantInvitationDropDownPropertyListData> {}

export interface TenantInvitationDropDownTenantListData {
  id: number;
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  account_type: number;
}

export interface TenantInvitationDropDownTenantList
  extends Array<TenantInvitationDropDownTenantListData> {}

export interface InviteTenantBody {
  is_existing_tenant: string;
  invitation_type: string;
  property_id: string;
  selected_tenant_email?: Array<string>;
  email?: string;
  phone?: string;
  phone_code?: string;
  flag?: string;
}
export interface InviteTenantResponseData {
  success: boolean;
  data: InviteTenantData;
  message: string;
}

export interface InviteTenantData {
  url: string;
  created_by_user: string;
}
