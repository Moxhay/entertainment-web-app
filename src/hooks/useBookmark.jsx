import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { seriesApi } from '../api/seriesApi';
import { moviesApi } from '../api/moviesApi';
import api from '../api/api.js';
import { store } from '../store/store.js';
import { useLocation } from 'react-router-dom';

const useBookmark = () => {
    const [loadingBookmarked, setLoadingBookmarked] = useState({});
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const updateCache = useCallback(
        (id, bookmarked, type) => {
            const apiType = type === 'Movie' ? moviesApi : seriesApi;
            const endpointName = type === 'Movie' ? 'getMovies' : 'getSeries';
            const endpointTrendingName = type === 'Movie' ? 'getTrendingMovies' : 'getTrendingSeries';
            const invalidTagsEndpoint = type === 'Movie' ? 'getBookmarkedMovies' : 'getBookmarkedSeries';

            dispatch(
                apiType.util.updateQueryData(endpointName, undefined, (draft) => {
                    const content = draft.find((m) => m.id === id);
                    if (content) content.bookmarked = bookmarked;
                })
            );
            dispatch(
                apiType.util.updateQueryData(endpointTrendingName, undefined, (draft) => {
                    const content = draft.find((m) => m.id === id);
                    if (content) content.bookmarked = bookmarked;
                })
            );
            if (pathname !== '/Bookmark') {
                dispatch(apiType.util.invalidateTags([invalidTagsEndpoint]));
            }

            const searchEndpoint = type === 'Movie' ? 'getMovie' : 'getSeriesSearch';
            const state = store.getState();
            const queries = state[apiType.reducerPath].queries;

            Object.keys(queries).forEach((key) => {
                if (key.startsWith(searchEndpoint)) {
                    const queryArgs = queries[key]?.originalArgs;
                    if (queryArgs) {
                        dispatch(
                            apiType.util.updateQueryData(searchEndpoint, queryArgs, (draft) => {
                                const content = draft.find((m) => m.id === id);
                                if (content) content.bookmarked = bookmarked;
                            })
                        );
                    }
                }
            });
        },
        [dispatch, pathname]
    );

    const postBookmarked = async ({ id, userId, contentType, documentID }) => {
        const res = await api.apiVideo.postBookmarked({
            data: {
                uid: userId + id + contentType,
                users_permissions_user: userId,
                [contentType]: documentID
            }
        });
        if (!res.success) throw new Error(res.error || 'Failed to post bookmark');
    };

    const deleteBookmarked = async ({ userId, id, contentType }) => {
        const getDocumentId = await api.apiVideo.getBookmarked(
            `?[filters][users_permissions_user][id][$eq]=${userId}&[filters][${contentType}][id][$eq]=${id}`
        );
        if (!getDocumentId.success) throw new Error(getDocumentId.error || 'Failed to get bookmark ID');
        const [{ documentId }] = getDocumentId.data.data;
        const deleted = await api.apiVideo.deleteBookmarked(documentId);
        if (!deleted.success) throw new Error(deleted.error || 'Failed to delete bookmark');
    };

    const handleBookmarked = useCallback(
        async ({ id, currentBookmarkedState, type, documentID }) => {
            const userId = Cookies.get('id');
            if (!userId) {
                setError(new Error('User ID not found'));
                return;
            }
            const contentType = type === 'Movie' ? 'movie' : 'series';

            setLoadingBookmarked((prev) => ({ ...prev, [id]: true }));
            updateCache(id, !currentBookmarkedState, type);

            try {
                if (currentBookmarkedState) {
                    await deleteBookmarked({ userId, id, contentType });
                } else {
                    await postBookmarked({ id, userId, contentType, documentID });
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
                updateCache(id, currentBookmarkedState, type);
            } finally {
                setLoadingBookmarked((prev) => ({ ...prev, [id]: false }));
            }
        },
        [updateCache]
    );

    return {
        loadingBookmarked,
        handleBookmarked,
        error
    };
};

export default useBookmark;
