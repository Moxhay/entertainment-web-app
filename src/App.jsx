import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import TvSeries from './pages/TvSeries.jsx'
import Bookmarked from './pages/Bookmarked.jsx'
import MoviesTvSeriesContent from './components/MoviesTvSeriesContent.jsx'
import SingUp from './pages/SingUp.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Login from './pages/Login.jsx'

function App() {
    return (
        <Routes>
            {/*<Route path="*" element={<Navigate to="/" />} />*/}
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
                <Route path="/Movies" element={<Movies />} />
                <Route path="/TvSeries" element={<TvSeries />} />
                <Route path="/Bookmark" element={<Bookmarked />} />
                <Route
                    path="/Movies/:slug"
                    element={<MoviesTvSeriesContent />}
                />
            </Route>
        </Routes>
    )
}

export default App
