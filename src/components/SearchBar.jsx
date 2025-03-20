import SearchIcon from '../assets/icons/SearchIcon.jsx';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSearchQuery } from '@hooks/useGetSearchQuery.jsx';
import PropTypes from 'prop-types';

const ValidationSchema = Yup.object().shape({
    search: Yup.string()
        .trim()
        .min(1, 'The search field cannot be empty')
        .max(100, 'Search query is too long (max 100 characters)')
        .required('Search is required')
});

export function SearchBar({ search, setSearch }) {
    const navigate = useNavigate();
    const { pathname, formikRef } = useSearchQuery(setSearch);
    const messages = {
        '/': 'Search for movies or TV series',
        '/Movies': 'Search for movies',
        '/Series': 'Search for TV series',
        '/Bookmark': 'Search for bookmarked show'
    };
    const message = messages[pathname];
    const initialValues = {
        search: ''
    };
    const submitForm = (values) => {
        if (search !== values.search) {
            setSearch(values.search);
            if (search !== values.search) {
                setSearch(values.search);
                const newQuery = `?q=${encodeURIComponent(values.search)}`;

                if (pathname.includes('/search')) {
                    navigate(`${pathname.split('?')[0]}${newQuery}`);
                    return;
                }

                if (pathname === '/') {
                    navigate(`${pathname}search${newQuery}`);
                } else {
                    navigate(`${pathname}/search${newQuery}`);
                }
            }
        }
    };

    return (
        <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={submitForm} validationSchema={ValidationSchema}>
            {(formik) => {
                const { values, handleChange, handleSubmit, errors, touched } = formik;

                return (
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-x-2 bg-origin-content pr-4 sm:min-w-[257px] md:min-w-[381px]"
                    >
                        <label className="flex">
                            <SearchIcon />
                            <input
                                type="text"
                                name="search"
                                id="search"
                                onChange={handleChange}
                                value={values.search}
                                className="bg-primaryDarkBlue font-Inter text-primaryWhite focus:border-b-greyishBlue focus:text-primaryWhite active:text-primaryWhite z-0 w-full border-none p-2 text-sm placeholder-gray-400 caret-red-500 outline-hidden focus:border-b-2 focus:ring-0 disabled:cursor-not-allowed"
                                placeholder={message}
                            />
                        </label>

                        {errors.search && touched.search && <div className="pl-10 text-sm text-red-500">{errors.search}</div>}
                    </form>
                );
            }}
        </Formik>
    );
}

SearchBar.propTypes = {
    setSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired
};
