import NavBarDesktopView from './NavBarDesktopView.jsx'
import NavBarTabletView from './NavBarTabletView.jsx'
import NavBarMobileView from './NavBarMobileView.jsx'

const NavBar = () => {
    return (
        <>
            <NavBarMobileView />
            <NavBarTabletView />
            <NavBarDesktopView />
        </>
    )
}
export default NavBar
