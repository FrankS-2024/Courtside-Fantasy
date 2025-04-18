import React, { createContext, useContext, useState } from 'react';
import axios from './axios'; // Use the custom Axios instance

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        setCurrentUser(user);
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout'); // Make a POST request to your logout endpoint
            setCurrentUser(null);
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    const value = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};