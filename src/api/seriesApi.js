import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { baseUrl } from './api.js';
import { transformResponse, transformResponseForSingleSeries, transformResponseForSingleSeriesSeasons } from '../helpers.jsx';

export const seriesApi = createApi({
    reducerPath: 'seriesApi',
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
        getSeries: builder.query({
            query: () => {
                const userId = Cookies.get('id');
                return {
                    url: 'tv-series',
                    params: {
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        populate: 'cover_path'
                    }
                };
            },
            transformResponse: (response) => transformResponse(response),
            providesTags: ['Series']
        }),
        getTrendingSeries: builder.query({
            query: () => {
                const userId = Cookies.get('id');
                return {
                    url: 'tv-series',
                    params: {
                        'filters[trending][$eq]': true,
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        populate: 'cover_path'
                    }
                };
            },
            transformResponse: (response) => transformResponse(response)
        }),
        getSearchSeries: builder.query({
            query: (searchSeries) => {
                const userId = Cookies.get('id');
                return {
                    url: 'tv-series',
                    params: {
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        populate: 'cover_path',
                        'filters[title][$containsi]': searchSeries
                    }
                };
            },

            transformResponse: (response) => transformResponse(response)
        }),
        getBookmarkedSeries: builder.query({
            query: () => {
                const userId = Cookies.get('id');
                const queryParams = `Tv-series?filters[bookmarkeds][users_permissions_user][id][$eq]=${userId}&populate=cover_path&populate=bookmarkeds.series.bookmarkeds`;
                return {
                    url: queryParams
                };
            },
            transformResponse: (response) => transformResponse(response),
            providesTags: ['getBookmarkedSeries']
        }),
        getSearchBookmarkedSeries: builder.query({
            query: (searchSeries) => {
                const userId = Cookies.get('id');
                return {
                    url: 'tv-series',
                    params: {
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        'filters[bookmarked][$notNull]': true,
                        populate: 'cover_path',
                        'filters[title][$containsi]': searchSeries
                    }
                };
            },
            transformResponse: (response) => transformResponse(response),
            providesTags: ['getBookmarkedSeries']
        }),
        getSingleSeries: builder.query({
            query: (documentId) => {
                const userId = Cookies.get('id');
                return {
                    url: 'tv-series',
                    params: {
                        'filters[documentId][$eq]': documentId,
                        'populate[bookmarkeds][filters][users_permissions_user][id][$eq]': userId,
                        populate: 'cover_path'
                    }
                };
            },
            transformResponse: (response) => transformResponseForSingleSeries(response)
        }),
        getSingleSeriesSeason: builder.query({
            query: (documentId) => {
                return {
                    url: 'tv-seasons',
                    params: {
                        'filters[tv_serie][documentId][$eq]': documentId,
                        populate: 'tv_episodes.Tv_episode_path',
                        sort: 'SeasonTitle:asc'
                    }
                };
            },
            transformResponse: (response) => transformResponseForSingleSeriesSeasons(response)
        })
    })
});

export const {
    useGetSeriesQuery,
    useGetTrendingSeriesQuery,
    useGetSearchSeriesQuery,
    useGetBookmarkedSeriesQuery,
    useGetSearchBookmarkedSeriesQuery,
    useGetSingleSeriesQuery,
    useGetSingleSeriesSeasonQuery
} = seriesApi;
