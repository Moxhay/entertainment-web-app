import { useGetSearchBookmarkedMoviesQuery } from '@/api/moviesApi.js';
import { useGetSearchBookmarkedSeriesQuery } from '@/api/seriesApi.js';
import useMergeMoviesSeries from '@hooks/useMergeMoviesSeries.jsx';

export function useBookmarkedSearchData(query) {
    const { data: movies, isLoading: isLoadingMovies, error: isErrorMovies } = useGetSearchBookmarkedMoviesQuery(query);
    const { data: series, isLoading: isLoadingSeries, error: isErrorSeries } = useGetSearchBookmarkedSeriesQuery(query);
    const { mergeData } = useMergeMoviesSeries(movies, isLoadingMovies, series, isLoadingSeries);

    return {
        mergeData,
        isLoading: isLoadingMovies || isLoadingSeries,
        error: isErrorMovies || isErrorSeries
    };
}
