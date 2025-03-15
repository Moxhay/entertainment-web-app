import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export function useSearchQuery() {
    const [search, setSearch] = useState('');
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    useEffect(() => {
        setSearch(query);
    }, [query]);
    if (!searchParams || searchParams.get('q').length === 0) {
        return <Navigate to="/" />;
    }
    return {
        search,
        setSearch,
        query
    };
}
