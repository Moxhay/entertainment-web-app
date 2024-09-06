import PropTypes from 'prop-types'
import Header from './Header.jsx'

const Layout = ({ children }) => {
    return (
        <div className="mx-auto flex h-full min-h-screen overflow-hidden bg-primaryDarkBlue">
            <Header />
            <main className="py-5">{children}</main>
        </div>
    )
}

export default Layout
Layout.propTypes = {
    children: PropTypes.node,
}
