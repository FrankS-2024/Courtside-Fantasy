import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CompactPlayerDetail from './CompactPlayerDetail';
import SearchableDropdown from './SearchableDropdown';

const TradeAnalyzer = ({ players }) => {
    const [tradingAway, setTradingAway] = useState([]);
    const [receiving, setReceiving] = useState([]);
    const [tradeResult, setTradeResult] = useState(null);

    const handleSelectPlayer = (playerId, isTradingAway) => {
        const selectedPlayer = players.find(p => p.id === playerId);
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

    // Filter out players already selected in tradingAway or receiving
    const availablePlayers = players.filter(
        player => !tradingAway.some(p => p.id === player.id) && !receiving.some(p => p.id === player.id)
    );

    return (
        <div className="bg-neutral-900 min-h-screen">
            <div className="container mx-auto flex justify-between items-center h-24">
                <a href="#" className="text-3xl bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text font-bold leading-tight">Courtside Fantasy</a>
                <nav>
                    <a href="#login" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Login</a>
                    <Link to="/" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Home</Link>
                    <Link to="/players" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Player Rankings</Link>
                </nav>
            </div>
            <header className="bg-neutral-900 text-white text-center py-12">
                <h1 className="text-4xl text-orange-600 font-bold">Trade Analyzer</h1>
                <p className="text-xl mt-4">Evaluate your trades to make the best decisions for your fantasy basketball team.</p>
            </header>
            <main className="container mx-auto my-12 p-6 bg-neutral-900">
                <section id="trade-input" className="mb-12">
                    <h2 className="text-3xl text-white font-semibold mb-6">Enter Your Trade Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-2xl text-white font-semibold mb-2">Players you're trading</h3>
                            <div className="bg-neutral-900 p-4 rounded flex flex-wrap justify-start">
                                {tradingAway.map(player => (
                                    <div key={player.id} className="p-3 pt-0" style={{ maxWidth: '350px' }}>
                                        <CompactPlayerDetail player={player} />
                                        <button onClick={() => handleRemovePlayer(player.id, true)} className="text-red-500">Remove</button>
                                    </div>
                                ))}
                                <SearchableDropdown
                                    players={availablePlayers}
                                    onSelect={(playerId) => handleSelectPlayer(playerId, true)}
                                    placeholder="Select a player..."
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl text-white font-semibold mb-2">Players you're getting</h3>
                            <div className="bg-neutral-900 p-4 rounded flex flex-wrap justify-start">
                                {receiving.map(player => (
                                    <div key={player.id} className="p-3 pt-0" style={{ maxWidth: '350px' }}>
                                        <CompactPlayerDetail player={player} />
                                        <button onClick={() => handleRemovePlayer(player.id, false)} className="text-red-500">Remove</button>
                                    </div>
                                ))}
                                <SearchableDropdown
                                    players={availablePlayers}
                                    onSelect={(playerId) => handleSelectPlayer(playerId, false)}
                                    placeholder="Select a player..."
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={analyzeTrade}
                        className="mt-6 bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-800"
                    >
                        Analyze Trade
                    </button>
                </section>
                {tradeResult !== null && (
                    <section id="trade-analysis">
                        <h2 className="text-2xl text-white font-semibold mb-6">Trade Analysis</h2>
                        <div className="bg-neutral-900 text-white p-4 rounded">
                            <p className="text-lg font-bold">Difference in Ranking Scores: <span className="text-2xl">{tradeResult.scoreDifference.toFixed(2)}</span></p>
                            {tradeResult.scoreDifference > 1.0 ? (
                                <p className="text-green-500 font-bold mt-4">This trade improves your team!</p>
                            ) : tradeResult.scoreDifference < -1.0 ? (
                                <p className="text-red-500 font-bold mt-4">This trade may weaken your team.</p>
                            ) : (
                                <p className="text-yellow-500 font-bold mt-4">This trade is fair. Consider the changes it makes to your team and if those are necessary.</p>
                            )}
                            <hr className="my-4"/>
                            {Object.entries(tradeResult).map(([key, value]) => (
                                key !== "scoreDifference" && (
                                    <p key={key}>
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: <span className="font-bold">{value.toFixed(2)}</span>
                                    </p>
                                )
                            ))}
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
