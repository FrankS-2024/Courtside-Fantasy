import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    TablePagination,
    Collapse,
} from '@mui/material';

const PlayerList = ({ players, isLoading }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(200);
    const [openRows, setOpenRows] = useState({});

    const formatPercentage = (value) => {
        return (value * 100).toFixed(1) + '%';
    };

    const handleRowClick = (playerId) => {
        setOpenRows((prevOpenRows) => ({
            ...prevOpenRows,
            [playerId]: !prevOpenRows[playerId],
        }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedPlayers = players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const tableCellStyle = {
        color: 'white',
    };

    const headerCellStyle = {
        ...tableCellStyle,
        backgroundColor: '#FF6600',
        fontWeight: 'bold',
        fontSize: '15px',
    };

    const formatV = (gValue) => {
        if (gValue === null || gValue === undefined) {
            return null;
        }
        return gValue.toFixed(2);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <header className="h-24 bg-neutral-900">
                <div className="container mx-auto flex justify-between items-center h-full">
                    <h1 className="text-3xl bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text font-bold">Courtside Fantasy</h1>
                    <nav>
                        <a href="#login" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Login</a>
                        <Link to="/" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Home</Link>
                    </nav>
                </div>
            </header>
            <main className="p-5 flex flex-col items-center">
                <header className="flex flex-col items-center mb-5">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">NBA Player Statistics for 2023-24 Season</h2>
                </header>
                {isLoading ? (<CircularProgress color="inherit" />) : (
                    <TableContainer component={Paper} style={{ backgroundColor: 'transparent', width: '100%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['Rank', 'Score', 'Name', 'Team', 'Position', 'Games Played', 'Minutes', 'Points', 'pointV', 'Threes', 'threeV', 'Rebounds', 'reboundV',
                                        'Assists', 'assistV', 'Steals', 'stealV', 'Blocks', 'blockV', 'Field Goal %', 'Field Goal Attempts', 'fieldgoalV','Free Throw %',
                                        'Free Throw Attempts', 'freethrowV', 'Turnovers', 'turnoverV'].map((header) => (
                                        <TableCell key={header} style={headerCellStyle}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedPlayers.map((player, index) => (
                                    <React.Fragment key={player.id}>
                                        <TableRow onClick={() => handleRowClick(player.id)} style={{ cursor: 'pointer' }} hover>
                                            <TableCell style={tableCellStyle}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.rankingScore.toFixed(2)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.firstName} {player.lastName}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.teamAbbreviation}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.position}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.gamesPlayed}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.minutesPerGame}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.pointsPerGame.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.pointV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.threePointsMade.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.threepointsMadeV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.rebounds.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.reboundV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.assistsPerGame.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.assistV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.stealsPerGame.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.stealV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.blocksPerGame.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.blockV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatPercentage(player.fieldGoalPercentage)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.fieldGoalsAttempted.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.fieldGoalV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatPercentage(player.freeThrowPercentage)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.freeThrowsAttempted.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.freeThrowV)}</TableCell>
                                            <TableCell style={tableCellStyle}>{player.turnoversPerGame.toFixed(1)}</TableCell>
                                            <TableCell style={tableCellStyle}>{formatV(player.turnoverV)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={18}>
                                                <Collapse in={openRows[player.id]} timeout="auto" unmountOnExit>
                                                    <PlayerDetail player={player} />
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[200]}
                            component="div"
                            count={players.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                        />
                    </TableContainer>
                )}
            </main>
        </div>
    );
};

export default PlayerList;