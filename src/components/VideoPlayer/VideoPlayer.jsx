import PropTypes from 'prop-types';
import { GetControlIcons } from '@components/VideoPlayer/GetControl-Icons.jsx';
import { VideoPlayerControlsContainer } from '@components/VideoPlayer/VideoPlayerControlsContainer.jsx';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { VideoPlayerProgressBar } from '@components/VideoPlayer/VideoPlayerProgressBar.jsx';
import { VideoPlayerVolumeControl } from '@components/VideoPlayer/VideoPlayerVolumeControl.jsx';
import { useVideoPlayer } from '@hooks/useVideoPlayer.jsx';

export const VideoPlayer = ({ tittle, src, className, classNameIsFullScreen, isLoading }) => {
    const {
        videoContainerRef,
        videoRef,
        progressBarContainer,
        isFullScreen,
        playing,
        currentTime,
        duration,
        handleSeek,
        handleDrag,
        videoHandler,
        ProgressBar,
        volumeBarRef,
        progressVolume,
        handleVolumeChange,
        handleVolumeDrag
    } = useVideoPlayer(isLoading);
    return (
        <div className="group relative flex h-full w-full flex-col" ref={videoContainerRef}>
            <video ref={videoRef} title={tittle} src={src} className={isFullScreen ? classNameIsFullScreen : className} controls={false} />
            <GetControlIcons
                className={'text-primaryRed absolute inset-0 size-1/10 w-full cursor-pointer self-center'}
                classNameWithHover={
                    'text-primaryRed absolute inset-0 size-1/10 w-full cursor-pointer self-center opacity-0 transition-opacity group-hover:opacity-100'
                }
                currentTime={currentTime}
                videoDuration={duration}
                playing={playing}
                videoHandler={videoHandler}
            />
            <VideoPlayerControlsContainer>
                <div className="flex w-full items-center gap-2">
                    <VideoPlayerProgressBar
                        progressBarContainer={progressBarContainer}
                        handleSeek={handleSeek}
                        progressBar={ProgressBar}
                        handleDrag={handleDrag}
                    />
                    <span className="relative">{duration}</span>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="flex w-full items-center gap-x-2">
                        <GetControlIcons
                            className={'text-primaryRed size-6 cursor-pointer'}
                            currentTime={currentTime}
                            videoDuration={duration}
                            playing={playing}
                            videoHandler={videoHandler}
                        />

                        <VideoPlayerVolumeControl
                            handleVolumeDrag={handleVolumeDrag}
                            progressVolume={progressVolume}
                            Ref={volumeBarRef}
                            onClick={handleVolumeChange}
                        />
                    </div>

                    <button onClick={() => videoHandler('fullScreen')} className="text-primaryRed self-end p-3">
                        {!isFullScreen ? (
                            <RxEnterFullScreen className="size-6 cursor-pointer" />
                        ) : (
                            <RxExitFullScreen className="size-6 cursor-pointer" />
                        )}
                    </button>
                </div>
            </VideoPlayerControlsContainer>
        </div>
    );
};
VideoPlayer.propTypes = {
    tittle: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    classNameIsFullScreen: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};
