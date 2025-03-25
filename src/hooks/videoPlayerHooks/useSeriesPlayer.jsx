import { useCallback, useMemo, useState } from 'react';

export const useSeriesPlayer = ({ seasons, isLoading }) => {
    const [selectSeason, setSelectSeason] = useState([]);
    const [selectEpisode, setSelectEpisode] = useState(null);
    const [episodeUrl, setEpisodeUrl] = useState('');
    const [episodeTitle, setEpisodeTitle] = useState('');
    const [currentSeason, setCurrentSeason] = useState(null);

    const seasonEpisodesMap = useMemo(() => {
        if (isLoading || seasons.length === 0) return {};

        const episodesMap = {};
        seasons.forEach((season) => {
            const seasonTitle = season.SeasonTitle.match(/Season \d{2}/)?.[0];
            if (seasonTitle) {
                episodesMap[seasonTitle] = season.seasonsEpisodes.map((episode) => ({
                    title: episode.Title,
                    url: episode.Tv_episode_path?.url || null
                }));
            }
        });
        return episodesMap;
    }, [isLoading, seasons]);

    const handleSeasons = useCallback((seasonName) => {
        setSelectSeason((prevSeasons) =>
            prevSeasons.includes(seasonName) ? prevSeasons.filter((s) => s !== seasonName) : [...prevSeasons, seasonName]
        );
    }, []);

    const handleEpisodes = useCallback((episodeTitle, url, season) => {
        setSelectEpisode(episodeTitle);
        setEpisodeUrl(url);
        setEpisodeTitle(episodeTitle);
        setCurrentSeason(season);
    }, []);

    const handleNextEpisode = useCallback(() => {
        if (!selectEpisode || !currentSeason) return;

        const seasonKeys = Object.keys(seasonEpisodesMap);
        const currentSeasonIndex = seasonKeys.indexOf(currentSeason);
        const episodes = seasonEpisodesMap[currentSeason] || [];

        const currentIndex = episodes.findIndex((ep) => ep.title === selectEpisode);

        if (currentIndex !== -1 && currentIndex < episodes.length - 1) {
            const nextEpisode = episodes[currentIndex + 1];
            setSelectEpisode(nextEpisode.title);
            setEpisodeUrl(nextEpisode.url);
            setEpisodeTitle(nextEpisode.title);
        } else if (currentSeasonIndex !== -1 && currentSeasonIndex < seasonKeys.length - 1) {
            const nextSeason = seasonKeys[currentSeasonIndex + 1];
            const firstEpisode = seasonEpisodesMap[nextSeason][0];
            setCurrentSeason(nextSeason);
            setSelectEpisode(firstEpisode.title);
            setEpisodeUrl(firstEpisode.url);
            setEpisodeTitle(firstEpisode.title);
        }
    }, [currentSeason, selectEpisode, seasonEpisodesMap]);

    const handlePrevEpisode = useCallback(() => {
        if (!selectEpisode || !currentSeason) return;

        const seasonKeys = Object.keys(seasonEpisodesMap);
        const currentSeasonIndex = seasonKeys.indexOf(currentSeason);
        const episodes = seasonEpisodesMap[currentSeason] || [];

        const currentIndex = episodes.findIndex((ep) => ep.title === selectEpisode);

        if (currentIndex > 0) {
            const prevEpisode = episodes[currentIndex - 1];
            setSelectEpisode(prevEpisode.title);
            setEpisodeUrl(prevEpisode.url);
            setEpisodeTitle(prevEpisode.title);
        } else if (currentSeasonIndex > 0) {
            const prevSeason = seasonKeys[currentSeasonIndex - 1];
            const lastEpisode = seasonEpisodesMap[prevSeason].slice(-1)[0];
            setCurrentSeason(prevSeason);
            setSelectEpisode(lastEpisode.title);
            setEpisodeUrl(lastEpisode.url);
            setEpisodeTitle(lastEpisode.title);
        }
    }, [currentSeason, selectEpisode, seasonEpisodesMap]);

    return {
        episodeUrl,
        episodeTitle,
        handlePrevEpisode,
        handleEpisodes,
        handleNextEpisode,
        handleSeasons,
        selectSeason,
        setEpisodeUrl
    };
};
