import { useCallback, useState } from 'react';

export const useFullScreen = ({ Ref }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullScreen = useCallback(() => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            Ref.current.requestFullscreen();
            setIsFullscreen(true);
        }
    });
    return {
        handleFullScreen,
        isFullscreen
    };
};
