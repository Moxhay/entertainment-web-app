import PropTypes from 'prop-types';
import Header from './NavBar/Header.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="bg-primaryDarkBlue mx-auto flex h-full min-h-screen w-full flex-col overflow-hidden sm:flex-col xl:flex-row">
            <>
                <Header />
            </>

            <main className="flex h-full w-full flex-col py-5 xl:pt-5 xl:pl-40">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
Layout.propTypes = {
    children: PropTypes.node
};
