import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useVideoPlayerVolumeControl } from '@hooks/videoPlayerHooks/useVideoPlayerVolumeControl.jsx';
import React from 'react';

export const VideoPlayerVolumeControl = React.memo(({ Ref }) => {
    const { progressVolume, handleVolumeChange, handleVolumeDrag, volumeBarRef } = useVideoPlayerVolumeControl({ videoRef: Ref });
    return (
        <div
            className="bg-secondaryDarkBlue relative z-50 flex h-2 w-24 cursor-pointer rounded-xl sm:w-24"
            onClick={handleVolumeChange}
            ref={volumeBarRef}
        >
            <motion.div
                className="bg-primaryRed absolute flex h-full items-center justify-end rounded-full"
                style={{ width: `${progressVolume}%` }}
            >
                <motion.div
                    className="bg-primaryRed absolute flex size-3.5 cursor-grab self-center rounded-xl"
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
});
VideoPlayerVolumeControl.propTypes = {
    Ref: PropTypes.object.isRequired
};
