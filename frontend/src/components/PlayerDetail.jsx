import React from 'react';
import './PlayerDetail.css';

const PlayerDetail = ({ player }) => {

    const formatPercentage = (value) => {
        return (value * 100).toFixed(2).replace(/\.?0+$/, '') + '%';
    };

        return (
            <div className="player-detail">
                <h2>{player.firstName} {player.lastName}</h2>
                <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`} className="player-image"/>
                <p>Team: {player.teamAbbreviation}</p>
                <p>Position: {player.position}</p>
                <p>Points Per Game: {player.pointsPerGame}</p>
                <p>Three Points Made: {player.threePointsMade}</p>
                <p>Three Point Percentage: {formatPercentage(player.threePointPercentage)}</p>
                <p>Three Points Attempted: {player.threePointsAttempted}</p>
                <p>Rebounds: {player.rebounds}</p>
                <p>Assists Per Game: {player.assistsPerGame}</p>
                <p>Steals Per Game: {player.stealsPerGame}</p>
                <p>Blocks Per Game: {player.blocksPerGame}</p>
                <p>Field Goal Percentage: {formatPercentage(player.fieldGoalPercentage)}</p>
                <p>Field Goals Made: {player.fieldGoalsMade}</p>
                <p>Field Goals Attempted: {player.fieldGoalsAttempted}</p>
                <p>Free Throw Percentage: {formatPercentage(player.freeThrowPercentage)}</p>
                <p>Free Throws Made: {player.freeThrowsMade}</p>
                <p>Free Throws Attempted: {player.freeThrowsAttempted}</p>
                <p>Turnovers Per Game: {player.turnoversPerGame}</p>
                <p>Minutes Per Game: {player.minutesPerGame}</p>
                <p>Games Played: {player.gamesPlayed}</p>
                <p>Season: {player.season + "-" + (player.season-1999)}</p>
            </div>
        );
};

export default PlayerDetail;