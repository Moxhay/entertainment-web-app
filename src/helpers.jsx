import Cookies from 'js-cookie';
import ContentSection from '@components/ContentSection.jsx';

export const validateSlug = (slug) => {
    const decodedSlug = decodeURIComponent(slug);
    return typeof decodedSlug === 'string' && decodedSlug.length >= 1 && decodedSlug.length <= 100;
};

export const submitForm = ({ setLoading, ApiEndPoint, payload, navigate, setError }) => {
    setLoading(true);
    ApiEndPoint(payload)
        .then((response) => {
            setLoading(false);

            if (response) {
                Cookies.set('jwt', response.data.jwt, {
                    path: '/',
                    expires: 7,
                    secure: true,
                    sameSite: 'strict'
                }),
                    Cookies.set('id', response.data.user.id, {
                        path: '/',
                        expires: 7,
                        secure: true,
                        sameSite: 'strict'
                    });
                navigate('/');
            } else {
                throw new Error(response.error);
            }
        })
        .catch((error) => {
            setLoading(false);
            setError(true);
            console.error(error);
        });
};

export const transformResponse = (response) => {
    return response.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        trending: item.trending,
        release_date: item.release_date,
        rated: item.rated,
        type: item.type,
        poster: item.cover_path?.url,
        bookmarked: !!item.bookmarkeds && item.bookmarkeds.length > 0
    }));
};

export const transformResponseForSingleMovie = (response) => {
    return response.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        trending: item.trending,
        release_date: item.release_date,
        rated: item.rated,
        type: item.type,
        poster: item.cover_path?.url,
        movie_Url: item.movie_path,
        description: item.description
    }));
};
export const transformResponseForSingleSeries = (response) => {
    return response.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        trending: item.trending,
        release_date: item.release_date,
        rated: item.rated,
        type: item.type,
        poster: item.cover_path?.url,
        description: item.description
    }));
};
export const transformResponseForSingleSeriesSeasons = (response) => {
    return response.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        SeasonTitle: item.SeasonTitle,
        seasonsEpisodes: item.tv_episodes
    }));
};

export const contentStatus = ({ isLoading, isFetching, error }) => {
    if (isLoading || isFetching) return <ContentSection></ContentSection>;
    if (error)
        return (
            <ContentSection>
                <div className="h-fit w-fit text-white">Error loading movies or series</div>
            </ContentSection>
        );
};
