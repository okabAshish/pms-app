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
