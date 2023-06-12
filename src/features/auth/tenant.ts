import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../../config';
import {
  AcceptInvitationParam,
  AcceptInvitationResponse,
  MaintenanceDetailsResponseData,
  MaintenanceDropdownListResponse,
  MaintenanceRequestListParam,
  MaintenanceRequestListResponseData,
  PropertyInvitationListParam,
  PropertyInvitationListResponseData,
  RentedPropertyListParam,
  RentedPropertyListResponseData,
  TenantContactListParam,
  TenantContactListResponseData,
  TransactionListResponseData,
} from '../tenantTypes';

// Define a service using a base URL and expected endpoints
export const tenantApi = createApi({
  reducerPath: 'tenantApi',
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
    addMaintenanceRequest: builder.mutation({
      query: req => ({
        url: 'tenant/create-update-maintenance-request',
        method: 'POST',
        body: req,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      }),
    }),
    getPropertyInvitation: builder.mutation<
      PropertyInvitationListResponseData,
      PropertyInvitationListParam
    >({
      query: req => ({
        url: `tenant/property-invitation-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getMaintenanceRequest: builder.mutation<
      MaintenanceRequestListResponseData,
      MaintenanceRequestListParam
    >({
      query: req => ({
        url: `tenant/maintenance-request-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getRentedProperty: builder.mutation<
      RentedPropertyListResponseData,
      RentedPropertyListParam
    >({
      query: req => ({
        url: `tenant/rented-property-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getTenantContactList: builder.mutation<
      TenantContactListResponseData,
      TenantContactListParam
    >({
      query: req => ({
        url: `tenant/contract-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    acceptInvitation: builder.mutation<
      [AcceptInvitationResponse],
      AcceptInvitationParam
    >({
      query: req => ({
        url: `tenant/accept-invitation/${req.id}`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getMaintenanceDropdownList: builder.mutation<
      MaintenanceDropdownListResponse,
      {}
    >({
      query: req => ({
        url: 'tenant/maintenance-dropdown-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deleteMaintenanceRequest: builder.mutation<
      {success: true},
      {
        params: {
          id: string;
        };
      }
    >({
      query: req => ({
        url: `tenant/delete-maintenance-request/${req.params.id}`,
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getMaintenaceRequestDetails: builder.mutation<
      MaintenanceDetailsResponseData,
      {
        params: {
          id: string;
        };
      }
    >({
      query: req => ({
        url: `tenant/maintenance-request-detail/${req.params.id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getTransactionList: builder.mutation<
      TransactionListResponseData,
      {
        params: {
          limit: string;
          page: string;
        };
      }
    >({
      query: req => ({
        url: `tenant/all-transaction-list?limit=${req.params.limit}&page=${req.params.page}`,
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
  useGetPropertyInvitationMutation,
  useGetTenantContactListMutation,
  useGetRentedPropertyMutation,
  useGetMaintenanceRequestMutation,
  useAcceptInvitationMutation,
  useGetMaintenanceDropdownListMutation,
  useAddMaintenanceRequestMutation,
  useDeleteMaintenanceRequestMutation,
  useGetMaintenaceRequestDetailsMutation,
  useGetTransactionListMutation,
} = tenantApi;
