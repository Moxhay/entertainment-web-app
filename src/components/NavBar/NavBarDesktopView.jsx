import NavButton from './NavButton.jsx'
import MovieLogo from '../icons/MovieLogo.jsx'
import { useNavItems } from './NavButtons.jsx'
import BookmarkedButton from '../icons/BookmarkedButton.jsx'

const NavBarDesktopView = () => {
    const NavItems = useNavItems()

    return (
        <div className="hidden h-svh w-full px-10 py-5 xl:flex">
            <div className="flex h-full w-24 flex-col rounded-2xl bg-secondaryDarkBlue pb-7 pt-8">
                <div className="flex h-full w-full flex-col items-center gap-y-16">
                    <NavButton logo={<MovieLogo />} to={'/'} />
                    <div className="flex h-full flex-col gap-y-10">
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
                </div>

                <div className="flex justify-center">
                    <img
                        width="32px"
                        height="32px"
                        src="/img/img.png"
                        alt="profile image"
                    />
                </div>
                <BookmarkedButton />
            </div>
        </div>
    )
}
export default NavBarDesktopView
