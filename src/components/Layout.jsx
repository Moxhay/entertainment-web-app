import PropTypes from 'prop-types'
import Header from './NavBar/Header.jsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="mx-auto flex h-full min-h-screen w-full flex-col overflow-hidden bg-primaryDarkBlue sm:flex-col xl:flex-row">
            <div className="flex">
                <Header />
            </div>

            <main className="flex h-full w-full flex-col py-5 xl:pl-40 xl:pt-5">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
Layout.propTypes = {
    children: PropTypes.node,
}
