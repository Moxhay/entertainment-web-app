import ButtonBookmarked from '@components/itemList/ButtonBookmarked.jsx'
import ItemDetails from '@components/itemList/itemDetails.jsx'
import PlayOverlay from '@components/itemList/PlayOverlay.jsx'

const ItemCard = ({
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
    setBorder,
}) => (
    <div
        key={id + documentId}
        className="relative flex h-full flex-grow flex-col overflow-hidden xs:h-[154px] sm:h-[192px] lg:h-[226px]"
    >
        <div className="relative flex h-full flex-grow">
            <img
                className="aspect-square w-full rounded-xl xs:absolute xs:h-[110px] sm:h-[140px] lg:h-[174px]"
                src={poster}
                alt={title}
            />
            <ButtonBookmarked
                id={id}
                bookmarked={bookmarked}
                loadingBookmarked={loadingBookmarked}
                handleBookmarked={handleBookmarked}
                border={border}
                setBorder={setBorder}
                type={type}
            />
            <PlayOverlay title={title} type={type} />
        </div>
        <ItemDetails
            release_date={release_date}
            type={type}
            rated={rated}
            title={title}
        />
    </div>
)

export default ItemCard
