import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1717/api/articles/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addArticle: builder.mutation({
      query: (credentials) => ({
        url: 'add-article',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useAddArticleMutation } = articleApi;
