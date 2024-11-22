import ContentSection from '../components/ContentSection.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ItemList from '@components/itemList/ItemList.jsx'
import useBookmarkFilter from '../hooks/useBookmarkFilter.js'
import { bookmarkedStatus } from '../helpers.jsx'

const Bookmarked = () => {
    const { data, isLoading, error, loadingBookmarked, handleBookmark } =
        useBookmarkFilter()

    const contentStatus = bookmarkedStatus({
        loadingMovies: isLoading.isLoadingMovies,
        loadingSeries: isLoading.isLoadingSeries,
        moviesError: error.errorMovies,
        seriesError: error.errorSeries,
        seriesData: data.series,
        moviesData: data.movies,
        messageWhenEmpty:
            'Your favorites list is empty. Explore and start bookmarking your favorite movies and series!',
    })

    if (contentStatus) return contentStatus

    return (
        <ContentSection>
            <SearchBar />
            <ItemList
                data={data.movies}
                title="Movies"
                loadingBookmarked={loadingBookmarked}
                handleBookmarked={handleBookmark}
            />
            <ItemList
                data={data.series}
                title="Series"
                loadingBookmarked={loadingBookmarked}
                handleBookmarked={handleBookmark}
            />
        </ContentSection>
    )
}
export default Bookmarked
