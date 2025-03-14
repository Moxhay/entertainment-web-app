import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from '../api/moviesApi.js';
import { seriesApi } from '../api/seriesApi.js';

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        [seriesApi.reducerPath]: seriesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware, seriesApi.middleware)
});
