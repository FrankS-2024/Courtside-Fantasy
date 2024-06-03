import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlayerList from "./components/PlayerList";
import LandingPage from './components/LandingPage';


function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/players" element={<PlayerList />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;