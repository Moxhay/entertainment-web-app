import PropTypes from 'prop-types'
import Header from './components/Header.jsx'

const Layout = ({ children }) => {
    return (
        <div className="h-full min-h-screen w-full bg-primaryDarkBlue">
            <Header />
            <main>{children}</main>
        </div>
    )
}

export default Layout
Layout.propTypes = {
    children: PropTypes.node,
}
