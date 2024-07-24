import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import axios from './components/axios';
import PlayerList from './components/PlayerList';
import LandingPage from './components/LandingPage';
import TradeAnalyzer from './components/TradeAnalyzerPage';
import Login from './components/Login';
import { AuthProvider } from './components/AuthContext';

function App() {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // First, call the rank-players API to ensure the rankings are calculated
        axios.get('/api/rank-players')
            .then(() => {
                // Then, fetch the players
                axios.get('/api/get-players')
                    .then(response => {
                        const playersWithScores = response.data.filter(player => player.rankingScore !== undefined);
                        // Sort players by ranking score in descending order
                        const sortedPlayers = playersWithScores.sort((a, b) => b.rankingScore - a.rankingScore);
                        setPlayers(sortedPlayers);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error("There was an error fetching the player data!", error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("There was an error ranking the players!", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/players" element={<PlayerList players={players} isLoading={isLoading} />} />
                    <Route path="/trade" element={<TradeAnalyzer players={players} />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;