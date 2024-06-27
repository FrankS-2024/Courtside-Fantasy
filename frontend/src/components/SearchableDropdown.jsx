import React, { useState } from 'react';

const SearchableDropdown = ({ players, onSelect, placeholder }) => {
    const [query, setQuery] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const filtered = players.filter(player =>
                `${player.firstName} ${player.lastName}`.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredPlayers(filtered);
        } else {
            setFilteredPlayers([]);
        }
    };

    const handleSelect = (player) => {
        onSelect(player.id);
        setQuery('');
        setFilteredPlayers([]);
    };

    return (
        <div className="relative w-full">
            <input type="text" value={query} onChange={handleChange} placeholder={placeholder} className="w-full p-2 border border-neutral-300 bg-neutral-800 text-white rounded placeholder-gray-400"/>
            {filteredPlayers.length > 0 && (
                <ul className="text-white absolute z-10 w-full bg-neutral-800 border border-neutral-300 rounded mt-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-800">
                    {filteredPlayers.map(player => (
                        <li key={player.id} onClick={() => handleSelect(player)} className="p-2 hover:bg-neutral-700 cursor-pointer">
                            {player.firstName} {player.lastName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchableDropdown;