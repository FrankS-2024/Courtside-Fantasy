import React from 'react';

const PlayerDetail = ({ player }) => {
        return (
            <div>
                    <h2>{player.firstName} {player.lastName}</h2>
                    <p>Team: {player.teamAbbreviation}</p>
                    <p>Position: {player.position}</p>
                    <p>Points Per Game: {player.pointsPerGame}</p>
                    <p>Three Points Made: {player.threePointsMade}</p>
                    <p>Three Point Percentage: {player.threePointPercentage}</p>
                    <p>Three Points Attempted: {player.threePointsAttempted}</p>
                    <p>Rebounds: {player.rebounds}</p>
                    <p>Assists Per Game: {player.assistsPerGame}</p>
                    <p>Steals Per Game: {player.stealsPerGame}</p>
                    <p>Blocks Per Game: {player.blocksPerGame}</p>
                    <p>Field Goal Percentage: {player.fieldGoalPercentage}</p>
                    <p>Field Goals Made: {player.fieldGoalsMade}</p>
                    <p>Field Goals Attempted: {player.fieldGoalsAttempted}</p>
                    <p>Free Throw Percentage: {player.freeThrowPercentage}</p>
                    <p>Free Throws Made: {player.freeThrowsMade}</p>
                    <p>Free Throws Attempted: {player.freeThrowsAttempted}</p>
                    <p>Turnovers Per Game: {player.turnoversPerGame}</p>
                    <p>Minutes Per Game: {player.minutesPerGame}</p>
                    <p>Games Played: {player.gamesPlayed}</p>
                    <p>Season: {player.season}</p>
            </div>
        );
};

export default PlayerDetail;