import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const LandingPage = () => {
    return (
        <div className="dark-mode">
            {/* Wrapper with Background */}
            <div className="relative bg-cover bg-center bg-custom-bg">
                {/* Content */}
                <div className="relative z-20">
                    {/* Header */}
                    <header className="h-24">
                        <div className="container mx-auto flex justify-between items-center h-full">
                            <h1 className="text-3xl text-white font-bold">Courtside Fantasy</h1>
                            <nav>
                                <a href="#features" className="ml-4 text-lg text-white font-bold hover:text-gray-300 transition-colors duration-300">Features</a>
                                <a href="#about" className="ml-4 text-lg text-white font-bold hover:text-gray-300 transition-colors duration-300">About</a>
                                <a href="#contact" className="ml-4 text-lg text-white font-bold hover:text-gray-300 transition-colors duration-300">Contact</a>
                                <a href="#login" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Login</a>
                                <Link to="/players" className="ml-4 bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">Player List</Link>
                            </nav>
                        </div>
                    </header>

                    {/* Hero Section */}
                    <section className="text-left h-screen flex items-center bg-cover bg-center" style={{ backgroundImage: "url('path/to/your/image.jpg')" }}>
                        <div className="container mx-auto pl-12">
                            <div className="max-w-lg">
                                <h2 className="text-5xl text-white font-bold mb-4 fade-in">Dominate Your Fantasy Basketball League</h2>
                                <p className="text-xl text-white mb-8 fade-in">With advanced analytics and powerful tools from Courtside Fantasy</p>
                                <a href="#features" className="bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-950 text-white">
                <div className="container mx-auto">
                    <h3 className="text-4xl font-bold mb-12 text-center">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="feature-card p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out">
                            <h4 className="text-2xl font-bold mb-4">Player Ranking</h4>
                            <p>Showcasing the most valuable NBA players for fantasy purposes based on our advanced algorithm.</p>
                        </div>
                        <div className="feature-card p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out">
                            <h4 className="text-2xl font-bold mb-4">Trade Analyzer</h4>
                            <p>Analyze your trades and get insights on whether they are beneficial for your team using our algorithm.</p>
                        </div>
                        <div className="feature-card p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out">
                            <h4 className="text-2xl font-bold mb-4">Lineup Optimizer</h4>
                            <p>Optimize your weekly lineup to maximize your team's performance using our algorithm.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-950 text-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-8">About Us</h3>
                    <p className="text-xl max-w-3xl mx-auto">Courtside Fantasy is dedicated to helping fantasy basketball enthusiasts dominate their leagues with advanced tools and analytics. Our algorithms are designed to provide you with the best insights to make informed decisions and achieve victory.</p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-950 text-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-8">Contact Us</h3>
                    <p className="text-xl max-w-3xl mx-auto mb-8">Have any questions or feedback? Reach out to us, and we'll be happy to help you.</p>
                    <a href="mailto:info@courtsidefantasy.com" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">
                        Email Us
                    </a>
                </div>
            </section>

            {/* Copyright Section */}
            <footer className="py-4 bg-black text-white">
                <div className="container mx-auto text-center">
                    <p className="text-sm">&copy; 2024 Courtside Fantasy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
