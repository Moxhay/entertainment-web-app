import PropTypes from 'prop-types';

export const VideoPlayerControlsContainer = ({ children }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center self-end overflow-hidden px-2 opacity-0 group-hover:opacity-100 sm:inset-2 sm:px-0 lg:inset-4">
            {children}
        </div>
    );
};
VideoPlayerControlsContainer.propTypes = {
    children: PropTypes.node.isRequired
};
