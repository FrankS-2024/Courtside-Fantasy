import React from 'react';

const CompactPlayerDetail = ({ player }) => {
    const formatPercentage = (value) => {
        return (value * 100).toFixed(1) + '%';
    };

    const regularStats = [
        { label: 'Points', value: player.pointsPerGame.toFixed(1) },
        { label: 'Threes', value: player.threePointsMade.toFixed(1) },
        { label: 'Rebounds', value: player.rebounds.toFixed(1) },
        { label: 'Assists', value: player.assistsPerGame.toFixed(1) },
        { label: 'Steals', value: player.stealsPerGame.toFixed(1) },
        { label: 'Blocks', value: player.blocksPerGame.toFixed(1) },
        { label: 'Field Goal % / Attempts', value: `${formatPercentage(player.fieldGoalPercentage)} / ${player.fieldGoalsAttempted.toFixed(1)}` },
        { label: 'Free Throw % / Attempts', value: `${formatPercentage(player.freeThrowPercentage)} / ${player.freeThrowsAttempted.toFixed(1)}` },
        { label: 'Turnovers', value: player.turnoversPerGame.toFixed(1) },
    ];

    return (
        <div className="flex flex-col items-center text-center text-white p-3 border-2 border-orange-600 rounded bg-neutral-800"
             style={{ width: '320px', maxHeight: '400px' }}>
            <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`}
                 className="w-80 h-80"/>
            <div className="mt-2 overflow-auto" style={{ maxHeight: '200px', overflowY: 'auto' }}
                 className="w-full">
                <style>
                    {`
                        /* Hide scrollbar for Chrome, Safari and Opera */
                        div::-webkit-scrollbar {
                            display: none;
                        }

                        /* Hide scrollbar for IE, Edge, and Firefox */
                        div {
                            -ms-overflow-style: none;  /* IE and Edge */
                            scrollbar-width: none;  /* Firefox */
                        }
                    `}
                </style>
                <div className="scrollbar-hidden">
                    <h3 className="text-base font-bold truncate">{player.firstName} {player.lastName}</h3>
                    <span className="text-sm">{player.teamAbbreviation} - {player.position}</span>
                    <div className="flex flex-col gap-1 text-sm">
                        {regularStats.map((detail, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{detail.label}:</span>
                                <span>{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompactPlayerDetail;
