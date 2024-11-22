import ContentSection from '../components/ContentSection.jsx'
import ItemList from '@components/itemList/ItemList.jsx'
import { useGetSeriesQuery } from '../api/seriesApi.js'
import SearchBar from '../components/SearchBar.jsx'
import useBookmark from '../hooks/useBookmark.jsx'

const TvSeries = () => {
    const { data: series, error, isLoading } = useGetSeriesQuery()
    const { loadingBookmarked, handleBookmarked } = useBookmark()

    if (isLoading)
        return (
            <ContentSection>
                <div>Loading...</div>
            </ContentSection>
        )
    if (error)
        return (
            <ContentSection>
                <div>Error loading movies</div>
            </ContentSection>
        )
    return (
        <ContentSection>
            <SearchBar />
            <ItemList
                data={series}
                title="TV series"
                loading={isLoading}
                loadingBookmarked={loadingBookmarked}
                handleBookmarked={handleBookmarked}
            />
        </ContentSection>
    )
}
export default TvSeries
