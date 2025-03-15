import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const VideoPlayerVolumeControl = ({ progressVolume, handleVolumeDrag, onClick, Ref }) => {
    return (
        <div className="bg-secondaryDarkBlue relative flex h-2 w-24 cursor-pointer rounded-2xl sm:w-24" onClick={onClick} ref={Ref}>
            <motion.div className="bg-primaryRed flex h-full items-center justify-end rounded-full" style={{ width: `${progressVolume}%` }}>
                <motion.div
                    className="bg-primaryRed size-3.5 cursor-grab rounded-2xl"
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0
                    }}
                    dragElastic={0}
                    onDrag={handleVolumeDrag}
                />
            </motion.div>
        </div>
    );
};
VideoPlayerVolumeControl.propTypes = {
    handleVolumeDrag: PropTypes.func.isRequired,
    progressVolume: PropTypes.number.isRequired,
    Ref: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};
