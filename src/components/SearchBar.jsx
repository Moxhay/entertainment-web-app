import SearchIcon from './icons/SearchIcon.jsx'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { pathname } = useLocation()

    let message
    switch (pathname) {
        case '/':
            message = 'Search for movies or TV series'
            break
        case '/Movies':
            message = 'Search for movies'
            break
        case '/TvShow':
            message = 'Search for TV series'
            break
        case '/Bookmark':
            message = 'Search for bookmarked show'
            break
    }
    return (
        <div className="flex w-full min-w-[257px] items-center bg-origin-content md:min-w-[381px]">
            <SearchIcon />
            <input
                type="text"
                className="placeholder-gray-400 w-full rounded-md border-none bg-primaryDarkBlue p-2 text-primaryWhite outline-none focus:ring-0"
                placeholder={message}
            />
        </div>
    )
}

export default SearchBar
