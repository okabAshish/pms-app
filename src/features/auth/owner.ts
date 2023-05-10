import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  AddPropertyInputData,
  AddPropertyResponseData,
  OwnerContractListParam,
  OwnerContractListResponseData,
  PropertyTypeResponseData,
  resendInvitationParam,
  resendInvitationResponseData,
} from '../ownerTypes';

// Define a service using a base URL and expected endpoints
export const ownerApi = createApi({
  reducerPath: 'ownerApi',
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
    getResendInvitation: builder.mutation<
      resendInvitationResponseData,
      resendInvitationParam
    >({
      query: req => ({
        url: `owner/resend-invitation/${req.id}`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    //Start Add property
    getPropertyType: builder.mutation<PropertyTypeResponseData, {}>({
      query: req => ({
        url: 'property-type-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    addProperty: builder.mutation<
      AddPropertyResponseData,
      AddPropertyInputData
    >({
      query: req => ({
        url: 'owner/add-property',
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    //End Add property
    //Start Owner contract
    getOwnerContractList: builder.mutation<
      OwnerContractListResponseData,
      OwnerContractListParam
    >({
      query: req => ({
        url: `owner/contract-list?limit=${req.limit}&page=${req.page}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    //End Owner contract
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetResendInvitationMutation,
  useGetPropertyTypeMutation,
  useGetOwnerContractListMutation,
} = ownerApi;
