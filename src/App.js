import React, { Component } from 'react';
import './App.css';

import TicTacToe from './Components/TicTacToe';




class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="pure-u-1">
            <TicTacToe></TicTacToe>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
