import { Link } from 'react-router-dom';
import { PlayButton } from '../../assets/icons/PlayButton.jsx';
import PropTypes from 'prop-types';

export function PlayOverlay({ title, documentId, type }) {
    const destinationUrl = `/${type === 'Movie' ? 'Movies' : 'Series'}/${encodeURIComponent(title)}/${encodeURIComponent(documentId)}`;
    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 xl:z-10">
            <div className="relative rounded-full px-5 py-2">
                <span className="absolute inset-0 rounded-full bg-white opacity-10"></span>
                <Link to={destinationUrl} className="relative flex items-center gap-2 font-bold text-white">
                    <PlayButton />
                    Play
                </Link>
            </div>
        </div>
    );
}

PlayOverlay.propTypes = {
    documentId: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string
};
