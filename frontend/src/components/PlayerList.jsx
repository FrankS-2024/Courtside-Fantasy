import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/api/players')  // Adjust the URL if your backend is hosted differently
            .then(response => {
                setPlayers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the player data!', error);
            });
    }, []);

    return (
        <div>
            <h1>NBA Players</h1>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        {player.firstName} {player.lastName} - {player.teamAbbreviation} - {player.position} - {player.pointsPerGame} PPG
                        {/* Add other fields as necessary */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;