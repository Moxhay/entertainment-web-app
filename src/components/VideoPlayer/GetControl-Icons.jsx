import { RePlayButton } from '@/assets/icons/VideoPlayer/RePlayButton.jsx';
import { PauseButton } from '@/assets/icons/VideoPlayer/PauseButton.jsx';
import { PlayButton } from '@/assets/icons/VideoPlayer/PlayButton.jsx';
import PropTypes from 'prop-types';
import React from 'react';

export const GetControlIcons = React.memo(({ className = '', classNameWithHover = '', replay, videoHandler, playing }) => {
    if (replay) return <RePlayButton className={className} onClick={() => videoHandler('rePlay')} />;
    if (playing) return <PauseButton className={classNameWithHover || className} onClick={() => videoHandler('pause')} />;
    return <PlayButton onClick={() => videoHandler('play')} className={className} />;
});

GetControlIcons.propTypes = {
    className: PropTypes.string.isRequired,
    classNameWithHover: PropTypes.string
};
