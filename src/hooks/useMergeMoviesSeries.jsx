import { useEffect, useMemo, useState } from 'react'
import isEqual from 'lodash.isequal'

const useMergeMoviesSeries = (
    movies = [],
    isLoadingMovies,
    series = [],
    isLoadingSeries
) => {
    const [mergeData, setMergeData] = useState([])
    const sortedData = useMemo(() => {
        if (!isLoadingMovies && !isLoadingSeries) {
            const combinedData = [...movies, ...series]
            return combinedData.sort((a, b) =>
                a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            )
        }
        return []
    }, [isLoadingMovies, isLoadingSeries, movies, series])
    useEffect(() => {
        if (!isEqual(mergeData, sortedData)) {
            setMergeData(sortedData)
        }
    }, [sortedData, mergeData])
    return {
        mergeData,
    }
}

export default useMergeMoviesSeries
