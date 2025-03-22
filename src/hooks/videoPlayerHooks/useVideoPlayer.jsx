import { useEffect, useRef, useState } from 'react';

export const useVideoPlayer = (isLoading) => {
    const [currentTime, setCurrentTime] = useState('0:00');
    const [progressBar, setProgressBar] = useState(0);
    const progressBarContainer = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [url, setUrl] = useState('');
    const [replay, setReplay] = useState(false);

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
                setReplay(currentTime === duration);
            }
            animationFrameId = requestAnimationFrame(updateProgress);
        };

        animationFrameId = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    useEffect(() => {
        if (videoRef.current?.src !== url) {
            setUrl(videoRef.current?.src);
        }
    }, [videoRef.current?.src, url]);

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

    return {
        videoContainerRef: isLoading ? null : videoContainerRef,
        videoRef: isLoading ? null : videoRef,
        progressBarContainer: isLoading ? null : progressBarContainer,
        isFullScreen: isLoading ? false : isFullscreen,
        currentTime: isLoading ? '0:00' : currentTime,
        duration: isLoading ? '0:00' : duration,
        handleSeek: isLoading ? () => {} : handleSeek,
        handleDrag: isLoading ? () => {} : handleDrag,
        ProgressBar: isLoading ? '0%' : progressBar,
        replay
    };
};
