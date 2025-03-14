import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { Home } from './pages/Home/Home.jsx';
import Movies from './pages/Movies/Movies.jsx';
import TvSeries from './pages/Series/TvSeries.jsx';
import { Bookmarked } from './pages/Bookmarked/Bookmarked.jsx';
import SingUp from './pages/Auth/SingUp.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './pages/Auth/Login.jsx';
import { AnimatePresence } from 'framer-motion';
import { HomeSearchView } from '@/pages/Home/HomeSearchView.jsx';
import { SeriesDetails } from '@/pages/Series/SeriesDetails.jsx';
import { MoviesDetails } from '@/pages/Movies/MoviesDetails.jsx';
import { MoviesSearchView } from '@/pages/Movies/MoviesSearchView.jsx';
import { SeriesSearchView } from '@/pages/Series/SeriesSearchView.jsx';
import { BookmarkedSearchView } from '@/pages/Bookmarked/BookmarkedSearchView.jsx';

function App() {
    const location = useLocation();
    const { pathname, search } = location;
    return (
        <AnimatePresence mode={'wait'}>
            <Routes location={location} key={pathname + search}>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/SingUp" element={<SingUp />} />
                <Route path="/Login" element={<Login />} />

                <Route
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/" element={<Home />} />
                    <Route path={`/search`} element={<HomeSearchView />} />
                    <Route path="/Movies" element={<Movies />} />
                    <Route path="/Movies/search" element={<MoviesSearchView />} />
                    <Route path="/Series" element={<TvSeries />} />
                    <Route path={`/Series/search`} element={<SeriesSearchView />} />
                    <Route path="/Bookmark" element={<Bookmarked />} />
                    <Route path="/Bookmark/search" element={<BookmarkedSearchView />} />
                    <Route path="/Movies/:title/:documentId" element={<MoviesDetails />} />
                    <Route path="/Series/:title/:documentId" element={<SeriesDetails />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

export default App;
