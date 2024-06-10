import React from 'react';

const PlayerDetail = ({ player }) => {
    const formatPercentage = (value) => {
        return (value * 100).toFixed(2).replace(/\.?0+$/, '') + '%';
    };

    return (
        <div className="p-5 font-sans bg-gray-800 border border-gray-200 rounded max-w-lg mx-auto my-5 flex flex-col items-start text-white">
            <h2 className="text-2xl font-bold text-center w-full mb-5">{player.firstName} {player.lastName}</h2>
            <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`} className="w-64 h-auto rounded mb-5 self-center" />
            {[
                { label: 'Team', value: player.teamAbbreviation },
                { label: 'Position', value: player.position },
                { label: 'Points Per Game', value: player.pointsPerGame },
                { label: 'Three Points Made', value: player.threePointsMade },
                { label: 'Three Point Percentage', value: formatPercentage(player.threePointPercentage) },
                { label: 'Three Points Attempted', value: player.threePointsAttempted },
                { label: 'Rebounds', value: player.rebounds },
                { label: 'Assists Per Game', value: player.assistsPerGame },
                { label: 'Steals Per Game', value: player.stealsPerGame },
                { label: 'Blocks Per Game', value: player.blocksPerGame },
                { label: 'Field Goal Percentage', value: formatPercentage(player.fieldGoalPercentage) },
                { label: 'Field Goals Made', value: player.fieldGoalsMade },
                { label: 'Field Goals Attempted', value: player.fieldGoalsAttempted },
                { label: 'Free Throw Percentage', value: formatPercentage(player.freeThrowPercentage) },
                { label: 'Free Throws Made', value: player.freeThrowsMade },
                { label: 'Free Throws Attempted', value: player.freeThrowsAttempted },
                { label: 'Turnovers Per Game', value: player.turnoversPerGame },
                { label: 'Minutes Per Game', value: player.minutesPerGame },
                { label: 'Games Played', value: player.gamesPlayed },
                { label: 'Season', value: `${player.season}-${player.season - 1999}` }
            ].map(detail => (
                <p key={detail.label} className="text-lg mb-2">- <span className="font-bold text-blue-500">{detail.label}:</span> {detail.value}</p>
            ))}
        </div>
    );
};

export default PlayerDetail;