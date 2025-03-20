import ContentSection from '@components/ContentSection.jsx';
import { useSearchMoviesSeries } from '@hooks/useSearchMoviesSeries.jsx';
import { ItemList } from '@components/itemList/ItemList.jsx';
import useBookmark from '@hooks/useBookmark.jsx';
import { contentStatus } from '@/helpers.jsx';
import { SearchBar } from '@components/SearchBar.jsx';
import { useAnimationState } from '@hooks/useAnimationState.jsx';
import { TransitionEnterExitWithAnimationState } from '@components/Transitions/TransitionEnterExitVariants/TransitionEnterExitWithAnimationState.jsx';
import { useSearchQuery } from '@hooks/useSearchQuery.jsx';

export function HomeSearchView() {
    const { search, setSearch, query } = useSearchQuery();
    const { loadingBookmarked, handleBookmarked } = useBookmark();
    const { isLoading, error, searchMoviesSeries } = useSearchMoviesSeries(search);
    const { setIsAnimationComplete, isAnimationComplete, title, olData } = useAnimationState(searchMoviesSeries, query, loadingBookmarked);

    const status = contentStatus({
        isLoading,
        error
    });
    if (status) return status;
    return (
        <ContentSection>
            <SearchBar search={search} setSearch={setSearch} />
            <TransitionEnterExitWithAnimationState setAnimationState={setIsAnimationComplete} animationState={isAnimationComplete}>
                <ItemList
                    search={search}
                    data={isAnimationComplete ? searchMoviesSeries : olData}
                    title={
                        isAnimationComplete
                            ? `Found ${searchMoviesSeries.length} for ‘${search.trim()}’`
                            : `Found ${olData.length} for ‘${title.trim()}’`
                    }
                    loading={isLoading}
                    loadingBookmarked={loadingBookmarked}
                    handleBookmarked={handleBookmarked}
                    animationState={isAnimationComplete}
                    setAnimationState={setIsAnimationComplete}
                />
            </TransitionEnterExitWithAnimationState>
        </ContentSection>
    );
}
