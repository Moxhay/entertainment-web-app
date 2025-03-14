import { Link } from 'react-router-dom'

export const AuthFooter = ({ message, linkPath, linkMessage }) => {
    return (
        <div className="flex justify-center gap-1 font-Inter text-sm font-extralight">
            <p className="text-primaryWhite">{message}</p>
            <Link className="text-primaryRed!" to={linkPath}>
                {linkMessage}
            </Link>
        </div>
    )
}
