import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';

export const FullScreenButton = ({ isFullscreen, toggleFullScreen }) => (
    <button onClick={toggleFullScreen} className="text-primaryRed z-40 self-end p-3">
        {isFullscreen ? <RxExitFullScreen className="size-6 cursor-pointer" /> : <RxEnterFullScreen className="size-6 cursor-pointer" />}
    </button>
);
