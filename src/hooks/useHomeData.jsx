import { useGetMoviesQuery, useGetTrendingMoviesQuery } from '@/api/moviesApi.js';
import { useGetSeriesQuery, useGetTrendingSeriesQuery } from '@/api/seriesApi.js';
import useMergeMoviesSeries from '@hooks/useMergeMoviesSeries.jsx';

export function useHomeData() {
    const { data: movies = [], isLoading: isLoadingMovies, error: moviesError } = useGetMoviesQuery();
    const { data: series = [], isLoading: isLoadingSeries, error: seriesError } = useGetSeriesQuery();
    const { data: trendingMovies, isLoading: isLoadingTrendingMovies, error: trendingMoviesError } = useGetTrendingMoviesQuery();
    const { data: trendingSeries, isLoading: isLoadingTrendingSeries, error: trendingSeriesError } = useGetTrendingSeriesQuery();

    const { mergeData: trendingList } = useMergeMoviesSeries(trendingMovies, isLoadingMovies, trendingSeries, isLoadingSeries);
    const { mergeData } = useMergeMoviesSeries(movies, isLoadingTrendingMovies, series, isLoadingTrendingSeries);
    return {
        isLoading: isLoadingMovies || isLoadingSeries || isLoadingTrendingMovies || isLoadingTrendingSeries,
        error: moviesError || seriesError || trendingSeriesError || trendingMoviesError,
        trendingList,
        moviesSeries: mergeData
    };
}
