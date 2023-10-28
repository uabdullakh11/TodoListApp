import { saveToken } from '@/helpers/token';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import api from './http.service'

// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:5000/api/auth'
//     }),
//     endpoints: (builder) => ({
//         login: builder.mutation({
//             query: (userData: { login: string, password: string }) => ({
//                 url: `/login`,
//                 method: 'POST',
//                 body: userData,
//             }),
//             transformResponse: (response: { ACCESS_TOKEN: string, expires_in: string, REFRESH_TOKEN: string }) => {
//                 saveToken(response.ACCESS_TOKEN, response.expires_in, response.REFRESH_TOKEN)
//                 return response;
//             },
//         }),
//         register: builder.mutation({
//             query: (userData: { email: string, login: string, password: string }) => ({
//                 url: `/register`,
//                 method: 'POST',
//                 body: userData,
//             }),
//             transformResponse: (response: { ACCESS_TOKEN: string, expires_in: string, REFRESH_TOKEN: string }) => {
//                 saveToken(response.ACCESS_TOKEN, response.expires_in, response.REFRESH_TOKEN)
//                 return response;
//             },
//         }),
//         refreshToken: builder.mutation({
//             query: (refresh_token) => ({
//                 url: `/refresh`,
//                 method: 'POST',
//                 body: { refreshToken: refresh_token },
//             }),
//             transformResponse: (response: { ACCESS_TOKEN: string, expires_in: string, REFRESH_TOKEN: string }) => {
//                 saveToken(response.ACCESS_TOKEN, response.expires_in, response.REFRESH_TOKEN)
//                 return response;
//             },
//         }),
//         logout: builder.mutation({
//             query: (refresh_token) => ({
//                 url: `/logout`,
//                 method: 'POST',
//                 body: { refreshToken: refresh_token },
//             }),
//         }),
//     }),
// })

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userData: { login: string, password: string }) => ({
                url: `/auth/login`,
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response: { ACCESS_TOKEN: string, expires_in: string, REFRESH_TOKEN: string }) => {
                saveToken(response.ACCESS_TOKEN, response.expires_in, response.REFRESH_TOKEN)
                return response;
            },
        }),
        register: builder.mutation({
            query: (userData: { email: string, login: string, password: string }) => ({
                url: `/auth/register`,
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response: { ACCESS_TOKEN: string, expires_in: string, REFRESH_TOKEN: string }) => {
                saveToken(response.ACCESS_TOKEN, response.expires_in, response.REFRESH_TOKEN)
                return response;
            },
        }),
        // refreshToken: builder.mutation({
        //     query: (refresh_token) => ({
        //         url: `/auth/refresh`,
        //         method: 'POST',
        //         body: { refreshToken: refresh_token },
        //     }),
        //     transformResponse: (response: { ACCESS_TOKEN: string, expires_in: string, REFRESH_TOKEN: string }) => {
        //         saveToken(response.ACCESS_TOKEN, response.expires_in, response.REFRESH_TOKEN)
        //         return response;
        //     },
        // }),
        logout: builder.mutation({
            query: (refresh_token) => ({
                url: `/auth/logout`,
                method: 'POST',
                body: { refreshToken: refresh_token },
            }),
        }),
    }),
})


export const {
    useLoginMutation,
    useRegisterMutation,
    // useRefreshTokenMutation,
    useLogoutMutation
} = authApi