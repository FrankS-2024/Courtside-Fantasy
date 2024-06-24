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
    Tooltip
} from '@mui/material';

const PlayerList = ({ players, isLoading }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setOpenRows({});
    };

    const paginatedPlayers = players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const tableCellStyle = {
        color: 'white',
        fontSize: '15px',
        //width: '5.5%',
        textAlign: 'center',
    };

    const headerCellStyle = {
        ...tableCellStyle,
        backgroundColor: '#FF6600',
        fontWeight: 'bold',
        fontSize: '16px',
    };

    const headers = [
        'Rank', 'Courtside Score', 'Name', 'Team', 'Position', 'Games Played', 'Minutes', 'Points', 'Threes', 'Rebounds',
        'Assists', 'Steals', 'Blocks', 'Field Goal %', 'Field Goal Attempts', 'Free Throw %',
        'Free Throw Attempts', 'Turnovers'
    ];

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <header className="h-24 bg-neutral-900">
                <div className="container mx-auto flex justify-between items-center h-full">
                    <h1 className="text-3xl bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text font-bold">Courtside Fantasy</h1>
                    <nav>
                        <a href="#login" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Login</a>
                        <Link to="/" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Home</Link>
                        <Link to="/trade" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">TradeAnalyzer</Link>
                    </nav>
                </div>
            </header>
            <main className="p-5 flex flex-col items-center">
                <h2 className="text-5xl font-bold mb-10 bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">Courtside Fantasy Rankings for 2023-24 Season</h2>
                {isLoading ? (<CircularProgress color="inherit" />) : (
                    <TableContainer component={Paper} style={{ backgroundColor: 'transparent', width: '95%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {headers.map((header) => (
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
                                            {[
                                                page * rowsPerPage + index + 1,
                                                player.rankingScore.toFixed(2),
                                                `${player.firstName} ${player.lastName}`,
                                                player.teamAbbreviation,
                                                player.position,
                                                player.gamesPlayed,
                                                player.minutesPerGame,
                                                player.pointsPerGame.toFixed(1),
                                                player.threePointsMade.toFixed(1),
                                                player.rebounds.toFixed(1),
                                                player.assistsPerGame.toFixed(1),
                                                player.stealsPerGame.toFixed(1),
                                                player.blocksPerGame.toFixed(1),
                                                formatPercentage(player.fieldGoalPercentage),
                                                player.fieldGoalsAttempted.toFixed(1),
                                                formatPercentage(player.freeThrowPercentage),
                                                player.freeThrowsAttempted.toFixed(1),
                                                player.turnoversPerGame.toFixed(1)
                                            ].map((cell, cellIndex) => (
                                                <Tooltip key={cellIndex} title={headers[cellIndex]} arrow>
                                                    <TableCell style={tableCellStyle}>{cell}</TableCell>
                                                </Tooltip>
                                            ))}
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
                            rowsPerPageOptions={[10, 50, 100, 200]}
                            component="div"
                            count={players.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-actions, .MuiInputBase-root, .MuiSelect-icon , .MuiSelect-select": {
                                    color: "white",
                                }
                            }}
                        />
                    </TableContainer>
                )}
            </main>
        </div>
    );
};

export default PlayerList;
