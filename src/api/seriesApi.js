import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { baseUrl } from './api.js'
import { transformResponse } from '../helpers.jsx'

export const seriesApi = createApi({
    reducerPath: 'seriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('jwt')

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getSeries: builder.query({
            query: () => {
                const userId = Cookies.get('id')
                return {
                    url: 'tv-series',
                    params: {
                        'populate[bookmarked][filters][users_permissions_user][id][$eq]':
                            userId,
                        populate: 'cover_path',
                    },
                }
            },
            transformResponse: (response) => transformResponse(response),
            providesTags: ['Series'],
        }),
        getTrendingSeries: builder.query({
            query: () => {
                const userId = Cookies.get('id')
                return {
                    url: 'movies',
                    params: {
                        'filters[trending][$eq]': true,
                        'populate[bookmarked][filters][users_permissions_user][id][$eq]':
                            userId,
                        populate: 'cover_path',
                    },
                }
            },
            transformResponse: (response) => transformResponse(response),
        }),
    }),
})

export const { useGetSeriesQuery, useGetTrendingSeriesQuery } = seriesApi
