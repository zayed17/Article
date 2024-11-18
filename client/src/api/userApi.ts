import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1717/api/users/',
    // baseUrl: import.meta.env.NEXT_PUBLIC_API_URL || 'https://server-inky-mu.vercel.app/api/users',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
    getUser: builder.query({
      query: () => 'get-user',
    }),
   editUser: builder.mutation({
      query: (userData) => ({
        url: 'edit-user',
        method: 'PATCH',
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (userData) => ({
        url: 'change-password',
        method: 'PATCH',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation ,useGetUserQuery,useEditUserMutation,useChangePasswordMutation} = userApi;
