import SearchBar from '../components/SearchBar.jsx'
import ItemList from '@components/itemList/ItemList.jsx'
import ContentSection from '@components/ContentSection.jsx'
import { useGetMovieQuery, useGetMoviesQuery } from '../api/moviesApi.js'
import useBookmark from '../hooks/useBookmark.jsx'
import { useState } from 'react'

const Movies = () => {
    const [search, setSearch] = useState('')
    const {
        data,
        isLoading: isLoadingMovie,
        error: errorSearchingData,
        isFetching,
    } = useGetMovieQuery(search, {
        skip: search.length === 0,
    })
    const { data: movies, error, isLoading } = useGetMoviesQuery()
    const { loadingBookmarked, handleBookmarked } = useBookmark()
    if (isLoading || isFetching)
        return (
            <ContentSection>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    disable={isFetching || isLoading || isLoadingMovie}
                />
                <div></div>
            </ContentSection>
        )
    if (error || errorSearchingData)
        return (
            <ContentSection>
                <div>Error loading movies</div>
            </ContentSection>
        )
    const displayData = search && !isFetching ? data : movies
    const title =
        search && !isFetching
            ? `Found ${data.length} for ‘${search.trim()}’`
            : 'Movies'

    return (
        <ContentSection>
            <SearchBar search={search} setSearch={setSearch} />
            <ItemList
                search={search}
                data={displayData}
                title={title}
                loading={isLoading}
                loadingBookmarked={loadingBookmarked}
                handleBookmarked={handleBookmarked}
            />
        </ContentSection>
    )
}
export default Movies
