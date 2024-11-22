import PropTypes from 'prop-types'

const ContentSection = ({ children }) => {
    return (
        <div className="flex flex-col gap-4 overflow-hidden px-4 text-primaryWhite md:px-10 xl:px-0 xl:pt-10">
            {children}
        </div>
    )
}

export default ContentSection

ContentSection.propTypes = {
    children: PropTypes.node,
}
