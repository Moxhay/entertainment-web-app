import PropTypes from 'prop-types'

const TvIcon = ({ bg, border = 'none' }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={border}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.264 3.58487H16V16H0V3.58487H3.936L1.776 0.962173L3.024 0.0232784L5.6 3.12706L8.176 0L9.424 0.962173L7.264 3.58487ZM1.6 14.4481H9.6V5.13676H1.6V14.4481ZM13.6 11.3443H12V9.79243H13.6V11.3443ZM12 8.24054H13.6V6.68865H12V8.24054Z"
                fill={bg}
            />
        </svg>
    )
}

export default TvIcon
TvIcon.propTypes = {
    bg: PropTypes.string.isRequired,
    border: PropTypes.string,
}
