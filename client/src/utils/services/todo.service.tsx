import { ITask } from "@/types/types";


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from "./http.service";


// export const todosApi = createApi({
//     reducerPath: 'todosApi',
//     tagTypes: ['Todos'],
//     baseQuery: fetchBaseQuery({

//         baseUrl: 'http://localhost:5000/api/todos', prepareHeaders: async (headers) => {
//             const token = localStorage.getItem(
//                 "ACCESS_TOKEN"
//             )
//             if (token) {
//                 headers.set('Authorization', `Bearer ${token}`)
//             }
//             // if (isExpired()) {
//             //     const res = await fetch('http://localhost:5000/api/auth/refresh', {
//             //         method: 'POST',
//             //         body: localStorage.getItem("REFRESH_TOKEN")
//             //     });
//             //     const result = await res.json();
//             //     headers.set('Authorization', `Bearer ${result}`)
//             // }
//             return headers
//         },
//     }),
//     endpoints: (builder) => ({
//         getTodos: builder.query({
//             query: (filter: { filter: string, currentPage: number, search: string }) => `?page=${filter.currentPage}&filter=${filter.filter}&search=${filter.search}`,
//             providesTags: ['Todos'],
//         }),
//         createTodo: builder.mutation({
//             query: (newTodo: { title: string, completed: boolean, date: string }) => ({
//                 url: `/`,
//                 method: 'POST',
//                 body: newTodo,
//             }),
//             invalidatesTags: ['Todos'],
//         }),
//         deleteTodo: builder.mutation({
//             query: (id: string) => ({
//                 url: `/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Todos'],
//         }),
//         updateTodo: builder.mutation({
//             query: (todo: ITask) => ({
//                 url: `/`,
//                 method: 'PUT',
//                 body: todo,
//             }),
//             invalidatesTags: ['Todos'],
//         }),
//     }),
// })

const apiWithTag = api.enhanceEndpoints({addTagTypes: ['Todos']})


export const todosApi = apiWithTag.injectEndpoints({
    // reducerPath: 'todosApi',
    // tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (filter: { filter: string, currentPage: number, search: string }) => `/todos?page=${filter.currentPage}&filter=${filter.filter}&search=${filter.search}`,
            providesTags: ['Todos'],
        }),
        createTodo: builder.mutation({
            query: (newTodo: { title: string, completed: boolean, date: string }) => ({
                url: `/todos`,
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: (id: string) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation({
            query: (todo: ITask) => ({
                url: `/todos`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: ['Todos'],
        }),
    }),
})

export const {
    useGetTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApi