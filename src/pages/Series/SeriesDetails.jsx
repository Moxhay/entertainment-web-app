import { useEffect } from 'react';
import { validateSlug } from '@/helpers.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import ContentSection from '@components/ContentSection.jsx';
import { useGetSingleSeriesQuery, useGetSingleSeriesSeasonQuery } from '@/api/seriesApi.js';
import { VideoPlayer } from '@components/VideoPlayer/VideoPlayer.jsx';
import { useSeriesPlayer } from '@hooks/useSeriesPlayer.jsx';

export function SeriesDetails() {
    const { title, documentId } = useParams();
    const redirect = useNavigate();

    const { data: series, error: isErrorSeries, isLoading: isLoadingSeries } = useGetSingleSeriesQuery(documentId);
    const { data: seasons, error: isErrorSeasons, isLoading: isLoadingSeasons } = useGetSingleSeriesSeasonQuery(documentId);
    const isLoading = isLoadingSeries || isLoadingSeasons;
    useEffect(() => {
        if (!validateSlug(title, documentId)) {
            redirect('/Series');
        }
    }, [title, documentId, redirect]);
    const { episodeUrl, handleEpisodes, handleSeasons, handleNextEpisode, handlePrevEpisode, selectSeason, setEpisodeUrl } =
        useSeriesPlayer({ seasons, isLoading });
    if (isLoadingSeries || isLoadingSeasons) return <div>loading...</div>;
    return (
        <ContentSection>
            <div className="flex justify-center xl:pr-5">
                {episodeUrl ? (
                    <div className="flex w-full flex-col gap-4">
                        <VideoPlayer
                            src={episodeUrl}
                            tittle={''}
                            className="3xl:h-[85vh] group relative h-[75vh] w-full rounded-2xl bg-black object-contain lg:h-[85vh]"
                            classNameIsFullScreen="h-full"
                            isLoading={isLoading}
                        />
                        <div className="bg-primaryRed/65 flex items-center justify-between rounded-2xl px-4 py-1 text-sm font-bold">
                            <button className="cursor-pointer" onClick={handlePrevEpisode}>
                                Prev
                            </button>
                            <button className="cursor-pointer" onClick={() => setEpisodeUrl('')}>
                                Episodes
                            </button>
                            <button className="cursor-pointer" onClick={handleNextEpisode}>
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    series.map((series) => {
                        return (
                            <div key={series.documentId} className="flex flex-col items-center gap-4 xl:items-start">
                                <img className="aspect-video rounded-2xl md:w-[50vw]" src={series.poster} alt={series.title} />
                                <div className="flex h-full w-full flex-col justify-center gap-2">
                                    <h1 className="text-primaryWhite text-2xl font-bold">{series.title}</h1>
                                    <div className="relative flex flex-col gap-1 md:w-[50vw]">
                                        <div className="text-primaryWhite flex items-center gap-2 text-lg">
                                            <p>{series.release_date}</p>
                                            <div className="bg-primaryWhite h-1.5 w-1.5 rounded-full"></div>
                                            <p>{series.rated}</p>
                                        </div>
                                        <p className="text-primaryWhite text-sm">{series.description}</p>
                                    </div>
                                </div>
                                {seasons.map((season) => {
                                    const SeasonTitle = season.SeasonTitle.match(/Season \d{2}/)[0];
                                    return (
                                        <div key={season.documentId} className="w-full md:w-[50vw]">
                                            <button
                                                className="bg-primaryRed flex w-full cursor-pointer justify-center rounded-2xl py-1 font-bold md:items-center"
                                                onClick={() => handleSeasons(SeasonTitle)}
                                            >
                                                <h1>{SeasonTitle}</h1>
                                            </button>
                                            {selectSeason.includes(SeasonTitle) && (
                                                <div className="flex flex-wrap gap-2 px-4 py-2">
                                                    {season.seasonsEpisodes.map((episode) => {
                                                        return (
                                                            <button
                                                                className="text-primaryWhite bg-secondaryDarkBlue cursor-pointer rounded-xl px-2 py-2 text-base font-bold"
                                                                key={episode.Title}
                                                                onClick={() => {
                                                                    handleEpisodes(
                                                                        episode.Title,
                                                                        episode.Tv_episode_path?.url,
                                                                        SeasonTitle
                                                                    );
                                                                }}
                                                            >
                                                                {episode.Title}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                )}
            </div>
        </ContentSection>
    );
}
