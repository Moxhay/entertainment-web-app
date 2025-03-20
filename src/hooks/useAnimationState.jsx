import { useEffect, useState } from 'react';

export function useAnimationState(data, query, loadingBookmarked) {
    const [olData, setOldData] = useState([]);
    const [title, setTitle] = useState('');
    const [isAnimationComplete, setIsAnimationComplete] = useState(true);
    useEffect(() => {
        if (isAnimationComplete) {
            setOldData(data);
            setTitle(query);
        }
    }, [data, isAnimationComplete, query]);

    useEffect(() => {
        if (loadingBookmarked) {
            setOldData(data);
            setTitle(query);
        }
    }, [loadingBookmarked, data, query]);
    return {
        setIsAnimationComplete,
        isAnimationComplete,
        title,
        olData
    };
}
