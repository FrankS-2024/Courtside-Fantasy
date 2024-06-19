import React from 'react';

const PlayerDetail = ({ player }) => {

    const formatPercentage = (value) => {
        return (value * 100).toFixed(1) + '%';
    };

    return (
        <div className="flex p-5 border border-orange-600 rounded mx-auto my-5 text-white font-bold w-full">
            <div className="w-1/3 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-5 text-center">{player.firstName} {player.lastName}</h2>
                <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`} className="w-80 h-auto rounded" />
            </div>
            <div className="w-2/3">
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'Team', value: player.teamAbbreviation },
                        { label: 'Position', value: player.position },
                        { label: 'Games Played', value: player.gamesPlayed },
                        { label: 'Minutes Per Game', value: player.minutesPerGame },
                        { label: 'Points Per Game', value: player.pointsPerGame.toFixed(1) },
                        // { label: 'Three Pointers Made', value: player.threePointsMade.toFixed(1) },
                        { label: 'Three Point %', value: formatPercentage(player.threePointPercentage) },
                        { label: 'Three Pointers Attempted', value: player.threePointsAttempted.toFixed(1) },
                        { label: 'Rebounds', value: player.rebounds.toFixed(1) },
                        { label: 'Assists Per Game', value: player.assistsPerGame.toFixed(1) },
                        { label: 'Steals Per Game', value: player.stealsPerGame.toFixed(1) },
                        { label: 'Blocks Per Game', value: player.blocksPerGame.toFixed(1) },
                        { label: 'Field Goal %', value: formatPercentage(player.fieldGoalPercentage) },
                        // { label: 'Field Goals Made', value: player.fieldGoalsMade.toFixed(1) },
                        { label: 'Field Goals Attempted', value: player.fieldGoalsAttempted.toFixed(1) },
                        { label: 'Free Throw %', value: formatPercentage(player.freeThrowPercentage) },
                        // { label: 'Free Throws Made', value: player.freeThrowsMade.toFixed(1) },
                        { label: 'Free Throws Attempted', value: player.freeThrowsAttempted.toFixed(1) },
                        { label: 'Turnovers Per Game', value: player.turnoversPerGame.toFixed(1) }
                    ].map(detail => (
                        <div key={detail.label} className="flex justify-between text-lg mb-2">
                            <span className="text-xl">{detail.label}</span>
                            <span>{detail.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayerDetail;
