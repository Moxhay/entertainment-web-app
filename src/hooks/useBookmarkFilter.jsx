import useBookmark from './useBookmark.jsx';
import { useDispatch } from 'react-redux';
import { moviesApi, useGetBookmarkedMoviesQuery } from '@/api/moviesApi.js';
import { seriesApi, useGetBookmarkedSeriesQuery } from '@/api/seriesApi.js';
import { useCallback } from 'react';

export function useBookmarkFilter() {
    const { data: movies, isLoading: isLoadingMovies, error: errorMovies } = useGetBookmarkedMoviesQuery();
    const { data: series, isLoading: isLoadingSeries, error: errorSeries } = useGetBookmarkedSeriesQuery();
    const { loadingBookmarked, handleBookmarked } = useBookmark();
    const dispatch = useDispatch();

    const handleBookmark = useCallback(
        async ({ id, currentBookmarkedState, type }) => {
            const endpointName = type === 'Movie' ? 'getBookmarkedMovies' : 'getBookmarkedSeries';
            const data = type === 'Movie' ? movies : series;
            const prevState = data;
            const updatedData = data.filter((content) => content.id !== id);

            if (type === 'Movie') {
                await dispatch(moviesApi.util.updateQueryData(endpointName, undefined, () => updatedData));
            } else {
                await dispatch(seriesApi.util.updateQueryData(endpointName, undefined, () => updatedData));
            }

            await handleBookmarked({ id, currentBookmarkedState, type }).catch(() => {
                if (type === 'Movie') {
                    dispatch(moviesApi.util.updateQueryData(endpointName, undefined, () => prevState));
                } else {
                    dispatch(seriesApi.util.updateQueryData(endpointName, undefined, () => prevState));
                }
            });
        },
        [dispatch, handleBookmarked, movies, series]
    );

    return {
        isLoading: isLoadingMovies || isLoadingSeries,
        data: { movies, series },
        error: errorMovies || errorSeries,
        loadingBookmarked,
        handleBookmark
    };
}
