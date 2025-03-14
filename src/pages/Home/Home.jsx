import ContentSection from '@components/ContentSection.jsx';
import useBookmark from '@hooks/useBookmark.jsx';
import { ItemList } from '@components/itemList/ItemList.jsx';
import { contentStatus } from '@/helpers.jsx';
import { TrendingList } from '@components/TrendingList/TrendingList.jsx';
import { useState } from 'react';
import { useHomeData } from '@hooks/useHomeData.jsx';
import { SearchBar } from '@components/SearchBar.jsx';
import { TransitionEnterExit } from '@components/Transitions/TransitionEnterExitVariants/TransitionEnterExit.jsx';

export function Home() {
    const [search, setSearch] = useState('');
    const { isLoading, error, trendingList, moviesSeries } = useHomeData();
    const { loadingBookmarked, handleBookmarked } = useBookmark();

    const status = contentStatus({
        isLoading: isLoading,
        error: error
    });
    if (status) return status;

    return (
        <ContentSection>
            <SearchBar search={search} setSearch={setSearch} />
            <TransitionEnterExit>
                <TrendingList data={trendingList} loadingBookmarked={loadingBookmarked} handleBookmarked={handleBookmarked} />
                <ItemList
                    search={search}
                    data={moviesSeries}
                    title={'Recommended for you'}
                    loadingBookmarked={loadingBookmarked}
                    handleBookmarked={handleBookmarked}
                />
            </TransitionEnterExit>
        </ContentSection>
    );
}
