import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';


const PlayerList = ({ players, isLoading }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const formatPercentage = (value) => {
        return (value * 100).toFixed(1) + '%';
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <header className="h-24 bg-neutral-900">
                <div className="container mx-auto flex justify-between items-center h-full">
                    <h1 className="text-3xl text-white font-bold">Courtside Fantasy</h1>
                    <nav>
                        <a href="#login" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Login</a>
                        <Link to="/" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Home</Link>
                    </nav>
                </div>
            </header>
            <main className="p-5 flex flex-col items-center">
                <header className="flex flex-col items-center mb-5">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">NBA Player Statistics for 2023-24 Season</h2>
                </header>
                {isLoading ? (
                    <div className="text-2xl">Loading...</div>
                ) : (
                    <>
                        {selectedPlayer && <PlayerDetail player={selectedPlayer} />}
                        <table className="w-5/6 border-collapse mb-5">
                            <colgroup>
                                <col style={{ width: '14%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                            </colgroup>
                            <thead>
                            <tr>
                                {['Name', 'Ranking Score', 'Team', 'Position', 'Games Played', 'Minutes', 'Points', 'Threes', 'Rebounds',
                                    'Assists', 'Steals', 'Blocks', 'Field Goal %', 'Field Goal Attempts', 'Free Throw %',
                                    'Free Throw Attempts', 'Turnovers'].map((header) => (
                                    <th key={header}
                                        className="p-2 border text-center uppercase text-sm bg-orange-600 text-white">{header}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {players.map(player => (
                                <tr key={player.id} onClick={() => handlePlayerClick(player)}
                                    className="hover:bg-neutral-600 cursor-pointer">
                                    <td className="p-2 border text-center">{player.firstName} {player.lastName}</td>
                                    <td className="p-2 border text-center">{player.rankingScore.toFixed(2)}</td>
                                    <td className="p-2 border text-center">{player.teamAbbreviation}</td>
                                    <td className="p-2 border text-center">{player.position}</td>
                                    <td className="p-2 border text-center">{player.gamesPlayed}</td>
                                    <td className="p-2 border text-center">{player.minutesPerGame}</td>
                                    <td className="p-2 border text-center">{player.pointsPerGame.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{player.threePointsMade.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{player.rebounds.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{player.assistsPerGame.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{player.stealsPerGame.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{player.blocksPerGame.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{formatPercentage(player.fieldGoalPercentage)}</td>
                                    <td className="p-2 border text-center">{player.fieldGoalsAttempted.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{formatPercentage(player.freeThrowPercentage)}</td>
                                    <td className="p-2 border text-center">{player.freeThrowsAttempted.toFixed(1)}</td>
                                    <td className="p-2 border text-center">{player.turnoversPerGame.toFixed(1)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}
            </main>
        </div>
    );
};

export default PlayerList;


