import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import { articleApi } from '../api/articleApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(articleApi.middleware),
});

export default store;
