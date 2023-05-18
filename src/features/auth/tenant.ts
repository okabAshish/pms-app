import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    PropertyInvitationListParam,
    PropertyInvitationListResponseData,
    MaintenanceRequestListParam,
    MaintenanceRequestListResponseData,
    RentedPropertyListParam,
    RentedPropertyListResponseData
} from '../tenantTypes';

// Define a service using a base URL and expected endpoints
export const tenantApi = createApi({
    reducerPath: 'tenantApi',
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
        getPropertyInvitation: builder.mutation<PropertyInvitationListResponseData, PropertyInvitationListParam>({
            query: req => ({
                url: `tenant/property-invitation-list?limit=${req.limit}&page=${req.page}`,
                method: 'GET',
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        getMaintenanceRequest: builder.mutation<MaintenanceRequestListResponseData, MaintenanceRequestListParam>({
            query: req => ({
                url: `tenant/maintenance-request-list?limit=${req.limit}&page=${req.page}`,
                method: 'GET',
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
        getRentedProperty: builder.mutation<RentedPropertyListResponseData, RentedPropertyListParam>({
            query: req => ({
                url: `tenant/rented-property-list?limit=${req.limit}&page=${req.page}`,
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
} = tenantApi;
