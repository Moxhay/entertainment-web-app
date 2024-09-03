import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavButton = ({ to, logo }) => {
    return (
        <button>
            <Link to={to}>{logo}</Link>
        </button>
    )
}
export default NavButton
NavButton.propTypes = {
    to: PropTypes.string.isRequired,
    logo: PropTypes.element.isRequired,
}
