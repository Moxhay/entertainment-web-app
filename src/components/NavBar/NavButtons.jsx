import { useButtonColor } from '../../helpers.jsx'
import HomeIcon from '../icons/HomeIcon.jsx'
import MovieIcon from '../icons/MovieIcon.jsx'
import TvIcon from '../icons/TvIcon.jsx'
import BookmarkIcon from '../icons/BookmarkIcon.jsx'

export const useNavItems = () => {
    const home = useButtonColor('/')
    const movie = useButtonColor('/Movies')
    const tv = useButtonColor('/TvShow')
    const bookmark = useButtonColor('/Bookmark')
    return [
        { logo: HomeIcon, path: '/', name: 'home', color: home },
        { logo: MovieIcon, path: '/Movies', name: 'movie', color: movie },
        { logo: TvIcon, path: '/TvShow', name: 'tv', color: tv },
        {
            logo: BookmarkIcon,
            path: '/Bookmark',
            name: 'bookmark',
            color: bookmark,
        },
    ]
}
