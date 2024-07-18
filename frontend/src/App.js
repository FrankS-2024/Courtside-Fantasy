import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import LandingPage from './components/LandingPage';
import TradeAnalyzer from './components/TradeAnalyzerPage';
import Login from './components/Login';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/players" element={<PlayerList />} />
                    <Route path="/trade" element={<TradeAnalyzer />} />
                    <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;