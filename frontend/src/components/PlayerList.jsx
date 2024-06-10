import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        axios.get('/api/get-players')
            .then(response => {
                console.log(response.data); // Log the response data
                setPlayers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the player data!", error);
            });
    }, []);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
    };

    const formatPercentage = (value) => {
        return (value * 100).toFixed(2).replace(/\.?0+$/, '') + '%';
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <header className="h-24 bg-neutral-900">
                <div className="container mx-auto flex justify-between items-center h-full">
                    <h1 className="text-3xl text-white font-bold">CourtSide Fantasy</h1>
                    <nav>
                        <a href="#login" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Login</a>
                        <Link to="/" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Home</Link>
                    </nav>
                </div>
            </header>
            <main className="p-5 flex flex-col items-center">
                <header className="flex flex-col items-center mb-5">
                    <h1 className="text-4xl font-bold text-blue-500 mb-4">NBA Player Statistics for 2023-24 Season</h1>
                </header>
                {selectedPlayer && <PlayerDetail player={selectedPlayer} />}
                <table className="w-4/5 border-collapse mb-5">
                    <thead className="bg-gray-200">
                    <tr>
                        {['Name', 'Team', 'Position', 'Points', 'Threes', 'Rebounds', 'Assists', 'Steals', 'Blocks', 'Field Goal %', 'Field Goal Attempts', 'Free Throw %', 'Free Throw Attempts', 'Turnovers', 'Minutes', 'Games Played'].map((header) => (
                            <th key={header} className="p-2 border text-center uppercase text-sm bg-blue-500 text-white">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {players.map(player => (
                        <tr key={player.id} onClick={() => handlePlayerClick(player)} className="hover:bg-neutral-600 cursor-pointer">
                            <td className="p-2 border text-center">{player.firstName} {player.lastName}</td>
                            <td className="p-2 border text-center">{player.teamAbbreviation}</td>
                            <td className="p-2 border text-center">{player.position}</td>
                            <td className="p-2 border text-center">{player.pointsPerGame}</td>
                            <td className="p-2 border text-center">{player.threePointsMade}</td>
                            <td className="p-2 border text-center">{player.rebounds}</td>
                            <td className="p-2 border text-center">{player.assistsPerGame}</td>
                            <td className="p-2 border text-center">{player.stealsPerGame}</td>
                            <td className="p-2 border text-center">{player.blocksPerGame}</td>
                            <td className="p-2 border text-center">{formatPercentage(player.fieldGoalPercentage)}</td>
                            <td className="p-2 border text-center">{player.fieldGoalsAttempted}</td>
                            <td className="p-2 border text-center">{formatPercentage(player.freeThrowPercentage)}</td>
                            <td className="p-2 border text-center">{player.freeThrowsAttempted}</td>
                            <td className="p-2 border text-center">{player.turnoversPerGame}</td>
                            <td className="p-2 border text-center">{player.minutesPerGame}</td>
                            <td className="p-2 border text-center">{player.gamesPlayed}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default PlayerList;
