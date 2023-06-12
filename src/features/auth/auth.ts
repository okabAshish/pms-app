import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../../config';
import {
  Auth,
  CityListRequestData,
  CityListResponseData,
  CityOfStateListParams,
  CityOfStateListResponseData,
  CompanyTypeResponseData,
  CountryListResponseData,
  ForgotPasswordCheckUserRequestBody,
  ForgotPasswordCheckUserResponseData,
  ForgotPasswordNewPasswordRequestBody,
  ForgotPasswordNewPasswordResponseData,
  ForgotPasswordVerifyUserRequestBody,
  ForgotPasswordVerifyUserResponseData,
  ImageCategoryListResponseData,
  ListParams,
  LoginBody,
  NotificationUserRequestBody,
  NotificationUserResponseBody,
  OwnerBillListResponseData,
  OwnerDashboardResponseData,
  OwnerInvitationListParams,
  OwnerInvitationListResponseData,
  OwnerMaintenanceRequestListResponseData,
  OwnerPropertListResponseData,
  OwnerTenantListResponseData,
  RegisterRequestData,
  RegisterResponseData,
  StateListResponseData,
  StateOfCountryListParams,
  StateOfCountryListResponseData,
  TenantDashboardResponseData,
  TitleListResponseData,
  UserProfileDetailResponseData,
  UserProfileResponseData,
} from '../types';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    async prepareHeaders(headers) {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<Auth, LoginBody>({
      query: req => ({
        url: 'login',
        body: req.body,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    register: builder.mutation<Auth, LoginBody>({
      query: req => ({
        url: 'login',
        body: req.body,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    ownerDashboard: builder.mutation<OwnerDashboardResponseData, {}>({
      query: () => ({
        url: 'dashboard',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    tenantDashboard: builder.mutation<TenantDashboardResponseData, {}>({
      query: () => ({
        url: 'dashboard',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    ownerProperties: builder.mutation<OwnerPropertListResponseData, ListParams>(
      {
        query: req => ({
          url: `owner/property-list?limit=${req.limit}&page=${req.page}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
      },
    ),
    ownerAllTenantList: builder.mutation<
      OwnerTenantListResponseData,
      ListParams
    >({
      query: req => ({
        url: `owner/tenant-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    ownerAllMaintenanceRequestList: builder.mutation<
      OwnerMaintenanceRequestListResponseData,
      ListParams
    >({
      query: req => ({
        url: `owner/maintenance-request-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    ownerAllBillList: builder.mutation<OwnerBillListResponseData, ListParams>({
      query: req => ({
        url: `owner/invoice-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    ownerInvitation: builder.mutation<
      OwnerInvitationListResponseData,
      OwnerInvitationListParams
    >({
      query: req => ({
        url: `owner/invitation-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getAllCountries: builder.mutation<CountryListResponseData, {}>({
      query: req => ({
        url: 'country-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getStateOfCountry: builder.mutation<
      StateOfCountryListResponseData,
      StateOfCountryListParams
    >({
      query: req => ({
        url: `state-list/${req.param}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getCityOfState: builder.mutation<
      CityOfStateListResponseData,
      CityOfStateListParams
    >({
      query: req => ({
        url: `city-list/${req.param}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getImageCategoryList: builder.mutation<ImageCategoryListResponseData, {}>({
      query: req => ({
        url: 'image-category-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getTitleList: builder.mutation<TitleListResponseData, {}>({
      query: req => ({
        url: 'title-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getStateList: builder.mutation<StateListResponseData, {}>({
      query: req => ({
        url: 'state-list/233',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getCityList: builder.mutation<CityListResponseData, CityListRequestData>({
      query: req => ({
        url: `city-list/${req.id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    addRegisterData: builder.mutation<
      RegisterResponseData,
      RegisterRequestData
    >({
      query: req => ({
        url: 'owner-register',
        method: 'POST',
        body: req.body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    UserProfileData: builder.mutation<UserProfileResponseData, {}>({
      query: req => ({
        url: 'profile',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getCompanyTypeList: builder.mutation<CompanyTypeResponseData, {}>({
      query: req => ({
        url: 'company-type-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getUserProfileDetail: builder.mutation<UserProfileDetailResponseData, {}>({
      query: req => ({
        url: 'profile',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    forgotPasswordCheckUser: builder.mutation<
      ForgotPasswordCheckUserResponseData,
      ForgotPasswordCheckUserRequestBody
    >({
      query: req => ({
        url: 'check-user',
        method: 'POST',
        body: req.body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    forgotPasswordVerifyUser: builder.mutation<
      ForgotPasswordVerifyUserResponseData,
      ForgotPasswordVerifyUserRequestBody
    >({
      query: req => ({
        url: 'verify-otp',
        method: 'POST',
        body: req.body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    forgotPasswordNewPassword: builder.mutation<
      ForgotPasswordNewPasswordResponseData,
      ForgotPasswordNewPasswordRequestBody
    >({
      query: req => ({
        url: 'change-password',
        method: 'POST',
        body: req.body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    resetPasswordNewPassword: builder.mutation<
      ForgotPasswordNewPasswordResponseData,
      ForgotPasswordNewPasswordRequestBody
    >({
      query: req => ({
        url: 'change-password',
        method: 'POST',
        body: req.body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getUserAllNotification: builder.mutation<
      NotificationUserResponseBody,
      NotificationUserRequestBody
    >({
      query: req => ({
        url: `notification-list?limit=${req.params.limit}&page=${req.params.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useOwnerDashboardMutation,
  useTenantDashboardMutation,
  useOwnerPropertiesMutation,
  useOwnerAllTenantListMutation,
  useOwnerAllMaintenanceRequestListMutation,
  useOwnerAllBillListMutation,
  useOwnerInvitationMutation,
  useGetAllCountriesMutation,
  useGetStateOfCountryMutation,
  useGetCityOfStateMutation,
  useGetImageCategoryListMutation,
  useGetTitleListMutation,
  useGetStateListMutation,
  useGetCityListMutation,
  useUserProfileDataMutation,
  useGetCompanyTypeListMutation,
  useAddRegisterDataMutation,
  useGetUserProfileDetailMutation,
  useForgotPasswordCheckUserMutation,
  useForgotPasswordVerifyUserMutation,
  useForgotPasswordNewPasswordMutation,
  useResetPasswordNewPasswordMutation,
  useGetUserAllNotificationMutation,
} = authApi;
