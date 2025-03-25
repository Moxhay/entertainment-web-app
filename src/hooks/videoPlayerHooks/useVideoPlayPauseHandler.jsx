import { useCallback, useEffect, useState } from 'react';

export const useVideoPlayPauseHandler = ({ videoRef, title }) => {
    const [playing, setPlaying] = useState(false);
    const [episodeTitle, setEpisodeTitle] = useState('');
    useEffect(() => {
        if (episodeTitle !== title) {
            setPlaying(false);
            setEpisodeTitle(title);
            videoRef.current?.pause();
            videoRef.current.currentTime = 0;
        }
    }, [title]);
    const videoHandler = useCallback(
        (control) => {
            if (!videoRef.current) return;
            switch (control) {
                case 'play':
                    videoRef.current.play();
                    setPlaying(true);
                    break;
                case 'pause':
                    videoRef.current.pause();
                    setPlaying(false);
                    break;
                case 'rePlay':
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                    setPlaying(true);
                    break;
                default:
                    break;
            }
        },
        [videoRef]
    );

    return {
        playing,
        videoHandler
    };
};
