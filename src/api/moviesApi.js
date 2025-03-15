import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { baseUrl } from './api.js';
import { transformResponse, transformResponseForSingleMovie } from '../helpers.jsx';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('jwt');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => {
                const userId = Cookies.get('id');
                return {
                    url: 'movies',
                    params: {
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        populate: 'cover_path'
                    }
                };
            },
            transformResponse: (response) => transformResponse(response)
        }),
        getTrendingMovies: builder.query({
            query: () => {
                const userId = Cookies.get('id');
                return {
                    url: 'movies',
                    params: {
                        'filters[trending][$eq]': true,
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        populate: 'cover_path'
                    }
                };
            },
            transformResponse: (response) => transformResponse(response)
        }),
        getMovie: builder.query({
            query: (searchMovie) => {
                const userId = Cookies.get('id');
                return {
                    url: 'movies',
                    params: {
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        populate: 'cover_path',
                        'filters[title][$containsi]': searchMovie
                    }
                };
            },
            transformResponse: (response) => transformResponse(response)
        }),
        getBookmarkedMovies: builder.query({
            query: () => {
                const userId = Cookies.get('id');
                return {
                    url: `movies?filters[bookmarkeds][users_permissions_user][id][$eq]=${userId}&populate=cover_path&populate=bookmarkeds.movie.bookmarkeds`
                };
            },
            transformResponse: (response) => transformResponse(response),
            providesTags: ['getBookmarkedMovies']
        }),
        getSearchBookmarkedMovies: builder.query({
            query: (searchMovie) => {
                const userId = Cookies.get('id');
                return {
                    url: 'movies',
                    params: {
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        'filters[bookmarkeds][$notNull]': true,
                        populate: 'cover_path',
                        'filters[title][$containsi]': searchMovie
                    }
                };
            },
            transformResponse: (response) => transformResponse(response)
        }),
        getSingleMovie: builder.query({
            query: (searchMovie) => {
                const userId = Cookies.get('id');
                return {
                    url: 'movies',
                    params: {
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        'populate[cover_path]': true,
                        'populate[movie_path]': true,
                        'filters[title][$containsi]': searchMovie
                    }
                };
            },
            transformResponse: (response) => transformResponseForSingleMovie(response)
        })
    })
});

export const {
    useGetMoviesQuery,
    useGetTrendingMoviesQuery,
    useGetMovieQuery,
    useGetBookmarkedMoviesQuery,
    useGetSearchBookmarkedMoviesQuery,
    useGetSingleMovieQuery
} = moviesApi;
