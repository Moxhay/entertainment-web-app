import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { baseUrl } from './api.js'
import { transformResponse } from '../helpers.jsx'

export const bookmarkedApi = createApi({
    reducerPath: 'bookmarkedApi',
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
        getBookmarkedMovies: builder.query({
            query: () => {
                const userId = Cookies.get('id')
                const queryParams = `movies?filters[bookmarked][users_permissions_user][id][$eq]=${userId}&populate=cover_path&populate=bookmarked.movie.bookmarked`
                return {
                    url: queryParams,
                }
            },
            transformResponse: (response) => transformResponse(response),
            providesTags: ['BookmarkedMovies'],
        }),
        getBookmarkedSeries: builder.query({
            query: () => {
                const userId = Cookies.get('id')
                const queryParams = `Tv-series?filters[bookmarked][users_permissions_user][id][$eq]=${userId}&populate=cover_path&populate=bookmarked.movie.bookmarked`
                return {
                    url: queryParams,
                }
            },
            transformResponse: (response) => transformResponse(response),
            providesTags: ['BookmarkedSeries'],
        }),
    }),
})

export const { useGetBookmarkedMoviesQuery, useGetBookmarkedSeriesQuery } =
    bookmarkedApi
