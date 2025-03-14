import PropTypes from 'prop-types';

const ContentSection = ({ children }) => {
    return <div className="text-primaryWhite flex h-fit flex-col gap-4 overflow-hidden px-4 md:px-10 xl:px-0 xl:pt-10">{children}</div>;
};

export default ContentSection;

ContentSection.propTypes = {
    children: PropTypes.node
};
