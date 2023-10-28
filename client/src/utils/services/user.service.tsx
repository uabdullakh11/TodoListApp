import { removeToken } from '@/helpers/token'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from './http.service'

// export const usersApi = createApi({
//     reducerPath: 'usersApi',
//     tagTypes: ['User'],
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:5000/api/users', prepareHeaders: (headers) => {
//             const token = localStorage.getItem(
//                 "ACCESS_TOKEN"
//             )
//             if (token) {
//                 headers.set('Authorization', `Bearer ${token}`)
//             }
//             return headers
//         },
//     }),
//     endpoints: (builder) => ({
//         getUser: builder.query({
//             query: () => `/`,
//             providesTags: ['User'],
//         }),
//         getUserStatistic: builder.query({
//             query: () => `/statistic`,
//             providesTags: ['User'],
//             keepUnusedDataFor: 0,
//         }),
//         changePassword: builder.mutation({
//             query: (userNewPassword: { currentPassword: string, newPassword: string }) => ({
//                 url: `/password`,
//                 method: 'PATCH',
//                 body: userNewPassword,
//             }),
//         }),
//         deleteUser: builder.mutation({
//             query: () => ({
//                 url: `/`,
//                 method: 'DELETE',
//             }),
//             transformResponse: (response) => {
//                 removeToken()
//                 return response
//             },
//         }),
//         changeAvatar: builder.mutation({
//             query: (avatarIcon: FormData) => ({
//                 url: `/avatar`,
//                 method: 'PUT',
//                 body: avatarIcon,
//             }),
//             invalidatesTags: ['User'],
//         }),
//         changeUserData: builder.mutation({
//             query: (userData: { newLogin: string, newEmail: string }) => ({
//                 url: `/`,
//                 method: 'PATCH',
//                 body: userData,
//             }),
//             invalidatesTags: ['User'],
//         }),
//     }),
// })
const apiWithTag = api.enhanceEndpoints({ addTagTypes: ['User'] })

export const usersApi = apiWithTag.injectEndpoints({
    // reducerPath: 'usersApi',
    // tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `/users`,
            providesTags: ['User'],
        }),
        getUserStatistic: builder.query({
            query: () => `/users/statistic`,
            providesTags: ['User'],
            keepUnusedDataFor: 0,
        }),
        changePassword: builder.mutation({
            query: (userNewPassword: { currentPassword: string, newPassword: string }) => ({
                url: `/users/password`,
                method: 'PATCH',
                body: userNewPassword,
            }),
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: `/users/`,
                method: 'DELETE',
            }),
            transformResponse: (response) => {
                removeToken()
                return response
            },
        }),
        changeAvatar: builder.mutation({
            query: (avatarIcon: FormData) => ({
                url: `/users/avatar`,
                method: 'PUT',
                body: avatarIcon,
            }),
            invalidatesTags: ['User'],
        }),
        changeUserData: builder.mutation({
            query: (userData: { login: string, email: string }) => ({
                url: `/users/`,
                method: 'PATCH',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetUserQuery,
    useGetUserStatisticQuery,
    useDeleteUserMutation,
    useChangeAvatarMutation,
    useChangePasswordMutation,
    useChangeUserDataMutation
} = usersApi