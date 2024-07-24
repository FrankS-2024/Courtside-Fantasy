import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import { useAuth } from './AuthContext'; // Make sure the path is correct

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const { currentUser, login, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            // Login
            try {
                const response = await axios.post('/api/auth/login', { email, password });
                login(response.data); // Use the login function from useAuth
                navigate('/');
            } catch (error) {
                console.error('Login error', error);
            }
        } else {
            // Register
            try {
                await axios.post('/api/auth/register', { email, username, password });
                // Automatically log in after registration
                const response = await axios.post('/api/auth/login', { email, password });
                login(response.data); // Use the login function from useAuth
                navigate('/');
            } catch (error) {
                console.error('Registration error', error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
            <div className="w-full max-w-md p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="block text font-medium">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text font-medium">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-orange-600 hover:bg-orange-900 focus:outline-none"
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-orange-600 hover:underline"
                    >
                        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                    </button>
                </div>
                {currentUser && (
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={logout}
                            className="text-orange-600 hover:underline"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
