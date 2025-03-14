import NavButton from './NavButton.jsx';
import MovieLogo from '../../assets/icons/MovieLogo.jsx';
import { useNavItems } from './NavButtons.jsx';
import { SignOut } from '@components/SignOut.jsx';

const NavBarDesktopView = () => {
    const NavItems = useNavItems();

    return (
        <div className="pointer-events-none fixed z-50 hidden h-svh w-full px-8 py-8 xl:flex">
            <div className="bg-secondaryDarkBlue flex h-full w-24 flex-col rounded-2xl pt-8 pb-7">
                <div className="flex h-full w-full flex-col items-center gap-y-16">
                    <NavButton logo={<MovieLogo width={'xl'} />} to={'/'} />
                    <div className="flex h-full flex-col gap-y-10">
                        {NavItems.map(({ logo, path, name, color }) => {
                            const Icon = logo;
                            return <NavButton key={name} logo={<Icon bg={color} />} to={path} />;
                        })}
                    </div>
                </div>

                <SignOut />
            </div>
        </div>
    );
};
export default NavBarDesktopView;
