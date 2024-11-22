import Cookies from 'js-cookie'
import ContentSection from '@components/ContentSection.jsx'

export const validateSlug = (slug) => {
    const decodedSlug = decodeURIComponent(slug)
    return (
        typeof decodedSlug === 'string' &&
        decodedSlug.length >= 1 &&
        decodedSlug.length <= 100
    )
}

export const fetchContentData = async ({
    endPoint,
    params,
    setData,
    dispatch,
}) => {
    try {
        const response = await endPoint(params)
        dispatch(setData(response.data))
    } catch (error) {
        console.error('Error:', error)
    }
}

export const submitForm = ({
    setLoading,
    ApiEndPoint,
    payload,
    navigate,
    setError,
}) => {
    setLoading(true)
    ApiEndPoint(payload)
        .then((response) => {
            setLoading(false)

            if (response) {
                Cookies.set('jwt', response.data.jwt, {
                    path: '/',
                    expires: 7,
                    secure: true,
                    sameSite: 'strict',
                }),
                    Cookies.set('id', response.data.user.id, {
                        path: '/',
                        expires: 7,
                        secure: true,
                        sameSite: 'strict',
                    })
                navigate('/')
            } else {
                throw new Error(response.error)
            }
        })
        .catch((error) => {
            setLoading(false)
            setError(true)
            console.error(error)
        })
}

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
        bookmarked: !!item.bookmarked,
    }))
}

export const bookmarkedStatus = ({
    loadingMovies,
    loadingSeries,
    moviesError,
    seriesError,
    seriesData,
    moviesData,
    messageWhenEmpty,
}) => {
    if (loadingMovies || loadingSeries)
        return (
            <ContentSection>
                <div>Loading...</div>
            </ContentSection>
        )
    if (moviesError || seriesError)
        return (
            <ContentSection>
                <div>Error loading movies or series</div>
            </ContentSection>
        )

    if (moviesData.length < 1 && seriesData.length < 1)
        return (
            <ContentSection>
                <p>{messageWhenEmpty}</p>
            </ContentSection>
        )
}

export const contentStatus = ({
    data,
    loading,
    trendingLoading,
    error,
    trendingError,
    messageWhenEmpty,
}) => {
    if (loading || trendingLoading)
        return (
            <ContentSection>
                <div>Loading...</div>
            </ContentSection>
        )
    if (error || trendingError)
        return (
            <ContentSection>
                <div>error...</div>
            </ContentSection>
        )
    if (data.length < 1)
        return (
            <ContentSection>
                <div>{messageWhenEmpty}</div>
            </ContentSection>
        )
}
