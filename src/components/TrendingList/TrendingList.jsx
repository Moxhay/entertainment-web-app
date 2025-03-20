import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useGallery } from '@hooks/useGallery.jsx';
import { TrendingListContainer } from '@components/TrendingList/TrendingListContainer.jsx';
import { TrendingListGallery } from '@components/TrendingList/TrendingListGallery.jsx';
import { TrendingCard } from '@components/TrendingList/TrendingCard.jsx';

export const TrendingList = React.memo(({ data, loadingBookmarked, handleBookmarked }) => {
    const [border, setBorder] = useState({});
    const { sliderRef, slidesRef, sliderWidth, slidesWidth, totalSlidesMarginRight } = useGallery(data);
    return (
        <TrendingListContainer Ref={sliderRef}>
            <h1 className="text-xl font-light md:text-3xl">Trending</h1>
            <TrendingListGallery
                slidesRef={slidesRef}
                slidesWidth={slidesWidth}
                sliderWidth={sliderWidth}
                totalSlidesMarginRight={totalSlidesMarginRight}
            >
                {data.map((item) => {
                    return (
                        <TrendingCard
                            key={item.documentId + item.id}
                            {...item}
                            loadingBookmarked={loadingBookmarked}
                            handleBookmarked={handleBookmarked}
                            border={border}
                            setBorder={setBorder}
                        />
                    );
                })}
            </TrendingListGallery>
        </TrendingListContainer>
    );
});

TrendingList.propTypes = {
    data: PropTypes.array.isRequired,
    loadingBookmarked: PropTypes.object.isRequired,
    handleBookmarked: PropTypes.func.isRequired
};
