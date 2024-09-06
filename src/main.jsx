import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Layout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Movies from './components/Movies.jsx'
import TvShow from './components/TvShow.jsx'
import Bookmarked from './components/Bookmarked.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Movies" element={<Movies />} />
                    <Route path="/TvShow" element={<TvShow />} />
                    <Route path="/Bookmark" element={<Bookmarked />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </StrictMode>
)
