import { RePlayButton } from '@/assets/icons/VideoPlayer/RePlayButton.jsx';
import { PauseButton } from '@/assets/icons/VideoPlayer/PauseButton.jsx';
import { PlayButton } from '@/assets/icons/VideoPlayer/PlayButton.jsx';
import PropTypes from 'prop-types';

export const GetControlIcons = ({ className = '', classNameWithHover = '', currentTime, videoDuration, playing, videoHandler }) => {
    if (currentTime === videoDuration) return <RePlayButton className={className} onClick={() => videoHandler('rePlay')} />;
    if (playing) return <PauseButton className={classNameWithHover || className} onClick={() => videoHandler('pause')} />;
    return <PlayButton onClick={() => videoHandler('play')} className={className} />;
};

GetControlIcons.propTypes = {
    className: PropTypes.string.isRequired,
    classNameWithHover: PropTypes.string,
    currentTime: PropTypes.string.isRequired,
    videoDuration: PropTypes.string.isRequired,
    playing: PropTypes.bool.isRequired,
    videoHandler: PropTypes.func.isRequired
};
