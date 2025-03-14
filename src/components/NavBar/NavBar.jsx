import NavBarDesktopView from './NavBarDesktopView.jsx';
import NavBarTabletView from './NavBarTabletView.jsx';
import NavBarMobileView from './NavBarMobileView.jsx';

export function NavBar() {
    return (
        <>
            <NavBarMobileView />
            <NavBarTabletView />
            <NavBarDesktopView />
        </>
    );
}
