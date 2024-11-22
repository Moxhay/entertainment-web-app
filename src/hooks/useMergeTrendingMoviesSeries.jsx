import { useGetTrendingMoviesQuery } from '../api/moviesApi.js'
import { useGetTrendingSeriesQuery } from '../api/seriesApi.js'
import { useEffect, useState } from 'react'

const useMergeMoviesSeries = () => {
    const [mergeData, setMergeData] = useState([])

    const {
        data: movies,
        isLoading: loadingMovies,
        error: moviesError,
    } = useGetTrendingMoviesQuery()

    const {
        data: series,
        isLoading: loadingSeries,
        error: seriesError,
    } = useGetTrendingSeriesQuery()

    useEffect(() => {
        if (!loadingMovies && !loadingSeries) {
            const combinedData = [...movies, ...series]

            const sortedData = combinedData.sort((a, b) => {
                const titleA = a.title.toLowerCase()
                const titleB = b.title.toLowerCase()

                if (titleA < titleB) return -1
                if (titleA > titleB) return 1
                return 0
            })

            setMergeData(sortedData)
        }
    }, [loadingMovies, loadingSeries, movies, series])

    return {
        mergeData,
        loading: loadingMovies || loadingSeries,
        error: moviesError || seriesError,
    }
}

export default useMergeMoviesSeries
