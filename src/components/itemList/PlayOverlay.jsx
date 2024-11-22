import { Link } from 'react-router-dom'
import { PlayButton } from '../../assets/icons/PlayButton.jsx'

const PlayOverlay = ({ title, type }) => {
    const baseURL = import.meta.env.VITE_BASE_URL
    const destinationUrl = `${baseURL}/${type === 'Movie' ? 'Movies' : 'TvSeries'}/${encodeURIComponent(title)}`

    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 xl:z-10">
            <div className="relative rounded-full px-5 py-2">
                <span className="absolute inset-0 rounded-full bg-white opacity-10"></span>
                <Link
                    to={destinationUrl}
                    className="relative flex items-center gap-2 font-bold text-white"
                >
                    <PlayButton />
                    Play
                </Link>
            </div>
        </div>
    )
}

export default PlayOverlay
