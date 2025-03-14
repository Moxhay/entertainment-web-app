import { useButtonColor } from '@hooks/useButtonColor.jsx';
import HomeIcon from '../../assets/icons/HomeIcon.jsx';
import MovieIcon from '../../assets/icons/MovieIcon.jsx';
import TvIcon from '../../assets/icons/TvIcon.jsx';
import BookmarkIcon from '../../assets/icons/BookmarkIcon.jsx';

export const useNavItems = () => {
    const Path = {
        homePath: '/',
        moviePath: '/Movies',
        seriesPath: '/Series',
        bookmarkedPath: '/Bookmark'
    };
    const { homePath, moviePath, seriesPath, bookmarkedPath } = Path;
    const home = useButtonColor(homePath);
    const movie = useButtonColor(moviePath);
    const tv = useButtonColor(seriesPath);
    const bookmark = useButtonColor(bookmarkedPath);
    return [
        { logo: HomeIcon, path: homePath, name: 'home', color: home },
        { logo: MovieIcon, path: moviePath, name: 'movie', color: movie },
        { logo: TvIcon, path: seriesPath, name: 'tv', color: tv },
        {
            logo: BookmarkIcon,
            path: bookmarkedPath,
            name: 'bookmark',
            color: bookmark
        }
    ];
};
