import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ItemListContainer } from '@components/itemList/ItemListContainer.jsx';
import { ItemCard } from '@components/itemList/itemCard.jsx';

export const ItemList = React.memo(({ data, title, loadingBookmarked, handleBookmarked }) => {
    const [border, setBorder] = useState({});

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-Inter text-primaryWhite self-start text-2xl font-extralight">{title}</h1>
            <ItemListContainer>
                {data.map((item) => {
                    return (
                        <ItemCard
                            key={item.documentId + item.id}
                            {...item}
                            loadingBookmarked={loadingBookmarked}
                            handleBookmarked={handleBookmarked}
                            border={border}
                            setBorder={setBorder}
                        />
                    );
                })}
            </ItemListContainer>
        </div>
    );
});

ItemList.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
    loadingBookmarked: PropTypes.object.isRequired,
    handleBookmarked: PropTypes.func.isRequired
};
