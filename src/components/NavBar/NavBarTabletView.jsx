import NavButton from './NavButton.jsx';
import MovieLogo from '../../assets/icons/MovieLogo.jsx';
import { useNavItems } from './NavButtons.jsx';
import { SignOut } from '@components/SignOut.jsx';

const NavBarTabletView = () => {
    const NavItems = useNavItems();
    return (
        <div className="hidden h-20 w-svw px-5 pt-5 md:flex xl:hidden">
            <div className="bg-secondaryDarkBlue flex h-full w-full items-center justify-between rounded-xl px-5">
                <NavButton logo={<MovieLogo width={'xl'} />} to={'/'} />
                <div className="flex h-full items-center space-x-6">
                    {NavItems.map(({ logo, path, name, color }) => {
                        const Icon = logo;
                        return <NavButton key={name} logo={<Icon bg={color} />} to={path} />;
                    })}
                </div>

                <SignOut />
            </div>
        </div>
    );
};

export default NavBarTabletView;
