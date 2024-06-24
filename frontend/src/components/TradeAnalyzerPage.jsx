import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TradeAnalyzer = ({ players }) => {
    const [tradingAway, setTradingAway] = useState([]);
    const [receiving, setReceiving] = useState([]);
    const [tradeResult, setTradeResult] = useState(null);

    const handleSelectPlayer = (playerId, isTradingAway) => {
        const selectedPlayer = players.find(p => p.id === parseInt(playerId));
        if (selectedPlayer) {
            if (isTradingAway) {
                setTradingAway(prev => [...prev, selectedPlayer]);
            } else {
                setReceiving(prev => [...prev, selectedPlayer]);
            }
        }
    };

    const handleRemovePlayer = (playerId, isTradingAway) => {
        if (isTradingAway) {
            setTradingAway(prev => prev.filter(p => p.id !== playerId));
        } else {
            setReceiving(prev => prev.filter(p => p.id !== playerId));
        }
    };

    const analyzeTrade = async () => {
        try {
            const response = await axios.post('/api/analyze-trade', {
                tradingAwayIds: tradingAway.map(player => player.id),
                receivingIds: receiving.map(player => player.id)
            });
            setTradeResult(response.data);
        } catch (error) {
            console.error('Error analyzing trade:', error);
        }
    };

    return (
        <div className="bg-neutral-900 min-h-screen">
            <nav className="bg-neutral-900 text-white p-4 sticky top-0">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="#" className="text-xl font-bold">Courtside Fantasy</a>
                    <div>
                        <Link to="/" className="mx-2 hover:text-gray-300">Home</Link>
                        <Link to="/players" className="mx-2 hover:text-gray-300">Player Rankings</Link>
                        <a href="#" className="mx-2 hover:text-gray-300">Login</a>
                    </div>
                </div>
            </nav>
            <header className="bg-neutral-900 text-white text-center py-12">
                <h1 className="text-4xl font-bold">Trade Analyzer</h1>
                <p className="mt-4">Evaluate your trades to make the best decisions for your fantasy basketball team.</p>
            </header>
            <main className="container mx-auto my-12 p-6 bg-neutral-900 rounded shadow-lg">
                <section id="trade-input" className="mb-12">
                    <h2 className="text-2xl text-white font-semibold mb-6">Enter Your Trade Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl text-white font-semibold mb-2">Your Players</h3>
                            <div className="bg-neutral-900 p-4 rounded">
                                {tradingAway.map(player => (
                                    <div key={player.id} className="flex items-center text-white font-semibold justify-between mb-2">
                                        <div className="flex items-center">
                                            <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`} className="w-10 h-10 rounded-full mr-4" />
                                            <span>{player.firstName} {player.lastName}</span>
                                        </div>
                                        <button onClick={() => handleRemovePlayer(player.id, true)} className="text-red-500">Remove</button>
                                    </div>
                                ))}
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => handleSelectPlayer(e.target.value, true)}
                                >
                                    <option value="">Select a player...</option>
                                    {players.map(player => (
                                        <option key={player.id} value={player.id}>{player.firstName} {player.lastName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl text-white font-semibold mb-2">Receiving Players</h3>
                            <div className="bg-neutral-900 p-4 rounded">
                                {receiving.map(player => (
                                    <div key={player.id} className="flex items-center text-white font-semibold justify-between mb-2">
                                        <div className="flex items-center">
                                            <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`} className="w-10 h-10 rounded-full mr-4" />
                                            <span>{player.firstName} {player.lastName}</span>
                                        </div>
                                        <button onClick={() => handleRemovePlayer(player.id, false)} className="text-red-500">Remove</button>
                                    </div>
                                ))}
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    onChange={(e) => handleSelectPlayer(e.target.value, false)}
                                >
                                    <option value="">Select a player...</option>
                                    {players.map(player => (
                                        <option key={player.id} value={player.id}>{player.firstName} {player.lastName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={analyzeTrade}
                        className="mt-6 bg-orange-600 text-white py-2 px-4 rounded hover:bg-blue-800"
                    >
                        Analyze Trade
                    </button>
                </section>
                {tradeResult !== null && (
                    <section id="trade-analysis">
                        <h2 className="text-2xl text-white font-semibold mb-6">Trade Analysis</h2>
                        <div className="bg-neutral-900 text-white p-4 rounded">
                            <p>Difference in Ranking Scores: <span className="font-bold">{tradeResult}</span></p>
                            {tradeResult > 0 ? (
                                <p className="text-green-500 font-bold mt-4">This trade improves your team!</p>
                            ) : (
                                <p className="text-red-500 font-bold mt-4">This trade may weaken your team.</p>
                            )}
                        </div>
                    </section>
                )}
            </main>
            <footer className="bg-neutral-900 text-white text-center py-4">
                <div className="container mx-auto">
                    <p>&copy; 2024 Courtside Fantasy. All rights reserved.</p>
                    <div className="mt-2">
                        <a href="#" className="mx-2 hover:text-gray-300">Contact</a>
                        <a href="#" className="mx-2 hover:text-gray-300">Privacy Policy</a>
                        <a href="#" className="mx-2 hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TradeAnalyzer;
