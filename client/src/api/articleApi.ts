import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1717/api/articles/',
    // baseUrl:'https://server-inky-mu.vercel.app/api/articles',
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

    getArticles: builder.query({
        query: () => 'get-articles',
      }),

    likeArticle: builder.mutation({
        query: (articleId) => ({
          url: `like/${articleId}`, 
          method: 'PATCH', 
        }),
      }),  

    unlikeArticle: builder.mutation({
        query: (articleId) => ({
          url: `unlike/${articleId}`,
          method: 'PATCH', 
        }),
      }),
    getUserStats: builder.query({
        query: () => 'user-stats',
      }),   
    deleteArticle: builder.mutation({
        query: (articleId) => ({
          url: `delete/${articleId}`,
          method: 'DELETE',
        }),
      }),
    getArticle: builder.query({
        query: (id) => `get-article/${id}`, 
      }),
    getUsersArticle: builder.query({
        query: () => 'user-articles',
      }),
    updateArticle: builder.mutation({
        query: (credentials) => ({
          url: 'update-article',
          method: 'PUT', 
          body: credentials,
        }),
      }),
      
  }),
});

export const { useAddArticleMutation, useGetArticlesQuery,useLikeArticleMutation,useUnlikeArticleMutation,useGetUserStatsQuery,useDeleteArticleMutation ,useGetArticleQuery,useGetUsersArticleQuery,useUpdateArticleMutation} = articleApi;
