import NavBarDesktopView from './NavBarDesktopView.jsx'
import NavBarTabletView from './NavBarTabletView.jsx'
import NavBarMobileView from './NavBarMobileView.jsx'

const NavBar = () => {
    return (
        <div>
            <NavBarMobileView />
            <NavBarTabletView />
            <NavBarDesktopView />
        </div>
    )
}
export default NavBar
