import React from 'react';
import './App.css';
import logo from './logo.png'

import Routes from './routes/Routes';

function App() {
  return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo"/>
            <Routes/>
        </div>
  );
}

export default App;
