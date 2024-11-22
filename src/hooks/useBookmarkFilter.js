import useBookmark from './useBookmark.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
    bookmarkedApi,
    useGetBookmarkedMoviesQuery,
    useGetBookmarkedSeriesQuery,
} from '../api/bookmarkedApi.js'

const useBookmarkFilter = () => {
    const {
        data: movies,
        isLoading: isLoadingMovies,
        error: errorMovies,
        refetch: refetchMovies,
    } = useGetBookmarkedMoviesQuery()
    const {
        data: series,
        isLoading: isLoadingSeries,
        error: errorSeries,
        refetch: refetchSeries,
    } = useGetBookmarkedSeriesQuery()
    const { loadingBookmarked, handleBookmarked } = useBookmark()
    const dispatch = useDispatch()
    useEffect(() => {
        refetchMovies()
        refetchSeries()
    }, [])
    const handleBookmark = async ({ id, currentBookmarkedState, type }) => {
        const endpointName =
            type === 'Movie' ? 'getBookmarkedMovies' : 'getBookmarkedSeries'
        const data = type === 'Movie' ? movies : series
        const prevState = data

        const updatedData = data.filter((content) => content.id !== id)
        await dispatch(
            bookmarkedApi.util.updateQueryData(
                `${endpointName}`,
                undefined,
                () => {
                    return updatedData
                }
            )
        )
        await handleBookmarked({ id, currentBookmarkedState, type }).catch(
            () => {
                dispatch(
                    bookmarkedApi.util.updateQueryData(
                        `${endpointName}`,
                        undefined,
                        () => {
                            return prevState
                        }
                    )
                )
            }
        )
    }
    return {
        isLoading: { isLoadingMovies, isLoadingSeries },
        data: { movies, series },
        error: { errorMovies, errorSeries },
        loadingBookmarked,
        handleBookmark,
    }
}
export default useBookmarkFilter
