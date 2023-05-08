import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {resendInvitationParam, resendInvitationResponseData} from '../ownerTypes';

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
        getResendInvitation: builder.mutation<resendInvitationResponseData, resendInvitationParam>({
            query: req => ({
                url: `owner/resend-invitation/${req.id}`,
                method: 'POST',
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
    useGetResendInvitationMutation
} = ownerApi;