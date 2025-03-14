import BookmarkedButton from '../../assets/icons/BookmarkedButton.jsx';
import PropTypes from 'prop-types';

export function ButtonBookmarked({ id, bookmarked, loadingBookmarked, handleBookmarked, border, setBorder, type, documentID }) {
    return (
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
                        documentID
                    })
                }
            >
                <BookmarkedButton
                    bg={bookmarked ? (border[id] ? '#FC4747' : 'white') : 'none'}
                    border={bookmarked ? 'none' : border[id] ? 'black' : 'white'}
                />
            </button>
        </div>
    );
}

ButtonBookmarked.propTypes = {
    id: PropTypes.number.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    handleBookmarked: PropTypes.func.isRequired,
    setBorder: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    documentID: PropTypes.string.isRequired,
    loadingBookmarked: PropTypes.object.isRequired,
    border: PropTypes.object.isRequired
};
