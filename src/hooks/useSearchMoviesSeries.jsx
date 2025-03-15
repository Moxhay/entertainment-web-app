import { useGetMovieQuery } from '../api/moviesApi.js';
import { useGetSearchSeriesQuery } from '../api/seriesApi.js';
import useMergeMoviesSeries from './useMergeMoviesSeries.jsx';

export function useSearchMoviesSeries(search) {
    const {
        data: movies,
        isLoading: isLoadingMovie,
        error: errorMovie,
        isFetching: isFetchingMovie
    } = useGetMovieQuery(search, {
        skip: search.length === 0
    });
    const {
        data: series,
        isLoading: isLoadingSeries,
        error: errorSeries,
        isFetching: isFetchingSeries
    } = useGetSearchSeriesQuery(search, {
        skip: search.length === 0
    });
    const { mergeData: searchMoviesSeries } = useMergeMoviesSeries(movies, isLoadingMovie, series, isLoadingSeries);

    return {
        searchMoviesSeries,
        isLoading: isLoadingMovie || isLoadingSeries,
        isFetching: isFetchingMovie || isFetchingSeries,
        error: errorMovie || errorSeries
    };
}
