import { useSearchQuery } from '@hooks/useSearchQuery.jsx';
import useBookmark from '@hooks/useBookmark.jsx';
import { useAnimationState } from '@hooks/useAnimationState.jsx';
import { contentStatus } from '@/helpers.jsx';
import ContentSection from '@components/ContentSection.jsx';
import { SearchBar } from '@components/SearchBar.jsx';
import { TransitionEnterExitWithAnimationState } from '@components/Transitions/TransitionEnterExitVariants/TransitionEnterExitWithAnimationState.jsx';
import { ItemList } from '@components/itemList/ItemList.jsx';
import { useBookmarkedSearchData } from '@hooks/useBookmarkedSearchData.jsx';

export function BookmarkedSearchView() {
    const { search, setSearch, query } = useSearchQuery();
    const { loadingBookmarked, handleBookmarked } = useBookmark();
    const { mergeData, isLoading, error } = useBookmarkedSearchData(query);
    const { setIsAnimationComplete, isAnimationComplete, title, olData } = useAnimationState(mergeData, query);

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
                    data={isAnimationComplete ? mergeData : olData}
                    title={
                        isAnimationComplete
                            ? `Found ${mergeData.length} for ‘${search.trim()}’`
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
