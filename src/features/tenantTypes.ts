export interface PropertyInvitationListParam {
    limit: number;
    page: number;
}

export interface MaintenanceRequestListParam {
    limit: number;
    page: number;
}

export interface RentedPropertyListParam {
    limit: number;
    page: number;
}

export interface TenantContactListParam {
    limit: number;
    page: number;
}

export interface PropertyInvitationListResponseData {
    success: boolean;
    data: PropertyInvitationListLimitData;
    message: string;
}

export interface PropertyInvitationListLimitData {
    data: PropertyInvitationList;
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

export interface PropertyInvitationList extends Array<PropertyInvitation> {}

export interface PropertyInvitation {
    id: number;
    created_by_user_id?: number;
    created_by_user_name?: string;
    inserted_user_id?: number;
    email?: string;
    country_code?: any;
    country_flag?: any,
    phone?: string;
    url_key?: string;
    is_tenant_inserted?: number;
    already_invited?: number;
    already_registered?: number;
    property_id?: number;
    is_approved_by_tenant?: number;
    otp?: any;
    created_at?: string;
    updated_at?: string;
    invited_tenant_data?: {
        id?: number;
        user_id?: number;
        title_id?: number;
        first_name?: string;
        middle_name?: string;
        last_name?: string;
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
        passport_number?: number;
        passport_expiry?: number;
        visa_number?: number;
        visa_expiry?: number;
        profile_photo?: number;
        company_type_id?: number;
        company_name?: number;
        contact_person?: number;
        contact_person_position_in_company?: number;
        contact_number?: number;
        contact_number_region_code?: number;
        company_website?: number;
        company_tin_ein_number?: number;
        property_id?: number;
        occupation?: number;
        region_code?: String;
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
    },
    owner_data?: {
        id?: number;
        user_id?: number;
        title_id?: string;
        first_name?: string;
        middle_name?: any;
        last_name?: string;
        email?: any;
        phone?: string;
        address?: string;
        city?: number;
        state?: number;
        zip?: string;
        account_type?: number;
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
        created_at?: string;
        updated_at?: string;
        region_code?: string;
        tin_or_ein?: any;
        position_in_company?: any;
        occupation?: string;
    },
    invited_property_data?: {
        id?: any;
        owner_id?: number;
        usage_id?: number;
        property_type_id?: number;
        unit_id?: number;
        city_id?: number;
        state_id?: number;
        zip?: string;
        country_id?: number;
        street?: string;
        building_no?: any;
        building_name?: string;
        floor_no?: string;
        area?: any;
        rented?: number;
        status?: number;
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
        hoa_fee?: string;
        hoa_fee_type?: string;
        balcony_terrace?: number;
        address_1?: string;
        address_2?: string;
        parking_available?: number;
        property_size_type?: number;
        created_at?: string;
        updated_at?: string;
        prefix?: string;
        property_type?: {
            id?: number;
            name?: string;
            description?: string;
            created_at?: string;
            updated_at?: string;
        }
    },   
}

export interface MaintenanceRequestListResponseData {
    success: boolean;
    data: MaintenanceRequestListLimitData;
    message: string;
}

export interface MaintenanceRequestListLimitData {
    data: MaintenanceRequestList;
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

export interface MaintenanceRequestList extends Array<MaintenanceRequest> {}

export interface MaintenanceRequest {
    id: number;
    property_id?: number;
    contract_id?: number;
    issue_details?: string;
    maint_category_id?: number;
    priority_id?: number;
    tenant_id?: number;
    owner_id?: number;
    issue_date: string;
    expense_amount?: any;
    vendor_id?: any;
    resolve_date?: any;
    resolution_details?: any;
    status?: number;
    media_url?: any;
    otp?: any;
    created_at?: string;
    updated_at?: string;
    photo_url?: string;
    maintenance_category: {
        id?: number;
        category_name: string;
        created_at?: string;
        updated_at?: string;
    },
    maintenance_priority: {
        id: number;
        priority_name: string;
        created_at?: string;
        updated_at?: string;
    },
    maintenance_status: {
        id: number;
        status_name: string;
        created_at?: string;
        updated_at?: string;
    },
    vendor_detail: {
        id?: 1,
        vendor_name: string;
        maintenance_category_id?: number;
        created_at?: string;
        updated_at?: string;
    },
    property_details: {
        id?: number;
        owner_id?: number;
        usage_id?: any;
        property_type_id?: number;
        unit_id?: any;
        city_id?: number;
        state_id?: number;
        zip?: string;
        country_id?: number;
        street?: any;
        building_no?: any;
        building_name?: string;
        floor_no?: string;
        area?: number;
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
        availability_date?: any;
        total_no_floor?: any;
        age_of_property?: string;
        contact_phone_no?: any;
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
        prefix?: string;
    },
    media?: MaintenanceRequestMediaList;
}

export interface MaintenanceRequestMediaList extends Array<MaintenanceRequestMedia> {}

export interface MaintenanceRequestMedia {
    id: number;
    model_type?: string;
    model_id?: number;
    uuid?: number;
    collection_name?: string;
    name?: string;
    file_name?: string;
    mime_type?: string;
    disk?: string;
    conversions_disk?: string;
    size?: number;
    manipulations?: any;
    custom_properties?: any;
    generated_conversions?: any;
    responsive_images?: any;
    order_column?: number;
    created_at?: string;
    updated_at?: string;
    original_url?: string;
    preview_url?: string;
}

export interface RentedPropertyListResponseData {
    success: boolean;
    data: RentedPropertyListLimitData;
    message: string;
}

export interface RentedPropertyListLimitData {
    data: RentedPropertyList;
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

export interface RentedPropertyList extends Array<RentedProperty>{}

export interface RentedProperty {
    id: number;
    property_id?: number;
    owner_id?: number;
    tenant_id?: number;
    lawyer_id?: any;
    tenant_lawyer_id?: any;
    contract_number: string;
    start_date: string;
    end_date: string;
    contract_period: string;
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
    late_fine_slab_type?: string;
    late_fee_type?: any;
    late_fee_amt?: any;
    grace_period?: any;
    sent_to_tenant_for_approval?: number;
    is_approved_by_tenant?: number;
    discard?: number;
    contract_start_grace_period?: string;
    contract_reject_reason?: any;
    mark_as_vacant?: number;
    notice_period?: any;
    vacant_request_by_owner?: number;
    vacant_request_by_tenant?: number;
    vacant_request_approved?: number;
    vacant_request_date?: string;
    vacant_date?: string;
    vacant_reason?: any;
    created_at?: string;
    updated_at?: string;
    payment_frequency_data?: any;
    contract_properties_data?: {
        id: number;
        contract_id?: number;
        property_id?: number;
        usage?: any;
        property_type?: string;
        unit?: any;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        street?: any;
        building_no?: any;
        building_name?: any;
        floor_no?: any;
        area?: number;
        furnishing_type?: any;
        parking_type?: string;
        nof_parking?: number;
        pet_allowed?: number;
        nof_baths?: number;
        nof_balconies?: number;
        nof_bedrooms?: number;
        total_no_floor?: number;
        age_of_property?: string;
        contact_phone_no?: any;
        property_descr?: any;
        property_name: string;
        notice_period?: any;
        property_facing?: any;
        wheel_chair_access?: number;
        address_one?: string;
        address_two?: any;
        hoa?: string;
        hoa_fee?: any;
        hoa_fee_type?: string;
        balcony_terrace?: string;
        created_at?: string;
        updated_at?: string;
    },
    contract_tenant_data?: {
        id: number;
        contract_id?: number;
        tenant_id?: number;
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
        created_at?: string;
        updated_at?: string;
    },
    contract_owner_data?: {
        id: number;
        contract_id?: number;
        owner_id?: number;
        title?: string;
        first_name: string;
        middle_name?: any;
        last_name: string;
        email?: string;
        phone: string;
        address?: string;
        address_two?: any;
        city?: string;
        state?: string;
        zip?: string;
        account_type?: string;
        nationality?: string;
        national_id?: any;
        passport_number?: any;
        passport_expiry?: any;
        profile_photo?: any;
        company_type?: any;
        company_name?: any;
        contact_person?: any;
        company_website?: any;
        created_at?: string;
        updated_at?: string;
    },
    contract_type_name?: {
        id: 1,
        name?: string;
        created_at?: string;
        updated_at?: string;
    },
    contract_status_name: {
        id: number;
        name: string;
        created_at?: string;
        updated_at?: string;
    }
}

export interface TenantContactListResponseData {
    success: boolean;
    data: TenantContactListLimitData;
    message: string;
}

export interface TenantContactListLimitData {
    data: TenantContactList;
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

export interface TenantContactList extends Array<TenantContact> {}

export interface TenantContact {
    id: number;
    property_id?: number;
    owner_id?: number;
    tenant_id?: number;
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
    late_fine_slab_type?: string;
    late_fee_type?: any;
    late_fee_amt?: any;
    grace_period?: any;
    sent_to_tenant_for_approval?: number;
    is_approved_by_tenant?: number;
    discard?: number;
    contract_start_grace_period?: string;
    contract_reject_reason?: any;
    mark_as_vacant?: number;
    notice_period?: any;
    vacant_request_by_owner?: number;
    vacant_request_by_tenant?: number;
    vacant_request_approved?: number;
    vacant_request_date?: any;
    vacant_date?: any;
    vacant_reason?: any;
    created_at?: string;
    updated_at?: string;
    lawyer_contract_data?: any;
    contract_type_name?: {
        id: number;
        name?: string;
        created_at?: string;
        updated_at?: string;
    },
    contract_status_name: {
        id: number;
        name: string;
        created_at?: string;
        updated_at?: string;
    },
    contract_owner_data?: {
        id: number;
        contract_id?: number;
        owner_id?: number;
        title?: string;
        first_name?: string;
        middle_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        address?: string;
        address_two?: any;
        city?: string;
        state?: string;
        zip?: string;
        account_type?: string;
        nationality?: string;
        national_id?: any;
        passport_number?: any;
        passport_expiry?: any;
        profile_photo?: any;
        company_type?: any;
        company_name?: any;
        contact_person?: any;
        company_website?: any;
        created_at?: string;
        updated_at?: string;
    }
}