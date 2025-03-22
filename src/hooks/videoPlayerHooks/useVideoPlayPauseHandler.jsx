import { useCallback, useEffect, useState } from 'react';

export const useVideoPlayPauseHandler = ({ videoRef }) => {
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState('');
    useEffect(() => {
        if (videoRef.current?.src !== url) {
            setUrl(videoRef.current?.src);
            setPlaying(false);
        }
    }, [videoRef]);
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
