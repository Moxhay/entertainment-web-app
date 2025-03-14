import useBookmark from './useBookmark.jsx';
import { useDispatch } from 'react-redux';
import { moviesApi, useGetBookmarkedMoviesQuery } from '@/api/moviesApi.js';
import { seriesApi, useGetBookmarkedSeriesQuery } from '@/api/seriesApi.js';

export function useBookmarkFilter() {
    const { data: movies, isLoading: isLoadingMovies, error: errorMovies, refetch: refetchMovies } = useGetBookmarkedMoviesQuery();
    const { data: series, isLoading: isLoadingSeries, error: errorSeries, refetch: refetchSeries } = useGetBookmarkedSeriesQuery();
    const { loadingBookmarked, handleBookmarked } = useBookmark();
    const dispatch = useDispatch();

    const handleBookmark = async ({ id, currentBookmarkedState, type }) => {
        const endpointName = type === 'Movie' ? 'getBookmarkedMovies' : 'getBookmarkedSeries';
        const data = type === 'Movie' ? movies : series;
        const prevState = data;

        const updatedData = data.filter((content) => content.id !== id);
        console.log(type);
        if (type === 'Movie') {
            console.log(updatedData);
            await dispatch(
                moviesApi.util.updateQueryData(`${endpointName}`, undefined, () => {
                    return updatedData;
                })
            );
        } else {
            await dispatch(
                seriesApi.util.updateQueryData(`${endpointName}`, undefined, () => {
                    return updatedData;
                })
            );
        }

        await handleBookmarked({ id, currentBookmarkedState, type }).catch(() => {
            if (type === 'movies') {
                dispatch(
                    moviesApi.util.updateQueryData(`${endpointName}`, undefined, () => {
                        return prevState;
                    })
                );
            } else {
                dispatch(
                    seriesApi.util.updateQueryData(`${endpointName}`, undefined, () => {
                        return prevState;
                    })
                );
            }
        });
    };

    return {
        isLoading: isLoadingMovies || isLoadingSeries,
        data: { movies, series },
        error: errorMovies || errorSeries,
        loadingBookmarked,
        handleBookmark
    };
}
