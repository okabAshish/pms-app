import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  Auth,
  ListParams,
  LoginBody,
  OwnerDashboardResponseData,
  OwnerInvitationListParams,
  OwnerInvitationListResponseData,
  OwnerPropertListResponseData,
  OwnerTenantListResponseData,
  TenantDashboardResponseData,
} from '../types';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.105:8105/api/',
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
  useOwnerInvitationMutation,
} = authApi;
