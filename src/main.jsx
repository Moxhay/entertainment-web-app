import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
    return null
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </StrictMode>
)
