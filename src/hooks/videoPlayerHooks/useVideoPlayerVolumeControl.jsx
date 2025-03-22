import { useCallback, useRef, useState } from 'react';

export const useVideoPlayerVolumeControl = ({ videoRef }) => {
    const [progressVolume, setProgressVolume] = useState(100);

    const volumeBarRef = useRef(null);
    const handleVolumeDrag = useCallback((event, info) => {
        if (!videoRef.current || !volumeBarRef.current) return;

        const barWidth = volumeBarRef.current.clientWidth;
        let newX = info.point.x - volumeBarRef.current.getBoundingClientRect().left;
        newX = Math.max(0, Math.min(newX, barWidth));

        const newVolume = newX / barWidth;
        setProgressVolume(newVolume * 100);

        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    }, []);
    const handleVolumeChange = useCallback((e) => {
        const volumeBar = e.currentTarget;
        const clickX = e.nativeEvent.offsetX;
        const barWidth = volumeBar.clientWidth;

        if (videoRef.current) {
            const volume = clickX / barWidth;
            videoRef.current.volume = volume;
            setProgressVolume(volume * 100);
        }
    }, []);
    return {
        volumeBarRef,
        progressVolume,
        handleVolumeChange,
        handleVolumeDrag
    };
};
