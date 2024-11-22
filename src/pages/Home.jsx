import SearchBar from '../components/SearchBar.jsx'
import ContentSection from '../components/ContentSection.jsx'
import useBookmark from '../hooks/useBookmark.jsx'
import useMergeMoviesSeries from '../hooks/useMergeMoviesSeries.jsx'
import ItemList from '@components/itemList/ItemList.jsx'
import { contentStatus } from '../helpers.jsx'
import { useGetTrendingMoviesQuery } from '../api/moviesApi.js'
import { TrendingList } from '@components/itemList/TrendingList.jsx'
import { useState } from 'react'

const Home = () => {
    const [border, setBorder] = useState({})
    const { mergeData, loading, error } = useMergeMoviesSeries()
    const {
        data,
        isLoading,
        error: trendingError,
    } = useGetTrendingMoviesQuery()
    const { loadingBookmarked, handleBookmarked } = useBookmark()
    const status = contentStatus({
        data: mergeData,
        loading: loading,
        trendingLoading: isLoading,
        error: error,
        trendingError: trendingError,
        messageWhenEmpty: '',
    })
    if (status) return status

    return (
        <ContentSection>
            <SearchBar setData={''} />
            <TrendingList
                data={data}
                loadingBookmarked={loadingBookmarked}
                handleBookmarked={handleBookmarked}
            />
            <ItemList
                data={mergeData}
                title="Recommended for you"
                handleBookmarked={handleBookmarked}
                loadingBookmarked={loadingBookmarked}
                border={border}
                setBorder={setBorder}
            />
        </ContentSection>
    )
}
export default Home
