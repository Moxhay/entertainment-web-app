import PropTypes from 'prop-types'

const NavButton = ({ href, logo }) => {
    return (
        <button>
            <a href={href}>{logo}</a>
        </button>
    )
}
export default NavButton
NavButton.propTypes = {
    href: PropTypes.string.isRequired,
    logo: PropTypes.element.isRequired,
}
