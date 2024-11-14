import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1717/api/users/',
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
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
