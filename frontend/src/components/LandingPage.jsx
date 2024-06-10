import React from 'react';
import { Link } from 'react-router-dom';
import { FaRankingStar } from "react-icons/fa6";
import { GrOptimize } from "react-icons/gr";
import { FaExchangeAlt } from "react-icons/fa";
import 'tailwindcss/tailwind.css';

const LandingPage = () => {
    return (
        <div className="dark-mode">
            {/* Wrapper with Background */}
            <div className="relative bg-cover bg-center bg-custom-bg contrast-125">
                {/* Content */}
                <div className="relative z-20">
                    {/* Header */}
                    <header className="h-24">
                        <div className="container mx-auto flex justify-between items-center h-full">
                            <h1 className="text-3xl text-white font-bold">CourtSide Fantasy</h1>
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
                    <section className="text-left h-screen flex items-center bg-cover bg-center">
                        <div className="container mx-auto pl-12">
                            <div className="max-w-lg">
                                <h2 className="text-5xl text-white font-bold mb-4 fade-in">Dominate Your Fantasy Basketball League</h2>
                                <p className="text-xl text-white mb-8 fade-in">With advanced analytics and powerful tools from CourtSide Fantasy</p>
                                <a href="#features" className="bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="py-20 bg-black text-white ">
                <div className="relative mt-15 min-h-[800px]">
                    <span className="bg-neutral-900 text-sm rounded-full font-bold mb-12 text-center text-orange-700 px-2 py-1">
                        FEATURES
                    </span>
                    <h3 className="text-6xl font-bold mb-12 text-center">
                        Build the {" "}
                        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                            best team
                         </span>
                    </h3>
                    <div className="flex flex-wrap mt-10 lg:mt-20 justify-center">
                        <div className="w-full sm:w-1/2 lg:w-1/3 mb-6">
                            <div className="flex">
                                <div
                                    className="flex mx-6 h-12 w-12 p-2 bg-black text-orange-700 justify-center items-center rounded-full">
                                    <FaRankingStar className="text-3xl"/>
                                </div>
                                <div>
                                    <h5 className="text-left mt-1 mb-6 text-2xl font-bold">Player Ranking</h5>
                                    <p className="text-md text-left p-2 text-neutral-500">
                                        Discover the most valuable NBA players for fantasy basketball through our
                                        sophisticated ranking system.
                                        Our algorithm evaluates player performance based on a comprehensive set of
                                        metrics, ensuring you always have the
                                        edge in your fantasy league. Whether you're drafting, trading, or setting your
                                        lineup, our Player Ranking tool
                                        gives you the insights you need to dominate the competition.
                                    </p>
                                    <img src="https://cdn.nba.com/manage/2022/10/lebron-giannis-iso.jpg" alt="Basketball Actions" className="mt-4 w-full h-auto rounded-lg shadow-lg"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/3 mb-6">
                            <div className="flex">
                                <div
                                    className="flex mx-6 h-12 w-12 p-2 bg-black text-orange-700 justify-center items-center rounded-full">
                                    <GrOptimize className="text-3xl"/>
                                </div>
                                <div>
                                    <h5 className="text-left mt-1 mb-6 text-2xl font-bold text-white">Lineup
                                        Optimizer</h5>
                                    <p className="text-left text-md p-2 text-neutral-500">
                                        Maximize your team's potential output each week with our Lineup Optimizer.
                                        This feature leverages advanced algorithms to analyze matchups, player stats,
                                        and historical performance,
                                        providing you with tailored recommendations for your starting lineup. Stay ahead
                                        of your competitors and
                                        ensure your team is always in the best position to score the highest points.
                                    </p>
                                    <img src="https://cdn.nba.com/manage/2022/06/ime-udoka-huddle.jpg" alt="Basketball Actions" className="mt-4 w-full h-auto rounded-lg shadow-lg"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/3 mb-6">
                        <div className="flex">
                                <div
                                    className="flex mx-6 h-12 w-12 p-2 bg-black text-orange-700 justify-center items-center rounded-full">
                                    <FaExchangeAlt className="text-3xl"/>
                                </div>
                            <div>
                                <h5 className="text-left mt-1 mb-6 text-2xl font-bold">Trade Analyzer</h5>
                                <p className="text-left text-md p-2 text-neutral-500">
                                    Make informed decisions with our Trade Analyzer. This powerful tool provides
                                    detailed analysis and projections,
                                    helping you evaluate the potential impact of trade offers on your team. Our
                                    algorithm takes into account player performance,
                                    team needs, and future projections, offering you a clear perspective on whether
                                    a trade will strengthen your lineup.
                                    Ensure every trade you make is a step towards victory.
                                </p>
                                <img src="https://cdn.nba.com/manage/2017/10/red-auerbach-celtics-banners-iso.jpg" alt="Basketball Actions" className="mt-4 w-full h-auto rounded-lg shadow-lg"/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-black text-black">
                <div className="about-us-section py-16 bg-neutral-900 text-white flex flex-col lg:flex-row items-center min-h-[800px]">
                    <div className="lg:w-1/2 p-8">
                        <span className="text-md text-left text-white mb-2 block">ABOUT US</span>
                        <h2 className="text-3xl text-left font-bold text-white mb-2">
                            Empowering {" "}
                            <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                            Fantasy Basketball {" "}
                            </span>
                            Enthusiasts
                        </h2>
                        <p className="text-lg text-left mb-8">
                            Our mission is to provide fantasy basketball enthusiasts with the best tools and insights to
                            dominate their leagues. Our team of experts combines their passion for basketball with
                            advanced analytics to bring you top-notch features and services.
                        </p>
                        <p className="text-lg text-left mb-8">
                            At our core, we believe that winning in fantasy basketball requires more than just luck. It
                            demands a deep understanding of player performance, strategic planning, and timely
                            decision-making. That's why we have developed a suite of sophisticated tools designed to
                            give you a competitive edge.
                        </p>
                        <p className="text-lg text-left mb-8">
                            Our platform offers comprehensive player rankings, lineup optimizers, and trade analyzers
                            that are powered by cutting-edge algorithms and real-time data. Whether you are a seasoned
                            fantasy basketball veteran or a newcomer, our tools are tailored to help you make informed
                            decisions and stay ahead of the competition.
                        </p>
                        <p className="text-lg text-left mb-8">
                            Join our community of dedicated fantasy basketball players and take your game to the next
                            level. With our insights and analytics at your fingertips, you'll be equipped to make
                            smarter moves, maximize your team's potential, and ultimately, secure victory in your
                            league.
                        </p>
                        <button
                            className="bg-orange-600 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition duration-300">
                            Get Started
                        </button>
                    </div>
                    <div className="lg:w-1/2 p-8 flex justify-center">
                        <img src="https://i.pinimg.com/originals/ef/34/57/ef34575651a79bebbabe9ba0d313c40c.jpg"
                             alt="About Us" className="rounded-lg shadow-lg w-auto h-[600px]"/>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-black text-white">
                <div className="container mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-8">Contact Us</h3>
                    <p className="text-xl max-w-3xl mx-auto mb-8">Have any questions or feedback? Reach out to us, and
                        we'll be happy to help you.</p>
                    <a href="mailto:info@courtsidefantasy.com"
                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105">
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
