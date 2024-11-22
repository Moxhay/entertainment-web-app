import { useEffect, useState } from 'react'
import { transformResponse } from '../helpers.jsx'

const useFetchData = ({ endpoint, param }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                setIsLoading(true)
                setError(false)

                const res = await endpoint(param)

                if (!res.success) {
                    new Error(res.error)
                }

                setData(transformResponse(res.data))

                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setError(true)
                setIsLoading(false)
            }
        })()
    }, [endpoint, param])
    return {
        isLoading,
        data,
        error,
    }
}

export default useFetchData
