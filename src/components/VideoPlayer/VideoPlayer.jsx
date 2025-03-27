import PropTypes from 'prop-types';
import { GetControlIcons } from '@components/VideoPlayer/GetControl-Icons.jsx';
import { VideoPlayerControlsContainer } from '@components/VideoPlayer/VideoPlayerControlsContainer.jsx';
import { VideoPlayerProgressBar } from '@components/VideoPlayer/VideoPlayerProgressBar.jsx';
import { VideoPlayerVolumeControl } from '@components/VideoPlayer/VideoPlayerVolumeControl.jsx';
import { useVideoPlayer } from '@hooks/videoPlayerHooks/useVideoPlayer.jsx';
import { ButtonFullScreen } from '@components/VideoPlayer/ButtonFullScreen.jsx';
import { useVideoPlayPauseHandler } from '@hooks/videoPlayerHooks/useVideoPlayPauseHandler.jsx';

export const VideoPlayer = ({ title, src, className, classNameIsFullScreen, isLoading }) => {
    const { replay, videoContainerRef, videoRef, progressBarContainer, isFullScreen, duration, handleSeek, handleDrag, ProgressBar } =
        useVideoPlayer(isLoading);
    const { videoHandler, playing } = useVideoPlayPauseHandler({ videoRef, title });
    return (
        <div className="group relative flex h-full w-full flex-col" ref={videoContainerRef}>
            <video ref={videoRef} title={title} src={src} className={isFullScreen ? classNameIsFullScreen : className} controls={false} />
            <GetControlIcons
                className={'text-primaryRed absolute inset-0 size-1/10 w-full cursor-pointer self-center'}
                classNameWithHover={
                    'text-primaryRed absolute inset-0 size-1/10 w-full cursor-pointer self-center opacity-0 transition-opacity group-hover:opacity-100'
                }
                replay={replay}
                videoHandler={videoHandler}
                playing={playing}
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
                    <div className="flex w-full items-center gap-x-5">
                        <GetControlIcons
                            className={'text-primaryRed size-6 cursor-pointer'}
                            replay={replay}
                            videoHandler={videoHandler}
                            playing={playing}
                        />

                        <VideoPlayerVolumeControl Ref={videoRef} isLoading={isLoading} />
                    </div>

                    <ButtonFullScreen Ref={videoContainerRef} />
                </div>
            </VideoPlayerControlsContainer>
        </div>
    );
};
VideoPlayer.propTypes = {
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    classNameIsFullScreen: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};
