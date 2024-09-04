import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavButton = ({ to, logo }) => {
    return (
        <Link to={to} className="hover:cursor-pointer">
            {logo}
        </Link>
    )
}
export default NavButton
NavButton.propTypes = {
    to: PropTypes.string.isRequired,
    logo: PropTypes.element.isRequired,
}
