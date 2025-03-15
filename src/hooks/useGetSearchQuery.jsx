import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useSearchQuery(setSearch) {
    const { pathname, search: queryString } = useLocation();
    const formikRef = useRef(undefined);
    const params = new URLSearchParams(queryString);
    const queryFromURL = decodeURIComponent(params.get('q') || '');

    useEffect(() => {
        if (queryFromURL !== '') {
            setSearch(queryFromURL);
            formikRef.current.resetForm({ values: { search: queryFromURL } });
        } else {
            setSearch('');
            formikRef.current.resetForm({ values: { search: '' } });
        }
    }, [queryFromURL, queryString, setSearch]);
    return {
        pathname,
        formikRef
    };
}
