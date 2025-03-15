import { useEffect, useState } from 'react';

export const useSeriesPlayer = ({ seasons, isLoading }) => {
    const [selectSeason, setSelectSeason] = useState([]);
    const [selectEpisode, setSelectEpisode] = useState(null);
    const [episodeUrl, setEpisodeUrl] = useState(null);
    const [seasonEpisodesMap, setSeasonEpisodesMap] = useState({});
    const [currentSeason, setCurrentSeason] = useState(null);
    useEffect(() => {
        if (!isLoading && seasons.length > 0) {
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

            setSeasonEpisodesMap(episodesMap);
        }
    }, [isLoading, seasons, selectEpisode, selectSeason]);

    const handleSeasons = (seasons) => {
        if (selectSeason.includes(seasons)) {
            return setSelectSeason(selectSeason.filter((s) => s !== seasons));
        }

        setSelectSeason([...selectSeason, seasons]);
    };
    const handleEpisodes = (episodeTitle, url, season) => {
        setSelectEpisode(episodeTitle);
        setEpisodeUrl(url);
        setCurrentSeason(season);
    };
    const handleNextEpisode = () => {
        if (!selectEpisode || !currentSeason) return;

        const seasonKeys = Object.keys(seasonEpisodesMap);
        const currentSeasonIndex = seasonKeys.indexOf(currentSeason);
        const episodes = seasonEpisodesMap[currentSeason] || [];

        const currentIndex = episodes.findIndex((ep) => ep.title === selectEpisode);

        if (currentIndex !== -1 && currentIndex < episodes.length - 1) {
            const nextEpisode = episodes[currentIndex + 1];
            setSelectEpisode(nextEpisode.title);
            setEpisodeUrl(nextEpisode.url);
        } else if (currentSeasonIndex !== -1 && currentSeasonIndex < seasonKeys.length - 1) {
            const nextSeason = seasonKeys[currentSeasonIndex + 1];
            const firstEpisode = seasonEpisodesMap[nextSeason][0];

            setCurrentSeason(nextSeason);
            setSelectEpisode(firstEpisode.title);
            setEpisodeUrl(firstEpisode.url);
        }
    };

    const handlePrevEpisode = () => {
        if (!selectEpisode || !currentSeason) return;

        const seasonKeys = Object.keys(seasonEpisodesMap);
        const currentSeasonIndex = seasonKeys.indexOf(currentSeason);
        const episodes = seasonEpisodesMap[currentSeason] || [];

        const currentIndex = episodes.findIndex((ep) => ep.title === selectEpisode);

        if (currentIndex > 0) {
            const prevEpisode = episodes[currentIndex - 1];
            setSelectEpisode(prevEpisode.title);
            setEpisodeUrl(prevEpisode.url);
        } else if (currentSeasonIndex > 0) {
            const prevSeason = seasonKeys[currentSeasonIndex - 1];
            const lastEpisode = seasonEpisodesMap[prevSeason].slice(-1)[0];

            setCurrentSeason(prevSeason);
            setSelectEpisode(lastEpisode.title);
            setEpisodeUrl(lastEpisode.url);
        }
    };
    return {
        episodeUrl,
        handlePrevEpisode,
        handleEpisodes,
        handleNextEpisode,
        handleSeasons,
        selectSeason,
        setEpisodeUrl
    };
};
