import { SearchBar } from '@components/SearchBar.jsx';
import { ItemList } from '@components/itemList/ItemList.jsx';
import ContentSection from '@components/ContentSection.jsx';
import { useGetMoviesQuery } from '@/api/moviesApi.js';
import useBookmark from '@hooks/useBookmark.jsx';
import { useState } from 'react';
import { contentStatus } from '../../helpers.jsx';
import { TransitionEnterExit } from '@components/Transitions/TransitionEnterExitVariants/TransitionEnterExit.jsx';

const Movies = () => {
    const [search, setSearch] = useState('');
    const { data: movies, error, isLoading } = useGetMoviesQuery();
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
                    search={search}
                    data={movies}
                    title={'Movies'}
                    loading={isLoading}
                    loadingBookmarked={loadingBookmarked}
                    handleBookmarked={handleBookmarked}
                />
            </TransitionEnterExit>
        </ContentSection>
    );
};
export default Movies;
