import PropTypes from 'prop-types'

const Bookmark = ({ bg, border = 'none' }) => {
    return (
        <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill={border}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.3093 0C12.4715 0 12.6266 0.031725 12.7746 0.0951751C13.0073 0.186825 13.1923 0.331351 13.3298 0.528751C13.4673 0.726151 13.536 0.944701 13.536 1.1844V14.8156C13.536 15.0553 13.4673 15.2738 13.3298 15.4712C13.1923 15.6686 13.0073 15.8132 12.7746 15.9048C12.6407 15.9612 12.4856 15.9894 12.3093 15.9894C11.9709 15.9894 11.6783 15.8766 11.4316 15.651L6.76801 11.1672L2.10443 15.651C1.85063 15.8837 1.55805 16 1.2267 16C1.06455 16 0.909451 15.9683 0.761401 15.9048C0.528751 15.8132 0.343688 15.6686 0.206213 15.4712C0.0687376 15.2738 0 15.0553 0 14.8156V1.1844C0 0.944701 0.0687376 0.726151 0.206213 0.528751C0.343688 0.331351 0.528751 0.186825 0.761401 0.0951751C0.909451 0.031725 1.06455 0 1.2267 0H12.3093Z"
                fill={bg}
            />
        </svg>
    )
}

export default Bookmark
Bookmark.propTypes = {
    bg: PropTypes.string.isRequired,
    border: PropTypes.string,
}
