import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

    return (
        <div>
            <h1>NBA Players</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Points Per Game</th>
                    <th>Three Points Made</th>
                    <th>Rebounds</th>
                    <th>Assists Per Game</th>
                    <th>Steals Per Game</th>
                    <th>Blocks Per Game</th>
                    <th>Field Goal Percentage</th>
                    <th>Field Goals Attempted</th>
                    <th>Free Throw Percentage</th>
                    <th>Free Throws Attempted</th>
                    <th>Turnovers Per Game</th>
                    <th>Minutes Per Game</th>
                    <th>Games Played</th>
                    <th>Season</th>
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
                        <td>{player.fieldGoalPercentage}</td>
                        <td>{player.fieldGoalsAttempted}</td>
                        <td>{player.freeThrowPercentage}</td>
                        <td>{player.freeThrowsAttempted}</td>
                        <td>{player.turnoversPerGame}</td>
                        <td>{player.minutesPerGame}</td>
                        <td>{player.gamesPlayed}</td>
                        <td>{player.season}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedPlayer && <PlayerDetail player={selectedPlayer} />}
        </div>
    );
};

export default PlayerList;