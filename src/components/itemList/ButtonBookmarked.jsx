import BookmarkedButton from '../../assets/icons/BookmarkedButton.jsx'

const ButtonBookmarked = ({
    id,
    bookmarked,
    loadingBookmarked,
    handleBookmarked,
    border,
    setBorder,
    type,
}) => (
    <div
        className={`absolute right-2 top-2 z-40 flex h-8 w-8 items-center justify-center rounded-full ${bookmarked ? 'bg-black' : 'bg-black hover:bg-white'} opacity-80 ${
            loadingBookmarked[id] & 'cursor-not-allowed'
        }`}
        onMouseEnter={() => setBorder({ [id]: true })}
        onMouseLeave={() => setBorder({ [id]: false })}
    >
        <button
            disabled={loadingBookmarked[id]}
            onClick={() =>
                handleBookmarked({
                    id,
                    currentBookmarkedState: bookmarked,
                    type: type,
                })
            }
        >
            <BookmarkedButton
                bg={bookmarked ? (border[id] ? '#FC4747' : 'white') : 'none'}
                border={bookmarked ? 'none' : border[id] ? 'black' : 'white'}
            />
        </button>
    </div>
)

export default ButtonBookmarked
