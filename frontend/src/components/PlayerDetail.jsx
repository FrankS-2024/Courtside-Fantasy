import React from 'react';

const PlayerDetail = ({ player }) => {

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

    const vValues = [
        { label: 'Points Score', value: player.pointV.toFixed(2) },
        { label: 'Threes Score', value: player.threepointsMadeV.toFixed(2) },
        { label: 'Rebounds Score', value: player.reboundV.toFixed(2) },
        { label: 'Assists Score', value: player.assistV.toFixed(2) },
        { label: 'Steals Score', value: player.stealV.toFixed(2) },
        { label: 'Blocks Score', value: player.blockV.toFixed(2) },
        { label: 'Field Goal % Score', value: player.fieldGoalV.toFixed(2) },
        { label: 'Free Throw % Score', value: player.freeThrowV.toFixed(2) },
        { label: 'Turnover Score', value: player.turnoverV.toFixed(2) }
    ];

    return (
        <div className="flex p-5 border border-orange-600 rounded text-white w-full my-4 px-32 py-6">
            <div className="w-1/4 flex flex-col items-center mr-32">
                <h2 className="text-3xl font-bold mb-5 text-center">{player.firstName} {player.lastName}</h2>
                <img src={player.playerImg} alt={`${player.firstName} ${player.lastName}`} className="w-80 h-auto rounded"/>
                <div className="mt-5 flex space-x-5 text-xl">
                    <span>Team: {player.teamAbbreviation}</span>
                    <span>Position: {player.position}</span>
                </div>
                <div className="mt-2 flex space-x-5 text-xl">
                    <span>Games Played: {player.gamesPlayed}</span>
                    <span>Minutes: {player.minutesPerGame}</span>
                </div>
            </div>
            <div className="w-3/4">
                <div className="grid grid-cols-2 mb-4">
                    <h2 className="col-span-1 text-2xl font-bold text-center mr-16">Per Game Stats</h2>
                    <h2 className="col-span-1 text-2xl font-bold text-center ml-16">Courtside Scores</h2>
                </div>
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        {regularStats.map(detail => (
                            <div key={detail.label} className="flex justify-between text-xl my-2 mr-16">
                                <span>{detail.label}:</span>
                                <span>{detail.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-1">
                        {vValues.map(detail => (
                            <div key={detail.label} className="flex justify-between text-xl my-2 ml-16">
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

export default PlayerDetail;