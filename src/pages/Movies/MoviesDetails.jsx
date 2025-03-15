import { useGetSingleMovieQuery } from '@/api/moviesApi.js';
import { TransitionEnterExit } from '@components/Transitions/TransitionEnterExitVariants/TransitionEnterExit.jsx';
import { useParams } from 'react-router-dom';
import ContentSection from '@components/ContentSection.jsx';
import { contentStatus } from '@/helpers.jsx';
import { VideoPlayer } from '@components/VideoPlayer/VideoPlayer.jsx';

export const MoviesDetails = () => {
    const { title } = useParams();
    const { data: movies, error, isLoading } = useGetSingleMovieQuery(title);

    const status = contentStatus({ isLoading, error });
    if (status) return status;
    return (
        <ContentSection>
            <TransitionEnterExit>
                {movies.map((movie) => (
                    <div key={movie.id} className="md:item flex h-full w-full flex-wrap gap-4 xl:pr-3">
                        <VideoPlayer
                            src={movie.movie_Url?.url}
                            tittle={movie.title}
                            className="3xl:h-[85vh] group relative aspect-video h-fit w-full rounded-2xl bg-black object-contain lg:h-[80vh]"
                            classNameIsFullScreen="h-full"
                            isLoading={isLoading}
                        />
                        <div className="flex h-full w-full flex-col">
                            <h1 className="text-primaryWhite text-3xl font-bold">{movie.title}</h1>
                            <div className="relative flex max-w-5xl flex-col gap-2">
                                <div className="text-primaryWhite flex items-center gap-2 text-lg">
                                    <p>{movie.release_date}</p>
                                    <div className="bg-primaryWhite h-1.5 w-1.5 rounded-full"></div>
                                    <p>{movie.rated}</p>
                                </div>
                                <p className="text-primaryWhite text-base">{movie.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </TransitionEnterExit>
        </ContentSection>
    );
};
