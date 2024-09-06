import NavButton from './NavButton.jsx'
import MovieLogo from '../icons/MovieLogo.jsx'
import { useNavItems } from './NavButtons.jsx'

const NavBarTabletView = () => {
    const NavItems = useNavItems()
    return (
        <div className="hidden h-20 px-5 pt-5 md:flex xl:hidden">
            <div className="flex h-full w-full items-center justify-between rounded-xl bg-secondaryDarkBlue px-5">
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
                        width="32px"
                        height="32px"
                        src="/img/img.png"
                        alt="profile image"
                    />
                </div>
            </div>
        </div>
    )
}

export default NavBarTabletView
