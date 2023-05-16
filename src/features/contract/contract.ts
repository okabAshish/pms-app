import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  ContractTenantListRequest,
  ContractTenantListResponseData,
  ContractTermAddTermBody,
  ContractTermAddTitleBody,
  ContractTermAddTitleResponseData,
  ContractTermListResponseData,
  ContractTermTitleDeleteParams,
  ContractTermTitleDeleteResponseData,
  ContractTermUpdateBody,
} from './contractTypes';

// Define a service using a base URL and expected endpoints
export const contractApi = createApi({
  reducerPath: 'contractApi',
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
    getTermsList: builder.mutation<ContractTermListResponseData, {}>({
      query: req => ({
        url: 'owner/contract-term-list',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    addTermsTitle: builder.mutation<
      ContractTermAddTitleResponseData,
      ContractTermAddTitleBody
    >({
      query: req => ({
        url: 'owner/add-title',
        method: 'POST',
        body: req,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    addTerm: builder.mutation<
      ContractTermListResponseData,
      ContractTermAddTermBody
    >({
      query: req => ({
        url: 'owner/add-term',
        method: 'POST',
        body: req,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deleteTermTitle: builder.mutation<
      ContractTermTitleDeleteResponseData,
      ContractTermTitleDeleteParams
    >({
      query: req => ({
        url: `owner/delete-title/${req.param}`,
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    editTermTitle: builder.mutation<
      ContractTermTitleDeleteResponseData,
      ContractTermUpdateBody
    >({
      query: req => ({
        url: `owner/update-title/${req.param}`,
        method: 'PUT',
        body: req.title,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deleteTerm: builder.mutation<
      ContractTermTitleDeleteResponseData,
      ContractTermTitleDeleteParams
    >({
      query: req => ({
        url: `owner/delete-term/${req.param}`,
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    editTerm: builder.mutation<
      ContractTermTitleDeleteResponseData,
      ContractTermUpdateBody
    >({
      query: req => ({
        url: `owner/update-term/${req.param}`,
        method: 'PUT',
        body: req.title,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getOwnerTenantList: builder.mutation<
      ContractTenantListResponseData,
      ContractTenantListRequest
    >({
      query: req => ({
        url: `owner/contract-tenant-list/${req.property_id}`,
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
  useGetTermsListMutation,
  useAddTermsTitleMutation,
  useAddTermMutation,
  useDeleteTermTitleMutation,
  useDeleteTermMutation,
  useEditTermMutation,
  useEditTermTitleMutation,
  useGetOwnerTenantListMutation,
} = contractApi;