import MovieLogo from '../../assets/icons/MovieLogo.jsx'
import PropTypes from 'prop-types'

export const FormWrapper = ({ children }) => {
    return (
        <div className="flex min-h-screen w-full flex-col items-center overflow-hidden bg-primaryDarkBlue px-6">
            <div className="relative flex items-center justify-center pb-16 pt-12 md:pt-16">
                <MovieLogo width={'xl'} />
            </div>
            {children}
        </div>
    )
}
FormWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}
