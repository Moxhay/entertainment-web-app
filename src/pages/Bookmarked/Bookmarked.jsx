import ContentSection from '@components/ContentSection.jsx';
import { ItemList } from '@components/itemList/ItemList.jsx';
import { useBookmarkFilter } from '@hooks/useBookmarkFilter.jsx';
import { contentStatus } from '../../helpers.jsx';
import { useState } from 'react';
import { SearchBar } from '@components/SearchBar.jsx';
import { TransitionEnterExit } from '@components/Transitions/TransitionEnterExitVariants/TransitionEnterExit.jsx';

export function Bookmarked() {
    const [search, setSearch] = useState('');
    const { data, isLoading, error, loadingBookmarked, handleBookmark } = useBookmarkFilter();

    const status = contentStatus({
        isLoading,
        error: error
    });
    if (status) return status;
    if (data.movies.length === 0 && data.series.length === 0)
        return (
            <ContentSection>
                <div className="h-fit w-fit text-white">No bookmarked movies or series yet. Start adding some to watch later!</div>
            </ContentSection>
        );

    return (
        <ContentSection>
            <SearchBar search={search} setSearch={setSearch} />
            <TransitionEnterExit>
                {data.movies.length !== 0 && (
                    <ItemList data={data.movies} title="Movies" loadingBookmarked={loadingBookmarked} handleBookmarked={handleBookmark} />
                )}
                {data.series.length !== 0 && (
                    <ItemList data={data.series} title="Series" loadingBookmarked={loadingBookmarked} handleBookmarked={handleBookmark} />
                )}
            </TransitionEnterExit>
        </ContentSection>
    );
}
