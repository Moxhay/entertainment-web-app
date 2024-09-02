import NavButton from './NavButton.jsx'
import MovieLogo from './icons/MovieLogo.jsx'
import HomeIcon from './icons/HomeIcon.jsx'
import MovieIcon from './icons/MovieIcon.jsx'
import TvIcon from './icons/TvIcon.jsx'
import Bookmark from './icons/Bookmark.jsx'

const Header = () => {
    return (
        <header className="flex h-full justify-between bg-secondaryDarkBlue px-4 py-5">
            <NavButton logo={<MovieLogo />} href={'#'} />
            <div className="h-full items-center space-x-5">
                <NavButton logo={<HomeIcon bg={'white'} />} href={'#'} />
                <NavButton logo={<MovieIcon bg={'white'} />} href={'#'} />
                <NavButton logo={<TvIcon bg={'white'} />} href={'#'} />
                <NavButton logo={<Bookmark bg={'white'} />} href={'#'} />
            </div>
        </header>
    )
}
export default Header
