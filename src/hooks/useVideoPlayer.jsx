import { useEffect, useRef, useState } from 'react';

export const useVideoPlayer = (isLoading) => {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [progressBar, setProgressBar] = useState(0);
    const [progressVolume, setProgressVolume] = useState(100);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const progressBarContainer = useRef(null);
    const videoContainerRef = useRef(null);
    const volumeBarRef = useRef(null);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        let animationFrameId;

        const updateProgress = () => {
            if (videoRef.current) {
                const current = videoRef.current.currentTime;
                const duration = videoRef.current.duration;
                setCurrentTime(`${Math.floor(current / 60)}:${('0' + Math.floor(current % 60)).slice(-2)}`);
                setProgressBar((current / duration) * 100);
                setProgressVolume(videoRef.current.volume * 100);
            }
            animationFrameId = requestAnimationFrame(updateProgress);
        };

        animationFrameId = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    useEffect(() => {
        if (videoRef.current?.src !== url) {
            setUrl(videoRef.current?.src);
            setPlaying(false);
        }
    }, [videoRef.current?.src, url]);

    const videoHandler = (control) => {
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
            case 'fullScreen':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                    setIsFullscreen(false);
                } else {
                    videoContainerRef.current.requestFullscreen();
                    setIsFullscreen(true);
                }
                break;
            default:
                break;
        }
    };

    const duration = videoRef.current
        ? `${Math.floor(videoRef.current.duration / 60)}:${('0' + Math.floor(videoRef.current.duration % 60)).slice(-2)}`
        : '0:00';

    const handleSeek = (e) => {
        const progressBar = e.currentTarget;
        const clickX = e.nativeEvent.offsetX;
        const barWidth = progressBar.clientWidth;

        if (videoRef.current) {
            videoRef.current.currentTime = (clickX / barWidth) * videoRef.current.duration;
        }
    };

    const handleDrag = (event, info) => {
        if (!videoRef.current || !progressBarContainer.current) return;

        const barWidth = progressBarContainer.current.clientWidth;
        let newX = info.point.x - progressBarContainer.current.getBoundingClientRect().left;
        newX = Math.max(0, Math.min(newX, barWidth));

        videoRef.current.currentTime = (newX / barWidth) * videoRef.current.duration;
    };
    const handleVolumeDrag = (event, info) => {
        if (!videoRef.current || !volumeBarRef.current) return;

        const barWidth = volumeBarRef.current.clientWidth;
        let newX = info.point.x - volumeBarRef.current.getBoundingClientRect().left;
        newX = Math.max(0, Math.min(newX, barWidth));

        const newVolume = newX / barWidth;
        setProgressVolume(newVolume * 100);

        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };
    const handleVolumeChange = (e) => {
        const volumeBar = e.currentTarget;
        const clickX = e.nativeEvent.offsetX;
        const barWidth = volumeBar.clientWidth;

        if (videoRef.current) {
            const volume = clickX / barWidth;
            videoRef.current.volume = volume;
            setProgressVolume(volume * 100);
        }
    };

    return {
        videoContainerRef: isLoading ? null : videoContainerRef,
        videoRef: isLoading ? null : videoRef,
        progressBarContainer: isLoading ? null : progressBarContainer,
        isFullScreen: isLoading ? false : isFullscreen,
        playing: isLoading ? false : playing,
        currentTime: isLoading ? '0:00' : currentTime,
        duration: isLoading ? '0:00' : duration,
        handleSeek: isLoading ? () => {} : handleSeek,
        handleDrag: isLoading ? () => {} : handleDrag,
        videoHandler: isLoading ? () => {} : videoHandler,
        ProgressBar: isLoading ? '0%' : progressBar,
        volumeBarRef: isLoading ? null : volumeBarRef,
        progressVolume: isLoading ? 0 : progressVolume,
        handleVolumeChange: isLoading ? () => {} : handleVolumeChange,
        handleVolumeDrag: isLoading ? () => {} : handleVolumeDrag
    };
};
