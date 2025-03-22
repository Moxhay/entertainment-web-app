import React from 'react';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { useFullScreen } from '@hooks/videoPlayerHooks/useFullScreen.jsx';

export const ButtonFullScreen = React.memo(({ Ref }) => {
    const { isFullscreen, handleFullScreen } = useFullScreen({ Ref });
    return (
        <button onClick={() => onclick(handleFullScreen())} className="text-primaryRed self-end p-3">
            {!isFullscreen ? (
                <RxEnterFullScreen className="size-6 cursor-pointer" />
            ) : (
                <RxExitFullScreen className="size-6 cursor-pointer" />
            )}
        </button>
    );
});
