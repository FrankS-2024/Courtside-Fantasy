import React from 'react';

const CompactPlayerDetail = ({ player }) => {
    const formatPercentage = (value) => {
        return (value * 100).toFixed(1) + '%';
    };

    const regularStats = [
        { label: 'Courtside Score', value: player.rankingScore.toFixed(2) },
        { label: 'Points', value: player.pointsPerGame.toFixed(1) },
        { label: 'Threes', value: player.threePointsMade.toFixed(1) },
        { label: 'Rebounds', value: player.rebounds.toFixed(1) },
        { label: 'Assists', value: player.assistsPerGame.toFixed(1) },
        { label: 'Steals', value: player.stealsPerGame.toFixed(1) },
        { label: 'Blocks', value: player.blocksPerGame.toFixed(1) },
        { label: 'FG % / Attempts', value: `${formatPercentage(player.fieldGoalPercentage)} / ${player.fieldGoalsAttempted.toFixed(1)}` },
        { label: 'FT % / Attempts', value: `${formatPercentage(player.freeThrowPercentage)} / ${player.freeThrowsAttempted.toFixed(1)}` },
        { label: 'Turnovers', value: player.turnoversPerGame.toFixed(1) },
    ];

    return (
        <div className="flex flex-col items-center text-center border-2 border-orange-600 text-white rounded-xl bg-neutral-800" style={{ width: '320px', maxHeight: '500px' }}>
            <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`} className="p-2 w-80 h-auto"/>
            <div className="overflow-auto w-full scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-transparent" style={{ maxHeight: '175px', overflowY: 'auto' }}>
                <h3 className="text-lg font-bold truncate">{player.firstName} {player.lastName}</h3>
                <span className="">{player.teamAbbreviation} - {player.position}</span>
                <div className="flex flex-col pb-2 pl-3 pr-2">
                    {regularStats.map((detail, index) => (
                        <div key={index} className="flex justify-between">
                            <span>{detail.label}:</span>
                            <span>{detail.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompactPlayerDetail;