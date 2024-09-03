import NavButton from './NavButton.jsx'
import MovieLogo from './icons/MovieLogo.jsx'
import HomeIcon from './icons/HomeIcon.jsx'
import MovieIcon from './icons/MovieIcon.jsx'
import TvIcon from './icons/TvIcon.jsx'
import Bookmark from './icons/Bookmark.jsx'
import { useButtonColor } from '../helpers.jsx'

const Header = () => {
    const home = useButtonColor('/')
    const movie = useButtonColor('/Movies')
    const tv = useButtonColor('/TvShow')
    const bookmark = useButtonColor('/Bookmark')
    return (
        <header className="flex h-full justify-between bg-secondaryDarkBlue px-4 py-5 lg:px-10 xl:hidden">
            <NavButton logo={<MovieLogo />} to={'/'} />
            <div className="h-full items-center space-x-6 sm:space-x-8 xl:space-x-9">
                <NavButton logo={<HomeIcon bg={home} />} to={'/'} />
                <NavButton logo={<MovieIcon bg={movie} />} to={'/Movies'} />
                <NavButton logo={<TvIcon bg={tv} />} to={'/TvShow'} />
                <NavButton logo={<Bookmark bg={bookmark} />} to={'/Bookmark'} />
            </div>
            <div className="">
                <img
                    src="/img/img.png"
                    alt="profile image"
                    className="h-full w-full"
                />
            </div>
        </header>
    )
}
export default Header
