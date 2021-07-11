import React from 'react';
import logo from './logo.svg';
import './App.css';
import SelectCoin from './CoinManagement'
function App() {
  let bitcoinLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={bitcoinLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SelectCoin></SelectCoin>
    </div>
  );
}

export default App;
