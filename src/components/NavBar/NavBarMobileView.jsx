import NavButton from './NavButton.jsx'
import MovieLogo from '../icons/MovieLogo.jsx'
import { useNavItems } from './NavButtons.jsx'

const NavBarMobileView = () => {
    const NavItems = useNavItems()
    return (
        <div className="flex h-full items-center justify-between bg-secondaryDarkBlue px-4 py-4 md:hidden">
            <NavButton logo={<MovieLogo />} to={'/'} />
            <div className="flex h-full items-center space-x-6">
                {NavItems.map(({ logo, path, name, color }) => {
                    const Icon = logo
                    return (
                        <NavButton
                            key={name}
                            logo={<Icon bg={color} />}
                            to={path}
                        />
                    )
                })}
            </div>
            <div>
                <img
                    src="/img/img.png"
                    alt="profile image"
                    className="h-full w-full"
                />
            </div>
        </div>
    )
}
export default NavBarMobileView
