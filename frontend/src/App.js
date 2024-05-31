import React from 'react';
import './App.css';
import UserList from './components/UserList';
import PlayerList from "./components/PlayerList";
import LandingPage from './components/LandingPage';


function App() {
  return (
      <div className="App">
          <LandingPage />
          {/*<PlayerList />*/}
      </div>
  );
}

export default App;