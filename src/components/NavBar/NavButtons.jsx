import { useButtonColor } from '../../hooks/useButtonColor.jsx'
import HomeIcon from '../../assets/icons/HomeIcon.jsx'
import MovieIcon from '../../assets/icons/MovieIcon.jsx'
import TvIcon from '../../assets/icons/TvIcon.jsx'
import BookmarkIcon from '../../assets/icons/BookmarkIcon.jsx'

export const useNavItems = () => {
    const home = useButtonColor('/')
    const movie = useButtonColor('/Movies')
    const tv = useButtonColor('/TvSeries')
    const bookmark = useButtonColor('/Bookmark')
    return [
        { logo: HomeIcon, path: '/', name: 'home', color: home },
        { logo: MovieIcon, path: '/Movies', name: 'movie', color: movie },
        { logo: TvIcon, path: '/TvSeries', name: 'tv', color: tv },
        {
            logo: BookmarkIcon,
            path: '/Bookmark',
            name: 'bookmark',
            color: bookmark,
        },
    ]
}
