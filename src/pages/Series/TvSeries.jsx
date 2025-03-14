import ContentSection from '@components/ContentSection.jsx';
import { ItemList } from '@components/itemList/ItemList.jsx';
import { useGetSeriesQuery } from '../../api/seriesApi.js';
import useBookmark from '@hooks/useBookmark.jsx';
import { useState } from 'react';
import { SearchBar } from '@components/SearchBar.jsx';
import { TransitionEnterExit } from '@components/Transitions/TransitionEnterExitVariants/TransitionEnterExit.jsx';
import { contentStatus } from '@/helpers.jsx';

const TvSeries = () => {
    const [search, setSearch] = useState('');
    const { data: series, error, isLoading } = useGetSeriesQuery();
    const { loadingBookmarked, handleBookmarked } = useBookmark();

    const status = contentStatus({
        isLoading,
        error: error
    });
    if (status) return status;
    return (
        <ContentSection>
            <SearchBar search={search} setSearch={setSearch} />
            <TransitionEnterExit>
                <ItemList
                    data={series}
                    title="TV series"
                    loading={isLoading}
                    loadingBookmarked={loadingBookmarked}
                    handleBookmarked={handleBookmarked}
                />
            </TransitionEnterExit>
        </ContentSection>
    );
};
export default TvSeries;
