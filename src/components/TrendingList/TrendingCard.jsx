import ItemDetails from '@components/itemList/itemDetails.jsx';
import { ButtonBookmarked } from '@components/itemList/ButtonBookmarked.jsx';
import { PlayOverlay } from '@components/itemList/PlayOverlay.jsx';
import PropTypes from 'prop-types';

export function TrendingCard({
    id,
    documentId,
    title,
    poster,
    release_date,
    rated,
    type,
    bookmarked,
    setBorder,
    border,
    handleBookmarked,
    loadingBookmarked
}) {
    return (
        <div className="relative flex h-[140px] w-[240px] md:h-[230px] md:w-[470px]" key={id + documentId}>
            <img className="absolute h-full w-full rounded-xl opacity-80" src={poster} alt={title} loading={'lazy'} />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <ItemDetails
                    release_date={release_date}
                    type={type}
                    rated={rated}
                    title={title}
                    titleFontSize={'text-sm md:text-2xl font-medium'}
                    contentFontSize={'text-xs md:text-sm'}
                />
            </div>
            <ButtonBookmarked
                type={type}
                bookmarked={bookmarked}
                setBorder={setBorder}
                border={border}
                handleBookmarked={handleBookmarked}
                loadingBookmarked={loadingBookmarked}
                id={id}
                documentID={documentId}
            />
            <PlayOverlay documentId={documentId} title={title} type={type} />
        </div>
    );
}

TrendingCard.propTypes = {
    id: PropTypes.number.isRequired,
    documentId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    rated: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    setBorder: PropTypes.func.isRequired,
    border: PropTypes.object.isRequired,
    loadingBookmarked: PropTypes.object.isRequired,
    handleBookmarked: PropTypes.func.isRequired
};
