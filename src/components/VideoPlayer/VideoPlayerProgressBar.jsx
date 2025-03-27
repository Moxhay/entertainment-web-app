import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const VideoPlayerProgressBar = ({ progressBarContainer, handleSeek, progressBar, handleDrag }) => {
    return (
        <div
            className="bg-secondaryDarkBlue flex h-2 w-full cursor-pointer flex-row rounded-2xl"
            ref={progressBarContainer}
            onClick={handleSeek}
        >
            <motion.div className="bg-primaryRed flex h-2 items-center justify-end rounded-2xl" style={{ width: `${progressBar}%` }}>
                <motion.div
                    className="bg-primaryRed absolute size-3.5 cursor-grab rounded-2xl"
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    dragElastic={0}
                    onDrag={handleDrag}
                />
            </motion.div>
        </div>
    );
};
VideoPlayerProgressBar.propTypes = {
    progressBarContainer: PropTypes.any.isRequired,
    handleSeek: PropTypes.func.isRequired,
    progressBar: PropTypes.number.isRequired,
    handleDrag: PropTypes.func.isRequired
};
