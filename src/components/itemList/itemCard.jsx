import { ButtonBookmarked } from '@components/itemList/ButtonBookmarked.jsx';
import ItemDetails from '@components/itemList/itemDetails.jsx';
import { PlayOverlay } from '@components/itemList/PlayOverlay.jsx';
import PropTypes from 'prop-types';

export function ItemCard({
    id,
    poster,
    release_date,
    type,
    rated,
    title,
    documentId,
    bookmarked,
    loadingBookmarked,
    handleBookmarked,
    border,
    setBorder
}) {
    return (
        <div key={id + documentId} className="relative flex h-full flex-col overflow-hidden xs:h-[154px] sm:h-[192px] lg:h-[226px]">
            <div className="relative flex aspect-square h-full overflow-hidden xs:h-[110px] sm:h-[140px] lg:h-[174px]">
                <img className="absolute h-full w-full rounded-xl opacity-80" loading={'lazy'} src={poster} alt={title} />
                <ButtonBookmarked
                    id={id}
                    bookmarked={bookmarked}
                    loadingBookmarked={loadingBookmarked}
                    handleBookmarked={handleBookmarked}
                    border={border}
                    setBorder={setBorder}
                    type={type}
                    documentID={documentId}
                />
                <PlayOverlay documentId={documentId} title={title} type={type} />
            </div>
            <ItemDetails release_date={release_date} type={type} rated={rated} title={title} />
        </div>
    );
}

ItemCard.propTypes = {
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
