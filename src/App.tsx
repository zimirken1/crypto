import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import CryptTablePage from './pages/CryptTablePage/CryptTablePage';
import CryptocurrencyPage from './pages/CryptocurrencyPage/CryptocurrencyPage';
import Navbar from './components/UI/Navbar/Navbar';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<CryptTablePage />} />
                <Route path="/:id" element={<CryptocurrencyPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
