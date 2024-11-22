import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/api.js'
import { validateSlug } from '../helpers.jsx'
import ContentSection from './ContentSection.jsx'

const MoviesTvSeriesContent = () => {
    const [content, setContent] = useState([])
    const { slug } = useParams()
    useEffect(() => {
        if (validateSlug(slug)) {
            const fetchMovieData = () => {
                api.apiVideo
                    .movies(`?populate=*&filters[title][$containsi]=${slug}`)
                    .then((response) => {
                        setContent(response.data.data)
                        console.log(content)
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                    })
            }
            fetchMovieData()
        } else {
            console.error('Invalid Slug:', validateSlug(slug))
        }
    }, [])
    return (
        <ContentSection>
            {content.map((item) => {
                const { movie_path } = item
                return (
                    <div className="px-10" key={item.id}>
                        <video
                            className="w-[950px]"
                            src={movie_path.url}
                            controls
                        ></video>
                    </div>
                )
            })}
        </ContentSection>
    )
}

export default MoviesTvSeriesContent
