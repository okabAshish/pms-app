import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../../config';
import {
  AddPropertyResponseData,
  FurnishingListResponseData,
  FurnishingTypeResponseData,
  OwnerContractListParam,
  OwnerContractListResponseData,
  OwnerPropertyAmenitiesResponseData,
  OwnerPropertyDetailsRequest,
  OwnerPropertyDetailsResponseData,
  OwnerPropertyListResponseData,
  PropertyTypeResponseData,
  resendInvitationParam,
  resendInvitationResponseData,
} from '../ownerTypes';

// Define a service using a base URL and expected endpoints
export const ownerApi = createApi({
  reducerPath: 'ownerApi',
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
      query: () => ({
        url: 'property-type-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getFurnishingType: builder.mutation<FurnishingTypeResponseData, {}>({
      query: () => ({
        url: 'furnishing-type-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getFurnishingList: builder.mutation<FurnishingListResponseData, {}>({
      query: () => ({
        url: 'furnishing-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    addProperty: builder.mutation<AddPropertyResponseData, {body: any}>({
      query: req => ({
        url: 'owner/add-property',
        method: 'POST',
        body: req.body,
        headers: {
          'Content-Type': 'multipart/form-data;',
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
    getOwnerPropertyList: builder.mutation<OwnerPropertyListResponseData, {}>({
      query: req => ({
        url: 'owner/contract-property-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getOwnerPropertyDetails: builder.mutation<
      OwnerPropertyDetailsResponseData,
      OwnerPropertyDetailsRequest
    >({
      query: req => ({
        url: `property-detail/${req.param}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getOwnerPropertyAmenitiesList: builder.mutation<
      OwnerPropertyAmenitiesResponseData,
      {}
    >({
      query: req => ({
        url: 'amenities-list',
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
  useGetResendInvitationMutation,
  useGetPropertyTypeMutation,
  useGetOwnerContractListMutation,

  useGetFurnishingTypeMutation,
  useGetFurnishingListMutation,

  useAddPropertyMutation,
  useGetOwnerPropertyListMutation,
  useGetOwnerPropertyDetailsMutation,

  useGetOwnerPropertyAmenitiesListMutation,
} = ownerApi;
