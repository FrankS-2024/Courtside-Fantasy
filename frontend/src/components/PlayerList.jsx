import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';
import './PlayerList.css';

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
        <div className="player-list">
            <header className="player-list-header">
                <h1>NBA Player Statistics for 2023-24 Season</h1>
                <Link to="/" className="bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform hover:scale-105">Back to Home</Link>
            </header>
            {selectedPlayer && <PlayerDetail player={selectedPlayer} />}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Points</th>
                    <th>Threes</th>
                    <th>Rebounds</th>
                    <th>Assists</th>
                    <th>Steals</th>
                    <th>Blocks</th>
                    <th>Field Goal %</th>
                    <th>Field Goal Attempts</th>
                    <th>Free Throw %</th>
                    <th>Free Throw Attempts</th>
                    <th>Turnovers</th>
                    <th>Minutes</th>
                    <th>Games Played</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr key={player.id} onClick={() => handlePlayerClick(player)}>
                        <td>{player.firstName} {player.lastName}</td>
                        <td>{player.teamAbbreviation}</td>
                        <td>{player.position}</td>
                        <td>{player.pointsPerGame}</td>
                        <td>{player.threePointsMade}</td>
                        <td>{player.rebounds}</td>
                        <td>{player.assistsPerGame}</td>
                        <td>{player.stealsPerGame}</td>
                        <td>{player.blocksPerGame}</td>
                        <td>{formatPercentage(player.fieldGoalPercentage)}</td>
                        <td>{player.fieldGoalsAttempted}</td>
                        <td>{formatPercentage(player.freeThrowPercentage)}</td>
                        <td>{player.freeThrowsAttempted}</td>
                        <td>{player.turnoversPerGame}</td>
                        <td>{player.minutesPerGame}</td>
                        <td>{player.gamesPlayed}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerList;
