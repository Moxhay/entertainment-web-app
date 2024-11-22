import PropTypes from 'prop-types'

const DotIcon = ({ bg = '#979797' }) => {
    return (
        <svg
            viewBox="0 0 3 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[2px] w-[2px] md:h-[3px] md:w-[3px]"
        >
            <circle opacity="0.5" cx="1.5" cy="1.5" r="1.5" fill={bg} />
        </svg>
    )
}
export default DotIcon
DotIcon.propTypes = {
    bg: PropTypes.string,
}
