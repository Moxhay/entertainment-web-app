import SearchIcon from '../assets/icons/SearchIcon.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef } from 'react'

const ValidationSchema = Yup.object().shape({
    search: Yup.string()
        .trim()
        .min(1, 'The search field cannot be empty')
        .max(100, 'Search query is too long (max 100 characters)')
        .required('Search is required'),
})
const SearchBar = ({ search, setSearch, disable }) => {
    const { pathname, search: queryString } = useLocation()
    const formikRef = useRef()
    const navigate = useNavigate()
    const params = new URLSearchParams(queryString)
    const queryFromURL = decodeURIComponent(params.get('q') || '')

    useEffect(() => {
        if (queryFromURL !== '') {
            setSearch(queryFromURL)
            formikRef.current.resetForm({ values: { search: queryFromURL } })
        } else {
            setSearch('')
            formikRef.current.resetForm({ values: { search: '' } })
        }
    }, [queryString, disable])
    const messages = {
        '/': 'Search for movies or TV series',
        '/Movies': 'Search for movies',
        '/TvSeries': 'Search for TV series',
        '/Bookmark': 'Search for bookmarked show',
    }
    const message = messages[pathname]
    const initialValues = {
        search: '',
    }
    const submitForm = (values) => {
        if (search !== values.search) {
            setSearch(values.search)
            navigate(`?q=${encodeURIComponent(values.search)}`)
        }
    }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={submitForm}
            validationSchema={ValidationSchema}
        >
            {(formik) => {
                const {
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    errors,
                    touched,
                } = formik

                return (
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-x-2 bg-origin-content pr-4 sm:min-w-[257px] md:min-w-[381px]"
                    >
                        <label className="flex">
                            <SearchIcon />
                            <input
                                disabled={disable}
                                type="text"
                                name="search"
                                id="search"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.search}
                                className="z-0 w-full border-none bg-primaryDarkBlue p-2 font-Inter text-sm text-primaryWhite placeholder-gray-400 caret-red-500 outline-none focus:border-b-2 focus:border-b-greyishBlue focus:text-primaryWhite focus:ring-0 active:text-primaryWhite disabled:cursor-not-allowed"
                                placeholder={message}
                            />
                        </label>

                        {errors.search && touched.search && (
                            <div className="pl-10 text-sm text-red-500">
                                {errors.search}
                            </div>
                        )}
                    </form>
                )
            }}
        </Formik>
    )
}

export default SearchBar
