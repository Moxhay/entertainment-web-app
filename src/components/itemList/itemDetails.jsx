import DotIcon from '../../assets/icons/DotIcon.jsx'
import MovieIcon from '../../assets/icons/MovieIcon.jsx'
import TvIcon from '../../assets/icons/TvIcon.jsx'
import PropTypes from 'prop-types'

const ItemDetails = ({
    release_date,
    type,
    rated,
    title,
    titleFontSize = 'text-sm font-medium md:text-lg',
    contentFontSize = 'text-xs',
}) => (
    <>
        <div
            className={`font flex items-center gap-2 py-1 font-Inter ${contentFontSize} font-light text-primaryWhite text-opacity-75`}
        >
            <p>{release_date}</p>
            <DotIcon />
            <span className="flex items-center gap-1.5">
                {type === 'Movie' ? (
                    <MovieIcon bg="white" style="h-[10px] w-[10px]" />
                ) : (
                    <TvIcon bg="white" style="h-3 w-3" />
                )}
                {type}
            </span>
            <DotIcon />
            <p>{rated}</p>
        </div>
        <p className={`${titleFontSize} w-fit font-Inter text-primaryWhite`}>
            {title}
        </p>
    </>
)

export default ItemDetails
ItemDetails.propTypes = {
    release_date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rated: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleFontSize: PropTypes.string,
    contentFontSize: PropTypes.string,
}
